from pathlib import Path
exec((Path(__file__).parent / "helpers.py").read_text())
import zipfile,tempfile
OUT=ROOT/'evidence/reference-match/edges';OUT.mkdir(exist_ok=True);LOG=OUT/'trace.jsonl'
for width in (1440,375):
 open_page('',width)
 for name in ('alpine-notes','rainbow-venture','bloop','furion'):
  path=OUT/f'{name}-{width}.zip';act('download',f'a[href="downloads/{name}.zip"]',str(path));assert path.read_bytes()==(ROOT/f'dist/downloads/{name}.zip').read_bytes()
 for name in ('','alpine-notes','rainbow-venture','bloop','furion'):
  open_page(name+'/',width);act('set','media','light','reduced-motion');check("getComputedStyle(document.documentElement).scrollBehavior==='auto'")
  act('focus','.skip');shot(f'{name or "gallery"}-{width}-focus');act('press','Enter');check("location.hash==='#main'")
  if name in ('bloop','furion'):
   selector='.story-card p' if name=='bloop' else '.template-tools p'
   js(f"document.querySelector('{selector}').textContent='A longer template story. '.repeat(15);document.querySelector('main img').src='missing-fixture.jpg';true")
   if name=='furion':act('click','.template-tools summary')
  if not name:js("document.querySelector('.template-info h2').textContent='A long and thoughtful title for a creative template collection';document.querySelector('.cover img').src='missing-fixture.jpg';true")
  check('document.documentElement.scrollWidth===innerWidth');run('screenshot',str(OUT/f'{name or "gallery"}-{width}-adverse.png'),'--full')
 print('Gallery and adverse checks',width,flush=True)
with tempfile.TemporaryDirectory(prefix='xweb-reference-exports-') as tmp:
 for name in ('alpine-notes','rainbow-venture','bloop','furion'):
  with zipfile.ZipFile(ROOT/f'dist/downloads/{name}.zip') as z:z.extractall(tmp)
  act('open',(Path(tmp)/name/'dist/index.html').as_uri());run('webmcp','list');check("typeof templateUI==='object'")
  for y in range(0,js('document.documentElement.scrollHeight'),650):
   js(f'window.scrollTo(0,{y});true');run('wait','--load','networkidle')
  check("[...document.images].every(x=>x.complete&&x.naturalWidth>0)")
  check('document.documentElement.scrollWidth===innerWidth');shot(name+'-standalone')
 print('Four standalone ZIPs passed')
