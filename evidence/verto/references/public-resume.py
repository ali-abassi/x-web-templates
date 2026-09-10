from browser import *
import re,hashlib
OUT=E/'final';results=json.loads((E/'final/public.json').read_text())
def key(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,(label,s[:600]);run('focus','@'+m.group(1));snap();run('press','Enter');snap()
def check(name,expr):
 d=js(expr);results.append({'case':name,'passed':bool(d),'observed':d});(OUT/'public.json').write_text(json.dumps(results,indent=2));assert d,name
check('public services','document.querySelectorAll("[data-service]")[1].getAttribute("aria-pressed")==="true"');key('Explore Sonnet Print Poster');check('public project details','document.querySelector("#project-dialog").open');run('press','Escape');snap();check('public close project','!document.querySelector("#project-dialog").open')
run('set','viewport','375','812');snap();key('Let’s Talk')
for label,value in [('Project name','Public release check'),('Your brief','A local project brief from the deployed Verto template.')]:
 s=snap();m=re.search('textbox "'+label+'"[^\n]*ref=(e\\d+)',s);assert m;run('fill','@'+m.group(1),value);snap()
s=snap();m=re.search('button "Download my brief ↓"[^\n]*ref=(e\\d+)',s);dest=Path('/private/tmp/xweb-alex-0910/public-brief.txt');run('download','@'+m.group(1),str(dest));snap();assert 'Public release check' in dest.read_text();check('public mobile export feedback','document.querySelector("#brief-status").textContent.includes("Download requested") && document.documentElement.scrollWidth===innerWidth');run('screenshot',str(OUT/'verto-public-brief-375.png'));run('press','Escape');snap();js('window.scrollTo({top:0,behavior:"instant"})');snap();run('wait','300');run('screenshot',str(OUT/'verto-public-375.png'))
print(f'{len(results)} public checks passed',flush=True)
