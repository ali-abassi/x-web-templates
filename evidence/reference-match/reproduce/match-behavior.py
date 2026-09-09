from pathlib import Path
exec((Path(__file__).parent / "helpers.py").read_text())
OUT=ROOT/'evidence/reference-match/journeys';OUT.mkdir(exist_ok=True);LOG=OUT/'trace.jsonl'
for width in (1440,375):
 open_page('alpine-notes/#notebook',width)
 act('fill','#note','A clear thought. Reference-match QA.');act('click','#save-note');act('reload')
 check("document.querySelector('#note').value==='A clear thought. Reference-match QA.'")
 act('click','button[data-tone=green]');check("document.querySelector('.notebook').dataset.tone==='green'")
 download=OUT/f'note-{width}.txt';act('download','#export-note',str(download));assert download.read_text()=='A clear thought. Reference-match QA.'
 act('fill','#note','');act('click','#save-note');act('reload');check("document.querySelector('#note').value===''")
 act('fill','#note','A useful thought. '*600);act('click','#save-note');shot(f'note-{width}-long')
 js("window.qaStorage=Object.getOwnPropertyDescriptor(window,'localStorage');Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('QA blocked storage','SecurityError')}});loadNote();true");snapshot();act('click','#save-note')
 check("document.querySelector('#note-status').textContent.includes('Could not save')&&document.querySelector('#note').value.length===10800")
 fallback=OUT/f'note-{width}-fallback.txt';act('download','#export-note',str(fallback));assert len(fallback.read_text())==10800
 shot(f'note-{width}-denied');js("Object.defineProperty(window,'localStorage',window.qaStorage);localStorage.removeItem('scribblit-note');savedValue=note.value;true")
 RESULTS.append({'case':'notebook save/reload, export, empty, long, denied storage, paper color','width':width,'result':'pass'})
 open_page('rainbow-venture/',width);act('click','a[href="#apply"]');check("document.querySelector('#apply').open")
 act('click','button[type=submit]');check("!document.querySelector('form').checkValidity()")
 act('find','label','Your name','fill','   ');check("!document.querySelector('input[name=name]').checkValidity()")
 act('find','label','Your name','fill','Template QA');act('find','label','Email address','fill','invalid');check("!document.querySelector('input[name=email]').checkValidity()")
 act('find','label','Email address','fill','qa@example.com');act('fill','textarea','Building a thoughtful product. '*40)
 path=OUT/f'application-{width}.txt';act('download','button[type=submit]',str(path));assert 'Template QA' in path.read_text()
 check("document.querySelector('form [role=status]').textContent.includes('Nothing was sent')");shot(f'application-{width}')
 js("document.querySelector('.faq summary').focus();true");act('press','Enter');check("document.querySelector('.faq details').open")
 RESULTS.append({'case':'application disclosure, invalid/whitespace/email, long draft download and FAQ keyboard','width':width,'result':'pass'})
 for name in ('bloop','furion'):
  open_page(name+'/',width);js("document.querySelector('.template-tools summary').focus();true");act('press','Enter');check("document.querySelector('.template-tools details').open")
  path=OUT/f'{name}-{width}.txt';act('download','a[download]',str(path));assert len(path.read_text())>50
  shot(f'{name}-{width}-details');RESULTS.append({'case':name+' keyboard disclosure and brand notes','width':width,'result':'pass'})
(OUT/'results.json').write_text(json.dumps(RESULTS,indent=2));print('Behavior cases passed',len(RESULTS))
