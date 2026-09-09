from pathlib import Path
import subprocess,json
ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'evidence/redesign/journeys';OUT.mkdir(exist_ok=True)
PREFIX=['agent-browser','--session','xweb-01a0878b']
LOG=OUT/'trace.jsonl'
RESULTS=[]

def run(*args):
 r=subprocess.run(PREFIX+list(args),capture_output=True,text=True)
 with LOG.open('a') as f:f.write(json.dumps({'command':args,'exit':r.returncode,'stdout':r.stdout,'stderr':r.stderr})+'\n')
 assert r.returncode==0,(args,r.stderr)
 return r.stdout

def snapshot():return run('snapshot','-i')
def act(*args):
 result=run(*args);snapshot();return result

def js(code):
 raw=run('eval',code,'--json')
 return json.loads(raw)['data']['result']

def check(code):assert js(code) is True,code

def open_page(name,width):
 act('set','viewport',str(width),'1000' if width==1440 else '812')
 act('open','http://localhost:4173/'+name)
 run('webmcp','list')

def shot(name):run('screenshot',str(OUT/(name+'.png')))

