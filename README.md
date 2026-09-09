# X Web Templates

Eight reusable templates: reference-led reconstructions and your original Aster import. Original ChatGPT-generated artwork, editable HTML/CSS/JavaScript, and local fonts. No runtime dependencies or API keys.

| Template | Direction | Working interactions |
| --- | --- | --- |
| [Alpine Notes](templates/alpine-notes/) | Blue mountain product page | Local note save, reload, export, paper colors |
| [Rainbow Venture](templates/rainbow-venture/) | White venture page with rainbow racing | Native FAQ, validated introduction draft download |
| [Bloop](templates/bloop/) | Six-panel lime identity board | Native template disclosure, brand-notes download |
| [Furion](templates/furion/) | Six-panel monochrome identity board | Native template disclosure, brand-notes download |
| [Aster](templates/aster/) | Layered observatory learning-product page | Original parallax, mobile menu, FAQs, choice controls |
| [HorizonX](templates/horizonx/) | Navy and gold cosmic landing page | Pauseable scene, section navigation, native disclosures |
| [BuzzKit](templates/buzzkit/) | Notification-platform page | Four dashboard views, keyboard navigation, pause, preferences, FAQs |
| [Pixel World](templates/pixel-world/) | Illustrated developer portfolio | Layered scene, portfolio links, validated local contact-draft download |

## Original designs and credits

The original four designs come from **[Naty / @DesignGuru01 — original X post](https://x.com/DesignGuru01/status/2097570950543790295)**. This collection reconstructs those references; it is not affiliated with their creator.

- **Aster:** Ali's [original Aster template repository](https://github.com/ali-abassi/aster-landing-page-template), imported with its MIT license. Its documented visual reference is [Unive](https://unive.ai/).
- **HorizonX reference:** [Viktor Oddy / @viktoroddy — original post](https://x.com/viktoroddy/status/2097500666357072243).
- **BuzzKit reference:** [Christo / @chroxify — original post](https://x.com/chroxify/status/2097477196130529296).
- **Pixel-world reference:** [Varun / @orseliyas — original post](https://x.com/orseliyas/status/2097307376143773730).

Each reconstruction credits its source. Aster is an unchanged import; the three new templates use independent code and locally packaged assets.

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
- [Aster ZIP](dist/downloads/aster.zip)
- [HorizonX ZIP](dist/downloads/horizonx.zip)
- [BuzzKit ZIP](dist/downloads/buzzkit.zip)
- [Pixel World ZIP](dist/downloads/pixel-world.zip)

Unzip it, open `dist/index.html`, and edit its files. For predictable local storage and download behavior, serve the downloaded `dist` folder using Python's static server. Each ZIP includes all required CSS, JavaScript, images, fonts, a customization guide, and font licenses. You can host its `dist` folder on any static host.

## Edit the collection

`templates/<name>/dist/` is the editable brand-specific source. `shared/base.css` and `shared/ui.js` hold the common accessibility and interaction primitives. `gallery/` is the gallery source. Edit these, then run:

```sh
npm run build
npm run check
```

The build combines shared files for the original four templates, preserves the independent Aster/HorizonX/BuzzKit/Pixel World files, writes `dist/<name>/`, and produces deterministic ZIPs from the exact same output. **Do not edit the root `dist/` output directly.** Rebuilding refreshes it and removes stale generated files. All operations are rooted at this repository, not your shell's current directory.

Start customization with:

1. The title, description, brand name, and body copy in `index.html`.
2. Color roles in the brand stylesheet's `:root` block.
3. the named photographs under `assets/` and its alt text; keep the intended crop and image dimensions.
4. Section links and demo wording. Connect a real backend only if your product needs it.

## Honest demo boundaries

Alpine stores one note on this browser/origin using the original `scribblit-note` key, so existing demo notes survive the redesign. Saving is explicit. Export remains available if storage is denied. It does not sync notes or provide the example plan features.

Bird generates a local application text draft with required/email and whitespace validation. Nothing is submitted. The form is disabled with an explanation without JavaScript. Metrics and portfolio names are illustrative.

Bloop and Furion are identity boards. Their template disclosures and brand-note downloads work without JavaScript.

Aster preserves the original source and MIT license from your separate repository. Its animated reveals require JavaScript unless reduced motion is enabled. Product reviews, metrics and features are illustrative.

HorizonX is a two-section reconstruction with generated space artwork and a separate ship layer. Its lower disclosures are editable local template information.

BuzzKit is an independent design reconstruction, not the notification backend. Dashboard controls inside the preview are illustrative; the four scene selectors, pause, preference switches, copy prompt, FAQs and links work. Preference changes are local to the current page. Docs and pricing links go to the original project.

Pixel World preserves the source portfolio’s layout and links to Varun’s reference projects; they are not Ali’s work. Its contact form downloads a local draft without sending anything. Replace names, projects and contact behavior before publishing your own portfolio.

## Validation and provenance

`npm run check` verifies every generated page, local links and anchors, image dimensions/alt attributes, JavaScript syntax, and exact ZIP-to-preview parity. The original four’s comparisons are in [reference-match evidence](evidence/reference-match/). The additions, source snapshots, image prompts, video-analysis receipts and browser checks are in [collection-expansion evidence](evidence/collection-expansion/). The earlier `evidence/redesign` describes a rejected interpretation and does not approve this candidate.

The original imported source is retained at `8db60a8`. Ten replacement photographs for the original four and five new scene layers were generated with native ChatGPT imagegen. Provenance for the original four is in `evidence/reference-match/generated-assets.json`; new image prompts and usage are in `evidence/collection-expansion/`. Bird retains one small reference study crop; Furion retains two small crops and its raster wordmark. These retained assets carry no new license: replace them or obtain rights before commercial reuse. Fonts include license notices. Exact proprietary fonts and identical photography are not claimed.

Original ChatGPT Site source: `2041d91ef089c77106c542fe5c7fa5290307759b`. Historical inspiration: [Naty / DesignGuru01](https://x.com/designguru01/status/2097570950543790295). The original hosted Site and separate Aster repository are unchanged.
