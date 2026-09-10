exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
import hashlib
O=O/'final';results=[]
def observe(label,expr):
 value=js(expr);results.append({'check':label,'passed':bool(value),'observed':value});(O/'live-interactions.json').write_text(json.dumps(results,indent=2));assert value,label
def enter(sel):
 js('document.querySelector('+json.dumps(sel)+').scrollIntoView({behavior:"instant",block:"center"})');snap();run('focus',sel);run('press','Enter');run('wait','400');snap()
for width in [1440,375]:
 run('set','viewport',str(width),'1000' if width==1440 else '812');snap()
 for name,sel in [('grid-driver','#toggle-helmet'),('clipdock','#copy'),('telemetry-stack','#next'),('lost-in-flight','main a'),('reality-studio','#copy'),('direct-cta','#copy'),('quiet-presets','.photo')]:
  run('open','https://x-web-templates.pages.dev/'+name+'/');snap();run('webmcp','list');run('wait','700');snap();run('errors','--clear')
  enter(sel)
  if name=='grid-driver':observe(name+str(width),'document.querySelector("#toggle-helmet").getAttribute("aria-pressed")==="true"')
  elif name=='clipdock':observe(name+str(width),'document.querySelector("#status").textContent.includes("copied")')
  elif name=='telemetry-stack':observe(name+str(width),'document.querySelector("#scene-status").textContent.includes("Dashboard")')
  elif name=='lost-in-flight':observe(name+str(width),'location.pathname.startsWith("/lost-in-flight/home")')
  elif name in ['reality-studio','direct-cta']:observe(name+str(width),'document.querySelector("#status").textContent.includes("copied")')
  else:observe(name+str(width),'document.querySelector("#selection").textContent.startsWith("Deep work selected")')
  run('screenshot',str(O/f'{name}-live-keyboard-{width}.png'));observe(name+'console'+str(width),'document.documentElement.scrollWidth<=innerWidth');errors=run('errors');(O/f'{name}-live-errors-{width}.txt').write_text(errors or 'No uncaught page exceptions reported.\n')
 print(width,'live keyboard journeys passed',flush=True)
run('set','viewport','1440','1000');snap();run('open','https://x-web-templates.pages.dev/');snap();run('webmcp','list');run('wait','800');snap();run('screenshot',str(O/'gallery-live.png'))
for name in ['grid-driver','clipdock','telemetry-stack','lost-in-flight','reality-studio','direct-cta','quiet-presets']:
 sel='a[href="'+name+'/"]';enter(sel);observe('gallery link '+name,'location.pathname==="/'+name+'/"');run('back');snap();run('webmcp','list')
 sel='a[href="downloads/'+name+'.zip"]';target=Path('/private/tmp/xweb-seven-0910')/('download-'+name+'.zip');run('download',sel,str(target));snap();digest=hashlib.sha256(target.read_bytes()).hexdigest();expected=hashlib.sha256((R/'dist/downloads'/f'{name}.zip').read_bytes()).hexdigest();results.append({'check':'live download '+name,'passed':digest==expected,'sha256':digest});assert digest==expected
(O/'live-interactions.json').write_text(json.dumps(results,indent=2));print('All seven live gallery links and downloaded ZIPs passed',flush=True)
