import {execFileSync} from 'node:child_process';
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-verto-headed-0910','--profile','Default','--headed','--pin-tab',...args],{encoding:'utf8'});
const inventory=JSON.parse(cli('tab','list','--json'));
const target=inventory.data.tabs.find(tab=>tab.active).targetId;
const ws=new WebSocket(cli('get','cdp-url').trim().replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
try{await cdp('Network.enable');await cdp('Network.setBlockedURLs',{urls:['*motion.mp4']});await cdp('Page.reload',{ignoreCache:true});await new Promise(resolve=>setTimeout(resolve,700));cli('snapshot','-i');const r=await cdp('Runtime.evaluate',{expression:'({hidden:document.querySelector("video").hidden,status:document.querySelector("#media-status").textContent,still:document.querySelector(".portrait").naturalWidth>0,briefEnabled:!document.querySelector("[data-dialog=brief-dialog]").disabled})',returnByValue:true});const data=r.result.result.value;if(!data.hidden||!data.still||!data.briefEnabled||!data.status.includes('Motion could not load'))throw Error(JSON.stringify(data));const{writeFileSync}=await import('node:fs');writeFileSync('/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/verto/final/blocked-fetch.json',JSON.stringify({environment:'mock network failure: CDP blocks only motion.mp4',...data},null,2));console.log(JSON.stringify(data));}finally{await cdp('Network.setBlockedURLs',{urls:[]});ws.close();}
