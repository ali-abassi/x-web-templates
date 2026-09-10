exec(open('/private/tmp/xweb-seven-0910/capture-baseline.py').read().split('for name in [')[0])
import zipfile
O=O/'final';dest=Path('/private/tmp/xweb-seven-0910/extracted');dest.mkdir(exist_ok=True);results=[]
run('set','viewport','375','812');snap()
for name in ['grid-driver','clipdock','telemetry-stack','lost-in-flight','reality-studio','direct-cta','quiet-presets']:
 with zipfile.ZipFile(R/'dist/downloads'/f'{name}.zip') as archive:archive.extractall(dest)
 run('open',(dest/name/'dist/index.html').as_uri());snap();run('webmcp','list');run('wait','1000');snap()
 stats=js('({images:[...document.images].map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0})),fonts:document.fonts.status,overflow:document.documentElement.scrollWidth>innerWidth,buttons:[...document.querySelectorAll("button")].map(b=>({id:b.id,disabled:b.disabled}))})');assert all(i['loaded'] for i in stats['images']),(name,stats);assert not stats['overflow'],name
 results.append({'name':name,'environment':'unpacked ZIP opened as file URL',**stats});(O/'exports.json').write_text(json.dumps(results,indent=2));run('screenshot',str(O/f'{name}-export.png'));print(name,'export passed',flush=True)
