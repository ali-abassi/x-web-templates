# Scribblit / Alpine Notes

[Live preview](https://x-web-templates.pages.dev/alpine-notes/) · [Download ZIP](https://x-web-templates.pages.dev/downloads/alpine-notes.zip)

![alpine-notes screenshot](https://x-web-templates.pages.dev/assets/alpine-notes.png)

A blue mountain product page with glass-like UI and a working local notebook.

## Use

Unzip the download and open `dist/index.html`. All assets are local. For predictable storage, serve it with `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`. No package installation, remote font or API key is required.

## Customize

Edit `dist/index.html` for copy, labels and sections; `dist/style.css` for layout and colors; `dist/app.js` for behavior; `dist/assets/mountain.jpg` and the other named images for photography. Retain the notices in `licenses/`.

In the collection repository, files under `templates/alpine-notes/dist/` are page-specific source. Shared CSS and JavaScript are in `shared/`. Run `npm run build` before previewing: it assembles each independent site and ZIP. Downloaded ZIPs already contain the assembled code.

## Behavior

Save, reload and export a note; change its paper color. The two plans are illustrative. No payment, sync or AI service is connected. Enhancement-only notebook/form controls are disabled with an explanation when JavaScript is unavailable.

## Provenance

All photography is newly generated. UI illustrations and labels are HTML/CSS. Generated assets were made with native ChatGPT imagegen on 2026-09-09. Fonts are self-hosted with their licenses. Reference: https://x.com/DesignGuru01/status/2097570950543790295. This is a reconstruction study, with editable copy and substituted photography/fonts, not a claim of exact source identity or affiliation.
