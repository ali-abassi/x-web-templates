from pathlib import Path
import subprocess,json,time
R=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');E=R/'evidence/verto';P=['agent-browser','--session','xweb-verto-headed-0910','--profile','Default','--headed','--pin-tab']
def run(*args):
 p=subprocess.run(P+list(args),capture_output=True,text=True)
 with (E/'browser-trace.jsonl').open('a') as f:f.write(json.dumps({'time':time.time(),'args':args,'exit':p.returncode,'out':p.stdout,'err':p.stderr})+'\n')
 assert p.returncode==0,p.stderr
 return p.stdout
def snap():return run('snapshot','-i')
def js(code):return json.loads(run('eval',code,'--json'))['data']['result']
def visit(name,w,phase='baseline'):
 out=E/phase;out.mkdir(exist_ok=True)
 run('set','viewport',str(w),'1000' if w==1440 else '812');snap()
 run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-alex-0910/reload.mjs'],check=True);run('wait','500');snap();js('document.querySelector("#lindy-cos-root")?.style.setProperty("display","none")')
 run('screenshot',str(out/f'{name}-{w}.png'),'--full')
 if w==1440:run('screenshot',str(R/'gallery/assets'/f'{name}.png'))
 stats=js('({url:location.href,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,fonts:document.fonts.status,titleFont:getComputedStyle(document.querySelector("h1")).fontFamily,images:[...document.images].map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0}))})')
 (out/f'{name}-{w}.json').write_text(json.dumps(stats,indent=2));print(json.dumps(stats),flush=True)
if __name__=='__main__':
 import sys
 visit(sys.argv[1],int(sys.argv[2]),sys.argv[3] if len(sys.argv)>3 else 'baseline')
