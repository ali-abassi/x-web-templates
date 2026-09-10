from pathlib import Path
import os,subprocess
root=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates')
env=os.environ.copy()
for line in (Path.home()/'.pi-x/agent/.env').read_text().splitlines():
 if line.startswith('FAL_KEY='):env['FAL_KEY']=line.split('=',1)[1].strip().strip('"'+chr(39))
assert env.get('FAL_KEY'),'FAL_KEY unavailable'
env['FAL_RECEIPT']=str(root/'evidence/verto/references/fal-receipt.json')
subprocess.run(['/private/tmp/xweb-alex-0910/media/image-to-video.sh',str(root/'templates/verto/dist/assets/portrait.png'),'@/private/tmp/xweb-alex-0910/motion-prompt.txt','--duration','6','--resolution','768P','--seed','913','--expansion','disabled','--out',str(root/'evidence/verto/references/motion-source.mp4')],env=env,check=True)
