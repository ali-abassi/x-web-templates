"""Check generated asset links, anchors, JavaScript syntax, and ZIP/source parity."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import subprocess
import zipfile

from build import NAMES, ROOT


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = []
        self.links = []
        self.images = []
        self.headings = 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.ids.extend([attrs["id"]] if "id" in attrs else [])
        self.links.extend(value for key, value in attributes if key in ("src", "href"))
        if tag == "img":
            self.images.append(attrs)
        self.headings += int(tag == "h1")


def local_target(path, link):
    url = urlsplit(link)
    if url.scheme or url.netloc:
        return None
    target = path.parent / unquote(url.path)
    if not url.path:
        target = path
    if target.is_dir():
        target = target / "index.html"
    return target, unquote(url.fragment)


def check_link(path, link):
    local = local_target(path, link)
    if local is None:
        return
    target, anchor = local
    assert target.is_file(), f"Missing link from {path}: {link}"
    if anchor:
        assert anchor in Page(target).ids, f"Missing anchor from {path}: {link}"


def check_page(path):
    page = Page(path)
    assert page.headings == 1, f"Expected one h1: {path}"
    assert len(page.ids) == len(set(page.ids)), f"Duplicate id: {path}"
    for image in page.images:
        assert "alt" in image and "width" in image and "height" in image, path
    for link in page.links:
        check_link(path, link)


def check_assets():
    for path in (ROOT / "dist").rglob("*.css"):
        for link in re.findall(r'url\(["\']?([^\)"\']+)', path.read_text()):
            check_link(path, link)
    for path in (ROOT / "dist").rglob("*.js"):
        subprocess.run(["node", "--check", str(path)], check=True, capture_output=True)


def check_archive(name):
    with zipfile.ZipFile(ROOT / "dist/downloads" / f"{name}.zip") as archive:
        assert archive.testzip() is None, f"Corrupt ZIP: {name}"
        assert f"{name}/README.md" in archive.namelist(), name
        for path in (ROOT / "dist" / name).rglob("*"):
            if path.is_file():
                key = f"{name}/dist/{path.relative_to(ROOT / 'dist' / name)}"
                assert archive.read(key) == path.read_bytes(), key


def main():
    pages = list((ROOT / "dist").rglob("*.html"))
    assert len(pages) == 5, "Expected gallery and four templates"
    for page in pages:
        check_page(page)
    check_assets()
    for name in NAMES:
        check_archive(name)
    print("PASS: five pages, local links/anchors, image attributes, JS syntax, and four exact ZIPs.")


if __name__ == "__main__":
    main()
