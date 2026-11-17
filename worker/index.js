const ASSETS=/* EMBEDDED_ASSETS */;
const SYLLABUS=/* EMBEDDED_SYLLABUS */;
const PRONUNCIATION_KEYS=new Set(/* EMBEDDED_AUDIO_KEYS */);
/* PRONUNCIATION_ROUTES */
const lessons=new Map(SYLLABUS.lessons.map(l=>[l.id,l]));
const words=new Map(SYLLABUS.words.map(w=>[w.id,w]));
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
const fail=(status,message)=>{throw Object.assign(new Error(message),{status});};
const clean=(v,max)=>typeof v==='string'?v.normalize('NFC').trim().slice(0,max):'';
const eventId=v=>{if(typeof v!=='string'||!/^[-a-zA-Z0-9_]{12,80}$/.test(v))fail(400,'Invalid record ID. / Mã bản ghi không hợp lệ.');return v;};
const teacherId=request=>{const id=request.headers.get('oai-authenticated-user-id');if(!id)fail(401,'Sign in with ChatGPT to manage your classes. / Đăng nhập ChatGPT để quản lý lớp.');return id;};
async function digest(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join('');}
function randomCode(length=8){const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from(crypto.getRandomValues(new Uint8Array(length)),n=>alphabet[n%alphabet.length]).join('');}
async function body(request){if(!request.headers.get('content-type')?.includes('application/json'))fail(415,'JSON required.');const raw=await request.text();if(raw.length>250000)fail(413,'Request too large.');try{return JSON.parse(raw);}catch{fail(400,'Invalid JSON.');}}
const rows=async(db,sql,...params)=>(await db.prepare(sql).bind(...params).all()).results||[];
const first=(db,sql,...params)=>db.prepare(sql).bind(...params).first();
async function ownClass(db,id,owner){const c=await first(db,'SELECT * FROM classrooms WHERE id=? AND owner_id=?',id,owner);if(!c)fail(404,'Class not found. / Không tìm thấy lớp.');return c;}
async function studentIdentity(request,db){const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token||!/^[-A-Z0-9]{20,80}$/.test(token))fail(401,'Join or return to your class. / Hãy vào lại lớp.');const s=await first(db,'SELECT s.*,c.name class_name,c.grade,c.join_code FROM students s JOIN classrooms c ON c.id=s.class_id WHERE s.token_hash=?',await digest(token));if(!s)fail(401,'Student key not found. / Mã học sinh không hợp lệ.');return s;}
function studentPublic(s){return {id:s.id,name:s.name,classId:s.class_id,className:s.class_name,grade:s.grade,joinCode:s.join_code};}
async function api(request,env,path){
  if(!env.DB)fail(503,'Classroom storage is not connected. / Chưa kết nối dữ liệu lớp học.');
  const db=env.DB,method=request.method;
  if(!['GET','POST'].includes(method))fail(405,'Method not allowed.');
  const origin=request.headers.get('origin');if(method==='POST'&&origin&&origin!==new URL(request.url).origin)fail(403,'Origin not allowed.');
  if(path==='/api/me'&&method==='GET')return json({signedIn:!!request.headers.get('oai-authenticated-user-id')});
  if(path==='/api/classes'&&method==='GET'){
    const owner=teacherId(request);
    return json({classes:await rows(db,'SELECT c.id,c.name,c.grade,c.join_code,c.created_at,(SELECT COUNT(*) FROM students s WHERE s.class_id=c.id) student_count FROM classrooms c WHERE owner_id=? ORDER BY created_at DESC',owner)});
  }
  if(path==='/api/classes'&&method==='POST'){
    const owner=teacherId(request),b=await body(request),name=clean(b.name,60),grade=Number(b.grade);
    if(!name||!Number.isInteger(grade)||grade<1||grade>12)fail(400,'Enter a class name and grade. / Nhập tên lớp và khối.');
    const count=await first(db,'SELECT COUNT(*) n FROM classrooms WHERE owner_id=?',owner);if(count.n>=50)fail(400,'Maximum 50 classes. / Tối đa 50 lớp.');
    const id=crypto.randomUUID(),code=randomCode();await db.prepare('INSERT INTO classrooms(id,owner_id,name,grade,join_code,created_at) VALUES(?,?,?,?,?,?)').bind(id,owner,name,grade,code,Date.now()).run();
    return json({id,name,grade,join_code:code,student_count:0},201);
  }
  if(path==='/api/join'&&method==='POST'){
    const b=await body(request),code=clean(b.code,12).toUpperCase().replace(/\s/g,''),name=clean(b.name,40),resume=clean(b.studentKey,80).toUpperCase().replace(/\s/g,'');
    const c=await first(db,'SELECT id,name,grade,join_code FROM classrooms WHERE join_code=?',code);if(!c)fail(404,'Class code not found. / Không tìm thấy mã lớp.');
    if(resume){const s=await first(db,'SELECT * FROM students WHERE class_id=? AND token_hash=?',c.id,await digest(resume));if(!s)fail(401,'Student key not found in this class. / Mã học sinh không đúng lớp.');return json({student:studentPublic({...s,class_name:c.name,grade:c.grade,join_code:c.join_code}),token:resume});}
    if(!name)fail(400,'Enter your name or nickname. / Nhập tên hoặc biệt danh.');
    const count=await first(db,'SELECT COUNT(*) n FROM students WHERE class_id=?',c.id);if(count.n>=500)fail(400,'Class is full. / Lớp đã đủ chỗ.');
    const id=crypto.randomUUID(),token=randomCode(32),now=Date.now();
    await db.prepare('INSERT INTO students(id,class_id,name,token_hash,created_at,last_seen) VALUES(?,?,?,?,?,?)').bind(id,c.id,name,await digest(token),now,now).run();
    return json({student:{id,name,classId:c.id,className:c.name,grade:c.grade,joinCode:c.join_code},token},201);
  }
  if(path==='/api/student/me'&&method==='GET')return json({student:studentPublic(await studentIdentity(request,db))});
  if(path==='/api/student/events'&&method==='POST'){
    const s=await studentIdentity(request,db),b=await body(request),events=b.events;
    if(!Array.isArray(events)||events.length<1||events.length>50)fail(400,'Invalid events.');
    const now=Date.now(),statements=[];
    for(const e of events){
      const id=eventId(e.id);if(!['visit','lesson_open','card'].includes(e.kind))fail(400,'Invalid activity.');
      let l=e.lessonId?lessons.get(e.lessonId):null,w=e.wordId?words.get(e.wordId):null;
      if(e.kind!=='visit'){
        if(e.kind==='card'&&!w)fail(400,'Word not found.');
        if(!l&&w)l=lessons.get(w.lessonIds[0]);
        if(!l||(w&&!l.wordIds.includes(w.id)))fail(400,'Activity does not match the topic. / Nội dung không đúng chủ đề.');
      }
      statements.push(db.prepare('INSERT OR IGNORE INTO study_events(id,student_id,lesson_id,word_id,kind,known,created_at) VALUES(?,?,?,?,?,?,?)').bind(id,s.id,l?.id||null,w?.id||null,e.kind,e.kind==='card'&&e.known?1:0,now));
    }
    statements.push(db.prepare('UPDATE students SET last_seen=? WHERE id=?').bind(now,s.id));await db.batch(statements);
    return json({synced:true,at:now});
  }
  if(path==='/api/student/presence'&&method==='POST'){
    const s=await studentIdentity(request,db);await db.prepare('UPDATE students SET last_seen=? WHERE id=?').bind(Date.now(),s.id).run();return json({ok:true});
  }
  if(path==='/api/student/attempts'&&method==='POST'){
    const s=await studentIdentity(request,db),b=await body(request),id=eventId(b.id),answers=b.answers,l=b.lessonId?lessons.get(b.lessonId):null;
    if(b.lessonId&&!l)fail(400,'Topic not found.');
    if(!Array.isArray(answers)||answers.length<1||answers.length>1000)fail(400,'Invalid answers.');
    if(new Set(answers.map(a=>a.wordId)).size!==answers.length)fail(400,'Duplicate question.');
    if(l&&(answers.length!==l.wordIds.length||answers.some(a=>!l.wordIds.includes(a.wordId))))fail(400,'Finish every question before syncing. / Hoàn thành mọi câu trước khi đồng bộ.');
    const validated=answers.map(a=>{const w=words.get(a.wordId),choice=words.get(a.choiceId),topic=l||lessons.get(w?.lessonIds[0]);if(!w||!choice||choice.grade!==w.grade||choice.subject!==w.subject)fail(400,'Invalid question or answer.');return {wordId:w.id,choiceId:choice.id,lessonId:topic.id,correct:w.id===choice.id?1:0};});
    const previous=await first(db,'SELECT id FROM attempts WHERE student_id=? AND id=?',s.id,id);
    if(!previous){const now=Date.now(),statements=[db.prepare('INSERT OR IGNORE INTO attempts(id,student_id,kind,created_at) VALUES(?,?,?,?)').bind(id,s.id,l?'topic':'mixed',now)];for(const a of validated)statements.push(db.prepare('INSERT OR IGNORE INTO answers(student_id,attempt_id,word_id,lesson_id,choice_id,correct) VALUES(?,?,?,?,?,?)').bind(s.id,id,a.wordId,a.lessonId,a.choiceId,a.correct));statements.push(db.prepare('UPDATE students SET last_seen=? WHERE id=?').bind(now,s.id));await db.batch(statements);}
    const score=await first(db,'SELECT COUNT(*) total,SUM(correct) correct FROM answers WHERE student_id=? AND attempt_id=?',s.id,id);
    return json({synced:true,...score});
  }
  const match=path.match(/^\/api\/classes\/([a-zA-Z0-9-]+)(?:\/students\/([a-zA-Z0-9-]+))?$/);
  if(match&&method==='GET'){
    const c=await ownClass(db,match[1],teacherId(request));
    const students=await rows(db,'SELECT s.id,s.name,s.created_at,s.last_seen,(SELECT COUNT(*) FROM study_events e WHERE e.student_id=s.id AND e.kind=\'visit\') visits,(SELECT COUNT(DISTINCT lesson_id) FROM (SELECT lesson_id FROM study_events e WHERE e.student_id=s.id AND e.lesson_id IS NOT NULL UNION SELECT lesson_id FROM answers q WHERE q.student_id=s.id)) topics,(SELECT COUNT(*) FROM attempts a WHERE a.student_id=s.id) attempts FROM students s WHERE s.class_id=? ORDER BY s.name,s.created_at',c.id);
    if(match[2]&&!students.some(s=>s.id===match[2]))fail(404,'Student not found.');
    const activities=await rows(db,'SELECT e.student_id,e.lesson_id,SUM(e.kind=\'lesson_open\') opens,SUM(e.kind=\'card\') cards,SUM(e.kind=\'card\' AND e.known=1) remembered,MIN(e.created_at) first_at,MAX(e.created_at) last_at FROM study_events e JOIN students s ON s.id=e.student_id WHERE s.class_id=? AND e.lesson_id IS NOT NULL GROUP BY e.student_id,e.lesson_id',c.id);
    const scores=await rows(db,`SELECT student_id,lesson_id,COUNT(*) attempts,SUM(correct) correct,SUM(total) total,SUM(correct=total) perfect,MAX(100.0*correct/total) best,MAX(created_at) last_at FROM (SELECT a.student_id,q.lesson_id,a.id,COUNT(*) total,SUM(q.correct) correct,a.created_at FROM attempts a JOIN answers q ON q.student_id=a.student_id AND q.attempt_id=a.id JOIN students s ON s.id=a.student_id WHERE s.class_id=? GROUP BY a.student_id,q.lesson_id,a.id) GROUP BY student_id,lesson_id`,c.id);
    let history=[];if(match[2])history=await rows(db,'SELECT a.id,a.created_at,a.kind,q.lesson_id,COUNT(*) total,SUM(q.correct) correct FROM attempts a JOIN answers q ON q.student_id=a.student_id AND q.attempt_id=a.id WHERE a.student_id=? GROUP BY a.id,q.lesson_id ORDER BY a.created_at DESC LIMIT 100',match[2]);
    return json({class:{id:c.id,name:c.name,grade:c.grade,join_code:c.join_code},students,activities,scores,history,serverTime:Date.now()});
  }
  fail(404,'Not found.');
}
export default {async fetch(request,env){
  try{const url=new URL(request.url),path=url.pathname;
    if(path.startsWith('/audio/'))return await servePronunciation(request,env,path);
    if(path.startsWith('/internal/audio/'))return await publishPronunciation(request,env,path);
    if(path.startsWith('/api/'))return await api(request,env,path);
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    const key=path==='/'?'/index.html':path,asset=ASSETS[key];if(asset===undefined)return new Response('Not found',{status:404});
    const type=key.endsWith('.js')?'text/javascript':key.endsWith('.css')?'text/css':'text/html';
    return new Response(request.method==='HEAD'?null:asset,{headers:{'content-type':type+'; charset=utf-8','cache-control':type==='text/html'?'no-cache':'public, max-age=3600','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'}});
  }catch(error){return json({error:error.status?error.message:'Classroom request failed. Try again. / Chưa kết nối được lớp. Hãy thử lại.'},error.status||500);}
}};
