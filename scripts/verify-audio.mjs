import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';
import worker from '../dist/server/index.js';
import {localAudioBucket} from './r2-local.mjs';
const manifest=JSON.parse(readFileSync('.local/pronunciations/manifest.json','utf8'));
assert.equal(manifest.entries.length,1772);
const context=vm.createContext({});
for(const name of ['data','catalog','curriculum-data','curriculum','audio-manifest'])vm.runInContext(readFileSync('dist/'+name+'.js','utf8'),context);
assert.equal(vm.runInContext('WORDS.filter(w=>!PRONUNCIATION_AUDIO[w.en.normalize("NFC").trim().replace(/\\s+/g," ").toLowerCase()]).length',context),0);
const first=manifest.entries[0],path='/audio/v1/'+first.key+'.m4a',bucket=localAudioBucket('.local/pronunciations');
const call=(options={},env={BUCKET:bucket})=>worker.fetch(new Request('https://example.test'+path,options),env);
const response=await call();assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'audio/mp4');assert.equal(response.headers.get('accept-ranges'),'bytes');
const clip=new Uint8Array(await response.arrayBuffer());assert.ok(clip.length>4500);assert.equal(String.fromCharCode(...clip.slice(4,8)),'ftyp');
const etag=response.headers.get('etag');
for(const [range,offset,length] of [['bytes=0-1',0,2],['bytes=2-',2,clip.length-2],['bytes=-100',clip.length-100,100],['bytes=0-999999',0,clip.length]]){
  const r=await call({headers:{range}});assert.equal(r.status,206);assert.equal(r.headers.get('content-range'),`bytes ${offset}-${offset+length-1}/${clip.length}`);assert.deepEqual(new Uint8Array(await r.arrayBuffer()),clip.slice(offset,offset+length));
}
assert.equal((await call({headers:{range:'bytes=999999-'}})).status,416);
assert.equal((await call({headers:{range:'bytes=0-1,3-4'}})).status,416);
assert.equal((await call({headers:{range:'bytes=0-1','if-range':'"old"'}})).status,200);
assert.equal((await call({headers:{'if-none-match':etag}})).status,304);
const head=await call({method:'HEAD'});assert.equal(head.status,200);assert.equal(head.headers.get('content-length'),String(clip.length));assert.equal((await head.arrayBuffer()).byteLength,0);
assert.equal((await call({method:'POST'})).status,405);
assert.equal((await call({},{})).status,503);
const uploadPath='https://example.test/internal/audio/'+first.key,secret='test-publishing-credential';
assert.equal((await worker.fetch(new Request(uploadPath,{method:'PUT',body:clip}),{BUCKET:bucket})).status,403);
const testBucket=localAudioBucket(mkdtempSync(join(tmpdir(),'lexilab-audio-')));
const uploaded=await worker.fetch(new Request(uploadPath,{method:'PUT',headers:{authorization:'Bearer '+secret},body:clip}),{BUCKET:testBucket,PRONUNCIATION_UPLOAD_KEY:secret});assert.equal(uploaded.status,201);
assert.equal((await testBucket.head('pronunciation/v1/'+first.key+'.m4a')).size,clip.length);
// The iPhone byte-range probe must work without classroom authentication or DB.
assert.equal((await worker.fetch(new Request('https://example.test'+path,{headers:{range:'bytes=0-1'}}),{BUCKET:testBucket})).status,206);
// Exercise the actual player with a minimal browser model, including blocked play.
const elements=new Map();
function el(id){if(!elements.has(id))elements.set(id,{hidden:true,textContent:'',href:'',src:'',paused:true,muted:true,volume:0,playbackRate:0,currentTime:0,playCalls:0,pause(){this.paused=true;},play(){this.playCalls++;this.paused=false;return Promise.resolve();},getAttribute(name){return this[name]||null;},setAttribute(name,value){this[name]=value;}});return elements.get(id);}
const listeners={};let speechCalls=0;
const voices=[{name:'English',lang:'en-US'}];
const windowStub={speechSynthesis:{getVoices:()=>voices,addEventListener:()=>{},speak:()=>speechCalls++,cancel:()=>{},resume:()=>{}},SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},addEventListener:()=>{}};
const playerContext=vm.createContext({PRONUNCIATION_AUDIO:{gravity:'123456789012345678901234'},byId:()=>({en:'gravity',vi:'trọng lực'}),window:windowStub,document:{getElementById:el,querySelector:()=>null,addEventListener:(type,fn)=>listeners[type]=fn},setTimeout:()=>1,clearTimeout:()=>{}});
vm.runInContext(readFileSync('dist/pronunciation.js','utf8'),playerContext);
assert.equal(el('pronunciation-audio').playCalls,0,'No autoplay on page load');
vm.runInContext('playPronunciation("word")',playerContext);
assert.equal(el('pronunciation-audio').playCalls,1,'play() runs during the tap, without fetching first');
assert.equal(el('pronunciation-audio').src,'/audio/v1/123456789012345678901234.m4a');assert.equal(el('pronunciation-player').hidden,false);assert.equal(el('pronunciation-audio').muted,false);assert.equal(el('pronunciation-audio').volume,1);
el('pronunciation-audio').play=()=>Promise.reject(Object.assign(new Error(),{name:'NotAllowedError'}));
vm.runInContext('startPronunciationAudio()',playerContext);await new Promise(resolve=>setImmediate(resolve));
assert.match(el('pronunciation-status').textContent,/Tap Play/);assert.equal(speechCalls,0,'No automatic speech outside the tap');
vm.runInContext('playDevicePronunciation()',playerContext);assert.equal(speechCalls,1);assert.equal(vm.runInContext('pronunciationState.utterance.lang',playerContext),'en-US');
vm.runInContext('closePronunciation()',playerContext);assert.equal(el('pronunciation-player').hidden,true);assert.equal(el('pronunciation-audio').paused,true);
console.log('PASS: all 1772 terms including saved legacy words have clip URLs; real M4A bytes; iPhone byte-range delivery, HEAD and caching; protected uploads; user-tap playback; blocked-play guidance; retained device-voice fallback; pause on close.');
