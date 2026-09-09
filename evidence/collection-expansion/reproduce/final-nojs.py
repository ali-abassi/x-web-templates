exec(open('/private/tmp/xweb-next-references/check-pages.py').read().split('for name in sys.argv[1:]:')[0])
results=[]
for w in (1440,375):
 for name in ('horizonx','buzzkit','pixel-world',''):
  run('set','viewport',str(w),'812');snap();run('open','http://localhost:4173/'+name+'/');snap();run('webmcp','list')
  assert js('!document.body.classList.contains("motion-ready")')
  assert js('document.documentElement.scrollWidth===innerWidth')
  if name=='buzzkit': assert js('[...document.querySelectorAll("[data-screen],#copy-prompt")].every(x=>x.disabled)')
  if name=='pixel-world': assert js('document.querySelector("#contact").open&&document.querySelector("#contact form").hidden')
  run('screenshot',str(O/f'{name or "gallery"}-nojs-{w}.png'))
  results.append({'page':name or 'gallery','width':w,'pass':True})
(O/'nojs-results.json').write_text(json.dumps(results,indent=2))
print('PASS',len(results),'JavaScript-disabled cases')
