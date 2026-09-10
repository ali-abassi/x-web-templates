from browser import *
import re
OUT=E/'final';results=[]
def key(label,role='button'):
 s=snap();m=re.search(r'\b'+role+r' "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,label;run('focus','@'+m.group(1));snap();run('press','Enter');snap()
def field(label,value):
 s=snap();m=re.search(r'textbox "'+re.escape(label)+r'"[^\n]*ref=(e\d+)',s);assert m,label;run('fill','@'+m.group(1),value);snap()
def check(name,expression):
 data=js(expression);results.append({'case':name,'passed':bool(data),'observed':data});(OUT/'adverse.json').write_text(json.dumps(results,indent=2));assert data,name
run('set','viewport','320','812');snap();run('open','http://127.0.0.1:4174/verto/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-alex-0910/reload.mjs'],check=True);run('wait','300');snap();js('document.querySelector("#lindy-cos-root")?.style.setProperty("display","none")')
for y in [0,900,1800,2700,3600,4500,5600,6600]:
 js(f'window.scrollTo({{top:{y},behavior:"instant"}})');snap();run('wait','180');check(f'no overflow 320 at {y}','document.documentElement.scrollWidth===innerWidth')
run('screenshot',str(OUT/'verto-full-320.png'),'--full');js('window.scrollTo({top:0,behavior:"instant"})');snap();run('screenshot',str(OUT/'verto-hero-320.png'))
key('Let’s Talk');field('Project name','A very long but valid project name for an independent art and design studio');field('Your brief','A'*5000);check('long form fits','document.querySelector("#brief-notes").value.length===5000 && document.documentElement.scrollWidth===innerWidth');js('window.vertoCreateURL=URL.createObjectURL;URL.createObjectURL=()=>{throw new Error("QA simulated blocked download")};');key('Download my brief ↓');check('blocked export preserves and selects notes','document.querySelector("#brief-status").textContent.includes("Download unavailable") && document.querySelector("#brief-notes").value.length===5000 && document.querySelector("#brief-notes").selectionEnd===5000');run('screenshot',str(OUT/'export-failure-320.png'));js('URL.createObjectURL=window.vertoCreateURL;delete window.vertoCreateURL');run('press','Escape');snap()
js('document.querySelector("#scene-video").src="assets/qa-missing-video.mp4";document.querySelector("#service-image-a").src="assets/qa-missing-art.png"');snap();run('wait','350');check('missing video and artwork recover','document.querySelector("#scene-video").hidden && document.querySelector("#service-image-a").hidden && document.querySelector(".portrait").naturalWidth>0 && document.querySelector("#media-status").textContent.length>30');key('Let’s Talk');check('brief remains usable after missing media','document.querySelector("#brief-dialog").open && document.querySelector("#brief-notes").value.length===5000');run('screenshot',str(OUT/'media-failure-320.png'));run('press','Escape');snap()
print(f'{len(results)} adverse/320 checks passed',flush=True)
