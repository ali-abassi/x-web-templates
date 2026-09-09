from pathlib import Path
exec((Path(__file__).parent / "helpers.py").read_text())
OUT=ROOT/'evidence/reference-match/renders';OUT.mkdir(exist_ok=True);LOG=OUT/'trace.jsonl'
for name in ('alpine-notes','rainbow-venture','bloop','furion'):
 for width in (1440,375,320):
  open_page(name+'/',width)
  
  for y in range(0,js('document.documentElement.scrollHeight'),650):
   js(f'window.scrollTo(0,{y});true');run('wait','--load','networkidle');snapshot()
  act('scroll','up','20000')
  check('document.documentElement.scrollWidth===innerWidth')
  check('[...document.images].every(x=>x.complete&&x.naturalWidth>0)')
  run('screenshot',str(OUT/f'{name}-{width}.png'),'--full')
  if width!=320:(OUT/f'{name}-{width}-a11y.json').write_text(run('a11y','--selector','main','--json'))
 print(name,'rendered',flush=True)
