# Interface design contract

Project: X Web Templates
Artifact/register: Five static marketing/editorial web surfaces
Audience and usage context: Ali and future template users selecting and customizing a visual starting point
Design argument / generative thesis / taste read: Reference fidelity to the four exact supplied images; readable working demos and portable exports
Approved references + qualities to borrow: The four original-resolution images in evidence/reference-match/references, mapped explicitly in design.md
Anti-references + failures to avoid: Editorial reinterpretation, mismatched images and fonts, changed section order, fake proof, unreadable captions
Source list / artifact manifest: ./design.md; ./intent.md; ./templates/; ./evidence/redesign/references/
Direction decision (use / avoid / prove): use: reference composition and matching photography; avoid: new design direction; prove: direct equal-width reference comparison
Fixed constraints: Plain HTML/CSS/JS; standalone exports; local fonts; no outgoing messages or backend
Non-goals: Hosted service deployment, account systems, real checkout or contact submission
Shared type / spacing / color / shape / imagery / motion rules: Roles and brand palettes in design.md; 4px rhythm; 44px targets; generated text-free photos; reduced motion
Shared interaction and feedback rules: Native controls; persistent inline feedback; no-JS disclosure; recoverable failures
Default viewport: 1440×1000
Minimum viewport: 375×812; overflow safety at 320×812
Handoff path: surface-matrix.md
Evidence directory: evidence/redesign
Locked checks version / date: v2-reference-match / 2026-09-09
Required reviewer assignments: Active agent page-specific critical self-review and separate shared consistency pass per user direct-execution policy; independent-agent lanes unavailable

## Surface: Scribblit /alpine-notes/

- **Register and usage moment:** Reference-matched static template selection and reuse
- **Primary user job:** Write/save/reload/export a local note
- **Observable successful outcome:** Write/save/reload/export a local note with actual visible result
- **Entry / exit:** Gallery or direct link; native section links and browser back
- **Critical information, ordered:** Centered cyan mountain hero, glass notebook, pastel cards, CTA, detail list, blue plans and footer
- **Primary actions:** Write/save/reload/export a local note
- **Secondary actions:** Native disclosures, navigation and portable downloads
- **Composition and hierarchy:** Centered cyan mountain hero, glass notebook, pastel cards, CTA, detail list, blue plans and footer
- **Interaction and feedback rules:** Named native controls, visible focus, persistent local feedback
- **Normal state:** Complete reference-matched page with authored representative content
- **Empty state:** Empty/10000-character note and storage denial
- **Long / maximum-content state:** Empty/10000-character note and storage denial
- **Loading state:** Static content visible; image dimensions reserved
- **Error / degraded / disabled state:** Empty/10000-character note and storage denial
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812; 320px overflow safety
- **Representative content:** Centered cyan mountain hero, glass notebook, pastel cards, CTA, detail list, blue plans and footer; Empty/10000-character note and storage denial
- **Surface-specific anti-slop risks:** Invented editorial layout; different photographic subject; generic type; hiding small content
- **Acceptance checks:**
  - `M1-C1` — Reference section order, composition, palette and image subjects visibly match | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M1-C2` — Primary journey completes with truthful persisted/downloaded result | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M1-C3` — Maximum and degraded content stays readable; keyboard and reduced-motion work | normal and adverse | both viewports | screenshots, assertions and paired reference review
- **Explicit failure conditions:**
1. Reference composition replaced with a new design.
2. Clipped, unreadable or overflowing primary content.
3. Broken local interaction, false external effect, missing assets or exports.
- **Evidence:** To capture after implementation in evidence/reference-match.

## Surface: Bird /rainbow-venture/

- **Register and usage moment:** Reference-matched static template selection and reuse
- **Primary user job:** Read thesis/FAQ and download a local application draft
- **Observable successful outcome:** Read thesis/FAQ and download a local application draft with actual visible result
- **Entry / exit:** Gallery or direct link; native section links and browser back
- **Critical information, ordered:** Compact white split hero and racing image, image thesis cards, manifesto, steps, rainbow logo, logo grid, FAQ and footer
- **Primary actions:** Read thesis/FAQ and download a local application draft
- **Secondary actions:** Native disclosures, navigation and portable downloads
- **Composition and hierarchy:** Compact white split hero and racing image, image thesis cards, manifesto, steps, rainbow logo, logo grid, FAQ and footer
- **Interaction and feedback rules:** Named native controls, visible focus, persistent local feedback
- **Normal state:** Complete reference-matched page with authored representative content
- **Empty state:** Empty/invalid/1500-character form and JavaScript disabled
- **Long / maximum-content state:** Empty/invalid/1500-character form and JavaScript disabled
- **Loading state:** Static content visible; image dimensions reserved
- **Error / degraded / disabled state:** Empty/invalid/1500-character form and JavaScript disabled
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812; 320px overflow safety
- **Representative content:** Compact white split hero and racing image, image thesis cards, manifesto, steps, rainbow logo, logo grid, FAQ and footer; Empty/invalid/1500-character form and JavaScript disabled
- **Surface-specific anti-slop risks:** Invented editorial layout; different photographic subject; generic type; hiding small content
- **Acceptance checks:**
  - `M2-C1` — Reference section order, composition, palette and image subjects visibly match | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M2-C2` — Primary journey completes with truthful persisted/downloaded result | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M2-C3` — Maximum and degraded content stays readable; keyboard and reduced-motion work | normal and adverse | both viewports | screenshots, assertions and paired reference review
- **Explicit failure conditions:**
1. Reference composition replaced with a new design.
2. Clipped, unreadable or overflowing primary content.
3. Broken local interaction, false external effect, missing assets or exports.
- **Evidence:** To capture after implementation in evidence/reference-match.

## Surface: Bloop /bloop/

- **Register and usage moment:** Reference-matched static template selection and reuse
- **Primary user job:** Inspect six identity panels, read the story and download brand notes
- **Observable successful outcome:** Inspect six identity panels, read the story and download brand notes with actual visible result
- **Entry / exit:** Gallery or direct link; native section links and browser back
- **Critical information, ordered:** Six 2:1 brand panels in reference order, outlined logo, lime and teal nature
- **Primary actions:** Inspect six identity panels, read the story and download brand notes
- **Secondary actions:** Native disclosures, navigation and portable downloads
- **Composition and hierarchy:** Six 2:1 brand panels in reference order, outlined logo, lime and teal nature
- **Interaction and feedback rules:** Named native controls, visible focus, persistent local feedback
- **Normal state:** Complete reference-matched page with authored representative content
- **Empty state:** Long story and missing photo; no JavaScript
- **Long / maximum-content state:** Long story and missing photo; no JavaScript
- **Loading state:** Static content visible; image dimensions reserved
- **Error / degraded / disabled state:** Long story and missing photo; no JavaScript
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812; 320px overflow safety
- **Representative content:** Six 2:1 brand panels in reference order, outlined logo, lime and teal nature; Long story and missing photo; no JavaScript
- **Surface-specific anti-slop risks:** Invented editorial layout; different photographic subject; generic type; hiding small content
- **Acceptance checks:**
  - `M3-C1` — Reference section order, composition, palette and image subjects visibly match | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M3-C2` — Primary journey completes with truthful persisted/downloaded result | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M3-C3` — Maximum and degraded content stays readable; keyboard and reduced-motion work | normal and adverse | both viewports | screenshots, assertions and paired reference review
- **Explicit failure conditions:**
1. Reference composition replaced with a new design.
2. Clipped, unreadable or overflowing primary content.
3. Broken local interaction, false external effect, missing assets or exports.
- **Evidence:** To capture after implementation in evidence/reference-match.

## Surface: Furion /furion/

- **Register and usage moment:** Reference-matched static template selection and reuse
- **Primary user job:** Inspect six identity panels and download brand notes
- **Observable successful outcome:** Inspect six identity panels and download brand notes with actual visible result
- **Entry / exit:** Gallery or direct link; native section links and browser back
- **Critical information, ordered:** Six 2:1 brand panels in reference order, photo edge strips, grayscale, lowercase italic logo
- **Primary actions:** Inspect six identity panels and download brand notes
- **Secondary actions:** Native disclosures, navigation and portable downloads
- **Composition and hierarchy:** Six 2:1 brand panels in reference order, photo edge strips, grayscale, lowercase italic logo
- **Interaction and feedback rules:** Named native controls, visible focus, persistent local feedback
- **Normal state:** Complete reference-matched page with authored representative content
- **Empty state:** Long story and missing photo; no JavaScript
- **Long / maximum-content state:** Long story and missing photo; no JavaScript
- **Loading state:** Static content visible; image dimensions reserved
- **Error / degraded / disabled state:** Long story and missing photo; no JavaScript
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812; 320px overflow safety
- **Representative content:** Six 2:1 brand panels in reference order, photo edge strips, grayscale, lowercase italic logo; Long story and missing photo; no JavaScript
- **Surface-specific anti-slop risks:** Invented editorial layout; different photographic subject; generic type; hiding small content
- **Acceptance checks:**
  - `M4-C1` — Reference section order, composition, palette and image subjects visibly match | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M4-C2` — Primary journey completes with truthful persisted/downloaded result | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M4-C3` — Maximum and degraded content stays readable; keyboard and reduced-motion work | normal and adverse | both viewports | screenshots, assertions and paired reference review
- **Explicit failure conditions:**
1. Reference composition replaced with a new design.
2. Clipped, unreadable or overflowing primary content.
3. Broken local interaction, false external effect, missing assets or exports.
- **Evidence:** To capture after implementation in evidence/reference-match.

## Surface: Gallery /

- **Register and usage moment:** Reference-matched static template selection and reuse
- **Primary user job:** Preview and download each self-contained template
- **Observable successful outcome:** Preview and download each self-contained template with actual visible result
- **Entry / exit:** Gallery or direct link; native section links and browser back
- **Critical information, ordered:** Four updated true-reference previews with ZIP links
- **Primary actions:** Preview and download each self-contained template
- **Secondary actions:** Native disclosures, navigation and portable downloads
- **Composition and hierarchy:** Four updated true-reference previews with ZIP links
- **Interaction and feedback rules:** Named native controls, visible focus, persistent local feedback
- **Normal state:** Complete reference-matched page with authored representative content
- **Empty state:** Long template name and missing cover; no JavaScript
- **Long / maximum-content state:** Long template name and missing cover; no JavaScript
- **Loading state:** Static content visible; image dimensions reserved
- **Error / degraded / disabled state:** Long template name and missing cover; no JavaScript
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812; 320px overflow safety
- **Representative content:** Four updated true-reference previews with ZIP links; Long template name and missing cover; no JavaScript
- **Surface-specific anti-slop risks:** Invented editorial layout; different photographic subject; generic type; hiding small content
- **Acceptance checks:**
  - `M5-C1` — Reference section order, composition, palette and image subjects visibly match | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M5-C2` — Primary journey completes with truthful persisted/downloaded result | normal and adverse | both viewports | screenshots, assertions and paired reference review
  - `M5-C3` — Maximum and degraded content stays readable; keyboard and reduced-motion work | normal and adverse | both viewports | screenshots, assertions and paired reference review
- **Explicit failure conditions:**
1. Reference composition replaced with a new design.
2. Clipped, unreadable or overflowing primary content.
3. Broken local interaction, false external effect, missing assets or exports.
- **Evidence:** To capture after implementation in evidence/reference-match.

## Expansion contract — 2026-09-10

The original five-surface contract above is historical and unchanged. The collection now has nine surfaces: eight templates and the gallery. The expansion boundary was frozen in evidence/collection-expansion/plan.json; source discoveries and the Pixel World pre-code addendum are in that directory. Direct execution requires a separate critical self-review, not an independent-agent claim.

| Surface | Primary job and normal state | Adverse / maximum / disabled states | Required proof |
| --- | --- | --- | --- |
| Aster import | Preview original scenery, mobile menu, FAQ and choice controls | 320px navigation; reduced motion; inherited JavaScript requirement disclosed | Source byte parity, rendered desktop/mobile, menu Escape, FAQ/choice controls, ZIP parity |
| HorizonX | Cinematic hero, Experience scroll, second section and native details | Long text resilience, missing artwork, no JavaScript, reduced motion | Paired original frame, desktop/mobile crop, pause animation, keyboard details, local assets and export |
| BuzzKit | Four dashboard scenes and supporting feature page | Manual selection pauses; 4 keyboard-selected views; preference switches; no-JS disabled controls; reduced motion | Original/live pair, all4state renders, 375/320 overflow, copy result, a11y including states, ZIP parity |
| Pixel World | Layered hero, portfolio, local contact draft | Empty/invalid/whitespace/max1500 form, mock failed download, modal Escape/focus, no JS, reduced motion | Original/live pair, desktop/mobile, actual downloaded bytes, image alpha, paused motion, ZIP parity |
| Expanded gallery | Discover all8 templates, open previews and download self-contained ZIPs | 375/320 layout, keyboard, missing cover; long template title | Eight correct links/previews/downloads, fresh rendered covers, no broken local assets, deterministic ZIP parity |

Static source identity does not establish a real SaaS backend, real contact submission, or exact generated-art/video identity. Aster’s original reveal animation requires JavaScript unless reduced motion is active; source remains unchanged as an import.
