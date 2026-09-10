from browser import *
import hashlib,zipfile,json
out=E/'final';run('open','http://127.0.0.1:4176/');snap();run('webmcp','list')
assert js('document.querySelectorAll(".template-grid article").length')==22
run('download','a[href="downloads/animora.zip"]',str(out/'local-animora.zip'));snap()
assert (out/'local-animora.zip').read_bytes()==(R/'dist/downloads/animora.zip').read_bytes()
folder=Path('/private/tmp/xweb-tanzil-0910/standalone')
with zipfile.ZipFile(out/'local-animora.zip')as z:z.extractall(folder)
run('open',(folder/'animora/dist/index.html').as_uri());snap();run('webmcp','list');run('wait','--fn','document.querySelector(".character-art").naturalWidth>0');snap()
run('find','role','button','click','--name','Pink character');snap()
run('focus','#character');snap();run('press','ArrowRight');snap()
v=js('({protocol:location.protocol,theme:document.body.dataset.theme,eyes:[...document.querySelectorAll(".eye")].map(e=>parseFloat(e.style.getPropertyValue("--eye-x"))),overflow:document.documentElement.scrollWidth>innerWidth})');assert v['protocol']=='file:'and v['theme']=='pink'and all(x>0 for x in v['eyes'])and not v['overflow'];(out/'local-standalone.json').write_text(json.dumps(v,indent=2));print('Local gallery22, realZIPdownload, file:// palette and keyboard gaze passed')
