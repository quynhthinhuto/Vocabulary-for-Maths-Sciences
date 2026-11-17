import {readFileSync,existsSync,statSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
// Preview adapter only; production uses the Sites-provisioned R2 binding.
export function localAudioBucket(directory){
  const file=key=>/^pronunciation\/v1\/[a-f0-9]{24}\.m4a$/.test(key)?join(directory,key.split('/').pop()):null;
  const metadata=key=>{const path=file(key);if(!path||!existsSync(path))return null;const bytes=readFileSync(path),hash=createHash('sha256').update(bytes).digest('hex');return {key,size:bytes.length,httpEtag:'"'+hash+'"',uploaded:statSync(path).mtime,customMetadata:{sha256:hash}};};
  return {
    async head(key){return metadata(key);},
    async get(key,options){const meta=metadata(key);if(!meta)return null;const bytes=readFileSync(file(key)),range=options?.range;return {...meta,body:range?bytes.subarray(range.offset,range.offset+range.length):bytes};},
    async put(key,value){const path=file(key);if(!path)throw new Error('Invalid key');mkdirSync(directory,{recursive:true});writeFileSync(path,Buffer.from(value));return metadata(key);}
  };
}
