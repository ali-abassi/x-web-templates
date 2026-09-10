exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
import sys
O=O/'final';mode=sys.argv[1] if len(sys.argv)>1 else 'reduced';out=[]
for name in ['grid-driver','telemetry-stack']:
 for width in [1440,375]:
  run('set','viewport',str(width),'1000' if width==1440 else '812');snap();run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');run('wait','800');snap()
  stats=js('({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector("h1").textContent,animations:document.getAnimations().filter(a=>a.playState==="running").length,ready:document.body.classList.contains("motion-ready"),buttons:[...document.querySelectorAll("button")].filter(b=>!b.closest("#lindy-cos-root")).map(b=>({id:b.id,disabled:b.disabled})),images:[...document.images].map(i=>({src:i.getAttribute("src"),ok:i.complete&&i.naturalWidth>0}))})')
  assert not stats['overflow'],(name,width,mode)
  if mode=='nojs':assert not stats['ready']
  if mode=='reduced':assert stats['animations']==0,(name,stats['animations'])
  out.append({'name':name or 'gallery','width':width,**stats});(O/f'{mode}-refresh-results.json').write_text(json.dumps(out,indent=2));run('screenshot',str(O/f'{name or "gallery"}-{mode}-refresh-{width}.png'))
 print(name or 'gallery',mode,'passed',flush=True)
