import {spawn} from 'node:child_process';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const profile=await mkdtemp(path.join(os.tmpdir(),'srok-v21-capture-'));
const port=41000+Math.floor(Math.random()*500);
const chrome=process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url=pathToFileURL(path.join(root,'app','src','main','assets','index.html')).href;
const proc=spawn(chrome,[`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--headless=new','--disable-gpu','--no-sandbox',url],{stdio:'ignore'});
let ws,seq=0;
const pending=new Map(),delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function call(method,params={}){const id=++seq;const response=new Promise(resolve=>pending.set(id,resolve));ws.send(JSON.stringify({id,method,params}));const value=await response;if(value.error)throw new Error(value.error.message);return value.result;}
async function run(expression){return call('Runtime.evaluate',{expression,awaitPromise:true});}
async function shot(name){await delay(350);const result=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(path.join(root,'qa',name),Buffer.from(result.data,'base64'));}
try {
  let target;
  for(let i=0;i<50;i++){try{target=(await(await fetch(`http://127.0.0.1:${port}/json`)).json()).find(page=>page.type==='page');if(target)break;}catch(_){}await delay(100);}
  if(!target)throw new Error('Chrome did not start');
  ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  ws.onmessage=event=>{const value=JSON.parse(event.data);if(value.id&&pending.has(value.id)){pending.get(value.id)(value);pending.delete(value.id);}};
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call('Page.reload');await delay(500);
  await run("SrokGame.act('close'); (()=>{const s=SrokGame.getState();s.xp=2100;s.coins=1900;s.buffalo=true;s.plots[0]={id:'mango',at:0};s.ownedProperty=['storage_house','rice_mill','family_home','market_stall','produce_motorbike','produce_truck','fruit_orchard','river_boat','community_hall'];s.inventory.mango=3;s.inventory.rice=6;localStorage.setItem('srok-srae-save-v2',JSON.stringify(s));location.reload()})()");
  await delay(950);await shot('v2-1-village-map.png');
  await run("SrokGame.act('tab','market')");await shot('v2-1-market.png');
  await run("SrokGame.act('tab','farm'); SrokGame.act('farmMode','games'); SrokGame.act('openMini','fruit')");await shot('v2-1-fruit-game.png');
  await run("SrokGame.act('close'); SrokGame.act('language'); SrokGame.act('tab','market')");await shot('v2-1-market-khmer.png');
  console.log('Saved v2.1 map, market, mini-game, and Khmer phone previews.');
} finally {if(ws)ws.close();proc.kill();await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:150});}
