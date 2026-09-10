# Veloura verification journal

Direct active-agent execution and separate critical self-review; no independent-agent or calibrated-judge claim.

V01: Desktop reference composition. Expected: Monochrome hero, original flowers and moving butterfly. Observed: Visible hosted1440x1080 artwork and readable copy. Evidence tier: real. Artifacts: preview2-desktop.jpg

V02: 375px and320px navigation/layout. Expected: Readable content, reachable controls and no overflow. Observed: Measured width equals scrollWidth; all four images loaded. Evidence tier: real. Artifacts: preview2-320.jpg, preview2-mobile-after-dialog.jpg

V03: Keyboard and native dialogs. Expected: Escape closes and returns focus; content remains painted. Observed: Exact hosted How it works open/Escape passes with visible text and focus return; local direct fragment and keyboard cycle pass. Evidence tier: real. Artifacts: preview2-mobile-after-dialog.jpg, text-loss-baseline.jpg

V04: Local project note lifecycle. Expected: Empty validation, preview, edit,2000char wrapping, retained cancellation, text download. Observed: All observed locally; actual downloaded note content preserved. Evidence tier: real. Artifacts: downloaded-note.txt, mobile-max-note.jpg, note-preview.jpg

V05: Motion lifecycle. Expected: Pause/resume and real hidden event stop animation. Observed: Computed playState changes; navigation hidden event recorded paused. Reduced preference separately mocked. Evidence tier: real. Artifacts: hidden-navigation.json

V06: Deliberate adverse fixtures. Expected: NoJS readable, missing art message, failed download retains note, reduced preference stops art. Observed: Labelled fixtures satisfy all fallback expectations. Evidence tier: mock. Artifacts: no-script.jpg, download-failure.jpg

V07: Build/archive and preservation. Expected: 19 ZIPs contain correct standalone trees; previous18 unchanged. Observed: Build and check pass20pages/19ZIPs;215 original source files preserved. Evidence tier: automated. Artifacts: check.log, preservation.json

V08: Hosted integration. Expected: Live hero/card/ZIP match candidate. Observed: Preview2 card present with19 count,10 public files byte-identical, no error/warning console entries. Evidence tier: real. Artifacts: preview2-http.json, preview2-console.json

Failures are preserved. Preview1 bf428dbe was rejected for post-dialog paint loss. Preview2 7e2f1975 is the accepted rendering. Original preview-http.json contains an invalid no-redirect checker result; preview2-http.json corrects only the HTTP checker and confirms all10 public files. Native image generation:2 assets plus1 checkerboard correction; exact provider price/token usage unavailable. No further generation or external submission.

Keyboard: native dialog initial close focus, Tab cycles without entering background links, Escape returns triggering link. Contact note: required empty focus, valid fictional note preview, edit,2000chars no overflow, close/reopen retained, actual text download verified. Motion: click pause/resume computed styles; hidden-navigation fixture observed actual visibilitychange after app listener. Reduced preference and noJS/download/missing art conditions are explicit fixtures. No OS preference or screenreader coverage claimed.

Performance: native CSS transforms, no runtime library, images load, no console warnings/errors, hidden/pause motion checked; no quantitative performance benchmark. Privacy: local Blob/textContent, no form transmission or storage. Rollback: prior source9643c88 and production deployment8a6679dc retained.

Skill audit: Good Design Focused reference/alignment/render/keyboard/adverse evidence above; github-research pinned2 MDN sources and steal-list in research.md; Imagegen original/rejected/final PNGs and prompts.json; Dogfooding frozen plan/baseline/cases/findings/iterations/manifest/validator/receipt. Native generator costs unavailable. No original source video file was processed.


CORRECTION / F04 reopened: production cbb95c58 repeated desktop text loss after dialog dismissal. Removing backdrop blur was insufficient. A system Arial fixture also failed on its second dialog, ruling out the custom font as a sufficient explanation. Both experiments and failed production screenshot remain. Final correction creates composited layers on header, hero-copy and utility using translateZ(0). Repeated How it works/Escape, Contact/close, Features/Escape passed with visible text, plus mobile375. Nimbus and all frozen references remain unchanged. Prior acceptance is superseded by acceptance-final.json.


FINAL CORRECTION: All post-publication experiments failed repeated or settled captures and were REVERTED from shipping source. The shipped candidate remains f880ebf52a0c6030f1b33b83ee533c6eec6162d8. F04 is OPEN, not fixed. It also appears in untouched later captures, so dialog-specific causality is unproven. Local fixtures preserve system font, layer, nonmodal, no-blend, isolated garden, luminance mask, repaint, flat wings, grayscale and filter experiments. None is accepted or shipped. Cloudflare Browser Rendering initial text crop is visible; a four-dialog cycle followed by five seconds produces text loss in its capture too. This is automated remote evidence, not an independent human verdict. Four screenshot API calls were made; two full-sized responses were truncated by the tool and two small crops retained. Provider charge unavailable. Native IAB screenshots show the same inconsistency. Human visual check requested; pending. Production HTTP confirms10changed public files identical to original candidate. Rendering acceptance is rejected pending resolution; earlier pass/keep statements about F04 are superseded.
