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
const out='/Users/aliabassi/Documents/ChatGPT/AI Designer/x-web-templates/evidence/animora/final/';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const read=async expression=>(await cdp('Runtime.evaluate',{expression,returnByValue:true})).result.result.value;
try {
 await cdp('Network.enable');
 if(mode==='nojs')await cdp('Emulation.setScriptExecutionDisabled',{value:true});
 if(mode==='reduced')await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await cdp('Page.reload',{ignoreCache:true});await wait(500);cli('snapshot','-i');cli('webmcp','list');
 let state;
 if(mode==='touch'){
  await cdp('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  await cdp('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:30,y:420}]});await wait(100);cli('snapshot','-i');
  const down=await read('[...document.querySelectorAll(".eye")].map(e=>e.style.cssText)');
  await cdp('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(100);cli('snapshot','-i');
  const up=await read('[...document.querySelectorAll(".eye")].map(e=>e.style.cssText)');
  state={down,up,keepsGaze:JSON.stringify(down)===JSON.stringify(up)};
 }else{
  cli('mouse','move','30','420');cli('snapshot','-i');
  state=await read('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,art:document.querySelector(".character-art").naturalWidth>0,enabledButtons:[...document.querySelectorAll("button")].filter(b=>!b.disabled&&b.getClientRects().length).length,nojs:document.querySelector("noscript").getClientRects().length>0,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,tracking:document.querySelector(".scene").classList.contains("tracking"),eyeX:[...document.querySelectorAll(".eye")].map(e=>e.style.getPropertyValue("--eye-x")),animations:document.getAnimations().filter(a=>a.playState==="running").length})');
 }
 writeFileSync(out+mode+'.json',JSON.stringify(state,null,2));execFileSync('node',['/private/tmp/xweb-tanzil-0910/capture.mjs',out+mode+'.png','full']);
 if(mode==='touch'&&!state.keepsGaze)throw Error('Touch release loses gaze');
 if(mode==='nojs'&&(!state.nojs||state.enabledButtons!==0))throw Error('NoJS disclosure/button state failed');
 if(mode==='reduced'&&(!state.reduced||state.tracking||state.eyeX.some(x=>parseFloat(x)!==0)))throw Error('Reduced motion failed');
 console.log(JSON.stringify({mode,passed:true,state}));
} finally {
 await cdp('Emulation.setScriptExecutionDisabled',{value:false});
 await cdp('Emulation.setEmulatedMedia',{features:[]});
 await cdp('Emulation.setTouchEmulationEnabled',{enabled:false});
 await cdp('Page.reload',{ignoreCache:true});ws.close();
}
