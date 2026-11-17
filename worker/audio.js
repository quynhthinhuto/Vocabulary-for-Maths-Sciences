// Included in the Worker at build time. Audio bytes live in the R2 binding.
function pronunciationKey(path){
  const match=path.match(/^\/audio\/v1\/([a-f0-9]{24})\.m4a$/);
  return match&&PRONUNCIATION_KEYS.has(match[1])?'pronunciation/v1/'+match[1]+'.m4a':null;
}
function audioRange(value,size){
  const match=value.match(/^bytes=(\d*)-(\d*)$/);
  if(!match||(!match[1]&&!match[2]))return null;
  let start,end;
  if(!match[1]){const count=Number(match[2]);if(!Number.isSafeInteger(count)||count<1)return null;start=Math.max(0,size-count);end=size-1;}
  else{start=Number(match[1]);end=match[2]?Number(match[2]):size-1;}
  if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=size||end<start)return null;
  end=Math.min(end,size-1);return {offset:start,length:end-start+1};
}
async function servePronunciation(request,env,path){
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
  const key=pronunciationKey(path);if(!key)return new Response(null,{status:404});
  if(!env.BUCKET)return new Response(null,{status:503,headers:{'cache-control':'no-store'}});
  const metadata=await env.BUCKET.head(key);if(!metadata)return new Response(null,{status:404,headers:{'cache-control':'no-store'}});
  const headers=new Headers({'content-type':'audio/mp4','accept-ranges':'bytes','cache-control':'public, max-age=31536000, immutable','etag':metadata.httpEtag,'last-modified':new Date(metadata.uploaded).toUTCString(),'x-content-type-options':'nosniff'});
  let range=null;
  const requested=request.headers.get('range'),ifRange=request.headers.get('if-range');
  if(requested&&(!ifRange||ifRange===metadata.httpEtag||ifRange===headers.get('last-modified'))){
    range=audioRange(requested,metadata.size);
    if(!range){headers.set('content-range','bytes */'+metadata.size);return new Response(null,{status:416,headers});}
  }
  if(!range&&request.headers.get('if-none-match')===metadata.httpEtag)return new Response(null,{status:304,headers});
  headers.set('content-length',String(range?range.length:metadata.size));
  if(range)headers.set('content-range',`bytes ${range.offset}-${range.offset+range.length-1}/${metadata.size}`);
  if(request.method==='HEAD')return new Response(null,{status:range?206:200,headers});
  const object=await env.BUCKET.get(key,range?{range}:undefined);
  if(!object)return new Response(null,{status:404,headers:{'cache-control':'no-store'}});
  return new Response(object.body,{status:range?206:200,headers});
}
async function publishPronunciation(request,env,path){
  // The deployment script supplies a secret stored in Sites, never browser code.
  if(request.method!=='PUT'||!env.PRONUNCIATION_UPLOAD_KEY||request.headers.get('authorization')!=='Bearer '+env.PRONUNCIATION_UPLOAD_KEY)return json({error:'Not authorised.'},403);
  const match=path.match(/^\/internal\/audio\/([a-f0-9]{24})$/);
  if(!match||!PRONUNCIATION_KEYS.has(match[1]))return json({error:'Unknown pronunciation.'},404);
  if(!env.BUCKET)return json({error:'Audio storage is not connected.'},503);
  const length=Number(request.headers.get('content-length'));
  if(length>250000)return json({error:'Clip is too large.'},413);
  const buffer=await request.arrayBuffer(),data=new Uint8Array(buffer);
  if(data.length<4500||data.length>250000||String.fromCharCode(...data.slice(4,8))!=='ftyp')return json({error:'Invalid M4A clip.'},400);
  const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))].map(x=>x.toString(16).padStart(2,'0')).join('');
  const key='pronunciation/v1/'+match[1]+'.m4a',existing=await env.BUCKET.head(key);
  if(existing&&existing.customMetadata?.sha256===hash)return json({stored:true,size:existing.size});
  await env.BUCKET.put(key,buffer,{httpMetadata:{contentType:'audio/mp4',cacheControl:'public, max-age=31536000, immutable'},customMetadata:{sha256:hash}});
  return json({stored:true,size:data.length},201);
}
