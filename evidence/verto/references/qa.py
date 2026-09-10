from browser import *
import re,hashlib
OUT=E/'final';rows=[]
def save(): (OUT/'interactions.json').write_text(json.dumps(rows,indent=2))
def check(name,expr):
 value=js(expr);rows.append({'case':name,'passed':bool(value),'observed':value});save();assert value,name
def ref(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*\[[^\]]*ref=(e\d+)\]',s);assert m,(label,s[:1600]);return '@'+m.group(1)
def key(label,role='button'):
 run('focus',ref(label,role));snap();run('press','Enter');snap()
def screen(name):run('screenshot',str(OUT/name))
def waitvideo():run('wait','--fn','document.querySelector("#scene-video").readyState>=2 && !document.querySelector("#scene-video").seeking');snap()
def openpage(w):
 run('set','viewport',str(w),'1000' if w==1440 else '812');snap();run('open','http://127.0.0.1:4174/verto/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-alex-0910/reload.mjs'],check=True);run('wait','500');snap();js('document.querySelector("#lindy-cos-root")?.style.setProperty("display","none")');waitvideo()
for w in [1440,375]:
 openpage(w);screen(f'verto-hero-{w}.png');initial=js('document.querySelector("#scene-video").currentTime');assert initial<.1
 for label,n in [('Branding & Identity [ 01 ]',0),('UI/UX Design [ 02 ]',1),('Creative Direction [ 03 ]',2),('Development [ 04 ]',3)]:
  key(label);check(f'service {n} {w}',f'document.querySelector("[data-service=\\"{n}\\"]").getAttribute("aria-pressed")==="true" && document.querySelectorAll("[data-service][aria-pressed=true]").length===1');screen(f'service-{n}-{w}.png')
 for label in ['Explore Noxen House','Explore Sonnet Print Poster','Explore Smart Earbuds App','Explore Shopping App','Explore Fibespace Studio']:
  key(label);check(f'project {label} {w}','document.querySelector("#project-dialog").open && document.querySelector("#project-description").textContent.length>50');screen(f'project-{label.split()[-1]}-{w}.png');run('press','Escape');snap();check(f'project escape {label} {w}','!document.querySelector("#project-dialog").open')
 key('Next example testimonial');check(f'quote next {w}','document.querySelector("#quote-name").textContent.includes("Alex M.")');key('Previous example testimonial');check(f'quote back {w}','document.querySelector("#quote-name").textContent.includes("Sophia R.")');key('Previous example testimonial');check(f'quote wraps {w}','document.querySelector("#quote-name").textContent.includes("Jamie L.")');screen(f'quote-{w}.png')
 key('Let’s Talk');check(f'brief open {w}','document.querySelector("#brief-dialog").open');screen(f'brief-empty-{w}.png')
 run('fill',ref('Project name','textbox'),'   ');snap();run('fill',ref('Your brief','textbox'),'   ');snap();key('Download my brief ↓');check(f'whitespace validation {w}','document.querySelector("#brief-status").textContent.includes("Add a project name")')
 run('fill',ref('Project name','textbox'),'Field Notes');snap();run('fill',ref('Your brief','textbox'),'A calm identity for a small independent bookshop.\nKeep the typography clear.');snap();key('Close project brief');key('Let’s Talk');check(f'brief survives close {w}','document.querySelector("#brief-notes").value.includes("bookshop")')
 target=Path('/private/tmp/xweb-alex-0910')/f'brief-{w}.txt';run('download',ref('Download my brief ↓'),str(target));snap();actual=target.read_text();assert 'Field Notes' in actual and 'bookshop' in actual and 'No message has been sent' in actual;rows.append({'case':f'actual brief download {w}','passed':True,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()});save();screen(f'brief-download-{w}.png')
 raw=run('a11y','--selector','#brief-dialog','--json');(OUT/f'brief-axe-{w}.json').write_text(raw);assert not json.loads(raw)['data']['violations'];run('press','Escape');snap()
 if w==375:
  run('scroll','up','10000');snap();run('find','text','Menu','click','--exact');snap();check('mobile menu opens','document.querySelector(".mobile-menu").open')
 key('Process');check(f'process opens {w}','document.querySelector("#process-dialog").open && document.querySelectorAll(".process-list li").length===3');screen(f'process-{w}.png');run('press','Escape');snap()
 run('scroll','up','10000');snap();waitvideo();start=js('document.querySelector("#scene-video").currentTime');run('scroll','down','1800');snap();run('wait','400');waitvideo();middle=js('document.querySelector("#scene-video").currentTime');assert middle>start+.5;rows.append({'case':f'scroll advances video {w}','passed':True,'start':start,'middle':middle});save();screen(f'scroll-mid-{w}.png')
 key('Pause motion');before=js('document.querySelector("#scene-video").currentTime');run('scroll','up','1800');snap();run('wait','300');after=js('document.querySelector("#scene-video").currentTime');assert abs(after-before)<.05;check(f'pause freezes scene and rail {w}','document.body.dataset.paused==="true" && document.getAnimations().every(a=>a.playState!=="running")')
 key('Resume motion');run('scroll','up','10000');snap();run('wait','300');waitvideo();check(f'resume and reverse scroll {w}','document.querySelector("#scene-video").currentTime<.1')
 for offset in [0,900,1800,2700,3600,4500,5600]:
  js(f'window.scrollTo(0,{offset})');snap();run('wait','200');waitvideo();screen(f'section-{offset}-{w}.png')
 check(f'all loaded and no overflow {w}','[...document.images].every(i=>i.complete&&i.naturalWidth>0) && document.documentElement.scrollWidth===innerWidth')
 raw=run('a11y','--selector','main','--json');(OUT/f'main-axe-{w}.json').write_text(raw);assert not json.loads(raw)['data']['violations'];run('screenshot',str(OUT/f'verto-full-{w}.png'),'--full')
 print(f'PASS interactions {w}',flush=True)
print(f'{len(rows)} passed checks',flush=True)
