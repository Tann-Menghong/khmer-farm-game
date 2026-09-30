import {spawn} from 'node:child_process';
import {mkdtemp, rm, writeFile, mkdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const profile=await mkdtemp(path.join(os.tmpdir(),'srok-capture-'));
const port=39500+Math.floor(Math.random()*500);
const chrome=process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const game=pathToFileURL(path.join(root,'app','src','main','assets','index.html')).href;
const proc=spawn(chrome,[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--disable-gpu','--no-sandbox',game],{stdio:'ignore'});
let ws,seq=0;
const pending=new Map();
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function call(method,params={}) {
  const id=++seq;
  const result=new Promise((resolve,reject)=>pending.set(id,{resolve,reject}));
  ws.send(JSON.stringify({id,method,params}));
  const response=await result;
  if(response.error)throw new Error(response.error.message);
  return response.result;
}
try {
  let target;
  for(let i=0;i<50;i++){
    try {target=(await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(page=>page.type==='page');if(target)break;}catch(_){}
    await delay(100);
  }
  if(!target)throw new Error('Chrome did not start');
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  ws.onmessage=event=>{const data=JSON.parse(event.data);if(!data.id)return;const task=pending.get(data.id);if(task){pending.delete(data.id);task.resolve(data);}};
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call('Page.reload');
  await delay(800);
  await mkdir(path.join(root,'qa'),{recursive:true});
  const welcome=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  await writeFile(path.join(root,'qa','welcome-mobile.png'),Buffer.from(welcome.data,'base64'));
  await call('Runtime.evaluate',{expression:"SrokGame.act('close')"});
  const screen=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  await writeFile(path.join(root,'qa','farm-mobile.png'),Buffer.from(screen.data,'base64'));
  await call('Runtime.evaluate',{expression:"SrokGame.act('language')"});
  const khmer=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  await writeFile(path.join(root,'qa','farm-khmer.png'),Buffer.from(khmer.data,'base64'));
  console.log('Saved qa/welcome-mobile.png, qa/farm-mobile.png and qa/farm-khmer.png');
} finally {
  if(ws)ws.close();
  proc.kill();
  await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:150});
}
