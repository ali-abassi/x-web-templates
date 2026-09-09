import { spawn } from 'node:child_process';
const ws=new WebSocket('ws://127.0.0.1:54584/devtools/page/BC9236263BAEB6493AC3F18A648E2ABA');
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let seq=0;const waiting=new Map();
ws.addEventListener('message',event=>{const data=JSON.parse(event.data);if(waiting.has(data.id)){waiting.get(data.id)(data);waiting.delete(data.id);}});
function cdp(method,params){return new Promise(resolve=>{const id=++seq;waiting.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});}
try {
 console.log(await cdp('Emulation.setScriptExecutionDisabled',{value:true}));
 const child=spawn('python3',['/private/tmp/xweb-next-references/final-nojs.py'],{stdio:'inherit'});
 const code=await new Promise(resolve=>child.on('exit',resolve));if(code!==0)process.exitCode=code;
} finally {console.log(await cdp('Emulation.setScriptExecutionDisabled',{value:false}));ws.close();}
