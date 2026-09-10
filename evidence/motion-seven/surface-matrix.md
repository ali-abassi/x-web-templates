# Seven motion interface contract

Project: X Web Templates — seven motion additions
Artifact/register: Seven standalone marketing/section templates and collection gallery
Audience and usage context: Template users previewing motion and adapting local source
Design argument / generative thesis / taste read: Distinctive reference compositions with actual reusable motion
Approved references + qualities to borrow: selection.json maps exact source layout and interaction per template
Anti-references + failures to avoid: Static placeholders, generic replacement layouts, fake backend actions
Source list / artifact manifest: ./selection.json; ./references/; ../../design.md; ../../templates/
Direction decision (use / avoid / prove): use: selected reference geometry and motion; avoid: invented full sites; prove: rendered comparison and actual interaction recordings
Fixed constraints: Native HTML/CSS/JS, local assets, eight existing templates unchanged
Non-goals: Accounts, checkout, publishing messages, new hosting
Shared type / spacing / color / shape / imagery / motion rules: Reference-specific palette and hierarchy; local sans fonts; native generated photography; bounded pauseable motion
Shared interaction and feedback rules: Named controls, 44px targets, visible focus, inline feedback, reduced-motion support
Default viewport: 1440x1000
Minimum viewport: 375x812, safety 320x812
Handoff path: evidence/motion-seven/surface-matrix.md
Evidence directory: evidence/motion-seven
Locked checks version / date: motion-seven-v1 / 2026-09-10
Required reviewer assignments: Active agent separate critical self-review per user direct-execution policy; no independent-agent claim

## Surface: grid-driver

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Toggle helmet and replay circuit
- **Observable successful outcome:** Toggle helmet and replay circuit with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** Huge condensed driver name, cool white portrait hero, track and racing stats, stacked season cards
- **Primary actions:** Toggle helmet and replay circuit
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** Huge condensed driver name, cool white portrait hero, track and racing stats, stacked season cards
- **Interaction and feedback rules:** Helmet burns away on entry; pointer briefly restores helmet; circuit lap on scroll; sticky cards; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Portrait or helmet unavailable; readable name and stats remain
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Portrait or helmet unavailable; readable name and stats remain
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** Huge condensed driver name, cool white portrait hero, track and racing stats, stacked season cards
- **Surface-specific anti-slop risks:** Replacing Huge condensed driver name, cool white portrait hero, track and racing stats, stacked season cards with generic cards or non-working motion
- **Acceptance checks:**
  - `S1-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S1-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S1-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/grid-driver-final-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/grid-driver-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/grid-driver-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/grid-driver-final-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/grid-driver-motion-final.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/grid-driver-final-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/grid-driver-final-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/grid-driver-final-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/grid-driver-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/grid-driver-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/grid-driver-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/grid-driver-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/grid-driver-final-375.png`
- S1-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/grid-driver-final-1440.png`
- S1-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/grid-driver-motion-final.mp4`
- S1-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/grid-driver-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: clipdock

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Open mobile menu, select clipboard category, edit and copy a local item
- **Observable successful outcome:** Open mobile menu, select clipboard category, edit and copy a local item with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** Blue atmospheric hero, black notched navigation, white sans and italic serif heading, island and clipboard app
- **Primary actions:** Open mobile menu, select clipboard category, edit and copy a local item
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** Blue atmospheric hero, black notched navigation, white sans and italic serif heading, island and clipboard app
- **Interaction and feedback rules:** Navigation reveal, app preview lift on scroll, animated tab content; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Empty clipboard text and denied clipboard permission preserve editable input
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Empty clipboard text and denied clipboard permission preserve editable input
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** Blue atmospheric hero, black notched navigation, white sans and italic serif heading, island and clipboard app
- **Surface-specific anti-slop risks:** Replacing Blue atmospheric hero, black notched navigation, white sans and italic serif heading, island and clipboard app with generic cards or non-working motion
- **Acceptance checks:**
  - `S2-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S2-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S2-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/clipdock-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/clipdock-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/clipdock-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/clipdock-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/clipdock-motion.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/clipdock-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/clipdock-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/clipdock-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/clipdock-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/clipdock-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/clipdock-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/clipdock-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/clipdock-375.png`
- S2-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/clipdock-1440.png`
- S2-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/clipdock-motion.mp4`
- S2-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/clipdock-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: telemetry-stack

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Navigate monitoring scenes and pause autoplay
- **Observable successful outcome:** Navigate monitoring scenes and pause autoplay with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** Dark navy split hero, white/gray headline, purple CTA, perspective dashboard, carousel controls
- **Primary actions:** Navigate monitoring scenes and pause autoplay
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** Dark navy split hero, white/gray headline, purple CTA, perspective dashboard, carousel controls
- **Interaction and feedback rules:** Dashboard scene transitions and timed carousel; moving logo row; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** No JavaScript keeps first dashboard and hides inactive controls
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** No JavaScript keeps first dashboard and hides inactive controls
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** Dark navy split hero, white/gray headline, purple CTA, perspective dashboard, carousel controls
- **Surface-specific anti-slop risks:** Replacing Dark navy split hero, white/gray headline, purple CTA, perspective dashboard, carousel controls with generic cards or non-working motion
- **Acceptance checks:**
  - `S3-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S3-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S3-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/telemetry-stack-final-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/telemetry-stack-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/telemetry-stack-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/telemetry-stack-final-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/telemetry-stack-motion.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/telemetry-stack-final-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/telemetry-stack-final-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/telemetry-stack-final-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/telemetry-stack-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/telemetry-stack-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/telemetry-stack-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/telemetry-stack-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/telemetry-stack-final-375.png`
- S3-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/telemetry-stack-final-1440.png`
- S3-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/telemetry-stack-motion.mp4`
- S3-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/telemetry-stack-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: lost-in-flight

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Pause flight and follow a real local home link
- **Observable successful outcome:** Pause flight and follow a real local home link with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** White full viewport, pale scattered dimensional planes, small left-center 404 message
- **Primary actions:** Pause flight and follow a real local home link
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** White full viewport, pale scattered dimensional planes, small left-center 404 message
- **Interaction and feedback rules:** Planes cross viewport on independent paths; pause and reduced motion; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** JavaScript disabled retains static planes and home link
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** JavaScript disabled retains static planes and home link
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** White full viewport, pale scattered dimensional planes, small left-center 404 message
- **Surface-specific anti-slop risks:** Replacing White full viewport, pale scattered dimensional planes, small left-center 404 message with generic cards or non-working motion
- **Acceptance checks:**
  - `S4-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S4-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S4-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/lost-in-flight-final-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/lost-in-flight-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/lost-in-flight-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/lost-in-flight-final-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/lost-in-flight-motion-final.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/lost-in-flight-final-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/lost-in-flight-final-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/lost-in-flight-final-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/lost-in-flight-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/lost-in-flight-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/lost-in-flight-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/lost-in-flight-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/lost-in-flight-final-375.png`
- S4-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/lost-in-flight-final-1440.png`
- S4-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/lost-in-flight-motion-final.mp4`
- S4-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/lost-in-flight-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: reality-studio

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Move pointer, pause motion, expand services and copy contact
- **Observable successful outcome:** Move pointer, pause motion, expand services and copy contact with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** White compact studio header, cyan/lilac gradient footer, giant black wordmark, right service columns
- **Primary actions:** Move pointer, pause motion, expand services and copy contact
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** White compact studio header, cyan/lilac gradient footer, giant black wordmark, right service columns
- **Interaction and feedback rules:** Drifting gradient and fading geometric pointer trails; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Clipboard denied exposes selectable contact; no JavaScript retains complete footer
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Clipboard denied exposes selectable contact; no JavaScript retains complete footer
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** White compact studio header, cyan/lilac gradient footer, giant black wordmark, right service columns
- **Surface-specific anti-slop risks:** Replacing White compact studio header, cyan/lilac gradient footer, giant black wordmark, right service columns with generic cards or non-working motion
- **Acceptance checks:**
  - `S5-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S5-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S5-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/reality-studio-final-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/reality-studio-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/reality-studio-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/reality-studio-final-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/reality-studio-motion-final.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/reality-studio-final-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/reality-studio-final-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/reality-studio-final-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/reality-studio-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/reality-studio-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/reality-studio-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/reality-studio-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/reality-studio-final-375.png`
- S5-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/reality-studio-final-1440.png`
- S5-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/reality-studio-motion-final.mp4`
- S5-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/reality-studio-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: direct-cta

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Copy example contact and reveal local work cards
- **Observable successful outcome:** Copy example contact and reveal local work cards with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** Black footer, adjacent white and blue CTA cards, huge sans labels, large bottom wordmark
- **Primary actions:** Copy example contact and reveal local work cards
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** Black footer, adjacent white and blue CTA cards, huge sans labels, large bottom wordmark
- **Interaction and feedback rules:** Arrow rotation and text/card hover transitions, work reveal; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Denied clipboard retains visible selectable address; no JavaScript native work disclosure
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Denied clipboard retains visible selectable address; no JavaScript native work disclosure
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** Black footer, adjacent white and blue CTA cards, huge sans labels, large bottom wordmark
- **Surface-specific anti-slop risks:** Replacing Black footer, adjacent white and blue CTA cards, huge sans labels, large bottom wordmark with generic cards or non-working motion
- **Acceptance checks:**
  - `S6-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S6-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S6-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/direct-cta-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/direct-cta-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/direct-cta-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/direct-cta-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/direct-cta-hover.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/direct-cta-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/direct-cta-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/direct-cta-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/direct-cta-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/direct-cta-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/direct-cta-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/direct-cta-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/direct-cta-375.png`
- S6-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/direct-cta-1440.png`
- S6-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/direct-cta-hover.mp4`
- S6-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/direct-cta-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: quiet-presets

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Browse four presets and select one with visible local feedback
- **Observable successful outcome:** Browse four presets and select one with visible local feedback with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** White spacious section, compact two-line heading, 340px portrait photo rail with translucent preset chips
- **Primary actions:** Browse four presets and select one with visible local feedback
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** White spacious section, compact two-line heading, 340px portrait photo rail with translucent preset chips
- **Interaction and feedback rules:** Smooth snap carousel via arrows, touch swipe and focus; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Missing photo preserves dimensions and descriptive alt text; no JavaScript rail remains scrollable
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Missing photo preserves dimensions and descriptive alt text; no JavaScript rail remains scrollable
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** White spacious section, compact two-line heading, 340px portrait photo rail with translucent preset chips
- **Surface-specific anti-slop risks:** Replacing White spacious section, compact two-line heading, 340px portrait photo rail with translucent preset chips with generic cards or non-working motion
- **Acceptance checks:**
  - `S7-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S7-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S7-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.


### Final observed results

- **normal @ default:** `evidence/motion-seven/final/quiet-presets-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/quiet-presets-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/quiet-presets-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/quiet-presets-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/quiet-presets-motion.mp4`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/quiet-presets-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/quiet-presets-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/quiet-presets-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/quiet-presets-live-keyboard-375.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/quiet-presets-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/quiet-presets-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/quiet-presets-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/quiet-presets-375.png`
- S7-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/quiet-presets-1440.png`
- S7-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/quiet-presets-motion.mp4`
- S7-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/quiet-presets-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Surface: gallery

- **Register and usage moment:** Standalone reference template preview
- **Primary user job:** Open all seven new templates and download standalone ZIPs
- **Observable successful outcome:** Open all seven new templates and download standalone ZIPs with visible feedback and no external effects
- **Entry / exit:** Direct URL or gallery, source credit and browser back
- **Critical information, ordered:** Preserve current gallery with fifteen preview cards and ZIP links
- **Primary actions:** Open all seven new templates and download standalone ZIPs
- **Secondary actions:** Motion controls where applicable and source link
- **Composition and hierarchy:** Preserve current gallery with fifteen preview cards and ZIP links
- **Interaction and feedback rules:** Existing gallery behavior; new static cover images; named controls and visible focus
- **Normal state:** Complete representative content on first load
- **Empty state:** Missing cover preserves title and preview/download links
- **Long / maximum-content state:** Double title and action-label length must wrap without overflow
- **Loading state:** Local fonts and images; reserved image dimensions and readable text
- **Error / degraded / disabled state:** Missing cover preserves title and preview/download links
- **Default viewport:** 1440x1000
- **Minimum viewport:** 375x812 and 320x812
- **Representative content:** Preserve current gallery with fifteen preview cards and ZIP links
- **Surface-specific anti-slop risks:** Replacing Preserve current gallery with fifteen preview cards and ZIP links with generic cards or non-working motion
- **Acceptance checks:**
  - `S8-C1` — Reference composition and complete readable content | normal | desktop and mobile | screenshots and comparison
  - `S8-C2` — Primary interaction completes and motion visibly changes then stops when requested | normal, pause and keyboard | desktop and mobile | recording and behavior assertions
  - `S8-C3` — No clipping, usable degraded state and reduced motion | long label, missing art, no JS, reduced motion | desktop and mobile | screenshots and assertions
- **Explicit failure conditions:**
  1. Generic composition replaces the selected reference.
  2. Overflow, inaccessible primary action or missing asset.
  3. Motion is absent, cannot stop, or action falsely claims an external effect.
- **Evidence:** Captures will be populated after implementation.

### Final observed results

- **normal @ default:** `evidence/motion-seven/final/gallery-final-1440.png`
- **long/maximum @ default:** `evidence/motion-seven/final/gallery-long-final-1440.png`
- **empty/degraded @ default:** `evidence/motion-seven/final/gallery-empty-final-1440.png`
- **normal @ minimum:** `evidence/motion-seven/final/gallery-final-375.png`
- **interaction before/after or recording:** `evidence/motion-seven/final/live-interactions.json`
- F1 — PASS — Default, phone and long/empty views are contained; intentional rail scrolling stays within the rail. `evidence/motion-seven/final/gallery-final-1440.png`
- F2 — PASS — The page-specific primary action is visible or reachable through its named navigation. `evidence/motion-seven/final/gallery-final-1440.png`
- F3 — PASS — Reference typography, colors and status text remain readable; scoped accessibility checks and image-overlay review completed. `evidence/motion-seven/final/gallery-final-1440.png`
- F4 — PASS — Named native controls show focus during the real keyboard journey; shared gallery focus styles are unchanged. `evidence/motion-seven/final/gallery-live.png`
- F5 — PASS — Native Enter and the relevant arrow/tab keys complete the live workflow. `evidence/motion-seven/final/live-interactions.json`
- F6 — PASS — Browser reduced-motion emulation removes nonessential animation; manual controls remain. `evidence/motion-seven/final/reduced-results.json`
- F7 — PASS — Doubled labels and missing art remain inspectable; no-JavaScript and disabled states are recorded. `evidence/motion-seven/final/gallery-long-final-1440.png`
- F8 — PASS — Degraded art or clipboard failures keep content and truthful recovery guidance. `evidence/motion-seven/final/gallery-empty-final-375.png`
- F9 — PASS — Actions update visible status, selection, disclosure or destination; no external product action is falsely claimed. `evidence/motion-seven/final/live-interactions.json`
- F10 — PASS — Long critical labels/content remain available through normal page or rail scrolling. `evidence/motion-seven/final/gallery-long-final-375.png`
- F11 — PASS — The actual rendered control completes its intended local action. `evidence/motion-seven/final/live-interactions.json`
- F12 — PASS — The web layout and interaction remain usable at desktop and phone sizes, with an additional 320px probe. `evidence/motion-seven/final/gallery-final-375.png`
- S8-C1 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/gallery-final-1440.png`
- S8-C2 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/live-interactions.json`
- S8-C3 — PASS — Observed against the locked expectation; additional state and interaction evidence above. `evidence/motion-seven/final/gallery-long-final-375.png`
- **Independent reviewer:** none
- **Reviewer policy override:** Ali requires direct execution and separate active-agent critical review; no independent-agent claim.
- **Verdict:** Pass

## Completion packet

- **Final surface inventory:** Seven independent motion additions plus fifteen-template gallery; original eight runtime templates preserved.
- **Reviewer verdicts:** Active-agent separate critical self-review accepted the static candidate; no delegated or independent review. `evidence/motion-seven/pre-deployment-review.md`
- **Unresolved unknowns / risks:** none
- **Check-change log:** Hosting expanded only after Ali's explicit request, recorded in hosting-amendment.md. No locked interaction or floor criterion was removed or weakened. Failed checks and QA-driver issues remain in raw evidence and session-notes.md.
- **Final decision:** Pass

Assurance boundary: this is a functional static-template collection. GetLayers' motion is reconstructed from its public description; original shader and proprietary typefaces are not claimed. Photography is generated. Chrome desktop/viewport/reduced-motion checks do not certify physical Safari or VoiceOver. User policy supersedes the skill's independent-agent lane; the unmodified validator will report that lane missing, and no independent System certification is claimed.
