// Run on macOS with an installed English voice. Generated clips live in R2.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {spawn}=require('node:child_process'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'.local/pronunciations');
fs.mkdirSync(folder,{recursive:true});
const context=vm.createContext({});
for(const name of ['data','catalog','curriculum-data','curriculum'])vm.runInContext(fs.readFileSync(path.join(root,'dist',name+'.js'),'utf8'),context);
const terms=JSON.parse(vm.runInContext('JSON.stringify([...new Set(WORDS.map(w=>w.en.normalize("NFC").trim().replace(/\\s+/g," ").toLowerCase()))].sort())',context));
const voice='Daniel',rate=155;
const entries=terms.map(en=>({en,key:createHash('sha256').update(JSON.stringify(['en-GB',voice,rate,en])).digest('hex').slice(0,24)}));
if(new Set(entries.map(x=>x.key)).size!==entries.length)throw new Error('Audio key collision');
fs.writeFileSync(path.join(root,'dist/audio-manifest.js'),'// Synthesised British English pronunciations. Files are served from this Site.\nconst PRONUNCIATION_AUDIO='+JSON.stringify(Object.fromEntries(entries.map(x=>[x.en,x.key])))+';\n');
fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify({voice,rate,entries},null,2)+'\n');
function run(file,args){return new Promise((resolve,reject)=>{const child=spawn(file,args,{stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',v=>error+=v);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(file+' failed: '+error.slice(0,300))));});}
let next=0,done=0,bytes=0;
async function generate(){while(next<entries.length){const {en,key}=entries[next++],aiff=path.join(folder,key+'.aiff'),m4a=path.join(folder,key+'.m4a');
  if(!fs.existsSync(m4a)||fs.statSync(m4a).size<4500){
    await run('/usr/bin/say',['-v',voice,'-r',String(rate),'-o',aiff,en]);
    const pcm=fs.readFileSync(aiff);if(pcm.length<=4096)throw new Error('Empty voice output for '+en);
    let peak=0;for(let i=4096;i+1<pcm.length;i+=2)peak=Math.max(peak,Math.abs(pcm.readInt16BE(i)));if(peak<100)throw new Error('Silent voice output for '+en);
    await run('/usr/bin/afconvert',['-f','m4af','-d','aac','-b','48000',aiff,m4a]);
    fs.unlinkSync(aiff);
  }
  const audio=fs.readFileSync(m4a);if(audio.length<4500||audio.toString('ascii',4,8)!=='ftyp')throw new Error('Invalid M4A for '+en);
  bytes+=audio.length;done++;if(done%100===0||done===entries.length)console.log('Pronunciations: '+done+'/'+entries.length);
}}
Promise.all(Array.from({length:4},generate)).then(()=>console.log(JSON.stringify({clips:done,bytes,folder}))).catch(e=>{console.error(e.message);process.exitCode=1;});
