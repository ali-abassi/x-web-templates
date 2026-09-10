# Source and implementation research

Direct execution by the active agent; no delegated reviewer. Exact public references and captures: selection.json and references/. Chrome 152, agent-browser 0.37.1, actual Default profile. No source authentication data copied into evidence.

## Compact steal-list

| Mechanic | Exact source | Fit / port cost / license / confidence | Decision |
|---|---|---|---|
| Canvas compositing | mdn/dom-examples @72c9e5c6fc6141fadccfc2b3eacc4b7e3aa92407 canvas/chroma-keying/processor.js | Native browser, low port cost, CC0; high confidence compositing, old timer loop unsuitable | Use native compositing; avoid zero-delay timer |
| Replace pointer animations | Same repository web-animations-api/replace-indefinite-animations.html | Native animation API, low cost, CC0; high confidence bounded lifetime | Use bounded geometric trail pool |
| Autoplay visibility handling | davidjerleke/embla-carousel @0efb1f44f04504c45dc2335d4b7ebcb43046b756 packages/embla-carousel-autoplay/src/components/Autoplay.ts | MIT; medium cost full dependency; current tested CI uses Node24 build/lint/test | Use visibility/pause idea, avoid adding dependency |
| Focus follows carousel | Same repository packages/embla-carousel/src/components/SlideFocus.ts and src/__tests__/axis-ltr.test.ts | MIT; low conceptual port; tests assert horizontal transform | Use native scroll snap and scrollIntoView focus |

Official source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation (source-in intersects new image with mask); https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame (timestamp-based progress and cancellable one-shot scheduling); https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type; https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events. Browser-native implementation matches installed Chrome; no SDK or framework dependency. External code is conceptual prior art, not copied.

Reference observations: Norma Next moves photo rail exactly one card; Direct hover rotates CTA arrow; flight captures show planes crossing the viewport; Reality pointer creates white geometric trails. Better Stack carousel changes dashboard scenes automatically. Kimi motion is public descriptive evidence only.
