// Credential is read from hidden stdin; it never appears in argv or files.
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdout.write('Ready for audio upload JSON on stdin (input is hidden).\n');
const input=await new Promise((resolve,reject)=>{
  let data='';
  process.stdin.on('data',chunk=>{
    data+=chunk;
    if(data.includes('\n')){
      process.stdin.pause();if(process.stdin.isTTY)process.stdin.setRawMode(false);
      try{resolve(JSON.parse(data.split('\n')[0]));}catch{reject(new Error('Invalid input'));}
    }
  });
});
const origin=new URL(input.origin);if(origin.protocol!=='https:'||origin.hostname!=='lexilab-stem-vn-qn16.quynhthinhuto.chatgpt.site')throw new Error('Unexpected destination');
if(typeof input.secret!=='string'||input.secret.length<32)throw new Error('Missing publishing credential');
const folder=input.folder,manifest=JSON.parse(readFileSync(join(folder,'manifest.json'),'utf8'));let next=0,done=0;
const failures=[];
async function upload(){while(next<manifest.entries.length){const {key}=manifest.entries[next++],data=readFileSync(join(folder,key+'.m4a'));let ok=false;
  for(let attempt=0;attempt<3;attempt++){
    try{const r=await fetch(new URL('/internal/audio/'+key,origin),{method:'PUT',headers:{authorization:'Bearer '+input.secret,'content-type':'audio/mp4'},body:data,signal:AbortSignal.timeout(30000)});if(r.ok){const result=await r.json();if(result.stored&&result.size===data.length){ok=true;break;}}else if(r.status===401||r.status===403)throw Object.assign(new Error('Publishing credential was rejected'),{fatal:true});}catch(e){if(e.fatal)throw e;if(attempt===2)process.stdout.write('A clip needs another upload attempt.\n');}
    if(!ok&&attempt<2)await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));
  }
  if(!ok)failures.push(key);done++;if(done%100===0||done===manifest.entries.length)process.stdout.write('Uploaded '+done+'/'+manifest.entries.length+' pronunciation clips\n');
}}
try{await Promise.all(Array.from({length:8},upload));}catch(e){process.stderr.write(e.message+'\n');process.exit(1);}
if(failures.length){process.stdout.write(JSON.stringify({failed:failures.length})+'\n');process.exitCode=1;}else process.stdout.write(JSON.stringify({uploaded:done,failed:0})+'\n');
