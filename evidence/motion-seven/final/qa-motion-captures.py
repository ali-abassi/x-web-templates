exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
O=O/'final';run('set','viewport','1440','1000');snap()
for name in ['grid-driver','lost-in-flight','reality-studio','direct-cta']:
 run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list')
 run('record','start',str(O/f'{name}-motion-final.mp4'),'--fps','30');run('reload');snap()
 if name=='grid-driver':
  run('wait','2400');snap();run('mouse','move','680','300');run('wait','300');run('mouse','move','780','400');run('wait','1800');snap();js('document.querySelector("#circuit").scrollIntoView({behavior:"instant"})');snap();run('wait','4300');snap()
 elif name=='lost-in-flight':run('wait','7000');snap();run('click','#pause');snap()
 elif name=='reality-studio':
  for x,y in [(180,300),(400,350),(650,480),(850,600),(1100,450)]:
   run('mouse','move',str(x),str(y));run('wait','350');snap()
  run('wait','2200');snap();run('click','#pause');snap()
 else:
  run('hover','#copy');run('wait','650');snap();run('mouse','move','720','500');run('wait','650');run('hover','.cta.work');run('wait','650');snap();run('click','a[href="#work"]');run('wait','700');snap()
 run('record','stop');print(name,'motion captured',flush=True)
