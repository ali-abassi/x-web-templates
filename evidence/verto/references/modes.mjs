import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const [mode,name,width]=process.argv.slice(2);
const cli=(...args)=>execFileSync('agent-browser',['--session','xweb-verto-headed-0910','--profile','Default','--headed','--pin-tab',...args],{encoding:'utf8'});
const target=JSON.parse(cli('tab','list','--json')).data.tabs.find(tab=>tab.active).targetId;
const ws=new WebSocket(cli('get','cdp-url').trim().replace(/\/devtools\/browser\/.*/,`/devtools/page/${target}`));
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let sequence=0;const pending=new Map();
ws.addEventListener('message',event=>{const value=JSON.parse(event.data);const resolve=pending.get(value.id);if(resolve){resolve(value);pending.delete(value.id);}});
const cdp=(method,params={})=>new Promise(resolve=>{const id=++sequence;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const inspect=async()=>{const r=await cdp('Runtime.evaluate',{expression:'({url:location.href,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,enabledButtons:[...document.querySelectorAll("main button,#motion")].filter(b=>!b.disabled&&b.getClientRects().length>0).length,running:document.getAnimations().filter(a=>a.playState==="running").length,videoSource:document.querySelector("video").getAttribute("src"),h1:document.querySelector("h1").innerText,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)})',returnByValue:true});return r.result.result.value;};
try{
 await cdp('Network.enable');await cdp('Network.setCacheDisabled',{cacheDisabled:true});
 if(mode==='reduced')await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 if(mode==='nojs')await cdp('Emulation.setScriptExecutionDisabled',{value:true});
 await cdp('Page.reload',{ignoreCache:true});await pause(700);
 cli('snapshot','-i');cli('webmcp','list');
 await cdp('Runtime.evaluate',{expression:'document.querySelector("#lindy-cos-root")?.style.setProperty("display","none")'});
 for(const y of [0,900,1800,2700,3600,4500,5600]){await cdp('Runtime.evaluate',{expression:`window.scrollTo({top:${y},behavior:"instant"})`});await pause(180);cli('snapshot','-i');}await cdp('Runtime.evaluate',{expression:'window.scrollTo({top:0,behavior:"instant"})'});const result=await inspect();
 const out='/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/verto/final/';
 cli('screenshot',`${out}${name}-${mode}-${width}.png`,'--full');
 writeFileSync(`${out}${name}-${mode}-${width}.json`,JSON.stringify(result,null,2));
 if(result.width!==result.scrollWidth||!result.images)throw Error('Layout or asset failure');
 if(mode==='reduced'&&(!result.reduced||result.running!==0||result.videoSource!==null))throw Error('Reduced motion not respected');
 if(mode==='nojs'&&result.enabledButtons!==0)throw Error('JS-only controls remained enabled');
 console.log(JSON.stringify({mode,name,width,passed:true,...result}));
}finally{
 await cdp('Emulation.setScriptExecutionDisabled',{value:false});
 await cdp('Emulation.setEmulatedMedia',{features:[]});
 await cdp('Network.setCacheDisabled',{cacheDisabled:false});ws.close();
}
