# Chatsheet focused dogfooding journal

Mode iterate; owner active agent; no delegation. Scope and alignment frozen before implementation in plan.md/alignment.json. Original checkout preserved. Baseline20pages/19ZIPs passed. No paid generation or live model evaluations; model/tool usage cost unavailable. Research official MDN sources and source versions in research.md. Browser actual connected Chrome profile Ali, CUA viewport emulation on macOS, local static HTTP; no real mobile device claim. In-app browser unavailable, reported before Chrome fallback.

## Observations and corrections

F1 P2 visual: first desktop panel ended with a hard clip at SVG y0. Extend decorative mask above the SVG viewBox; subsequent desktop/reference-size captures show its complete rounded edge. Verified.
F2 P2 visual: initial375px composition cropped the left Slack tile. Reduce mobile SVG width136% to108% and left offset−18% to−4%. Fresh375 screenshot exposes tiles and keeps reading unobstructed. Verified.
F3 P2 accessibility: discovery anchor opened correctly but default navigation reset focus to BODY. Prevent default, open details, update fragment with pushState, scroll then focus summary. Rerun Case Studies and all four nav destinations: focused SUMMARY; Enter collapses. Verified in interactions.json and browser tool state.
F4 P3 reference geometry:1024 header inset/height differed visibly. Adjust header horizontal padding to11.3vw and tablet height50px; reduce tablet CTA gap10px. Re-render1024,1440 and820: source-like centered hierarchy, no measured horizontal overflow. Buttons deliberately remain44px tall rather than source33px; system serif narrower than unidentified reference face; original panel and hub shading are approximations. Source and equal-size render are retained.
F5 P2 contrast: review calculated white against primary gradient top#347dff at3.80:1. Set top#2467e9, giving5.01:1; bottom#2463df5.35:1. Fresh desktop preview retained. Verified.
F6 P3 stale catalog copy: footer saidNineteen after added20th card. Change toTwenty and rebuild. Verified.

No failed observation was counted as a pass. Corrections exceeded the soft3-change guideline because the separate review found concrete focus/contrast/catalog defects; no unrelated polish or paid calls. One coherent candidate; no stochastic judge or numeric quality certification.

## Real observations

C1 desktop1440×1000 and source-size1024×720: quiet serif headline, compact header, blue/white CTAs and the complete diagonal workflow. Desktop screenshot is the actual gallery preview. C2 real375×812,320×812 and adjacent820×900 viewport observations: scrollWidth equals width, copy and navigation readable, controls reachable.320 header wraps deliberately. C3 all details destinations open; summary receives focus; Enter closes; booking copy explicitly says local and no booking. C4 pause button yields all14animated elements paused; resume restores moving state. Actual computed transform changed from−1.77203px to−6.44396px across UI actions (visible-motion.json). No console errors/warnings captured on target page.

## Mock/source boundaries

C4 reduced-motion stylesheet was exercised by forcing its media branch in a scratch fixture; all14animation names became none. Actual app.js VM guards passed normal,hidden,reduced,manual-pause,resume. No real OS setting or browser background event is claimed: CUA reads kept the inspected tab active, so hidden.json records hidden=false/moving=true and is not proof of hidden handling. Native no-script fixture removes only app.js, keeps source markup/styles, and lets the user expand discovery; artwork stays static. Actual OS preference change/browser-wide JS disable were unavailable in this driver and are unverified.
C5 labelled long-heading scratch fixture at320: heading bottom454.594,description top476.594; scrollWidth320, no overlap. First fixture screenshot accidentally used1512px because the viewport capability applies to the selected tab; retained raw state in fallback-fixtures.json and replaced misleading320 image with verified320 screenshot/state. Mock fixtures are not shipped.

## Cleanup and critical self-review

Readable formatted HTML/CSS/JS; no dependency or font binary. Icons are reusable inline SVG definitions, exact UI copy remains editable. No form, storage, fetch, backend, credentials or real booking. No authored TypeScript. New JS functions complexity:syncMotion4,revealSection2,revealHash2,event callbacks1; no function exceeds5. Build tuple adds one name; existing functions untouched. Authored geometry and all new text, styles, behavior, catalog/README diff and generated parity inspected. Separate critical self-review foundF5/F6; no independent-agent review claimed.

Skill fidelity: Good Design Focused system in frozen design.md plus reference.jpg, rendered screenshots, adverse/keyboard evidence; GitHub research two exact source teardowns/activity/licenses/steal-list in research.md; dogfooding frozen plan,baseline,stable findings,iteration evidence and final run manifest. Live delivery evidence follows in delivery.json/HTTP checks. Existing template hashes and alignment hashes are checked again at acceptance. No Safari/Firefox, real phone or enterprise integration certification.
