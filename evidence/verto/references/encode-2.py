from pathlib import Path
import subprocess,json,hashlib
r=Path('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates');source=r/'evidence/verto/references/motion-source-2.mp4';target=r/'templates/verto/dist/assets/motion.mp4'
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source),'-t','6','-an','-c:v','libx264','-crf','20','-preset','medium','-g','12','-keyint_min','12','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(target)],check=True)
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(target)]));assert 5.8<float(meta['format']['duration'])<6.3;assert target.stat().st_size<12*1024*1024
print(json.dumps({'path':str(target),'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'bytes':target.stat().st_size,'duration':meta['format']['duration'],'width':meta['streams'][0]['width'],'height':meta['streams'][0]['height']}))
