# Reference-match correction

The user rejected b2207ab for visual departure. Current comparisons use the four original post images, saved in references/ in post order. The previous evidence/redesign is historical.

Open comparisons/ for original-versus-rebuilt boards and landing-page heroes. renders/ includes every full page at desktop/mobile and narrow probes; journeys/ contains downloaded artifacts and behavior traces; edges/ covers gallery downloads, adverse fixtures and standalone file URLs; no-js/ records scripting disabled through CDP on the task-owned tab.

Reproduction: build and serve the repository on localhost:4173, then use an owned agent-browser session named xweb-01a0878b with its tab pinned. Run reproduce/match.py, match-behavior.py and match-edges.py. For disabled-JavaScript tests, set XWEB_CDP_URL to that exact owned tab's observed WebSocket URL, then run node reproduce/nojs.mjs. Do not attach to an unrelated tab. Local mock text/storage/image failures are deliberately injected; they do not represent a production service.

The initial smoke harness had three defects: checking offscreen lazy images before scrolling them into view; miscounting the length of a repeated note; checking Bird's hidden noscript explanation before opening its native application disclosure. Fixed probes preserve the intended gates and do not change product behavior. Raw failure traces are retained.

Main photography: ten native imagegen calls, no retry beyond the frozen cap. generation-requests.txt contains dispatch prompts; generated-assets.json maps originals to optimized delivery assets. Metered cost is unavailable.
