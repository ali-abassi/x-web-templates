from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,hashlib,time
r=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');expected=json.loads((r/'evidence/motion-seven/final/deployment-input.json').read_text());results=[]
def check(item):
 name,digest=item;url='https://x-web-templates.pages.dev/'+name
 p=subprocess.run(['curl','--fail','--silent','--show-error','--location','--max-time','40',url],capture_output=True)
 actual=hashlib.sha256(p.stdout).hexdigest();return {'path':name,'bytes':len(p.stdout),'sha256':actual,'match':p.returncode==0 and actual==digest,'error':p.stderr.decode()[:200]}
first=check(('index.html',expected['index.html']));assert first['match'],first
with ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(check,expected.items()))
(r/'evidence/motion-seven/final/live-bytes.json').write_text(json.dumps({'origin':'https://x-web-templates.pages.dev','time':time.time(),'results':results},indent=2));failed=[x for x in results if not x['match']];print({'checked':len(results),'matched':len(results)-len(failed),'failed':failed});assert not failed
