- 06:31:01 run start · workflow=verto-motion · steps=3/3 · workers=1 · cache=on · dir=/private/tmp/xweb-alex-0910/runs/verto-motion-20260910-063101
- 06:31:01 preflight attempt 1/2: PASS (0s)
- 06:31:12 generate attempt 1/1: PASS (11s)
- 06:31:13 encode attempt 1/1: FAIL (1s) — cmd exited 1: Traceback (most recent call last): File "/private/tmp/xweb-alex-0910/encode.py", line 5, in <module> meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(target)]));assert 5.8<float(meta['format']['duration'])<6.3;assert target.stat().st_size<12*1024*1024 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ AssertionError
- 06:31:13 ledger:
  encode             cmd                 0.8s        0 tok  $0.0000
  generate           cmd                10.9s        0 tok  $0.0000
  preflight          cmd                 0.0s        0 tok  $0.0000
  TOTAL 12s compute · 0 tok · $0.0000 · ledger.json written
- 06:31:13 HALT · failed: ['encode'] · skipped: [] · artifacts in /private/tmp/xweb-alex-0910/runs/verto-motion-20260910-063101
