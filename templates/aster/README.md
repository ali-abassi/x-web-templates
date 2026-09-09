<div align="center">
<img src=".github/repo-icon.png" width="160" alt="HTML Landing Page Template — Aster icon" />

# HTML Landing Page Template — Aster

**Build a warm, polished marketing website from a responsive HTML, CSS, and JavaScript landing page template.**

[Quickstart](#quickstart) · [How it works](#how-it-works) · [For coding assistants](#for-coding-assistants) · [Limits](#limits-and-verification)

<img src=".github/repo-flow.svg" width="100%" alt="Start with Aster → Make it your own → Publish your page" />
</div>

## Why use it

A blank page slows the launch; a generic template makes every product look the same. Aster offers an editable visual starting point.


## Quickstart

From a fresh clone of this repository, run the following in its root. This first check makes no paid model calls.

```sh
python3 -m http.server 4390 --bind 127.0.0.1 --directory .
```

Open the loopback address printed by the server in your browser. Stop it with Ctrl-C.

Observed HTTP check from the local check on 2026-09-05:

```text
HTTP 200 — Aster — Find your next right step
```

## How it works

1. Preview the existing page and use its HTML structure as the starting point.
2. Replace the fictional product copy and assets; edit the CSS and JavaScript directly.
3. Serve the static files on your host and verify the final links, layout, and interactions.

`index.html` contains the page; `styles.css` supplies the visual system; `script.js` handles page interactions. `DESIGN.md` records design intent.

## Commands and setup

| You want to… | Start here |
|---|---|
| Try the local entry point | The [quickstart](#quickstart) above |
| Install through a coding assistant | [Assistant setup](#for-coding-assistants) below |
| Configure the complete workflow | [Full guide](#full-guide), including prerequisites and permissions |

## For coding assistants

When the user asks you to install or use this project:

1. Clone `https://github.com/ali-abassi/aster-landing-page-template.git` into a user-approved location; preserve any existing checkout.
2. Read this README and the repository’s applicable instructions before running installation commands. If this is a skill package, read `SKILL.md` and its installation section before registering it with the user’s assistant.
3. Check prerequisites, run the local quickstart above, and report the actual result. Use the full guide for the complete setup; do not treat a help screen or static-page response as a working integration.
4. Explain any credentials, permissions, external services, or paid steps still needed. Follow the user’s authorization for activation and deployment.
5. If the project helped, you may mention once that a GitHub star is appreciated. **Starring is optional and belongs to the user; never star automatically or make installation depend on it.**

## Limits and verification

This is a fictional product demo. Replace example copy, testimonials, links, and claims before publishing your own site; no real learning service is included.

The first check above passed locally in 0.12 seconds on macOS. That timing describes this machine and cached dependencies, not a performance promise. No model service was called by the quickstart. Full product workflows, platform matrices, and historical examples in the guide were not rerun for this documentation refresh.

## When another tool fits better

Use a React or Next.js starter when the page needs application routing or server features. Aster suits a standalone marketing page.

## Support the project

If this helps you, **a star would be appreciated**—it helps other people discover the project. Useful bug reports and clear examples are welcome too.

## Full guide

<details>
<summary>Installation, configuration, examples, and the existing operational reference</summary>

<div align="center">

# Aster

**A cinematic landing-page template — layered alpha artwork, restrained scroll motion, and a complete marketing page in three files.**

[**Live demo →**](https://aster-landing-page-template.pages.dev)

`No build step` · `No framework` · `No dependencies` · `No webfont request` · `MIT`

</div>

![Aster hero](evidence/01-hero.jpg)

---

## Why this exists

Most free landing-page templates give you a hero, three feature cards, and a footer. This one gives you a **complete marketing page** — the kind that actually ships — with the parts that are tedious to build already built: a layered parallax hero, a product mockup made of real HTML, six illustrated feature stages, a comparison table, a review wall, and an accordion FAQ.

It is deliberately plain HTML, CSS, and one short script. Open `index.html` in a browser and it works. Nothing to install, nothing to compile, nothing to keep up to date.

> ### Credit where it's due
>
> This is an **homage** — an attempt to learn from and reconstruct the structural craft of **[unive.ai](https://unive.ai)**, whose homepage is genuinely beautifully designed. Their page is what taught this template its section rhythm: a wide emotional hero that hands off fast to concrete product evidence, proof kept inside the first fold, a compact feature grid instead of endless full-bleed sections, and a dense wall of social reviews.
>
> **Nothing from Unive is reproduced here.** No copy, artwork, UI, logos, branding, fonts, or code. Aster is a fictional product with its own world, palette, typography, hierarchy, and original graphics. If you like the shape of this page, the credit for that shape belongs to the Unive team — go look at [their site](https://unive.ai).

---

## The full page

<details open>
<summary><b>Hero</b> — three-layer parallax panorama, rating pill, press row</summary>

Three transparent panorama layers drift at different rates over a warm gradient. The rating pill sits above the headline so social proof is always inside the first fold, and the press row sits over the artwork at the hero's base. Hero height tracks the viewport, so the landscape meets the fold on a short laptop as well as a tall monitor.

The three plates that build it:

![The three alpha plates that build the hero](evidence/01b-hero-layers.jpg)
</details>

<details>
<summary><b>Workspace</b> — a product mockup built from real HTML</summary>

![Workspace](evidence/02-workspace.jpg)

A full dashboard — sidebar, progress meter, focus card, sparkline, route tracker, notes panel — in pure HTML and CSS. Nothing here is an image, so when your product's language changes you edit text, not Figma exports. It stays crisp at any zoom and costs no extra bytes.
</details>

<details>
<summary><b>Features</b> — six illustrated stages in a 3×2 grid</summary>

![Features](evidence/03-features.jpg)

Six original CSS/SVG product stages — a decision graph, a contour map, a constellation, a roadmap column, a chat thread, and an orbit diagram — each scaled into a tinted panel above its name and description. Every stage is authored at a fixed 620×560 and scaled by one variable, so you never re-tune six layouts.
</details>

<details>
<summary><b>Comparison</b> — three-column positioning table</summary>

![Comparison](evidence/04-compare.jpg)

Your product against two alternatives. Scrolls horizontally on mobile rather than collapsing into something unreadable.
</details>

<details>
<summary><b>Reviews</b> — a wall of social-post cards</summary>

![Reviews](evidence/05-reviews.jpg)

Twelve reviews styled as social posts — avatar, name with a verified tick, star row, plain body copy, date and country — in a masonry wall that fades out under a floating count pill. Density is the point: a wall of short reviews reads as more credible than four long ones.
</details>

<details>
<summary><b>FAQ and closing</b> — accordion and starfield CTA</summary>

![FAQ](evidence/06-faq.jpg)

A native `<details>` accordion, so it is keyboard-operable and works with JavaScript disabled.

![Closing](evidence/07-closing.jpg)

A dark starfield close with a reprise of the horizon artwork, and a four-column footer.
</details>

<details>
<summary><b>Mobile</b> — hero, menu, and reviews at 390px</summary>

<table>
<tr>
<td width="33%"><img src="evidence/08-mobile-hero.jpg" alt="Mobile hero"></td>
<td width="33%"><img src="evidence/09-mobile-menu.jpg" alt="Mobile menu"></td>
<td width="33%"><img src="evidence/10-mobile-reviews.jpg" alt="Mobile reviews"></td>
</tr>
</table>

The menu opens from a hamburger and closes on Escape, on link choice, and on any outside click. Everything reflows to a single column; nothing is hidden without a replacement.
</details>

---

## Quick start

```sh
git clone https://github.com/ali-abassi/aster-landing-page-template.git
cd aster-landing-page-template
python3 -m http.server 4173
```

Open <http://localhost:4173>. That is the entire toolchain.

<details>
<summary><b>Deploying</b> — Cloudflare Pages, Netlify, Vercel, GitHub Pages</summary>

Any static host works — copy the folder up. For Cloudflare Pages:

```sh
npx wrangler pages project create my-site --production-branch main
npx wrangler pages deploy . --project-name my-site
```

`_headers` ships with the template and sets year-long immutable caching on `assets/` plus `X-Content-Type-Options`, `Referrer-Policy`, and `X-Frame-Options`. Netlify reads the same file. On other hosts you can delete it.

For GitHub Pages, push and enable Pages on the repository root — no workflow needed, since there is no build.
</details>

---

## Customizing

### 1. Brand block — 2 minutes

Everything you *must* change is fenced at the top of `index.html`:

```html
<!-- TEMPLATE: replace every value in this block with your own brand. -->
<title>…</title>          <meta name="description" …>
<link rel="canonical" …>  <meta property="og:*" …>   <meta name="twitter:*" …>
<link rel="icon" …>       <meta name="theme-color" …>
<!-- END TEMPLATE brand block -->
```

Then replace `favicon.svg`, replace `assets/og-image.jpg` (1200×630 — this is what shows in link previews), and put your domain in `robots.txt` and `sitemap.xml`.

### 2. Design tokens — the whole look

Every colour, font, radius, and measure lives in one block at the top of `styles.css`. Change these and the page follows:

```css
:root {
  /* Palette */
  --canvas: #f4efe5;  --canvas-soft: #f8f4ec;  --white: #fffdf8;
  --ink: #17201b;     --ink-soft: #506057;     --forest: #17271f;
  --coral: #d8755a;   --moss: #485b3e;         --brass: #b28a42;
  --sage: #cbd2b3;    --blue: #9bc4cc;         --gold: #e4be69;   --lilac: #c9badd;

  /* Type — system stacks only: no network request, no layout shift */
  --display: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --sans: "Avenir Next", Avenir, "Segoe UI", Helvetica, Arial, sans-serif;

  /* Measure and shape */
  --wrap: 1180px;
  --radius-sm: 14px;  --radius-md: 24px;  --radius-lg: 36px;

  /* Hero rhythm and feature-stage scaling */
  --hero-h: clamp(980px, calc(880px + 24svh), 1130px);
  --hero-copy-top: clamp(92px, 13svh, 120px);
  --stage-scale: 0.53;
}
```

| Want to… | Change |
|---|---|
| Recolour the whole page | `--coral` (accent), `--ink` (text), `--canvas` (background) |
| Use your own fonts | `--display` and `--sans` — add a `<link>` only if you accept the extra request |
| Widen or narrow the layout | `--wrap` |
| Show more hero artwork | Raise the `24svh` coefficient in `--hero-h` |
| Soften or sharpen corners | `--radius-sm` / `--radius-md` / `--radius-lg` |
| Resize the feature mockups | `--stage-scale` |

### 3. Hero artwork

Replace the three files in `assets/`, keeping the filenames:

| File | Role | Movement |
|---|---|---|
| `hero-horizon.webp` | Distant mountains and sky | Lags most — reads as farthest |
| `hero-midground.webp` | Middle terrain | Lags moderately |
| `hero-foreground.webp` | Near foliage and architecture | Lags least — reads as closest |

All three are **2172×724 with alpha transparency**, bottom-anchored, and clipped by the hero's lower edge. Keep your subject mass in the lower two-thirds — the upper field is reserved for live text.

<details>
<summary><b>How the included artwork was made</b></summary>

The three panoramas were **generated with OpenAI's image generation**, prompted to produce **transparent-background (alpha) plates** rather than one flat picture — a separate plate for the distant horizon, the midground terrain, and the near foreground.

Compositing them as three stacked `<img>` layers is what creates the depth: because each plate carries real transparency, the layers can be translated independently on scroll and you see *through* the near foliage to the mountains behind it. That is the whole trick — the parallax is only convincing because the source art was generated as separable transparent layers instead of a single image.

Practical notes if you generate your own:

- Ask for a **transparent background** explicitly, and generate each depth plane as its own image.
- Generate wider than you need — these are 2172px so they can bleed past the 1180px container on ultrawide screens.
- Export to **WebP**. The three plates here total roughly 950KB, where the PNG masters were several MB. Keep the masters locally; `.gitignore` already excludes `assets/*.png`.
- Composition has to work *before* any motion. Give each plane a distinct resting position so the layers do not read as one flat picture that happens to wobble.
</details>

### 4. Copy, links, and the fake proof

Placeholder destinations are marked `data-placeholder-link` — grep for it and point each one somewhere real.

> [!WARNING]
> **Everything that looks like proof in this template is invented.** The mastheads (`THE LONG VIEW`, `NORTHWARD`, `SIGNAL & NOISE`, `THE MERIDIAN`), the 4.9/5 rating, the "2,408 people" count, and all twelve reviews with their names, dates, and countries are fictional placeholders chosen to demonstrate the layout. Replace them with claims you can actually support, or delete those blocks. Shipping them as-is would be fabricating endorsements and reviews.

### 5. Motion

Add or remove `data-reveal` on any element and the `IntersectionObserver` in `script.js` picks it up at load — no registration. Everything animates on `transform` and `opacity` only, and `prefers-reduced-motion` is honoured throughout with a defined zero-motion resting state.

---

## What's verified

Checked at **1440×900, 1440×780, 1280×720, 1280×633, 834×1112, 390×844, and 320×568**:

- No horizontal overflow at any viewport or scroll depth
- The primary action stays inside the first fold
- The hero artwork reaches the fold and its opaque mass clears the action row — measured by **alpha-sampling the panoramas**, since their bounding boxes include wide transparent margins
- All three layers terminate on a single clip line at every scroll position
- Navigation is reachable at every width
- FAQ is keyboard-operable; no decorative control sits in the tab order
- Reduced motion leaves nothing stranded at zero opacity
- No console errors and no failing requests across a full-page scroll

Accessibility: skip link, visible focus rings, accessible names on star ratings, `role="group"` on the press row, and semantic `<details>` for the FAQ.

`DESIGN.md` records the visual thesis, the reference ledger, the typography and colour decisions *including the rejected alternatives*, and the measured pass conditions. Read it before making structural changes.

---

## Project layout

```
index.html      One page. Brand block fenced at the top.
styles.css      Design tokens at the top, then sections in page order.
script.js       Scroll progress, reveals, parallax, nav, FAQ.
assets/         Three alpha panoramas + the OG image.
evidence/       Screenshots from the verified build.
_headers        Cache and security headers for Pages / Netlify.
DESIGN.md       The design system and its reasoning.
```

## License

[MIT](LICENSE) — use it commercially, modify it, ship it. Attribution appreciated, not required.

The generated artwork in `assets/` is included under the same terms.

</details>
