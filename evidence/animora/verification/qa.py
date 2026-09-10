from browser import *
import re
OUT=E/'final';OUT.mkdir(exist_ok=True);rows=[]
def ref(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,(label,s[-2500:]);return '@'+m.group(1)
def click(label,role='button'):
 run('click',ref(label,role));snap()
def fill(label,value):
 run('fill',ref(label,'textbox'),value);snap()
def check(name,expr):
 v=js(expr);rows.append({'case':name,'passed':bool(v),'observed':v});(OUT/'interactions.json').write_text(json.dumps(rows,indent=2));assert v,name
def screen(name):
 subprocess.run(['node','/private/tmp/xweb-tanzil-0910/capture.mjs',str(OUT/name)],check=True,capture_output=True)
for w in [1440,375]:
 visit('animora',w,'final')
 check(f'layout {w}','innerWidth===document.documentElement.scrollWidth && document.querySelector("h1").textContent.includes("character ")')
 for theme in ['Pink','Orange','Violet','Blue']:
  click(theme+' character');check(f'{theme} palette {w}',f'document.body.dataset.theme==="{theme.lower()}" && document.querySelectorAll(".theme[aria-pressed=true]").length===1')
  a=json.loads(run('a11y','--selector','.scene','--json'));(OUT/f'axe-{theme}-{w}.json').write_text(json.dumps(a,indent=2));assert not a['data']['violations'],(theme,w,a['data']['violations'])
  if w==1440:screen(f'{theme.lower()}-1440.png')
 for label,title in [('Features','Curiosity, in motion.'),('Pricing','Just a little play.'),('About','Meet AnimoraAI.')]:
  click(label);check(f'{label} panel {w}',f'document.querySelector("#panel").open && document.querySelector("#panel-title").textContent==={json.dumps(title)}');run('press','Escape');snap();check(f'{label} focus restored {w}',f'document.activeElement.textContent.trim()==={json.dumps(label)}')
 click('Showcase');check(f'showcase focus {w}','document.activeElement.getAttribute("aria-label")==="Blue character"')
 click('Get Started');fill('Character name','Momo the curious');run('select',ref('Color','combobox'),'violet');snap();check(f'local preset preview {w}','document.body.dataset.theme==="violet"')
 run('press','Escape');snap();click('Get Started');check(f'cancel retains name {w}','document.querySelector("#character-name").value==="Momo the curious"')
 fill('Character name','');click('Download preset ↓');check(f'empty name rejected {w}','!document.querySelector("#character-name").validity.valid')
 fill('Character name',' '*4);click('Download preset ↓');check(f'blank name rejected {w}','document.querySelector("#download-status").textContent.includes("name first")')
 fill('Character name','Momo the curious');click('Download preset ↓');check(f'download initiated {w}','document.querySelector("#download-status").textContent.includes("download is ready")');screen(f'preset-{w}.png')
 a=json.loads(run('a11y','--selector','#panel','--json'));(OUT/f'axe-dialog-{w}.json').write_text(json.dumps(a,indent=2));assert not a['data']['violations'],a['data']['violations']
 click('Close dialog');check(f'CTA focus restored {w}','document.activeElement.textContent.includes("Get Started")')
 # Native keyboard focus and directional gaze, from the visible character group.
 run('focus','#character');snap()
 for key,axis,sign in [('ArrowLeft','x',-1),('ArrowRight','x',1),('ArrowUp','y',-1),('ArrowDown','y',1)]:
  run('press',key);snap();check(f'{key} gaze {w}',f'[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-{axis}"))*{sign}>0)')
 run('press','Home');snap();check(f'home centers {w}','[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))===0)')
 click('Pause tracking Ⅱ');run('mouse','move','80','200');snap();check(f'pause gaze {w}','[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))===0) && document.querySelector("#pause").getAttribute("aria-pressed")==="true"');click('Resume tracking ▷')
 click('Blue character');run('scroll','up','2000');snap()
 if w==1440:
  for x,y in [(100,200),(1400,900),(1300,60),(60,800)]:
   run('mouse','move',str(x),str(y));snap();check(f'pointer bounded {x},{y}','[...document.querySelectorAll(".eye")].every(e=>Math.abs(parseFloat(e.style.getPropertyValue("--eye-x")))<=e.getBoundingClientRect().width*.141 && Math.abs(parseFloat(e.style.getPropertyValue("--eye-y")))<=e.getBoundingClientRect().height*.141)');screen(f'gaze-{x}-{y}.png')
 (OUT/f'errors-{w}.txt').write_text(run('errors'));(OUT/f'network-{w}.json').write_text(run('network','requests','--json'))
 print('PASS main flows',w,flush=True)
visit('animora',320,'final')
check('320 layout','innerWidth===document.documentElement.scrollWidth')
click('Get Started');fill('Character name','W'*40);screen('long-name-320.png');check('maximum name fits','document.querySelector("#panel").scrollWidth===document.querySelector("#panel").clientWidth');run('press','Escape');snap()
print(len(rows),'checks passed')
