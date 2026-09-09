# X Web Templates

Four editable reconstructions of the supplied design references, with ChatGPT-generated main photography. Plain HTML, CSS, and JavaScript. Local fonts. No runtime dependencies or API keys.

| Template | Direction | Working interactions |
| --- | --- | --- |
| [Alpine Notes](templates/alpine-notes/) | Blue mountain product page | Local note save, reload, export, paper colors |
| [Rainbow Venture](templates/rainbow-venture/) | White venture page with rainbow racing | Native FAQ, validated introduction draft download |
| [Bloop](templates/bloop/) | Six-panel lime identity board | Native template disclosure, brand-notes download |
| [Furion](templates/furion/) | Six-panel monochrome identity board | Native template disclosure, brand-notes download |

## Preview the collection

Install Python 3.9+ and Node.js (Node is used for npm shortcuts and JavaScript syntax checks), then:

```sh
npm run dev
```

Open http://localhost:4173. No `npm install` is needed. The preview binds to your own computer, not the network.

Without npm:

```sh
python3 scripts/build.py
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

## Use one template

Download an individual ZIP from the gallery or this repository:

- [Alpine Notes ZIP](dist/downloads/alpine-notes.zip)
- [Rainbow Venture ZIP](dist/downloads/rainbow-venture.zip)
- [Bloop ZIP](dist/downloads/bloop.zip)
- [Furion ZIP](dist/downloads/furion.zip)

Unzip it, open `dist/index.html`, and edit its files. For predictable local storage and download behavior, serve the downloaded `dist` folder using Python's static server. Each ZIP includes all required CSS, JavaScript, images, fonts, a customization guide, and font licenses. You can host its `dist` folder on any static host.

## Edit the collection

`templates/<name>/dist/` is the editable brand-specific source. `shared/base.css` and `shared/ui.js` hold the common accessibility and interaction primitives. `gallery/` is the gallery source. Edit these, then run:

```sh
npm run build
npm run check
```

The build combines shared and brand-specific files into `dist/<name>/` and produces deterministic ZIPs from the exact same output. **Do not edit the root `dist/` output directly.** Rebuilding refreshes it and removes stale generated files. All operations are rooted at this repository, not your shell's current directory.

Start customization with:

1. The title, description, brand name, and body copy in `index.html`.
2. Color roles in the brand stylesheet's `:root` block.
3. the named photographs under `assets/` and its alt text; keep the intended crop and image dimensions.
4. Section links and demo wording. Connect a real backend only if your product needs it.

## Honest demo boundaries

Alpine stores one note on this browser/origin using the original `scribblit-note` key, so existing demo notes survive the redesign. Saving is explicit. Export remains available if storage is denied. It does not sync notes or provide the example plan features.

Bird generates a local application text draft with required/email and whitespace validation. Nothing is submitted. The form is disabled with an explanation without JavaScript. Metrics and portfolio names are illustrative.

Bloop and Furion are identity boards. Their template disclosures and brand-note downloads work without JavaScript.

## Validation and provenance

`npm run check` verifies all five pages, local links and anchors, image dimensions/alt attributes, JavaScript syntax, and exact ZIP-to-preview parity. Current side-by-side visual comparisons, mobile and interaction evidence are in [reference-match evidence](evidence/reference-match/). The earlier `evidence/redesign` describes a rejected interpretation and does not approve this candidate.

The original imported source is retained at `8db60a8`. Ten replacement photographs were generated with native ChatGPT imagegen. Source paths and provenance are in `evidence/reference-match/generated-assets.json`. Bird retains one small reference study crop; Furion retains two small crops and its raster wordmark. These retained assets carry no new license: replace them or obtain rights before commercial reuse. Fonts include license notices. Exact proprietary fonts and identical photography are not claimed.

Original ChatGPT Site source: `2041d91ef089c77106c542fe5c7fa5290307759b`. Historical inspiration: [Naty / DesignGuru01](https://x.com/designguru01/status/2097570950543790295). The original hosted Site and separate Aster repository are unchanged.
