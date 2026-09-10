exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
O=O/'final'
for name in ['grid-driver','reality-studio','lost-in-flight']:
 for width in [1440,375,320]:
  run('set','viewport',str(width),'1000' if width==1440 else '812');snap();run('open','http://127.0.0.1:4173/'+name+'/');snap();run('webmcp','list');run('wait','700');snap()
  if name=='grid-driver':
   run('click','#toggle-helmet');snap();js('window.scrollTo({top:0,behavior:"instant"})');snap()
  run('screenshot',str(O/f'{name}-final-{width}.png'))
  assert js('document.documentElement.scrollWidth===innerWidth'),(name,width)
  audit=json.loads(run('a11y','--selector','body > main,body > header,body > nav','--json'));(O/f'{name}-final-{width}-a11y.json').write_text(json.dumps(audit,indent=2))
 print(name,'final refresh passed',flush=True)
