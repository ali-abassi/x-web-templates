# Bounded prior-art research

Mechanics sought: portable static template baseline and consistent source-to-distribution asset copying. Literal searches: `prefers-reduced-motion` in h5bp/html5-boilerplate, `cpSync` in 11ty/eleventy, and the html5-boilerplate repository spelling. Initial full-name lookup was wrong; repository search resolved h5bp/html5-boilerplate.

| Source | Evidence | Decision |
| --- | --- | --- |
| h5bp/html5-boilerplate, b8071d80d0e90f187adeeccfbda67852097c6c30, MIT | `src/index.html` metadata/viewport structure; `.github/workflows/test.yml` Node 22/24/26 on Windows/Linux; actual scaffold, not just README | Steal now: semantic metadata and local-asset baseline, ~20 lines of ideas. Avoid its Webpack stack because these templates need no bundling. |
| 11ty/eleventy, d89ac29a38c8678d0866b53cf535d83b062a9b93, MIT, active push Sep 7 | `src/TemplatePassthrough.js` copy() guards source/output boundaries and records completed copies; `test/TemplatePassthroughTest.js` verifies output paths and duplicate directory handling; active CI | Steal now: source/output boundary and single-source copying principle, ~60 lines Python standard library. Bank the SSG for collections needing actual templating. No copied code or new dependency. |

Neither repository's full suite was run: inspected source, tests and CI only. Existing project already has self-contained HTML and fonts; introducing a framework would add work without improving reuse.

Official cross-checks: MDN localStorage documents blocked-storage SecurityError and file-URL uncertainty (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage); local note save must catch read/write failure and export independently. MDN native dialog documents built-in modal focus/Escape behavior (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog); native details used instead where a modal is unnecessary. Python zipfile documentation (https://docs.python.org/3/library/zipfile.html) plus installed standard-library source supports deterministic ZipInfo timestamps and byte-integrity checks. Node preview implementation can be deleted in favor of Python's installed static server. No product dependency API invented from memory.

Disabled-script verification: official Chrome DevTools Protocol Emulation.setScriptExecutionDisabled accepts a boolean value (https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setScriptExecutionDisabled). Applied only to the task-owned browser tab, verified templateUI absent and native disclosures/downloads operational, then restored script execution.
