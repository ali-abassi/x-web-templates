from pathlib import Path
import subprocess,json,sys
R=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates'); O=R/'evidence/collection-expansion';P=['agent-browser','--session','xweb-references-0910']
def run(*args):
 p=subprocess.run(P+list(args),capture_output=True,text=True)
 with (O/'browser-trace.jsonl').open('a') as f:f.write(json.dumps({'args':args,'exit':p.returncode,'out':p.stdout,'err':p.stderr})+'\n')
 assert p.returncode==0,p.stderr
 return p.stdout
def snap():run('snapshot','-i')
def js(code):return json.loads(run('eval',code,'--json'))['data']['result']
for name in sys.argv[1:]:
 for w in [1440,375,320]:
  run('set','viewport',str(w),'1000' if w==1440 else '812');snap()
  run('open','http://localhost:4173/'+name+'/');snap();run('webmcp','list')
  run('wait','--load','networkidle');snap()
  assert js('document.documentElement.scrollWidth===innerWidth'),(name,w,'overflow')
  run('screenshot',str(O/f'{name}-{w}.png'))
  for y in range(0,js('document.documentElement.scrollHeight'),700):
   js(f'window.scrollTo({{top:{y},behavior:"instant"}});true');snap()
  assert js('[...document.images].every(x=>x.complete&&x.naturalWidth>0)'),(name,w,'images')
  run('screenshot',str(O/f'{name}-{w}-full.png'),'--full')
  if name=='aster' and w==375:
   js('window.scrollTo({top:0,behavior:"instant"});true');snap();run('find','role','button','click','--name','Open menu');snap()
   assert js('document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded")==="true"')
   run('press','Escape');snap()
   assert js('document.querySelector("[data-nav-toggle]").getAttribute("aria-expanded")==="false"')
  if name=='horizonx':
   js('window.scrollTo({top:0,behavior:"instant"});true');snap();run('find','role','button','click','--name','Pause motion');snap()
   assert js('document.body.classList.contains("paused")')
   run('find','role','link','click','--name','Careers','--exact');snap()
   assert js('document.querySelector("#careers").open')
 print(name,'passed desktop,375,320 and interaction checks',flush=True)
