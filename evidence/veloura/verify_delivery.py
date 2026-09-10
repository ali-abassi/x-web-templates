"""Compare the changed public files with this exact built candidate."""

from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "dist"
BASE = sys.argv[1].rstrip("/")


def check(path):
    relative = str(path.relative_to(DIST))
    response = subprocess.run(
        ["curl", "--location", "--fail", "--silent", "--show-error",
         "--max-time", "30", f"{BASE}/{relative}"],
        capture_output=True,
    )
    return {
        "path": relative,
        "bytes": len(response.stdout),
        "exit": response.returncode,
        "error": response.stderr.decode(),
        "match": hashlib.sha256(response.stdout).digest()
        == hashlib.sha256(path.read_bytes()).digest(),
    }


paths = [path for path in (DIST / "veloura").rglob("*") if path.is_file()]
paths += [DIST / "index.html", DIST / "assets/veloura.jpg", DIST / "downloads/veloura.zip"]
with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, paths))
Path(sys.argv[2]).write_text(json.dumps(results, indent=2) + "\n")
assert all(result["match"] for result in results), results
print(f"PASS: {len(results)} hosted files match the candidate byte for byte.")
