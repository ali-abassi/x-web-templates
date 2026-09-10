#!/usr/bin/env python3
"""Analyze local or public YouTube video with Gemini agentic processing."""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import time
from pathlib import Path
from typing import Final

MODEL: Final = "gemini-3.7-flash"
MAX_VIDEOS: Final = 10
SUPPORTED_MIME: Final = {
    ".3gp": "video/3gpp",
    ".avi": "video/avi",
    ".flv": "video/x-flv",
    ".mov": "video/mov",
    ".mp4": "video/mp4",
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpg",
    ".webm": "video/webm",
    ".wmv": "video/wmv",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--video", action="append", default=[], help="Local file or public YouTube URL; repeatable")
    parser.add_argument("--processing", action="append", choices=("agentic", "static"), default=[])
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--previous-interaction-id")
    parser.add_argument("--store", action="store_true", help="Retain interaction context for follow-up turns")
    parser.add_argument("--dry-run", action="store_true", help="Validate and print the plan without an API call")
    parser.add_argument("--upload-timeout", type=int, default=900)
    return parser.parse_args()


def load_key() -> str:
    if value := os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"):
        return value
    for path in credential_paths():
        if key := read_google_key(path):
            return key
    raise RuntimeError("No Gemini key found in the environment or Pi auth.json")


def credential_paths() -> list[Path]:
    candidates: list[Path] = []
    if config_dir := os.getenv("PI_CODING_AGENT_DIR"):
        candidates.append(Path(config_dir) / "auth.json")
    candidates.append(Path.home() / ".pi-x" / "agent" / "auth.json")
    candidates.append(Path.home() / ".pi" / "agent" / "auth.json")
    return candidates


def read_google_key(path: Path) -> str | None:
    if not path.is_file():
        return None
    try:
        provider = json.loads(path.read_text()).get("google", {})
    except (OSError, json.JSONDecodeError):
        return None
    key = provider.get("key")
    return key if isinstance(key, str) and key else None


def validate(args: argparse.Namespace) -> list[str]:
    validate_source(args.video, args.previous_interaction_id, args.store)
    if len(args.video) > MAX_VIDEOS:
        raise ValueError(f"Gemini accepts at most {MAX_VIDEOS} videos per request")
    if len(args.processing) > len(args.video):
        raise ValueError("There cannot be more --processing values than --video values")
    return args.processing + ["agentic"] * (len(args.video) - len(args.processing))


def validate_source(videos: list[str], previous_id: str | None, store: bool) -> None:
    if not videos and not previous_id:
        raise ValueError("Provide --video or --previous-interaction-id")
    if previous_id and not store:
        raise ValueError("Follow-up turns require --store")


def mime_type(path: Path) -> str:
    if not path.is_file():
        raise FileNotFoundError(path)
    if known := SUPPORTED_MIME.get(path.suffix.lower()):
        return known
    guessed = mimetypes.guess_type(path.name)[0]
    if guessed not in SUPPORTED_MIME.values():
        raise ValueError(f"Unsupported video type: {path}")
    return guessed


def is_youtube(source: str) -> bool:
    return source.startswith(("https://youtube.com/", "https://www.youtube.com/", "https://youtu.be/"))


def wait_for_upload(client: object, uploaded: object, timeout: int) -> object:
    deadline = time.monotonic() + timeout
    while getattr(getattr(uploaded, "state", None), "name", None) == "PROCESSING":
        if time.monotonic() >= deadline:
            raise TimeoutError(f"Video upload did not become active within {timeout}s")
        time.sleep(2)
        uploaded = client.files.get(name=uploaded.name)
    state = getattr(getattr(uploaded, "state", None), "name", None)
    if state == "FAILED":
        raise RuntimeError(f"Video processing failed: {uploaded.name}")
    return uploaded


def build_inputs(client: object, sources: list[str], modes: list[str], timeout: int) -> tuple[list[dict[str, str]], list[object]]:
    inputs: list[dict[str, str]] = []
    uploads: list[object] = []
    for source, mode in zip(sources, modes, strict=True):
        if is_youtube(source):
            inputs.append({"type": "video", "uri": source, "processing": mode})
            continue
        path = Path(source).expanduser().resolve()
        data = base64.b64encode(path.read_bytes()).decode('ascii')
        if len(data) > 19_000_000:
            raise ValueError('Inline request exceeds conservative 19MB budget')
        inputs.append({'type': 'video', 'data': data, 'mime_type': mime_type(path), 'processing': mode})
    return inputs, uploads


def dry_run(args: argparse.Namespace, modes: list[str]) -> dict[str, object]:
    videos = []
    for source, mode in zip(args.video, modes, strict=True):
        if not is_youtube(source):
            mime_type(Path(source).expanduser().resolve())
        videos.append({"source": source, "processing": mode})
    return {"dry_run": True, "model": MODEL, "videos": videos, "store": args.store, "previous_interaction_id": args.previous_interaction_id}


def receipt(interaction: object, modes: list[str], retained_files: list[str]) -> dict[str, object]:
    steps = getattr(interaction, "steps", None) or []
    step_types = [getattr(step, "type", "unknown") for step in steps]
    needs_agentic = "agentic" in modes
    verified = not needs_agentic or {"processing_call", "processing_result"}.issubset(step_types)
    usage = getattr(interaction, "usage", None)
    return {
        "interaction_id": getattr(interaction, "id", None),
        "model": MODEL,
        "output_text": getattr(interaction, "output_text", None),
        "agentic_verified": verified,
        "step_types": step_types,
        "usage": usage.model_dump(mode="json") if usage else None,
        "retained_files": retained_files,
    }


def run(args: argparse.Namespace, modes: list[str]) -> dict[str, object]:
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=load_key())
    inputs, uploads = build_inputs(client, args.video, modes, args.upload_timeout)
    inputs.append({"type": "text", "text": args.prompt})
    retained = [item.name for item in uploads]
    cleanup_errors: list[str] = []
    try:
        interaction = client.interactions.create(
            model=MODEL,
            input=inputs,
            previous_interaction_id=args.previous_interaction_id,
            store=args.store,
        )
        result = receipt(interaction, modes, retained)
    finally:
        if not args.store:
            delete_config = types.DeleteFileConfig(
                http_options=types.HttpOptions(
                    timeout=10_000,
                    retry_options=types.HttpRetryOptions(attempts=1),
                )
            )
            for item in uploads:
                try:
                    client.files.delete(name=item.name, config=delete_config)
                    retained.remove(item.name)
                except Exception as error:
                    cleanup_errors.append(f"{item.name}: {type(error).__name__}")
    result["retained_files"] = retained
    result["cleanup_errors"] = cleanup_errors
    return result


def main() -> int:
    args = parse_args()
    try:
        modes = validate(args)
        result = dry_run(args, modes) if args.dry_run else run(args, modes)
    except (FileNotFoundError, RuntimeError, TimeoutError, ValueError) as error:
        print(json.dumps({"error": str(error)}))
        return 1
    print(json.dumps(result, indent=2))
    return 0 if result.get("agentic_verified", True) else 2


if __name__ == "__main__":
    raise SystemExit(main())
