exec(open('/private/tmp/xweb-next-references/check-pages.py').read().split('for name in sys.argv[1:]:')[0])
import shutil
results=[]
run('set','media','light');snap()
assert not js('matchMedia("(prefers-reduced-motion: reduce)").matches')
for name,w,h in [('horizonx',1640,1080),('buzzkit',1710,1080),('pixel-world',1718,971),('',1440,1000),('',375,812),('',320,812)]:
 run('set','viewport',str(w),str(h));snap();run('open','http://localhost:4173/'+(name+'/' if name else ''));snap();run('webmcp','list');run('wait','--load','networkidle');snap()
 assert js('location.pathname==='+json.dumps('/'+name+'/' if name else '/') ),(name,'wrong page')
 assert js('document.documentElement.scrollWidth===innerWidth'),(name,'overflow')
 assert js('[...document.images].every(x=>x.complete&&x.naturalWidth>0)')
 run('screenshot',str(O/f'{name or "gallery"}-final-{w}.png'))
 if name:
  shutil.copyfile(O/f'{name}-final-{w}.png',R/'gallery/assets'/f'{name}.png')
  run('record','start',str(O/f'{name}-motion.mp4'));run('wait','6500');snap();run('record','stop')
 results.append({'page':name or 'gallery','width':w,'height':h,'pass':True})
(O/'final-captures.json').write_text(json.dumps(results,indent=2))
print('PASS',len(results),'final rendered cases')
