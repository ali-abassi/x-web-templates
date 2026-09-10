import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-swift-01a08b0a','--profile','Default','--headed','--pin-tab',...args],{encoding:'utf8'});
const inventory=JSON.parse(cli('tab','list','--json'));
const target=inventory.data.tabs.find(tab=>tab.active).targetId;
const ws=new WebSocket(cli('get','cdp-url').trim().replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
const out='/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/animora/final/';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const shots=[];
try {
 await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await cdp('Page.bringToFront');await cdp('Page.reload',{ignoreCache:true});await wait(600);
 for(let i=0;i<40;i++){
  const angle=i/39*Math.PI*2;
  const x=Math.round(740+620*Math.cos(angle)),y=Math.round(430+340*Math.sin(angle));
  await cdp('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});await wait(90);
  const result=await cdp('Runtime.evaluate',{expression:'({hidden:document.hidden,eyes:[...document.querySelectorAll(".eye")].map(e=>({x:parseFloat(e.style.getPropertyValue("--eye-x")),y:parseFloat(e.style.getPropertyValue("--eye-y")),bounds:e.getBoundingClientRect().toJSON()}))})',returnByValue:true});
  const state=result.result.result.value;
  if(state.hidden)throw Error('Page hidden');
  for(const eye of state.eyes){
   if(Math.abs(eye.x)>eye.bounds.width*.141||Math.abs(eye.y)>eye.bounds.height*.141)throw Error('Pupil out of range');
   if(eye.x*(x-eye.bounds.x-eye.bounds.width/2)<0||eye.y*(y-eye.bounds.y-eye.bounds.height/2)<0)throw Error('Gaze wrong direction');
   if(Math.hypot(eye.x,eye.y)<1)throw Error('Gaze did not move');
  }
  const time=Date.now();const frame=await cdp('Page.captureScreenshot',{format:'png',fromSurface:true});
  const path='/private/tmp/xweb-tanzil-0910/motion-'+String(i).padStart(3,'0')+'.png';writeFileSync(path,Buffer.from(frame.result.data,'base64'));
  shots.push({path,time,pointer:{x,y},state});
 }
 writeFileSync(out+'motion.json',JSON.stringify({method:'Actual Chrome frames and native pointer input over one CDP connection',shots},null,2));
 const concat=shots.map((s,i)=>`file '${s.path}'\nduration ${((shots[i+1]?.time??s.time+100)-s.time)/1000}`).join('\n');
 writeFileSync('/private/tmp/xweb-tanzil-0910/motion.txt',concat+'\n');
 console.log(JSON.stringify({frames:shots.length,seconds:(shots.at(-1).time-shots[0].time+100)/1000,allGazeChecks:true}));
}finally{ws.close();}
