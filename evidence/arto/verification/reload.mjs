import {execFileSync} from 'node:child_process';
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-swift-01a08b0a','--profile','Default','--headed','--pin-tab',...args],{encoding:'utf8'});
const inventory=JSON.parse(cli('tab','list','--json'));
const target=inventory.data.tabs.find(tab=>tab.active).targetId;
const ws=new WebSocket(cli('get','cdp-url').trim().replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
try{await cdp('Network.enable');await cdp('Page.bringToFront');await cdp('Page.reload',{ignoreCache:true});}finally{ws.close();}
