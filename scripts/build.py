"""Build independent static sites and reproducible ZIPs using the standard library."""

from pathlib import Path
import shutil
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
NAMES = (
    "alpine-notes",
    "rainbow-venture",
    "bloop",
    "furion",
    "aster",
    "horizonx",
    "buzzkit",
    "pixel-world",
    "grid-driver",
    "clipdock",
    "telemetry-stack",
    "lost-in-flight",
    "reality-studio",
    "direct-cta",
    "quiet-presets",
    "olympus",
    "wandor",
)


def compose(source, destination, filename, shared):
    content = (ROOT / "shared" / shared).read_text()
    content += "\n" + (source / filename).read_text()
    (destination / filename).write_text(content)


def archive_file(archive, path, name):
    info = zipfile.ZipInfo(name, date_time=(2026, 9, 9, 0, 0, 0))
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = 0o100644 << 16
    archive.writestr(info, path.read_bytes())


def package_template(stage, name):
    source = ROOT / "templates" / name
    with zipfile.ZipFile(stage / "downloads" / f"{name}.zip", "w") as archive:
        for path in sorted((stage / name).rglob("*")):
            if path.is_file():
                archive_file(archive, path, f"{name}/dist/{path.relative_to(stage / name)}")
        archive_file(archive, source / "README.md", f"{name}/README.md")
        for path in sorted((source / "licenses").glob("*.txt")):
            archive_file(archive, path, f"{name}/licenses/{path.name}")


def build_template(stage, name):
    source = ROOT / "templates" / name / "dist"
    target = stage / name
    shutil.copytree(source, target)
    if name in ("alpine-notes", "rainbow-venture", "bloop", "furion"):
        compose(source, target, "style.css", "base.css")
        compose(source, target, "app.js", "ui.js")
    package_template(stage, name)


def build_gallery(stage):
    shutil.copy2(ROOT / "gallery/index.html", stage / "index.html")
    compose(ROOT / "gallery", stage, "style.css", "base.css")
    shutil.copytree(ROOT / "gallery/assets", stage / "assets")
    for filename in ("sans.otf", "sans-bold.otf", "favicon.svg"):
        shutil.copy2(stage / "alpine-notes/assets" / filename, stage / "assets" / filename)


def build():
    # Finish all source reads and archives before replacing the known output directory.
    with tempfile.TemporaryDirectory(prefix="xweb-build-") as temporary:
        stage = Path(temporary) / "dist"
        (stage / "downloads").mkdir(parents=True)
        for name in NAMES:
            build_template(stage, name)
        build_gallery(stage)
        shutil.copytree(stage, ROOT / "dist", dirs_exist_ok=True)
        expected = {path.relative_to(stage) for path in stage.rglob("*") if path.is_file()}
        remove_stale_files(expected)
    print(f"Built {len(NAMES)} independent sites, the gallery, and reproducible ZIPs.")


def remove_stale_files(expected):
    for path in (ROOT / "dist").rglob("*"):
        if path.is_file() and path.relative_to(ROOT / "dist") not in expected:
            path.unlink()


if __name__ == "__main__":
    build()
