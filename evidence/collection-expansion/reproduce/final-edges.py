exec(open('/private/tmp/xweb-next-references/check-pages.py').read().split('for name in sys.argv[1:]:')[0])
results=[]
run('set','media','light');snap()
for width in (1440,375):
 for name in ('aster','horizonx','pixel-world',''):
  run('set','viewport',str(width),'1000' if width==1440 else '812');snap();run('open','http://localhost:4173/'+(name+'/' if name else ''));snap();run('webmcp','list');run('wait','--load','networkidle');snap()
  assert js('location.pathname==='+json.dumps('/'+name+'/' if name else '/'))
  run('screenshot',str(O/f'{name or "gallery"}-{width}.png'))
  if name=='aster':
   js('document.querySelector(".choice-row button").scrollIntoView({behavior:"instant",block:"center"});true');snap();run('click','.choice-row button:first-child');snap()
   assert js('document.querySelector(".choice-row button").getAttribute("aria-pressed")==="true"')
   js('document.querySelector(".faq summary").scrollIntoView({behavior:"instant",block:"center"});true');snap();was_open=js('document.querySelector(".faq details").open');run('focus','.faq details:first-child summary');run('press','Enter');snap()
   assert js('document.querySelector(".faq details").open') != was_open
  if name=='horizonx':
   js('document.querySelector("h1").textContent="Horizon Exploration";document.querySelector(".cosmos").remove();document.querySelector(".ship").remove();true');snap()
   assert js('document.documentElement.scrollWidth===innerWidth')
   run('screenshot',str(O/f'horizonx-adverse-{width}.png'))
  if name=='':
   assert js('document.querySelectorAll(".template-grid article").length===8&&document.querySelectorAll("a[download]").length===8')
   js('document.querySelector(".template-info h2").textContent="A much longer template title for the collection";document.querySelector(".cover img").removeAttribute("src");true');snap()
   assert js('document.documentElement.scrollWidth===innerWidth')
   run('screenshot',str(O/f'gallery-adverse-{width}.png'))
  results.append({'page':name or 'gallery','width':width,'pass':True})
(O/'final-edges.json').write_text(json.dumps(results,indent=2));print('PASS',len(results),'final edge/refresh cases')
