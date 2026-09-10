import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-references-0910','--pin-tab',...args],{encoding:'utf8'});
const inventory=JSON.parse(cli('tab','list','--json'));
const target=inventory.data.tabs.find(tab=>tab.active).targetId;
const browserURL=cli('get','cdp-url').trim();
const ws=new WebSocket(browserURL.replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function inspect(){const r=await cdp('Runtime.evaluate',{expression:'(()=>{const c=document.querySelector("#helmet");let hash=0;if(c){const b=c.getContext("2d").getImageData(0,0,c.width,c.height).data;for(let i=0;i<b.length;i+=97)hash=(Math.imul(hash,31)+b[i])|0;}return {url:location.href,hidden:document.hidden,paused:document.body.classList.contains("paused"),helmetHash:hash};})()',returnByValue:true});return r.result.result.value;}
let owned;
try{
 await cdp('Runtime.enable');await cdp('Page.enable');
 const before=await inspect();if(!before.url.includes(process.argv[2]))throw Error('Incorrect initial target '+before.url);
 owned=(await cdp('Target.createTarget',{url:'about:blank',background:false})).result.targetId;
 await cdp('Target.activateTarget',{targetId:owned});await wait(700);
 const hidden=await inspect();await wait(300);const held=await inspect();
 if(!hidden.hidden)throw Error('Page did not become hidden');
 if(process.argv[2]==='grid-driver'){
  if(!hidden.helmetHash||hidden.helmetHash!==held.helmetHash)throw Error('Helmet changed while hidden');
 }else if(!hidden.paused)throw Error('Motion not paused while hidden');
 await cdp('Target.activateTarget',{targetId:target});await wait(300);const visible=await inspect();
 if(visible.hidden)throw Error('Page did not return to foreground');
 const result={template:process.argv[2],environment:'real Chrome target activation; target discovered immediately before check',before,hidden,held,visible};
 writeFileSync(`/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/motion-seven/final/visibility-${process.argv[2]}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{if(owned)await cdp('Target.closeTarget',{targetId:owned});await cdp('Target.activateTarget',{targetId:target});ws.close();}
