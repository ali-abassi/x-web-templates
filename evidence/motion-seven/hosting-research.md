# Pages deployment evidence

User authorized hosting all fifteen templates and adding live links/screenshots to every README. Existing Aster, Motion Lab and Remotion template libraries were observed in the personal account, so the same account was selected and stated to the user. No account, plan or custom-domain change.

Cloudflare Git source creation returned code 8000011. Official troubleshooting identifies this as an internal Pages SCM installation error: https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/ . No reinstall or account mutation attempted. The direct-upload route is supported: https://developers.cloudflare.com/pages/get-started/direct-upload/ .

Verified local Wrangler 4.130.0 source exposes `pages project upload` using the scoped `CF_PAGES_UPLOAD_JWT`, content-hash upload and manifest. The short-lived credential stays in process memory, passes through echo-disabled stdin, and is never included in the repository or artifacts. The API publishes the manifest as multipart form data. Current API schema was inspected before calls.

Project: x-web-templates; personal account. URL: https://x-web-templates.pages.dev/ . No automatic Git deploy configured because the installation is broken. Repeat delivery uses a fresh upload token and the same project.

Initial upload succeeded: 161 files, 12.38 seconds. A scratch log path pointing at /dev/null caused a logging-only EEXIST diagnostic after success; corrected the scratch log path for the final upload. No failed asset upload was reported. Final deployment and byte verification are recorded separately.
