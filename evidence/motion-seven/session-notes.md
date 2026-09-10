# Dogfood session journal

Run: motion-seven-2026-09-10. Mode: iterate. Exact provenance and twelve scoped cases: run-manifest.json. Initial source hashes: qa-baseline-hashes.json. Current reference contract: surface-matrix.md.

For a template user who currently has static inspiration links, working local motion templates produce visible, downloadable starting points. The next decision is delivery and changes if motion, mobile use, export or live preview fails.

Authority: user asked to implement templates with motion, then explicitly added Cloudflare Pages and README links/screenshots. User prohibits delegation. Cloudflare account choice is pending because CLI and connector are authenticated to different accounts. No other external effects authorized. No more paid image/model calls; generation complete with eight native calls including one rejected correction. Browser/code QA correction budget: up to three coherent passes per root cause, then diagnose exact blocker; no repeated broad stochastic testing. Preserve baseline, all failure traces, user data and original eight runtime templates. No messages or purchases.

## Baseline

- npm run build and npm run check: pass, fifteen ZIPs and seventeen HTML pages (the flight template includes its local home page).
- First browser navigation returned connection refused because the prior static server had ended. Infrastructure finding INFRA-001: restarted the same local Python server; no product change. Re-baseline next.
- File-size inspection: largest new ZIP quiet-presets 9.1 MiB, below currently documented Pages 25 MiB per-asset limit.

## Chronological observations

Browser trace and named screenshots/recordings will retain each material action. Findings and kept/reverted fixes are recorded below before final readiness.

## First visual and interaction pass

All seven desktop/phone compositions inspected in baseline/. Quiet, Reality, Direct and Flight retain the selected reference hierarchy. Findings FIND-001 through FIND-005 recorded in run-manifest.json before fixes. Telemetry first Pause click reproduced as paused=false; focusin fires before click and toggles the shared userPaused state. Fix hypothesis: focus only pauses when focus enters the carousel container itself, while manual navigation explicitly pauses and Pause retains its own toggle. Grid mobile hypothesis: move race summary beside the name and lower the portrait. Helmet hypothesis: tighten only the observed right silhouette edge. Clipboard whitespace is a direct text repair. Overlay contrast uses worst-case compositing, not an invented model score.

## Final verification

Main journeys passed locally and by keyboard on public Pages at 1440 and 375px. All 161 deployed files match the local SHA-256 inventory, including all fifteen ZIPs. The seven new gallery links were opened and each ZIP was downloaded by clicking its rendered link, then compared with its source ZIP. All seven exports were unpacked and opened as file URLs. Reduced/noJS coverage and 32 normal adverse-state captures are mapped in the completion packet.

QA-driver issues were preserved: premature async clipboard assertion (later successful, no product change); stale CSS during a normal reload (hard reload used); a misspelled hover selector (corrected to the observed work-link href); and a stale hard-coded CDP target during background-tab checks (replaced with discovery after navigation). The first raw Python HTTP read returned 403 while the subsequent published endpoint returned 200 to curl; final curl verification matched all 161 files. No claim is made about that transient response’s cause.

Final background-tab proof uses real Chrome target activation and exact per-template visibility JSON. The driver mask stays unchanged while hidden and changes after resuming; the dashboard, planes and gradient set paused while hidden and resume.

Root and every template README include live preview and screenshot links. Project uses direct upload; Git integration returned provider error 8000011, so no automatic Git deployment is claimed. Native image usage: eight calls, seven retained assets and one rejected correction; billing unavailable. No paid model judge or scored model-evaluation loop.

Console audit: the CLI text formatter displayed eight blank crosses even after its clear flag. JSON inspection identified six legacy errors from the original 404s.design reference and two URL-less trackingScript redeclaration errors. The same eight entries stayed buffered throughout all new local/live journeys; no new exception was observed. Raw text is preserved losslessly as JSON strings in final/console-cli-raw.json, and the structured inspection is saved separately. No template defines trackingScript.
