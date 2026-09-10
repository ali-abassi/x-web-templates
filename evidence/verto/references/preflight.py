from pathlib import Path
import json,hashlib
r=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');p=r/'templates/verto/dist/assets/portrait.png';assert p.is_file() and p.stat().st_size>100000
plan=json.loads((r/'evidence/verto/plan.json').read_text());assert plan['budget']['video_calls_max']==2
assert not (r/'evidence/verto/references/motion-source.mp4').exists(), 'Do not duplicate paid video generation'
print(json.dumps({'anchor_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'model':'minimax/h3-max/image-to-video','seconds':6,'resolution':'768P','estimate_usd':0.12,'attempt':1,'safety_checker':True}))
