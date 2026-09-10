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
try {
 const layout=await cdp('Page.getLayoutMetrics');
 const w=layout.result.cssLayoutViewport.clientWidth;
 const h=process.argv[3]==='full'?layout.result.cssContentSize.height:layout.result.cssLayoutViewport.clientHeight;
 await cdp('Emulation.setDeviceMetricsOverride',{width:w,height:layout.result.cssLayoutViewport.clientHeight,deviceScaleFactor:1,mobile:false});
 await new Promise(resolve=>setTimeout(resolve,200));
 const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,fromSurface:true,clip:{x:0,y:0,width:w,height:h,scale:1}});
 if(shot.error)throw Error(JSON.stringify(shot.error));
 writeFileSync(process.argv[2],Buffer.from(shot.result.data,'base64'));
 console.log(JSON.stringify({width:w,height:h,path:process.argv[2]}));
} finally { ws.close(); }
