'use strict';
const CLASS_STORAGE='lexilab-classroom-v1';
let classroom={token:'',student:null,queue:[]},classUI={role:'student',loading:false,error:'',classes:null,detail:null,selectedStudent:'',signedIn:null,lastSynced:null};
try{const v=JSON.parse(localStorage.getItem(CLASS_STORAGE)||'null');if(v&&Array.isArray(v.queue))classroom={...classroom,...v};}catch{}
let syncingClass=false;
const classSave=()=>{try{localStorage.setItem(CLASS_STORAGE,JSON.stringify(classroom));}catch{}};
const classDate=value=>value?new Date(value).toLocaleString(undefined,{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
const classError=e=>e?.message||'Unable to connect. / Chưa kết nối được.';
async function classAPI(path,options={},student=false){
  const response=await fetch(path,{...options,headers:{...(options.body?{'content-type':'application/json'}:{}),...(student?{authorization:'Bearer '+classroom.token}:{}),...options.headers},credentials:'same-origin'});
  let result;try{result=await response.json();}catch{throw new Error('Classroom service is unavailable. / Chưa kết nối được dịch vụ lớp học.');}
  if(!response.ok)throw Object.assign(new Error(result.error||'Request failed. / Chưa thực hiện được.'),{status:response.status});return result;
}
function classRerender(){if(view==='classroom'&&!currentModal)render();}
function trackClass(kind,w=null,lid=null,known=false){
  if(!classroom.token||!classroom.student)return;
  if(w&&!w.active)return;
  const lesson=lid&&lessonById(lid)||w&&lessonById(w.lessonIds?.[0]);
  if(kind!=='visit'&&!lesson)return;
  classroom.queue.push({type:'event',studentId:classroom.student.id,id:crypto.randomUUID(),kind,wordId:w?.id||null,lessonId:lesson?.id||null,known});
  classSave();syncClass();
}
function trackClassQuiz(s){
  if(!classroom.token||!classroom.student||!s.answerRecords?.length||s.words.some(w=>!w.active))return;
  classroom.queue.push({type:'attempt',studentId:classroom.student.id,id:s.trackingId||crypto.randomUUID(),lessonId:s.lessonId||null,answers:s.answerRecords});classSave();syncClass();
}
async function syncClass(){
  if(syncingClass||!classroom.token||!classroom.student||!classroom.queue.length)return;syncingClass=true;
  try{
    while(classroom.queue.length){
      const item=classroom.queue[0];if(item.studentId!==classroom.student.id){classUI.error='Pending records belong to another student. / Có bản ghi chờ của học sinh khác.';break;}
      if(item.type==='event')await classAPI('/api/student/events',{method:'POST',body:JSON.stringify({events:[item]})},true);
      else await classAPI('/api/student/attempts',{method:'POST',body:JSON.stringify(item)},true);
      classroom.queue.shift();classUI.lastSynced=Date.now();classUI.error='';classSave();
    }
  }catch(e){classUI.error=classError(e);}finally{syncingClass=false;classRerender();}
}
async function loadClasses(id=null,studentId=''){
  classUI.loading=true;classUI.error='';classRerender();
  try{
    const me=await classAPI('/api/me');classUI.signedIn=me.signedIn;
    if(me.signedIn){const r=await classAPI('/api/classes');classUI.classes=r.classes;if(id)classUI.detail=await classAPI('/api/classes/'+encodeURIComponent(id)+(studentId?'/students/'+encodeURIComponent(studentId):''));}
    classUI.selectedStudent=studentId;
  }catch(e){classUI.error=classError(e);}finally{classUI.loading=false;classRerender();}
}
function classroomNotice(){return `<details class="classroom-tracking"><summary>How tracking works / Cách ghi nhận kết quả</summary><p class="classroom-note">Tracking starts after a student joins. Quiz scores sync when all questions in that attempt are finished. Pending records retry when connected.<br><span lang="vi">Theo dõi bắt đầu từ lúc học sinh vào lớp. Điểm được đồng bộ khi hoàn thành đủ câu của lượt làm; bản ghi chờ sẽ gửi lại khi có kết nối.</span></p></details>`;}
function classTopicTitle(id){const l=lessonById(id);return l?`${esc(l.en)}<small lang="vi">${esc(l.title)} · ${subj(l.subject).name} · Grade ${l.grade} / Lớp ${l.grade}</small>`:esc(id);}
function renderClassroom(){
  return `${pageHeading('Lớp học của bạn.','Giáo viên theo dõi việc học và kết quả từng bài; học sinh vào bằng mã lớp.','',false)}<div class="class-tabs"><button class="chip ${classUI.role==='student'?'active':''}" data-action="class-role" data-role="student">Student / Học sinh</button><button class="chip ${classUI.role==='teacher'?'active':''}" data-action="class-role" data-role="teacher">Teacher / Giáo viên</button></div>${classUI.error?`<div class="class-alert" role="status">${esc(classUI.error)}</div>`:''}${classUI.role==='teacher'?renderTeacher():renderStudentClass()}${classroomNotice()}${footer()}`;
}
function renderStudentClass(){
  if(!classroom.student)return `<section class="class-panel join-panel"><span class="icon-box">${icon('users')}</span><h2>Join your class / Vào lớp học</h2><p>Ask your teacher for the class code. Use your name or a nickname your teacher recognises.<br><span lang="vi">Nhập mã lớp giáo viên cung cấp và tên hoặc biệt danh để giáo viên nhận ra bạn.</span></p><form id="join-class-form"><label class="form-field">Class code / Mã lớp<input name="code" maxlength="12" required autocomplete="off" placeholder="ABCDEFGH" class="code-input"></label><label class="form-field">Student name / Tên học sinh<input name="name" maxlength="40" autocomplete="nickname" placeholder="Name or nickname / Tên hoặc biệt danh"></label><details><summary>Returning on another device? / Dùng thiết bị khác?</summary><label class="form-field">Student key / Mã học sinh<input name="studentKey" maxlength="80" autocomplete="off" placeholder="Paste your saved key / Dán mã đã lưu"></label><p class="form-hint">Use your student key to keep the same record.<br><span lang="vi">Dùng mã học sinh để tiếp tục đúng hồ sơ cũ; không cần nhập tên mới.</span></p></details><button type="submit" class="btn primary full-width">${classUI.loading?'Connecting… / Đang kết nối…':'Join class / Vào lớp'} ${icon('arrow')}</button></form></section>`;
  const s=classroom.student;
  return `<section class="class-panel student-class"><div class="card-heading"><div><span class="review-eyebrow">YOUR CLASS / LỚP CỦA BẠN</span><h2>${esc(s.className)}</h2></div><span class="bilingual-badge">Grade ${s.grade} / Lớp ${s.grade}</span></div><h3>${esc(s.name)}</h3><p>Your teacher can see visits, topics studied and completed quiz results.<br><span lang="vi">Giáo viên xem được các lần vào học, chủ đề đã học và kết quả luyện tập đã hoàn thành.</span></p><div class="class-sync-status">${icon(classroom.queue.length?'repeat':'checkcircle')}${classroom.queue.length?`${classroom.queue.length} pending records / bản ghi chờ gửi`:'Up to date / Đã đồng bộ'}${classUI.lastSynced?` · ${classDate(classUI.lastSynced)}`:''}</div><div class="class-actions"><button class="btn primary" data-action="class-learn">Continue learning / Tiếp tục học ${icon('arrow')}</button><button class="btn secondary" data-action="class-sync">Sync now / Đồng bộ</button></div><details class="student-key"><summary>Your student key / Mã học sinh của bạn</summary><p>Keep this key to return on another device. Anyone with it can use your student profile.<br><span lang="vi">Giữ mã này để vào lại trên thiết bị khác. Người có mã có thể dùng hồ sơ của bạn.</span></p><code>${esc(classroom.token)}</code></details><button class="text-link class-leave" data-action="class-leave">Leave this device / Rời lớp trên thiết bị này</button></section>`;
}
function renderTeacher(){
  if(classUI.signedIn===false)return `<section class="class-panel join-panel"><h2>Your classes, in one place. / Quản lý các lớp của bạn.</h2><p>Sign in to create a class and view its students’ learning records.<br><span lang="vi">Đăng nhập để tạo lớp và xem dữ liệu học tập của học sinh trong lớp do bạn tạo.</span></p><a class="btn primary" href="/signin-with-chatgpt?returnTo=%2F%3Fclassroom%3Dteacher" target="_top">Sign in with ChatGPT / Đăng nhập ChatGPT ${icon('arrow')}</a></section>`;
  if(classUI.loading&&!classUI.classes)return `<section class="class-panel">Loading classes… / Đang tải lớp học…</section>`;
  if(classUI.detail)return renderClassDetail();
  return `<div class="teacher-layout"><section class="class-panel"><div class="card-heading"><h2>Your classes / Lớp của bạn</h2><button class="text-link" data-action="class-refresh">Refresh / Tải lại ${icon('repeat')}</button></div>${classUI.classes?.length?`<div class="class-list">${classUI.classes.map(c=>`<button class="class-list-row" data-action="class-open" data-class="${c.id}"><span class="icon-box">${icon('users')}</span><div><h3>${esc(c.name)}</h3><p>Grade ${c.grade} / Lớp ${c.grade} · ${c.student_count} students / học sinh</p></div>${icon('arrow')}</button>`).join('')}</div>`:'<div class="class-empty">No classes yet. Create your first class.<br><span lang="vi">Chưa có lớp. Hãy tạo lớp đầu tiên.</span></div>'}</section><section class="class-panel"><h2>Create a class / Tạo lớp</h2><form id="create-class-form"><label class="form-field">Class name / Tên lớp<input name="name" maxlength="60" required placeholder="e.g. 8A / Ví dụ: 8A"></label><label class="form-field">Grade / Khối<select name="grade">${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${i+1===state.grade?'selected':''}>Grade ${i+1} / Lớp ${i+1}</option>`).join('')}</select></label><button class="btn primary full-width" type="submit">Create class / Tạo lớp ${icon('plus')}</button></form></section></div>`;
}
function renderClassDetail(){
  const d=classUI.detail,c=d.class,selected=d.students.find(s=>s.id===classUI.selectedStudent),last=new Date(d.serverTime).toLocaleTimeString();
  return `<button class="back-button" data-action="class-back">${icon('back')}All classes / Danh sách lớp</button><section class="class-panel class-header"><div><h2>${esc(c.name)} <span class="english-label">· Grade ${c.grade} / Lớp ${c.grade}</span></h2><p>Share this class code with your students.<br><span lang="vi">Gửi mã lớp này cho học sinh.</span></p></div><div class="join-code"><small>CLASS CODE / MÃ LỚP</small><strong>${esc(c.join_code)}</strong></div><button class="btn secondary" data-action="class-refresh">Refresh / Tải lại ${icon('repeat')}</button></section><p class="filter-note">Updated / Cập nhật: ${last} · Times use your device’s time zone. / Giờ theo thiết bị.</p><section class="class-panel"><div class="card-heading"><h2>${d.students.length} ${d.students.length===1?'student':'students'} joined / học sinh đã vào lớp</h2></div>${d.students.length?`<p class="class-table-hint">Swipe the table to see more → / Vuốt bảng để xem thêm →</p><div class="class-table-wrap"><table class="class-table"><thead><tr><th>Student<br><small>Học sinh</small></th><th>Visits<br><small>Lần vào học</small></th><th>Topics<br><small>Chủ đề</small></th><th>Quizzes<br><small>Lượt làm</small></th><th>Last active<br><small>Hoạt động gần nhất</small></th><th></th></tr></thead><tbody>${d.students.map(s=>`<tr class="${selected?.id===s.id?'selected':''}"><td><strong>${esc(s.name)}</strong><small>#${s.id.slice(0,6)}</small></td><td>${s.visits}</td><td>${s.topics}</td><td>${s.attempts}</td><td>${classDate(s.last_seen)}</td><td><button class="text-link" data-action="class-student" data-student="${s.id}">Details / Chi tiết ${icon('arrow')}</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="class-empty">No student has joined yet. Records appear after students use the class code.<br><span lang="vi">Chưa có học sinh vào lớp. Dữ liệu xuất hiện khi học sinh dùng mã lớp.</span></div>'}</section>${selected?renderStudentDetail(selected,d):'<p class="notice">Select Details to see topics and results for a student.<br><span lang="vi">Chọn Chi tiết để xem nội dung học và kết quả từng bài của một học sinh.</span></p>'}`;
}
function renderStudentDetail(s,d){
  const records=new Map();for(const a of d.activities.filter(x=>x.student_id===s.id))records.set(a.lesson_id,{...a});
  for(const q of d.scores.filter(x=>x.student_id===s.id))records.set(q.lesson_id,{...(records.get(q.lesson_id)||{}),...q});
  const list=[...records.entries()].sort((a,b)=>(b[1].last_at||0)-(a[1].last_at||0));
  return `<section class="class-panel"><div class="card-heading"><div><h2>${esc(s.name)} · Learning details / Chi tiết học tập</h2><p class="filter-note">Topic results include practice from every grade.<br><span lang="vi">Kết quả gồm nội dung học ở mọi lớp mà học sinh đã chọn.</span></p></div></div>${list.length?`<p class="class-table-hint">Swipe the table to see more → / Vuốt bảng để xem thêm →</p><div class="class-table-wrap"><table class="class-table detail-table"><thead><tr><th>Topic<br><small>Chủ đề</small></th><th>Opens<br><small>Lần mở</small></th><th>Cards rated<br><small>Lượt tự đánh giá</small></th><th>Quiz attempts<br><small>Lượt làm bài</small></th><th>Correct / Total<br><small>Câu đúng / Tổng câu</small></th><th>Full marks<br><small>Lượt đúng toàn bộ</small></th><th>Best<br><small>Tốt nhất</small></th></tr></thead><tbody>${list.map(([id,r])=>`<tr><td>${classTopicTitle(id)}</td><td>${r.opens||0}</td><td>${r.cards||0}<small>${r.remembered||0} marked remembered / tự chọn đã nhớ</small></td><td>${r.attempts||0}</td><td>${r.total?`${r.correct}/${r.total} (${Math.round(r.correct/r.total*100)}%)`:'—'}</td><td>${r.perfect||0}</td><td>${r.total?Math.round(r.best)+'%':'—'}</td></tr>`).join('')}</tbody></table></div>`:'<p class="class-empty">No topic activity yet. / Chưa có hoạt động theo bài.</p>'}<p class="form-hint">Card ratings are self-assessments; quiz results come from submitted answers. Mixed reviews are split by each question’s topic.<br><span lang="vi">Thẻ từ là học sinh tự đánh giá; điểm luyện tập tính từ câu trả lời. Ôn tổng hợp được phân theo chủ đề của từng câu.</span></p></section><section class="class-panel"><h2>Recent quiz results / Kết quả các lượt gần đây</h2><p class="filter-note">Latest 100 topic results; summary above includes all attempts.<br><span lang="vi">100 kết quả chủ đề gần nhất; bảng tổng hợp phía trên tính mọi lượt.</span></p>${d.history.length?`<p class="class-table-hint">Swipe the table to see more → / Vuốt bảng để xem thêm →</p><div class="class-table-wrap"><table class="class-table"><thead><tr><th>Completed / Hoàn thành</th><th>Topic / Chủ đề</th><th>Correct / Số câu đúng</th></tr></thead><tbody>${d.history.map(a=>`<tr><td>${classDate(a.created_at)}<small>${a.kind==='mixed'?'Mixed review / Ôn tổng hợp':'Topic quiz / Luyện tập bài'}</small></td><td>${classTopicTitle(a.lesson_id)}</td><td><strong>${a.correct}/${a.total}</strong> · ${Math.round(a.correct/a.total*100)}%</td></tr>`).join('')}</tbody></table></div>`:'<p class="class-empty">No completed quizzes yet. / Chưa hoàn thành lượt luyện tập nào.</p>'}</section>`;
}
async function joinClass(form){
  if(classUI.loading)return;classUI.loading=true;classUI.error='';const data=new FormData(form);
  try{const r=await classAPI('/api/join',{method:'POST',body:JSON.stringify({code:data.get('code'),name:data.get('name'),studentKey:data.get('studentKey')})});classroom={token:r.token,student:r.student,queue:[]};classSave();state.grade=r.student.grade;saveState();trackClass('visit');classUI.lastSynced=Date.now();toast('Joined your class. / Đã vào lớp.');}catch(e){classUI.error=classError(e);}finally{classUI.loading=false;classRerender();}
}
async function createClass(form){
  if(classUI.creating)return;classUI.creating=true;const submit=form.querySelector('button[type=submit]');submit.disabled=true;const data=new FormData(form);try{const r=await classAPI('/api/classes',{method:'POST',body:JSON.stringify({name:data.get('name'),grade:Number(data.get('grade'))})});await loadClasses(r.id);}catch(e){classUI.error=classError(e);classRerender();}finally{classUI.creating=false;if(submit.isConnected)submit.disabled=false;}
}
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
  if(a==='nav'&&b.dataset.view==='classroom'&&classUI.role==='teacher'&&classUI.classes===null)loadClasses();
  if(a==='class-role'){classUI.role=b.dataset.role;classRerender();if(classUI.role==='teacher')loadClasses();}
  if(a==='class-open')loadClasses(b.dataset.class);
  if(a==='class-student')loadClasses(classUI.detail.class.id,b.dataset.student);
  if(a==='class-refresh')loadClasses(classUI.detail?.class.id,classUI.selectedStudent);
  if(a==='class-back'){classUI.detail=null;classUI.selectedStudent='';loadClasses();}
  if(a==='class-sync')syncClass();
  if(a==='class-learn'){state.grade=classroom.student.grade;saveState();navigate('discover');}
  if(a==='class-leave'){
    if(classroom.queue.length){classUI.error='Sync pending records before leaving. / Hãy đồng bộ bản ghi chờ trước khi rời lớp.';classRerender();return;}
    setModal(`<div class="modal-heading"><h2>Leave this device? / Rời lớp trên thiết bị này?</h2>${closeButton()}</div><p class="info-copy">Keep your student key to return to the same profile. Your teacher keeps the learning record.<br><span lang="vi">Giữ mã học sinh để vào lại đúng hồ sơ. Giáo viên vẫn giữ dữ liệu học của bạn.</span></p><code class="leave-key">${esc(classroom.token)}</code><button class="btn primary full-width" data-action="class-confirm-leave">I have saved my key / Đã giữ mã học sinh</button>`);
  }
  if(a==='class-confirm-leave'){classroom={token:'',student:null,queue:[]};classSave();closeModal();}
});
document.addEventListener('submit',e=>{if(e.target.id==='join-class-form'){e.preventDefault();joinClass(e.target);}if(e.target.id==='create-class-form'){e.preventDefault();createClass(e.target);}});
window.addEventListener('online',syncClass);
setInterval(()=>{if(classroom.token&&!document.hidden){syncClass();classAPI('/api/student/presence',{method:'POST'},true).catch(()=>{});}},60000);
setInterval(()=>{if(view==='classroom'&&classUI.role==='teacher'&&classUI.detail&&!document.hidden&&!classUI.loading)loadClasses(classUI.detail.class.id,classUI.selectedStudent);},30000);
(async()=>{if(classroom.token){try{const r=await classAPI('/api/student/me',{},true);classroom.student=r.student;classSave();trackClass('visit');}catch(e){classUI.error=classError(e);}classRerender();}if(new URLSearchParams(location.search).get('classroom')==='teacher'){classUI.role='teacher';view='classroom';render();loadClasses();}})();
