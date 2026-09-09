# Interface design contract

Project: X Web Templates
Artifact/register: Five static marketing/editorial web surfaces
Audience and usage context: Ali and future template users selecting and customizing a visual starting point
Design argument / generative thesis / taste read: Four distinct authored identities; readable working demos and portable exports
Approved references + qualities to borrow: Cosmos: scarce action emphasis; Steep: editorial type contrast; original identities: palette and subject
Anti-references + failures to avoid: Compressed brand boards, fake proof, unreadable captions, identical SaaS grids
Source list / artifact manifest: ./design.md; ./intent.md; ./templates/; ./evidence/redesign/references/
Direction decision (use / avoid / prove): use: brand-specific typography and fresh photography; avoid: copied raster logos and fake metrics; prove: readable responsive pages and local actions
Fixed constraints: Plain HTML/CSS/JS; standalone exports; local fonts; no outgoing messages or backend
Non-goals: Hosted service deployment, account systems, real checkout or contact submission
Shared type / spacing / color / shape / imagery / motion rules: Roles and brand palettes in design.md; 4px rhythm; 44px targets; generated text-free photos; reduced motion
Shared interaction and feedback rules: Native controls; persistent inline feedback; no-JS disclosure; recoverable failures
Default viewport: 1440×1000
Minimum viewport: 375×812; overflow safety at 320×812
Handoff path: surface-matrix.md
Evidence directory: evidence/redesign
Locked checks version / date: v1 / 2026-09-09
Required reviewer assignments: Active agent page-specific critical self-review and separate shared consistency pass per user direct-execution policy; independent-agent lanes unavailable

## Surface: Alpine Notes /alpine-notes/

- **Register and usage moment:** Marketing/editorial, first visit and hands-on preview
- **Primary user job:** Capture a thought, save it locally, and download it
- **Observable successful outcome:** Open notebook → type → save → reload → export
- **Entry / exit:** Gallery or direct route; section links and browser back
- **Critical information, ordered:** Identity, specific promise, primary action, useful details, demo boundary
- **Primary actions:** Open notebook → type → save → reload → export
- **Secondary actions:** Section navigation and native disclosures
- **Composition and hierarchy:** Mountains, one notebook, concise benefits and honest demo pricing
- **Interaction and feedback rules:** Named native controls, keyboard operation, visible focus and honest local feedback
- **Normal state:** Fresh page with representative authored content
- **Empty state:** Long note of 10000 characters; empty saved note; blocked localStorage
- **Long / maximum-content state:** Long note of 10000 characters; empty saved note; blocked localStorage
- **Loading state:** Static content visible immediately; image aspect ratio reserved; no hidden reveal
- **Error / degraded / disabled state:** Long note of 10000 characters; empty saved note; blocked localStorage
- **Default viewport:** 1440×1000
- **Minimum viewport:** 375×812 and 320px overflow probe
- **Representative content:** Mountains, one notebook, concise benefits and honest demo pricing; Long note of 10000 characters; empty saved note; blocked localStorage
- **Surface-specific anti-slop risks:** Generic equal cards, illegible small labels, unrelated decorative controls
- **Acceptance checks:**
  - `S1-C1` — Primary job and identity are readable without overlap | normal | both viewports | screenshot and visual inspection
  - `S1-C2` — Primary journey completes and reports the actual result | Open notebook → type → save → reload → export | both viewports | browser interaction and persisted/download evidence
  - `S1-C3` — Adverse content stays readable and failure gives a recovery path | Long note of 10000 characters; empty saved note; blocked localStorage | both viewports | fixture screenshot and browser assertions
- **Explicit failure conditions:**
  1. Page overflow or unreadable primary text.
  2. Promised control fails or reports an effect that did not happen.
  3. Missing export files, broken local assets, or lost note text.
- **Evidence:** capture after implementation.


- **normal @ default:** `final/alpine-notes-1440-full.png`
- **long/maximum @ default:** `journeys/alpine-1440-maximum.png`
- **empty/degraded @ default:** `no-js/alpine-notes-1440.png`
- **normal @ minimum:** `final/alpine-notes-375-full.png`
- **interaction before/after or recording:** `journeys/trace.jsonl`
- F1 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F2 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F3 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F4 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F5 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F6 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F7 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F8 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F9 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F10 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F11 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- F12 — PASS — `review.md`; `final/alpine-notes-375-full.png`
- S1-C1 — PASS — `review.md`; `run-manifest.json`
- S1-C2 — PASS — `review.md`; `run-manifest.json`
- S1-C3 — PASS — `review.md`; `run-manifest.json`
- **Independent reviewer:** none
- **Verdict:** Pass
## Surface: Rainbow Venture /rainbow-venture/

- **Register and usage moment:** Marketing/editorial, first visit and hands-on preview
- **Primary user job:** Understand the thesis and download an introduction draft
- **Observable successful outcome:** Read thesis → FAQ → fill introduction → download text
- **Entry / exit:** Gallery or direct route; section links and browser back
- **Critical information, ordered:** Identity, specific promise, primary action, useful details, demo boundary
- **Primary actions:** Read thesis → FAQ → fill introduction → download text
- **Secondary actions:** Section navigation and native disclosures
- **Composition and hierarchy:** Editorial split hero, numbered approach rows, FAQ, introduction form
- **Interaction and feedback rules:** Named native controls, keyboard operation, visible focus and honest local feedback
- **Normal state:** Fresh page with representative authored content
- **Empty state:** Empty and invalid form; 1500-character idea; no JavaScript
- **Long / maximum-content state:** Empty and invalid form; 1500-character idea; no JavaScript
- **Loading state:** Static content visible immediately; image aspect ratio reserved; no hidden reveal
- **Error / degraded / disabled state:** Empty and invalid form; 1500-character idea; no JavaScript
- **Default viewport:** 1440×1000
- **Minimum viewport:** 375×812 and 320px overflow probe
- **Representative content:** Editorial split hero, numbered approach rows, FAQ, introduction form; Empty and invalid form; 1500-character idea; no JavaScript
- **Surface-specific anti-slop risks:** Generic equal cards, illegible small labels, unrelated decorative controls
- **Acceptance checks:**
  - `S2-C1` — Primary job and identity are readable without overlap | normal | both viewports | screenshot and visual inspection
  - `S2-C2` — Primary journey completes and reports the actual result | Read thesis → FAQ → fill introduction → download text | both viewports | browser interaction and persisted/download evidence
  - `S2-C3` — Adverse content stays readable and failure gives a recovery path | Empty and invalid form; 1500-character idea; no JavaScript | both viewports | fixture screenshot and browser assertions
- **Explicit failure conditions:**
  1. Page overflow or unreadable primary text.
  2. Promised control fails or reports an effect that did not happen.
  3. Missing export files, broken local assets, or lost note text.
- **Evidence:** capture after implementation.


- **normal @ default:** `final/rainbow-venture-1440-full.png`
- **long/maximum @ default:** `journeys/rainbow-venture-1440-maximum.png`
- **empty/degraded @ default:** `no-js/rainbow-venture-1440.png`
- **normal @ minimum:** `final/rainbow-venture-375-full.png`
- **interaction before/after or recording:** `journeys/trace.jsonl`
- F1 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F2 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F3 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F4 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F5 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F6 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F7 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F8 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F9 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F10 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F11 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- F12 — PASS — `review.md`; `final/rainbow-venture-375-full.png`
- S2-C1 — PASS — `review.md`; `run-manifest.json`
- S2-C2 — PASS — `review.md`; `run-manifest.json`
- S2-C3 — PASS — `review.md`; `run-manifest.json`
- **Independent reviewer:** none
- **Verdict:** Pass
## Surface: Bloop /bloop/

- **Register and usage moment:** Marketing/editorial, first visit and hands-on preview
- **Primary user job:** Explore concept work and prepare a project inquiry
- **Observable successful outcome:** Filter projects → open project details → fill inquiry → download
- **Entry / exit:** Gallery or direct route; section links and browser back
- **Critical information, ordered:** Identity, specific promise, primary action, useful details, demo boundary
- **Primary actions:** Filter projects → open project details → fill inquiry → download
- **Secondary actions:** Section navigation and native disclosures
- **Composition and hierarchy:** Monumental green typography, nature hero, generous project cards
- **Interaction and feedback rules:** Named native controls, keyboard operation, visible focus and honest local feedback
- **Normal state:** Fresh page with representative authored content
- **Empty state:** Long project labels; no matching filter fixture; disabled JavaScript
- **Long / maximum-content state:** Long project labels; no matching filter fixture; disabled JavaScript
- **Loading state:** Static content visible immediately; image aspect ratio reserved; no hidden reveal
- **Error / degraded / disabled state:** Long project labels; no matching filter fixture; disabled JavaScript
- **Default viewport:** 1440×1000
- **Minimum viewport:** 375×812 and 320px overflow probe
- **Representative content:** Monumental green typography, nature hero, generous project cards; Long project labels; no matching filter fixture; disabled JavaScript
- **Surface-specific anti-slop risks:** Generic equal cards, illegible small labels, unrelated decorative controls
- **Acceptance checks:**
  - `S3-C1` — Primary job and identity are readable without overlap | normal | both viewports | screenshot and visual inspection
  - `S3-C2` — Primary journey completes and reports the actual result | Filter projects → open project details → fill inquiry → download | both viewports | browser interaction and persisted/download evidence
  - `S3-C3` — Adverse content stays readable and failure gives a recovery path | Long project labels; no matching filter fixture; disabled JavaScript | both viewports | fixture screenshot and browser assertions
- **Explicit failure conditions:**
  1. Page overflow or unreadable primary text.
  2. Promised control fails or reports an effect that did not happen.
  3. Missing export files, broken local assets, or lost note text.
- **Evidence:** capture after implementation.


- **normal @ default:** `final/bloop-1440-full.png`
- **long/maximum @ default:** `adverse/bloop-1440-long-title.png`
- **empty/degraded @ default:** `no-js/bloop-1440.png`
- **normal @ minimum:** `final/bloop-375-full.png`
- **interaction before/after or recording:** `journeys/trace.jsonl`
- F1 — PASS — `review.md`; `final/bloop-375-full.png`
- F2 — PASS — `review.md`; `final/bloop-375-full.png`
- F3 — PASS — `review.md`; `final/bloop-375-full.png`
- F4 — PASS — `review.md`; `final/bloop-375-full.png`
- F5 — PASS — `review.md`; `final/bloop-375-full.png`
- F6 — PASS — `review.md`; `final/bloop-375-full.png`
- F7 — PASS — `review.md`; `final/bloop-375-full.png`
- F8 — PASS — `review.md`; `final/bloop-375-full.png`
- F9 — PASS — `review.md`; `final/bloop-375-full.png`
- F10 — PASS — `review.md`; `final/bloop-375-full.png`
- F11 — PASS — `review.md`; `final/bloop-375-full.png`
- F12 — PASS — `review.md`; `final/bloop-375-full.png`
- S3-C1 — PASS — `review.md`; `run-manifest.json`
- S3-C2 — PASS — `review.md`; `run-manifest.json`
- S3-C3 — PASS — `review.md`; `run-manifest.json`
- **Independent reviewer:** none
- **Verdict:** Pass
## Surface: Furion /furion/

- **Register and usage moment:** Marketing/editorial, first visit and hands-on preview
- **Primary user job:** Explore the performance editorial and download the brand notes
- **Observable successful outcome:** Browse chapters → expand story → download brand notes
- **Entry / exit:** Gallery or direct route; section links and browser back
- **Critical information, ordered:** Identity, specific promise, primary action, useful details, demo boundary
- **Primary actions:** Browse chapters → expand story → download brand notes
- **Secondary actions:** Section navigation and native disclosures
- **Composition and hierarchy:** Monochrome hero, oversized type, editorial bands and native disclosure
- **Interaction and feedback rules:** Named native controls, keyboard operation, visible focus and honest local feedback
- **Normal state:** Fresh page with representative authored content
- **Empty state:** Long article; missing image fixture; no JavaScript
- **Long / maximum-content state:** Long article; missing image fixture; no JavaScript
- **Loading state:** Static content visible immediately; image aspect ratio reserved; no hidden reveal
- **Error / degraded / disabled state:** Long article; missing image fixture; no JavaScript
- **Default viewport:** 1440×1000
- **Minimum viewport:** 375×812 and 320px overflow probe
- **Representative content:** Monochrome hero, oversized type, editorial bands and native disclosure; Long article; missing image fixture; no JavaScript
- **Surface-specific anti-slop risks:** Generic equal cards, illegible small labels, unrelated decorative controls
- **Acceptance checks:**
  - `S4-C1` — Primary job and identity are readable without overlap | normal | both viewports | screenshot and visual inspection
  - `S4-C2` — Primary journey completes and reports the actual result | Browse chapters → expand story → download brand notes | both viewports | browser interaction and persisted/download evidence
  - `S4-C3` — Adverse content stays readable and failure gives a recovery path | Long article; missing image fixture; no JavaScript | both viewports | fixture screenshot and browser assertions
- **Explicit failure conditions:**
  1. Page overflow or unreadable primary text.
  2. Promised control fails or reports an effect that did not happen.
  3. Missing export files, broken local assets, or lost note text.
- **Evidence:** capture after implementation.


- **normal @ default:** `final/furion-1440-full.png`
- **long/maximum @ default:** `journeys/furion-1440-maximum.png`
- **empty/degraded @ default:** `no-js/furion-1440.png`
- **normal @ minimum:** `final/furion-375-full.png`
- **interaction before/after or recording:** `journeys/trace.jsonl`
- F1 — PASS — `review.md`; `final/furion-375-full.png`
- F2 — PASS — `review.md`; `final/furion-375-full.png`
- F3 — PASS — `review.md`; `final/furion-375-full.png`
- F4 — PASS — `review.md`; `final/furion-375-full.png`
- F5 — PASS — `review.md`; `final/furion-375-full.png`
- F6 — PASS — `review.md`; `final/furion-375-full.png`
- F7 — PASS — `review.md`; `final/furion-375-full.png`
- F8 — PASS — `review.md`; `final/furion-375-full.png`
- F9 — PASS — `review.md`; `final/furion-375-full.png`
- F10 — PASS — `review.md`; `final/furion-375-full.png`
- F11 — PASS — `review.md`; `final/furion-375-full.png`
- F12 — PASS — `review.md`; `final/furion-375-full.png`
- S4-C1 — PASS — `review.md`; `run-manifest.json`
- S4-C2 — PASS — `review.md`; `run-manifest.json`
- S4-C3 — PASS — `review.md`; `run-manifest.json`
- **Independent reviewer:** none
- **Verdict:** Pass
## Surface: Gallery /

- **Register and usage moment:** Marketing/editorial, first visit and hands-on preview
- **Primary user job:** Choose a template and get a working standalone ZIP
- **Observable successful outcome:** Preview a template → return → download ZIP
- **Entry / exit:** Gallery or direct route; section links and browser back
- **Critical information, ordered:** Identity, specific promise, primary action, useful details, demo boundary
- **Primary actions:** Preview a template → return → download ZIP
- **Secondary actions:** Section navigation and native disclosures
- **Composition and hierarchy:** Four large distinct covers with clearly separated preview/download links
- **Interaction and feedback rules:** Named native controls, keyboard operation, visible focus and honest local feedback
- **Normal state:** Fresh page with representative authored content
- **Empty state:** Long titles; missing cover fixture; no JavaScript
- **Long / maximum-content state:** Long titles; missing cover fixture; no JavaScript
- **Loading state:** Static content visible immediately; image aspect ratio reserved; no hidden reveal
- **Error / degraded / disabled state:** Long titles; missing cover fixture; no JavaScript
- **Default viewport:** 1440×1000
- **Minimum viewport:** 375×812 and 320px overflow probe
- **Representative content:** Four large distinct covers with clearly separated preview/download links; Long titles; missing cover fixture; no JavaScript
- **Surface-specific anti-slop risks:** Generic equal cards, illegible small labels, unrelated decorative controls
- **Acceptance checks:**
  - `S5-C1` — Primary job and identity are readable without overlap | normal | both viewports | screenshot and visual inspection
  - `S5-C2` — Primary journey completes and reports the actual result | Preview a template → return → download ZIP | both viewports | browser interaction and persisted/download evidence
  - `S5-C3` — Adverse content stays readable and failure gives a recovery path | Long titles; missing cover fixture; no JavaScript | both viewports | fixture screenshot and browser assertions
- **Explicit failure conditions:**
  1. Page overflow or unreadable primary text.
  2. Promised control fails or reports an effect that did not happen.
  3. Missing export files, broken local assets, or lost note text.
- **Evidence:** capture after implementation.

- **normal @ default:** `final/gallery-1440-full.png`
- **long/maximum @ default:** `adverse/gallery-1440-degraded.png`
- **empty/degraded @ default:** `no-js/gallery-1440.png`
- **normal @ minimum:** `final/gallery-375-full.png`
- **interaction before/after or recording:** `exports/trace.jsonl`
- F1 — PASS — `review.md`; `final/gallery-375-full.png`
- F2 — PASS — `review.md`; `final/gallery-375-full.png`
- F3 — PASS — `review.md`; `final/gallery-375-full.png`
- F4 — PASS — `review.md`; `final/gallery-375-full.png`
- F5 — PASS — `review.md`; `final/gallery-375-full.png`
- F6 — PASS — `review.md`; `final/gallery-375-full.png`
- F7 — PASS — `review.md`; `final/gallery-375-full.png`
- F8 — PASS — `review.md`; `final/gallery-375-full.png`
- F9 — PASS — `review.md`; `final/gallery-375-full.png`
- F10 — PASS — `review.md`; `final/gallery-375-full.png`
- F11 — PASS — `review.md`; `final/gallery-375-full.png`
- F12 — PASS — `review.md`; `final/gallery-375-full.png`
- S5-C1 — PASS — `review.md`; `run-manifest.json`
- S5-C2 — PASS — `review.md`; `run-manifest.json`
- S5-C3 — PASS — `review.md`; `run-manifest.json`
- **Independent reviewer:** none
- **Verdict:** Pass

## Completion packet

- **Final surface inventory:** Alpine Notes, Rainbow Venture, Bloop, Furion, Gallery
- **Reviewer verdicts:** Active-agent self-review in `review.md`
- **Unresolved unknowns / risks:** Independent non-implementer lanes unavailable under explicit direct-execution policy; no independent certification.
- **Check-change log:** Frozen criteria unchanged; result packet is separate.
- **Final decision:** Pass
