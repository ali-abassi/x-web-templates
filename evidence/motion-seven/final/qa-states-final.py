exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
O=O/'final';results=json.loads((O/"states-final.json").read_text())
for name in ['telemetry-stack','lost-in-flight','reality-studio','direct-cta','quiet-presets','']:
 for width in [1440,375]:
  run('set','viewport',str(width),'1000' if width==1440 else '812');snap();run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-seven-0910/hard-reload.mjs'],check=True,capture_output=True);snap();run('wait','2400' if name=='grid-driver' else '500');snap()
  js('document.querySelectorAll("img").forEach(i=>{i.src="/qa-deliberately-missing-image.png";i.removeAttribute("srcset")})');run('wait','150');snap();run('screenshot',str(O/f'{name or "gallery"}-empty-final-{width}.png'))
  stats=js('({overflow:document.documentElement.scrollWidth>innerWidth,title:document.querySelector("h1").innerText})');results.append({'name':name or 'gallery','width':width,'state':'missing-art',**stats});assert not stats['overflow'],(name,width,'empty')
  run('reload');snap();run('wait','600');snap()
  js('const h=document.querySelector("h1");h.append(document.createTextNode(" "+h.innerText.replaceAll("\\n"," ")));document.querySelectorAll("button").forEach(b=>{if(b.closest("#lindy-cos-root"))return;if(b.textContent.trim().length>5)b.append(document.createTextNode(" "+b.innerText))})');snap();run('screenshot',str(O/f'{name or "gallery"}-long-final-{width}.png'))
  stats=js('({overflow:document.documentElement.scrollWidth>innerWidth,width:document.documentElement.scrollWidth})');results.append({'name':name or 'gallery','width':width,'state':'long-content',**stats});(O/'states-final.json').write_text(json.dumps(results,indent=2));assert not stats['overflow'],(name,width,'long')
 print(name or 'gallery','adverse desktop + phone captured',flush=True)
