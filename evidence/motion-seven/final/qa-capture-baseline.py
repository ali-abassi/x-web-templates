from pathlib import Path
import subprocess,json,time
R=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');O=R/'evidence/motion-seven';P=['agent-browser','--session','xweb-references-0910']
(O/'baseline').mkdir(exist_ok=True)
def run(*args):
 p=subprocess.run(P+list(args),capture_output=True,text=True)
 with (O/'browser-trace.jsonl').open('a') as f:f.write(json.dumps({'time':time.time(),'args':args,'exit':p.returncode,'out':p.stdout,'err':p.stderr})+'\n')
 assert p.returncode==0,p.stderr
 return p.stdout
def snap():run('snapshot','-i')
def js(code):return json.loads(run('eval',code,'--json'))['data']['result']
for name in ['clipdock','telemetry-stack','lost-in-flight','reality-studio','direct-cta','quiet-presets']:
 for w in [1440,375]:
  run('set','viewport',str(w),'1000' if w==1440 else '812');snap()
  run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list')
  run('wait','600');snap()
  run('screenshot',str(O/'baseline'/f'{name}-{w}.png'))
  stats=js('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,images:[...document.images].map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0}))})')
  (O/'baseline'/f'{name}-{w}.json').write_text(json.dumps(stats,indent=2))
 print(name,'baseline captured',flush=True)
