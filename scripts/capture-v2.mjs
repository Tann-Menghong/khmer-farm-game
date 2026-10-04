import {spawn} from 'node:child_process';
import {mkdtemp,rm,writeFile,mkdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const profile=await mkdtemp(path.join(os.tmpdir(),'srok-v2-capture-'));
const port=40500+Math.floor(Math.random()*500);
const chrome=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url=pathToFileURL(path.join(root,'app','src','main','assets','index.html')).href;
const proc=spawn(chrome,[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--disable-gpu','--no-sandbox',url],{stdio:'ignore'});
let ws,seq=0;
const pending=new Map(),delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function call(method,params={}){const id=++seq;const response=new Promise(resolve=>pending.set(id,resolve));ws.send(JSON.stringify({id,method,params}));const value=await response;if(value.error)throw new Error(value.error.message);return value.result;}
async function run(expression){return call('Runtime.evaluate',{expression,awaitPromise:true});}
async function shot(name){await delay(180);const image=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(path.join(root,'qa',name),Buffer.from(image.data,'base64'));}
try {
  let target;
  for(let i=0;i<50;i++){try{target=(await(await fetch(`http://127.0.0.1:${port}/json`)).json()).find(page=>page.type==='page');if(target)break;}catch(_){}await delay(100);}
  if(!target)throw new Error('Chrome did not start');
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  ws.onmessage=event=>{const value=JSON.parse(event.data);if(value.id&&pending.has(value.id)){pending.get(value.id)(value);pending.delete(value.id);}};
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call('Page.reload');await delay(500);await mkdir(path.join(root,'qa'),{recursive:true});
  await run("SrokGame.act('close'); (()=>{const s=SrokGame.getState();s.xp=900;s.coins=2800;s.buffalo=true;s.inventory.rice=8;s.inventory.fish=3;s.inventory.cotton=6;s.inventory.banana=4;s.inventory.egg=2;s.plots[0]={id:'rice',at:Date.now()+5000,startedAt:Date.now()-15000,duration:20000};s.plots[1]={id:'lotus',at:Date.now()+10000,startedAt:Date.now()-25000,duration:35000};s.plots[2]={id:'banana',at:Date.now()+20000,startedAt:Date.now()-30000,duration:50000};s.plots[3]={id:'morning_glory',at:Date.now()+15000,startedAt:Date.now()-30000,duration:45000};s.ownedProperty=['storage_house','rice_mill','family_home','market_stall','produce_motorbike','produce_truck'];localStorage.setItem('srok-srae-save-v2',JSON.stringify(s));location.reload()})()");
  await delay(900);await shot('v2-village-map.png');
  await run("SrokGame.act('profile')");await shot('v2-profile.png');
  await run("SrokGame.act('close'); SrokGame.act('tab','orders'); document.querySelector('.order-grid').scrollIntoView({block:'start'})");await shot('v2-orders.png');
  await run("SrokGame.act('tab','market'); SrokGame.act('marketMode','storage')");await shot('v2-storage.png');
  await run("SrokGame.act('tab','kitchen'); SrokGame.act('cook','porridge'); SrokGame.act('cook','banana_cake'); document.querySelector('.production-queue').scrollIntoView({block:'start'})");await delay(2500);await shot('v2-kitchen-queue.png');
  await run("SrokGame.act('tab','farm'); SrokGame.act('farmMode','games'); SrokGame.act('openMini','buffalo')");await shot('v2-buffalo-game.png');
  await call('Emulation.setDeviceMetricsOverride',{width:320,height:720,deviceScaleFactor:1,mobile:true});
  await run("SrokGame.act('close'); SrokGame.act('profile')");await shot('v2-profile-320.png');
  await run("SrokGame.act('close'); SrokGame.act('language'); SrokGame.act('tab','market'); SrokGame.act('marketMode','storage')");await shot('v2-storage-khmer-320.png');
  console.log('Saved v2 map, profile, orders, storage, production, mini-game, and Khmer phone previews.');
} finally {if(ws)ws.close();proc.kill();await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:150});}
