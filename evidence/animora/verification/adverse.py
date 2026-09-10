from browser import *
import re
OUT=E/'final';rows=[]
def click(label):
 s=snap();m=re.search(r'button "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,label;run('click','@'+m.group(1));snap()
def check(name,expr):
 v=js(expr);rows.append({'case':name,'passed':bool(v),'observed':v});(OUT/'adverse.json').write_text(json.dumps(rows,indent=2));assert v,name
visit('animora',320,'final')
click('Get Started');run('fill','#character-name','<script>alert(1)</script>');snap()
js('window.savedCreate=URL.createObjectURL;URL.createObjectURL=()=>{throw new Error("Injected download failure")};true');snap();click('Download preset ↓');check('blocked export preserves literal input','document.querySelector("#download-status").textContent.includes("could not start") && document.querySelector("#character-name").value==="<script>alert(1)</script>" && !document.querySelector("#preset script")')
run('screenshot',str(OUT/'blocked-export-320.png'));js('URL.createObjectURL=window.savedCreate;true');snap();click('Download preset ↓');check('export retry recovers','document.querySelector("#download-status").textContent.includes("download is ready")');run('press','Escape');snap()
js('document.querySelector(".character-art").src="assets/injected-missing.png"');snap();run('wait','--fn','document.querySelector(".character").classList.contains("art-unavailable")');snap();check('art failure offers truthful recovery','!document.querySelector(".art-error").hidden && document.documentElement.scrollWidth===320');subprocess.run(['node','/private/tmp/xweb-tanzil-0910/capture.mjs',str(OUT/'missing-art-320.png'),'full'],check=True);click('Orange character');check('art failure keeps colors usable','document.body.dataset.theme==="orange"');click('Get Started');check('art failure retains draft','document.querySelector("#character-name").value==="<script>alert(1)</script>"');run('press','Escape');snap()
run('open','http://127.0.0.1:4176/animora/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-tanzil-0910/reload.mjs'],check=True);run('wait','--fn','document.querySelector(".character-art").naturalWidth>0');snap();check('reload restores clean art','!document.querySelector(".art-error").getClientRects().length && document.querySelector("#character-name").value==="Momo"')
# Check the touch-specific change did not stop mouse leave from centering the eyes.
run('set','viewport','1440','1000');snap();run('mouse','move','100','200');snap();check('mouse tracks after touch fix','[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))<0)');run('mouse','move','-1','-1');snap();check('mouse leave still centers','[...document.querySelectorAll(".eye")].every(e=>parseFloat(e.style.getPropertyValue("--eye-x"))===0)')
print(len(rows),'adverse checks pass')
