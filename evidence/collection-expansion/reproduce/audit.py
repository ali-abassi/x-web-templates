exec(open('/private/tmp/xweb-next-references/check-pages.py').read().split('for name in sys.argv[1:]:')[0])
for name in ['horizonx','buzzkit','pixel-world']:
 run('set','viewport','1440','1000');snap();run('open','http://localhost:4173/'+name+'/');snap();run('webmcp','list')
 for selector in ['header','main','footer']:
  data=json.loads(run('a11y','--selector',selector,'--json'))
  (O/f'{name}-{selector}-a11y.json').write_text(json.dumps(data,indent=2))
  results=data.get('data',{});print(name,selector,results.get('counts'),flush=True)
  for v in results.get('violations',[]):
   print(v['id'],v['nodeCount'],[(n['target'],n['failureSummary']) for n in v.get('nodes',[])][:5],flush=True)
