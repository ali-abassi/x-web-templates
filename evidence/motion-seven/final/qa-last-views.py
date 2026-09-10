exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
import shutil
O=O/'final'
for name in ['telemetry-stack','']:
 for width in [1440,375,320]:
  run('set','viewport',str(width),'1000' if width==1440 else '812');snap();run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');subprocess.run(['node','/private/tmp/xweb-seven-0910/hard-reload.mjs'],check=True,capture_output=True);run('wait','500');snap();run('errors','--clear');run('screenshot',str(O/f'{name or "gallery"}-final-{width}.png'))
  stats=js('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0}))})');assert stats['width']==stats['scrollWidth'];(O/f'{name or "gallery"}-final-{width}.json').write_text(json.dumps(stats,indent=2))
  if width==1440:
   audit=json.loads(run('a11y','--selector','body > header,body > main,body > footer','--json'));(O/f'{name or "gallery"}-final-a11y.json').write_text(json.dumps(audit,indent=2))
   assert not audit['data']['violations'],name
 print(name or 'gallery','final normal state passed',flush=True)
run('set','viewport','1440','1000');snap();run('open','http://127.0.0.1:4173/direct-cta/');snap();run('webmcp','list');run('record','start',str(O/'direct-cta-hover.mp4'),'--fps','30');run('hover','#copy');run('wait','700');snap();run('hover','a[href="#work"]');run('wait','700');snap();run('click','a[href="#work"]');run('wait','900');snap();run('record','stop')
for name in ['grid-driver','clipdock','telemetry-stack','reality-studio','direct-cta','quiet-presets']:
 run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');js('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})');snap();run('wait','400');snap();run('screenshot',str(O/f'{name}-full.png'),'--full')
 errors=run('errors');(O/f'{name}-console.txt').write_text(errors or 'No uncaught page exceptions reported.\n');print(name,'full-page captured',flush=True)
