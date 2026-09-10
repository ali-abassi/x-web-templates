import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const name=process.argv[2];
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-verto-headed-0910','--profile','Default','--headed','--pin-tab',...args],{encoding:'utf8'});
const target=JSON.parse(cli('tab','list','--json')).data.tabs.find(tab=>tab.active).targetId;
const ws=new WebSocket(cli('get','cdp-url').trim().replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function inspect(){const r=await cdp('Runtime.evaluate',{expression:'({url:location.href,hidden:document.hidden,flag:document.body.dataset.paused,videoTime:document.querySelector("video").currentTime,animations:document.getAnimations().map(a=>({state:a.playState,time:a.currentTime}))})',returnByValue:true});return r.result.result.value;}
let owned;
try{
 await cdp('Runtime.enable');await cdp('Page.enable');const before=await inspect();
 if(!before.url.includes('/'+name+'/'))throw Error('Wrong active target');
 owned=(await cdp('Target.createTarget',{url:'about:blank',background:false})).result.targetId;
 await cdp('Target.activateTarget',{targetId:owned});await wait(500);
 const hidden=await inspect();await wait(300);const held=await inspect();
 if(!hidden.hidden||hidden.flag!=='true'||hidden.animations.some(a=>a.state==='running'))throw Error('Hidden-page motion continued');
 if(hidden.videoTime!==held.videoTime||JSON.stringify(hidden.animations)!==JSON.stringify(held.animations))throw Error('Hidden animation time changed');
 await cdp('Target.activateTarget',{targetId:target});await wait(300);const visible=await inspect();
 if(visible.hidden||visible.flag!=='false')throw Error('Visible state not restored');
 const result={template:name,environment:'actual Chrome target activation; owned blank tab closed',before,hidden,held,visible};
 writeFileSync('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/verto/final/'+name+'-visibility.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{if(owned)await cdp('Target.closeTarget',{targetId:owned});await cdp('Target.activateTarget',{targetId:target});ws.close();}
