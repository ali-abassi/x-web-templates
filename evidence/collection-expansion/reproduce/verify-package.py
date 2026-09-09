from pathlib import Path
import hashlib,json,subprocess,zipfile
R=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');O=R/'evidence/collection-expansion'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((O/'aster-import.json').read_text())
for p,h in manifest['files'].items():
 assert sha(R/'templates/aster/dist'/p)==h
 assert sha(R/'dist/aster'/p)==h
base='af8e048507cafc634e0b817e5cd4b997138a45a4'
paths=subprocess.check_output(['git','ls-tree','-r','--name-only',base,'templates/alpine-notes','templates/rainbow-venture','templates/bloop','templates/furion','dist/alpine-notes','dist/rainbow-venture','dist/bloop','dist/furion'],cwd=R,text=True).splitlines()
for p in paths:assert subprocess.check_output(['git','show',base+':'+p],cwd=R)==(R/p).read_bytes(),p
before={p.name:sha(p) for p in (R/'dist/downloads').glob('*.zip')}
subprocess.run(['python3','scripts/build.py'],cwd=R,check=True,capture_output=True)
assert before=={p.name:sha(p) for p in (R/'dist/downloads').glob('*.zip')}
result={'aster_file_parity':len(manifest['files']),'original_template_and_distribution_files_unchanged':len(paths),'deterministic_zip_count':len(before),'zip_sha256':before}
(O/'package-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result))
