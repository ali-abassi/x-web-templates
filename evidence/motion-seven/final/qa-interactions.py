exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
O=O/'final';O.mkdir(exist_ok=True);results=json.loads((O/"interaction-results.json").read_text())
def click(sel):
 js('document.querySelector('+json.dumps(sel)+').scrollIntoView({behavior:"instant",block:"center"})');snap();run('click',sel);snap()
def check(label,expr):
 value=js(expr)
 if not value:
  run('wait','700');snap();value=js(expr)
 results.append({'check':label,'passed':bool(value),'observed':value});(O/'interaction-results.json').write_text(json.dumps(results,indent=2));assert value,label
for width in [1440,375]:
 run('set','viewport',str(width),'1000' if width==1440 else '812');snap()
 for name in ['grid-driver','clipdock','telemetry-stack','lost-in-flight','reality-studio','direct-cta','quiet-presets']:
  if width==1440 and name in ['grid-driver','clipdock','telemetry-stack','lost-in-flight']:continue
  run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');run('wait','600');snap()
  if width==1440:run('record','start',str(O/f'{name}-motion.mp4'),'--fps','30')
  if name=='grid-driver':
   click('#toggle-helmet');check('helmet toggle '+str(width),'document.querySelector("#toggle-helmet").getAttribute("aria-pressed")==="true"');run('screenshot',str(O/f'grid-helmet-{width}.png'));click('#toggle-helmet');click('#replay-lap');run('wait','500');snap();click('#pause');check('driver paused '+str(width),'document.querySelector("#pause").getAttribute("aria-pressed")==="true"');click('#pause');run('wait','4200');snap();check('circuit completes '+str(width),'document.querySelector("#lap-status").textContent.includes("complete")')
  elif name=='clipdock':
   if width==375:
    click('.mobile-menu summary');check('mobile menu opens','document.querySelector(".mobile-menu").open');click('.mobile-menu a');check('menu closes on navigation','!document.querySelector(".mobile-menu").open')
   click('#tab-prompts');run('press','ArrowRight');snap();check('clip keyboard category '+str(width),'document.activeElement.id==="tab-colors"');run('fill','#clip-text','My local edited clip');snap();click('#tab-history');click('#tab-colors');check('clip drafts retained '+str(width),'document.querySelector("#clip-text").value==="My local edited clip"');click('#copy');check('actual clipboard success '+str(width),'document.querySelector("#status").textContent.includes("Clip copied")');run('fill','#clip-text','   ');snap();click('#copy');check('empty clip rejected '+str(width),'document.querySelector("#status").textContent.includes("Write something")');run('fill','#clip-text','Keep this text');snap();js('navigator.clipboard.writeText=()=>Promise.reject(new Error("QA denied clipboard"))');click('#copy');check('clipboard denied keeps text '+str(width),'document.querySelector("#clip-text").value==="Keep this text"&&document.querySelector("#status").textContent.includes("Copy unavailable")')
  elif name=='telemetry-stack':
   click('#pause');check('first pause works '+str(width),'document.body.classList.contains("paused")&&document.querySelector("#pause").textContent==="Play"');before=js('document.querySelector("#scene-label").textContent');run('wait','6300');snap();check('paused scene stable '+str(width),'document.querySelector("#scene-label").textContent==='+json.dumps(before));
   for i in range(9):
    click('#next');check('scene visible '+str(width)+' '+str(i),'[...document.querySelectorAll(".dashboard-scene")].filter(s=>!s.hidden).length===1')
   run('focus','#demo');snap();run('press','ArrowRight');snap();check('keyboard dashboard '+str(width),'document.querySelector("#scene-status").textContent.includes("Dashboard")');run('fill','#email','qa@example.com');snap();click('#demo-form button');check('local demo truthful '+str(width),'document.querySelector("#form-status").textContent.includes("No account created")');click('#pause');before=js('document.querySelector("#scene-label").textContent');run('wait','6300');snap();check('autoplay resumes '+str(width),'document.querySelector("#scene-label").textContent!=='+json.dumps(before))
  elif name=='lost-in-flight':
   run('wait','1200');click('#pause');check('planes paused '+str(width),'document.body.classList.contains("paused")');click('main a');check('real local home '+str(width),'location.pathname.endsWith("/home.html")');run('back');snap()
  elif name=='reality-studio':
   run('mouse','move','180','300');run('mouse','move','250','360');snap();check('bounded pointer trail '+str(width),'document.querySelectorAll(".trace").length===24');click('#pause');check('gradient paused '+str(width),'document.body.classList.contains("paused")');click('a[href="#services"]');check('services reveal '+str(width),'document.querySelector("#services").open');click('#copy');check('contact copied '+str(width),'document.querySelector("#status").textContent.includes("Email copied")')
  elif name=='direct-cta':
   click('#copy');check('direct copy '+str(width),'document.querySelector("#status").textContent.includes("Email copied")');click('a[href="#work"]');check('work reveal '+str(width),'document.querySelector("#work").open');js('navigator.clipboard.writeText=()=>Promise.reject(new Error("QA denied clipboard"))');click('#copy');check('direct denied feedback '+str(width),'document.querySelector("#status").textContent.includes("Copy unavailable")')
  else:
   click('#next');run('wait','650');snap();check('preset rail moves '+str(width),'document.querySelector("#rail").scrollLeft>100');click('.photo[data-name="Family time"]');check('preset selection '+str(width),'document.querySelector("#selection").textContent.startsWith("Family time selected")');run('press','ArrowRight');snap();run('wait','600');snap();check('rail keyboard within page '+str(width),'document.documentElement.scrollWidth===innerWidth')
  run('screenshot',str(O/f'{name}-interacted-{width}.png'))
  if width==1440:run('record','stop')
  print(name,width,'interaction passed',flush=True)
