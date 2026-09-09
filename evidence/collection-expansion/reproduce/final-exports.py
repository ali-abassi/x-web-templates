exec(open('/private/tmp/xweb-next-references/check-pages.py').read().split('for name in sys.argv[1:]:')[0])
import tempfile,zipfile,hashlib
results=[]
run('set','viewport','375','812');snap();run('open','http://localhost:4173/');snap();run('webmcp','list')
with tempfile.TemporaryDirectory(prefix='xweb-new-exports-') as temp:
 for name in ('aster','horizonx','buzzkit','pixel-world'):
  path=Path(temp)/f'{name}.zip';run('download',f'a[href="downloads/{name}.zip"]',str(path));snap()
  assert path.read_bytes()==(R/'dist/downloads'/f'{name}.zip').read_bytes()
  with zipfile.ZipFile(path) as archive:archive.extractall(temp)
 for name in ('aster','horizonx','buzzkit','pixel-world'):
  run('open',(Path(temp)/name/'dist/index.html').as_uri());snap();run('webmcp','list');run('wait','--load','networkidle');snap()
  for y in range(0,js('document.documentElement.scrollHeight'),700):js(f'window.scrollTo({{top:{y},behavior:"instant"}});true');snap()
  assert js('[...document.images].every(x=>x.complete&&x.naturalWidth>0)')
  assert js('document.documentElement.scrollWidth===innerWidth')
  assert js('document.styleSheets.length>0')
  results.append({'template':name,'download_exact':True,'standalone_file_assets_and_overflow':'pass'})
run('open','http://localhost:4173/');snap();run('webmcp','list')
(O/'export-results.json').write_text(json.dumps(results,indent=2));print('PASS four real browser downloads and four extracted standalone pages')
