import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const target='EC3771E318374EC68261A30544BAAA1C';
const ws=new WebSocket(`ws://127.0.0.1:62641/devtools/page/${target}`);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
function cdp(method,params={}){return new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const browser=(...args)=>execFileSync('agent-browser',['--session','xweb-references-0910',...args],{encoding:'utf8'});
const inspect=async()=>{const r=await cdp('Runtime.evaluate',{expression:'({hidden:document.hidden,paused:document.body.classList.contains("paused"),driverStopped:typeof frame==="undefined"?null:frame===null})',returnByValue:true});return r.result.result.value;};
let owned;const results=[];
try {
 await cdp('Network.setCacheDisabled',{cacheDisabled:true});
 owned=(await cdp('Target.createTarget',{url:'about:blank',background:true})).result.targetId;
 for(const name of ['grid-driver','telemetry-stack','lost-in-flight','reality-studio']){
  browser('open',`http://127.0.0.1:4173/${name}/`);browser('snapshot','-i');browser('webmcp','list');
  await cdp('Target.activateTarget',{targetId:owned});await wait(700);
  const hidden=await inspect();
  if(!hidden.hidden || !(name==='grid-driver'?hidden.driverStopped:hidden.paused))throw Error(name+' did not stop when backgrounded '+JSON.stringify(hidden));
  await cdp('Target.activateTarget',{targetId:target});await wait(300);browser('snapshot','-i');
  const visible=await inspect();if(visible.hidden)throw Error('Tab remained hidden');
  results.push({name,environment:'real Chrome tab activation',hidden,visible});console.log(name,'visibility passed');
 }
 writeFileSync('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/motion-seven/final/visibility.json',JSON.stringify(results,null,2));
}finally{
 if(owned)await cdp('Target.closeTarget',{targetId:owned});
 await cdp('Target.activateTarget',{targetId:target});
 await cdp('Network.setCacheDisabled',{cacheDisabled:false});ws.close();
}
