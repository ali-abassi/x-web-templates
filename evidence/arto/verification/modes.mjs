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
const mode=process.argv[2];
const out='/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/arto/final/';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try {
 await cdp('Network.enable');await cdp('Network.setCacheDisabled',{cacheDisabled:true});
 if(mode==='nojs')await cdp('Emulation.setScriptExecutionDisabled',{value:true});
 if(mode==='reduced')await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await cdp('Page.reload',{ignoreCache:true});await pause(500);
 cli('snapshot','-i');cli('webmcp','list');
 await cdp('Runtime.evaluate',{expression:'document.querySelector("#lindy-cos-root")?.style.setProperty("display","none")'});
 if(mode==='nojs'){cli('find','role','link','click','--name','Budgets');cli('snapshot','-i');}
 const data=await cdp('Runtime.evaluate',{expression:'({url:location.href,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,art:document.querySelector(".mountains").naturalWidth>0,enabledButtons:[...document.querySelectorAll("button")].filter(b=>!b.disabled&&b.getClientRects().length).length,aboutVisible:document.querySelector("#budget").getClientRects().length>0,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,animations:document.getAnimations().filter(a=>a.playState==="running").length})',returnByValue:true});
 const state=data.result.result.value;
 writeFileSync(out+mode+'.json',JSON.stringify(state,null,2));
 cli('screenshot',out+mode+'.png','--full');
 if(state.width!==state.scrollWidth||!state.art)throw Error('Layout/art failed');
 if(mode==='nojs'&&(!state.aboutVisible||state.enabledButtons!==0))throw Error('NoJS disclosure/button state failed');
 if(mode==='reduced'&&(!state.reduced||state.animations!==0))throw Error('Reduced failed');
 console.log(JSON.stringify({mode,passed:true,state}));
} finally {
 await cdp('Emulation.setScriptExecutionDisabled',{value:false});
 await cdp('Emulation.setEmulatedMedia',{features:[]});
 await cdp('Network.setCacheDisabled',{cacheDisabled:false});
 await cdp('Page.reload',{ignoreCache:true});ws.close();
}
