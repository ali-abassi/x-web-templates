# Travio release integration

The live base is `371f46e`, with 22 published templates. The working checkout also contains the unpublished Liquid Glass candidate. This release is prepared in a separate Git worktree from the current remote main so Liquid Glass is neither published nor discarded.

Frozen Travio visual and behavior criteria remain unchanged. Runtime source is copied byte for byte from the reviewed local candidate. Only collection integration differs: Travio is entry 23, existing published templates remain unchanged, and no Liquid Glass files or links enter the release. The local pending branch retains Liquid Glass and all original evidence.

The active agent owns integration and separate critical self-review. No delegates. Verify all previous source and published file hashes, run build/check, inspect the final gallery and Travio in the real browser, inspect exact diff, then commit and push this fast-forward release to the configured main branch. Deploy only its dist to the existing Cloudflare Pages project and verify public route, gallery and ZIP bytes. Record the integrated alignment hashes and complete revision receipt. No new permission or source gate is introduced.
