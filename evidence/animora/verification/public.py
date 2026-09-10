from browser import *
import re,hashlib,zipfile
out=E/'final';rows=[]
def ref(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,label;return '@'+m.group(1)
def click(label,role='button'):
 run('click',ref(label,role));snap()
def check(name,expr):
 v=js(expr);rows.append({'case':name,'passed':bool(v),'observed':v});(out/'public.json').write_text(json.dumps(rows,indent=2));assert v,name
run('set','viewport','1440','1000');snap();run('open','https://x-web-templates.pages.dev/');snap();run('webmcp','list');run('wait','--fn','document.querySelectorAll(".template-grid article").length===22');snap();check('gallery has22','document.querySelectorAll(".template-grid article").length===22');run('scrollintoview',ref('Preview AnimoraAI','link'));snap();subprocess.run(['node','/private/tmp/xweb-tanzil-0910/capture.mjs',str(out/'public-gallery.png')],check=True)
click('Preview AnimoraAI','link');run('webmcp','list');run('wait','--fn','document.querySelector(".character-art").naturalWidth>0');snap();check('public assets and baseline','location.pathname==="/animora/" && document.querySelector(".character-art").naturalWidth>0 && document.body.dataset.theme==="blue" && document.documentElement.scrollWidth===1440');subprocess.run(['node','/private/tmp/xweb-tanzil-0910/capture.mjs',str(out/'public-animora.png')],check=True)
run('mouse','move','100','200');snap();check('public pointer gaze','[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))<0)');run('screenshot',str(out/'public-gaze.png'))
click('Orange character');check('public palette','document.body.dataset.theme==="orange"');click('Get Started');run('fill',ref('Character name','textbox'),'Live Animora');snap();run('download','#preset button[type=submit]',str(out/'public-preset.json'));snap();data=json.loads((out/'public-preset.json').read_text());assert data['name']=='Live Animora'and data['color']=='orange';rows.append({'case':'real public preset download','passed':True});run('press','Escape');snap();check('public dialog focus return','document.activeElement.textContent.includes("Get Started")')
run('set','viewport','375','812');snap();check('public mobile no overflow','document.documentElement.scrollWidth===375');click('Violet character');run('focus','#character');snap();run('press','ArrowLeft');snap();check('public mobile keyboard gaze','document.body.dataset.theme==="violet" && [...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))<0)');subprocess.run(['node','/private/tmp/xweb-tanzil-0910/capture.mjs',str(out/'public-mobile.png'),'full'],check=True)
(out/'public-errors.txt').write_text(run('errors'))
run('open','https://x-web-templates.pages.dev/');snap();run('webmcp','list');run('download','a[href="downloads/animora.zip"]',str(out/'public-animora.zip'));snap();assert (out/'public-animora.zip').read_bytes()==(R/'dist/downloads/animora.zip').read_bytes();rows.append({'case':'public ZIP exact bytes','passed':True})
extract=Path('/private/tmp/xweb-tanzil-0910/public-unzipped')
with zipfile.ZipFile(out/'public-animora.zip')as z:z.extractall(extract)
run('open',(extract/'animora/dist/index.html').as_uri());snap();run('webmcp','list');run('wait','--fn','document.querySelector(".character-art").naturalWidth>0');snap();check('public ZIP standalone','location.protocol==="file:" && document.querySelector(".character-art").naturalWidth>0');click('Pink character');run('focus','#character');snap();run('press','ArrowRight');snap();check('public standalone theme and gaze','document.body.dataset.theme==="pink" && [...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))>0)')
print(len(rows),'public and standalone checks pass')
