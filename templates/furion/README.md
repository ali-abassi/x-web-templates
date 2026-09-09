# Furion

A six-panel monochrome performance identity presentation.

## Use

Unzip the download and open `dist/index.html`. All assets are local. For predictable storage, serve it with `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`. No package installation, remote font or API key is required.

## Customize

Edit `dist/index.html` for copy, labels and sections; `dist/style.css` for layout and colors; `dist/app.js` for behavior; `dist/assets/stretch.jpg` and the other named images for photography. Retain the notices in `licenses/`.

In the collection repository, files under `templates/furion/dist/` are page-specific source. Shared CSS and JavaScript are in `shared/`. Run `npm run build` before previewing: it assembles each independent site and ZIP. Downloaded ZIPs already contain the assembled code.

## Behavior

Native template disclosure and brand-note download; both work without JavaScript. Enhancement-only notebook/form controls are disabled with an explanation when JavaScript is unavailable.

## Provenance

Three main photographs are newly generated. The wordmark.png, shoe.jpg and cyclist.jpg assets are retained from the supplied reference study; replace or clear rights before commercial reuse. Generated assets were made with native ChatGPT imagegen on 2026-09-09. Fonts are self-hosted with their licenses. Reference: https://x.com/DesignGuru01/status/2097570950543790295. This is a reconstruction study, with editable copy and substituted photography/fonts, not a claim of exact source identity or affiliation.
