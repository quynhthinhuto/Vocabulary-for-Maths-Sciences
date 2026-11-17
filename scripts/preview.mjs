import http from 'node:http';
import {mkdirSync,readFileSync} from 'node:fs';
import worker from '../dist/server/index.js';
import {localD1} from './d1-local.mjs';
import {localAudioBucket} from './r2-local.mjs';
const bucket=localAudioBucket('.local/pronunciations');
mkdirSync('.local',{recursive:true});
const db=localD1('.local/classroom.sqlite');
const tables=db.raw.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='classrooms'").all();
if(!tables.length)db.raw.exec(readFileSync('drizzle/0000_classrooms.sql','utf8'));
// Local preview supplies a test teacher identity. This adapter is never deployed.
const server=http.createServer(async(req,res)=>{
  try{const chunks=[];for await(const c of req)chunks.push(c);const headers=new Headers(req.headers);headers.set('oai-authenticated-user-id','local-preview-teacher');
    const request=new Request('http://127.0.0.1:4318'+req.url,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(chunks)}:{})});
    const response=await worker.fetch(request,{DB:db,BUCKET:bucket});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
  }catch(e){res.writeHead(500);res.end('Preview failed');}
});
server.listen(4318,'127.0.0.1',()=>console.log('LexiLab local preview: http://127.0.0.1:4318'));
