# Alpine Notes

A calm product page with a local notebook and example pricing.

## Use the downloaded ZIP

Unzip it and open `dist/index.html`. For predictable browser storage and downloads, serve it with Python 3:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Then open http://localhost:8000. No packages, API keys, remote fonts, or build step are needed for a downloaded template.

## Customize

- `dist/index.html`: name, title, description, copy, sections, accessible labels, and links.
- `dist/style.css`: colors in `:root`, fonts, spacing, and responsive layouts.
- `dist/app.js`: small local demo behaviors.
- `dist/assets/hero.jpg`: original generated image; replace with a suitable crop and update alt text.
- `licenses/`: retained font licenses.

In the source repository, the CSS and JS under `templates/alpine-notes/dist/` are the brand-specific source. Shared primitives live in `shared/`. Run `npm run build` at the repository root before previewing or exporting. The build combines them into the independent `dist/alpine-notes/` site and ZIP; edit source, not the root generated output. The downloaded ZIP already contains that complete combination.

## Behavior and integration boundary

Save a note explicitly, reload to restore it, and export plain text. Storage is local to this browser and origin. Storage denial has visible feedback and does not prevent text export. Existing scribblit-note storage is preserved. Plus is illustrative; no checkout or sync is connected.

The page content and native navigation work without JavaScript. Enhancement-only controls remain disabled with an explanation. Add a real endpoint only when adapting the template into your own service; update the visible demo language at the same time. Never place API secrets in client-side files.

## Assets and attribution

The hero is original imagery generated with the built-in ChatGPT image tool on 2026-09-09. No extracted reference photographs or raster wordmarks are used in this version. Names, copy, and logos are editable HTML. Fonts are self-hosted with the original notices retained. Historical design inspiration: Naty / DesignGuru01, https://x.com/designguru01/status/2097570950543790295. This collection does not grant rights to that reference or imply affiliation.
