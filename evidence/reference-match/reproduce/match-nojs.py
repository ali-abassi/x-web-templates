from pathlib import Path
exec((Path(__file__).parent / "helpers.py").read_text())
OUT=ROOT/'evidence/reference-match/no-js';OUT.mkdir(exist_ok=True);LOG=OUT/'trace.jsonl'
for width in (1440,375):
 for name in ('alpine-notes','rainbow-venture','bloop','furion',''):
  open_page(name+'/',width)
  if name=='rainbow-venture':act('click','#apply > summary')
  check("typeof templateUI === 'undefined'")
  if name in ('alpine-notes','rainbow-venture'):
   check("[...document.querySelectorAll('fieldset')].every(x=>x.disabled) && [...document.querySelectorAll('noscript')].some(x=>x.getBoundingClientRect().height>0)")
  if name in ('furion','rainbow-venture','bloop'):
   act('focus','details summary');act('press','Enter');check("document.querySelector('details').open")
  if name in ('furion','bloop'):
   act('download','a[download]',str(OUT/f'brand-{width}.txt'))
  shot(f'{name or "gallery"}-{width}')
  print(name or 'gallery',width,flush=True)
print('Disabled-JavaScript cases passed')
