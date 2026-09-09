# X Web Templates

Four complete, editable website starting points with original ChatGPT-generated imagery. Plain HTML, CSS, and JavaScript. Local fonts. No runtime dependencies or API keys.

| Template | Direction | Working interactions |
| --- | --- | --- |
| [Alpine Notes](templates/alpine-notes/) | Calm product / SaaS | Local note save, reload, export, billing toggle |
| [Rainbow Venture](templates/rainbow-venture/) | Editorial venture studio | Native FAQ, validated introduction draft download |
| [Bloop](templates/bloop/) | Playful creative studio | Project filters, case-study disclosures, inquiry draft download |
| [Furion](templates/furion/) | Monochrome performance editorial | Keyboard-accessible chapters, brand-notes download |

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
3. `assets/hero.jpg` and its alt text; keep the intended crop and image dimensions.
4. Section links and demo wording. Connect a real backend only if your product needs it.

## Honest demo boundaries

Alpine stores one note on this browser/origin using the original `scribblit-note` key, so existing demo notes survive the redesign. Saving is explicit. Export remains available if storage is denied. It does not sync notes or provide the example Plus features.

Rainbow and Bloop generate local text drafts. They never email or submit the contents. Native validation checks required fields and email format; JavaScript also rejects whitespace-only input. Their forms stay disabled with an explanation when JavaScript is unavailable. Bloop's work is labelled as concept projects, not real clients.

Furion is a performance editorial concept, not a store or training service. Its journal and brand-note download work without JavaScript.

## Validation and provenance

`npm run check` verifies all five pages, local links and anchors, image dimensions/alt attributes, JavaScript syntax, and exact ZIP-to-preview parity. Browser evidence and the scope of visual, interaction, accessibility, and adverse-state checks live in [the redesign evidence](evidence/redesign/). Those checks do not certify an unconnected production backend.

The original imported source is retained in Git history at `8db60a8`. The redesigned hero images were generated with the built-in ChatGPT image generator. [Prompts](evidence/redesign/images/prompts.json) and original outputs are preserved. Previous reference-extracted photographs and raster wordmarks are no longer used. Font license notices remain with each template; generated imagery is not a license to the historical design references.

Original ChatGPT Site source: `2041d91ef089c77106c542fe5c7fa5290307759b`. Historical inspiration: [Naty / DesignGuru01](https://x.com/designguru01/status/2097570950543790295). The original hosted Site and separate Aster repository are unchanged.
