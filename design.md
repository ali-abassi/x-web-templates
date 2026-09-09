# Design authority — 2026-09-09

**User-stated:** Make all four templates visually stronger and easy to reuse; use the built-in ChatGPT image plugin.

## Direction and decisions

**Agent-selected working policy:** System scope: four distinct marketing pages plus a template gallery. Plain semantic HTML, readable CSS, small classic scripts, local assets. Shared accessible primitives are assembled at build time so every exported template is independent. No framework, fonts CDN, remote imagery, or mandatory signup. Source folders are the only editable authority; generated preview and ZIPs come from the same files.

Three possible overall directions were considered: preserve dense reference boards; make all four conventional SaaS pages; or give each identity its own editorial narrative and working demo. The third wins because the collection must offer genuinely different reusable starts. The original brand boards remain historical references, not runtime layout constraints.

## Visual theses and typography

- Alpine Notes: for people capturing a thought, a quiet alpine field journal gives the page air and makes the notebook the destination. Pale blue, ink typography, a large mountain photograph, and a single useful note surface. Choose Nimbus Sans regular with tight display tracking and quiet UI; reject Nimbus Roman (too literary for a utility) and DejaVu bold (too loud). Available real regular and bold files, Nimbus license retained.
- Rainbow Venture: for early builders seeking a collaborator, a printed editorial prospectus makes the thesis clear before an introduction. Ivory, ink, sharp rules, large Nimbus Roman regular headings, Nimbus Sans body, one optical-glass image as the signature. Reject all-sans neutrality and a bold geometric face because the voice should read as an essay, not a pitch deck.
- Bloop: for a small creative studio, a summer field trip makes curiosity tangible. Acid lime, forest ink, monumental DejaVu Sans bold wordmark, Nimbus Sans reading text, ginkgo photography, open project compositions. Reject serif formality and light sans restraint because the voice is playful and physical. Fonts are verified local DejaVu Sans Bold and Nimbus Sans Regular/Bold; licenses retained.
- Furion: for a performance-led brand, a black-and-white sports editorial puts movement and intention first. Oversized Nimbus Sans bold uppercase, uncompromising black/white, sharp rectangular framing, a generated runner photograph and readable editorial chapters. Reject decorative serif and rounded DejaVu because the identity needs direct momentum.
- Gallery: an editorial index with four large visual covers and explicit preview/download actions. Quiet Nimbus Sans, warm paper, thin rules. The covers carry color; navigation stays neutral.

## Shared ten-lever system

Register: marketing/editorial, medium density, meaningful demo controls in their own functional regions. Composition: 1280px maximum, 56–80px desktop gutters and 20px mobile; section gaps 96px desktop / 64px mobile. At 720px split layouts stack with copy before images; cards become one column. Type: desktop display 72–112px, mobile 44–60px, body 17–19px, labels 12–14px; no fake weights. Palette: per-brand canvas/action roles; primary text contrast at least 4.5:1; decorative image colors never carry required meaning. Rhythm: 4px base with 8/12/16/24/32/48/64/96 spacing. Shape: square by default, 12px for Alpine note surfaces, pill for compact filter controls only. Elevation: surface contrast and hairline rules; one restrained shadow for Alpine's notebook. Imagery: four original built-in-generator assets, text-free, optimized JPEGs, explicit aspect ratios and lazy secondary images. Icons: deterministic text or SVG, no emoji decoration. Components: one dominant action per section, native details and form controls, 44px minimum interactive height. Motion: 160ms color/transform feedback only, reduced-motion removes all optional transitions and smooth scrolling.

## Reference ledger

- https://www.cosmos.so/ — observed live at 1440px, evidence `evidence/redesign/references/cosmos.png`: dark compact navigation and two-line sans heading centered in a large light field. The empty space isolates the action; source style export at https://styles.refero.design/style/eb804e3a-1b75-446c-8374-114bbabaf0cd reports a 1280px container and 80px section rhythm. Use scarce action emphasis; avoid excessive first-screen emptiness. Depart with an asymmetric mountain hero and an immediately editable local note, rather than an account CTA or imagery discovery grid.
- https://steep.app/ — observed live at 1440px, evidence `evidence/redesign/references/steep.png`: monumental serif heading, quiet sans utility navigation, centered primary action, loose surrounding UI fragments. Serif/sans contrast gives editorial character; implementation inference: large display sizing and low line-height. Use role contrast for Rainbow; avoid scattered decorative UI and gradient haze. Depart with a strict split print grid and local introduction export, rather than centered analytics copy and floating cards.
- Existing Bloop and Furion renders in `evidence/redesign/baseline/`: green organic imagery and monochrome sport photography establish identity. Use palette and subject matter; reject tiny nested boards and repeated blurry crops. Depart with full-width narrative sections and usable project/editorial disclosures rather than decorative thumbnails.

## Invariants and anti-rules

Keep names consistent, all copy editable, and generated images separate. No fabricated investor metrics, testimonials, clients, checkout, sync, or real submission claims. Show local-only behavior beside the relevant controls. Remove unused assets and stale output. Keep forms and copy legible at 375px, hard floor 320px. Never hide overflow to conceal layout defects. No motion required to reveal content; no parallax, automatic carousels, or scroll-lock. Native site content remains readable with JavaScript disabled; enhancement-only controls explain their dependency.

## Review boundary

**User-stated policy precedence:** direct execution and active-agent self-review apply; no delegation is authorized by a skill. The System harness's independent-agent lanes are therefore unavailable. Run page-specific and shared critical self-review passes, record this honestly, and do not claim independent-agent certification or calibrated visual scores. The user explicitly selected native image generation instead of the Muse evaluated workflow; direct visual inspection replaces its numerical judge, with no Muse-calibration claim.
