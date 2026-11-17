'use strict';

function studyAudio(w){const key=PRONUNCIATION_AUDIO[w.en.normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase()];return key?`<div class="study-audio"><span>Listen / Nghe</span><audio controls preload="none" playsinline src="/audio/v1/${key}.m4a" aria-label="Pronounce ${esc(w.en)} / Nghe phát âm">${esc(w.en)}</audio></div>`:`<button class="study-speak" data-action="speak" data-word="${w.id}" aria-label="Pronounce ${esc(w.en)} / Nghe phát âm">${icon('sound')}Listen / Nghe</button>`;}




function courseInfo(id=subjectId){return COURSE_INDEX.get(`${id}-${state.grade}`);}



const ICONS = {
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',
  repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
  bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4Z"/>',
  chart:'<path d="M4 3v17h17M9 15v-4m5 4V6m5 9V9"/>',
  settings:'<path d="m9.2 4 .6-2h4.4l.6 2 2 .9 2-.4 2.2 3.8-1.4 1.6v2.3l1.4 1.6-2.2 3.8-2-.4-2 .9-.6 2H9.8l-.6-2-2-.9-2 .4L3 14.8l1.4-1.6v-2.3L3 9.3l2.2-3.8 2 .4Z"/><circle cx="12" cy="11.8" r="3"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron:'<path d="m8 5 7 7-7 7"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  external:'<path d="M6 18 18 6M6 6h12v12"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  book:'<path d="M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Zm0 0v15"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  spark:'<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6ZM20 2v4m-2-2h4"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  math:'<path d="M5 7h6M8 4v6m7-5 5 5m0-5-5 5M5 17h6m4-2h6m-6 4h6"/>',
  science:'<path d="M9 3h6m-5 0v7l-6 9a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M7 15h10"/><circle cx="10" cy="17" r=".6"/>',
  atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',
  flask:'<path d="M9 3h6m-5 0v6L5 19a1.5 1.5 0 0 0 1.5 2h11A1.5 1.5 0 0 0 19 19L14 9V3M8 14h8"/><circle cx="11" cy="17" r=".7"/><path d="M15 18h.01"/>',
  leaf:'<path d="M20 3C9 2 3 7 4 14c1 5 7 7 11 3 4-4 5-9 5-14ZM4 21 15 9M8 16v-5m0 5h5"/>',
  gear:'<path d="m9 4 1-2h4l1 2 2 1 2-.2 2 3.4-1.2 1.8v4L21 16l-2 3.4-2-.2-2 1-1 2h-4l-1-2-2-1-2 .2L3 16l1.2-2v-4L3 8.2l2-3.4L7 5Z"/><circle cx="12" cy="12" r="3.5"/>',
  code:'<rect x="2" y="4" width="20" height="15" rx="2"/><path d="M8 22h8m-4-3v3m-3-14-3 3 3 3m6-6 3 3-3 3"/>',
  sound:'<path d="m11 4-5 4H3v8h3l5 4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  checkcircle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bulb:'<path d="M8 16c0-3-3-3-3-7a7 7 0 0 1 14 0c0 4-3 4-3 7Zm1 3h6m-5 3h4"/>',
  flag:'<path d="M5 22V3m0 0c5-5 9 5 15 0v10c-6 5-10-5-15 0"/>',
  heart:'<path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-3 3-1 7 8 15 9-8 11-12 8-15Z"/>',
  trophy:'<path d="M8 3h8v5c0 4-2 6-4 6s-4-2-4-6Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 3v6m-4 1h8"/>',
  edit:'<path d="m16 3 5 5-12 12-6 1 1-6ZM13 6l5 5"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'
};
const icon = (name,cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||ICONS.spark}</svg>`;
const esc = value => String(value??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORAGE = 'lexilab-v1';
const DEFAULT = {grade:8,name:'',goal:8,saved:[],progress:{},activity:{},quizzes:[]};
let state;
try {
  const s = JSON.parse(localStorage.getItem(STORAGE)||'null');
  state = s&&typeof s==='object'?{...DEFAULT,...s}:structuredClone(DEFAULT);
  if(!Number.isInteger(state.grade)||state.grade<1||state.grade>12)state.grade=8;
  state.saved=Array.isArray(state.saved)?state.saved.filter(id=>WORDS.some(w=>w.id===id)):[];
  state.progress=state.progress&&typeof state.progress==='object'?state.progress:{};
  state.activity=state.activity&&typeof state.activity==='object'?state.activity:{};
  state.quizzes=Array.isArray(state.quizzes)?state.quizzes:[];
  state.name=typeof state.name==='string'?state.name.slice(0,28):'';
  if(![4,8,12,16].includes(Number(state.goal)))state.goal=8;
} catch { state=structuredClone(DEFAULT); }
let view='discover', subjectId=null, lessonId=null, filter='all', query='', drawer=false, session=null, currentModal=null, toastTimer, searchTimer;
const $ = s => document.querySelector(s);
const byId = id=>WORDS.find(w=>w.id===id);
const subj = id=>SUBJECTS.find(s=>s.id===id);
const gradeSubjects = ()=>SUBJECTS.filter(s=>state.grade>=s.min&&state.grade<=s.max);
const gradeWords = ()=>WORDS.filter(w=>w.active&&w.grade===state.grade);
const packWords = id=>gradeWords().filter(w=>w.subject===id);
const packLessons = id=>LESSONS.filter(l=>l.subject===id&&l.grade===state.grade);
const lessonById = id=>LESSONS.find(l=>l.id===id);
const lessonWords = id=>(lessonById(id)?.wordIds||[]).map(byId).filter(Boolean);
const lessonSeen = l=>lessonWords(l.id).every(w=>state.progress[w.id]?.seen);
const nextLesson = id=>packLessons(id).find(l=>!lessonSeen(l))||packLessons(id)[0];
const lessonBest = id=>state.quizzes.filter(q=>q.lessonId===id).reduce((best,q)=>Math.max(best,Math.round(q.correct/q.total*100)),-1);
const dayKey = (d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const todayWords = ()=>(state.activity[dayKey()]||[]);
const dueWords = ()=>WORDS.filter(w=>w.active&&state.progress[w.id]?.seen&&Number(state.progress[w.id].due||0)<=Date.now());
const learnedCount = words=>words.filter(w=>state.progress[w.id]?.learned).length;
const saveState = ()=>{try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{toast('Storage is unavailable. Keep this tab open. / Chưa lưu được; hãy giữ tab này mở.');}};
const percent = (n,d)=>d?Math.min(100,Math.round(n/d*100)):0;
const totalLearned = ()=>learnedCount(WORDS.filter(w=>w.active));
const greeting = ()=>state.name?`Hello, ${esc(state.name)}! / Chào ${esc(state.name)}!`:'Hello, explorer! / Chào bạn, nhà khám phá!';
const navItems = [['discover','book','Vocabulary','Từ vựng'],['review','repeat','Review','Ôn tập'],['saved','bookmark','Wordbook','Sổ từ'],['classroom','users','Classroom','Lớp học']];
function navHTML(){return navItems.map(([id,ic,label,en])=>`<button class="nav-item ${view===id||['subject','lesson'].includes(view)&&id==='discover'?'active':''}" data-action="nav" data-view="${id}" ${view===id?'aria-current="page"':''}>${icon(ic)}<span>${label}<small lang="vi">${en}</small></span>${id==='review'&&dueWords().length?`<span class="count">${dueWords().length}</span>`:''}</button>`).join('');}
function render(){
  const crumbs=['subject','lesson'].includes(view)?subj(subjectId).name:({discover:'Vocabulary / Từ vựng',review:'Review / Ôn tập',saved:'Wordbook / Sổ từ',classroom:'Classroom / Lớp học',dictionary:'Search / Tra cứu',progress:'Progress / Tiến độ'}[view]||'LexiLab');
  $('#app').innerHTML=`<div class="mobile-overlay ${drawer?'visible':''}" data-action="drawer"></div><aside class="sidebar ${drawer?'open':''}" aria-label="Main navigation / Điều hướng chính"><a class="brand" href="#" data-action="nav" data-view="discover" aria-label="LexiLab, Vocabulary / Từ vựng"><span class="brand-symbol">L</span><span>LexiLab</span></a><nav class="nav">${navHTML()}</nav><div class="sidebar-bottom"><button class="nav-item full-width" data-action="settings">${icon('settings')}<span>Settings<small lang="vi">Cài đặt</small></span></button><button class="sidebar-help" data-action="about">About / Giới thiệu</button></div></aside><div class="workspace"><header class="topbar"><button class="mobile-toggle" data-action="drawer" aria-label="Open menu / Mở menu">${icon('menu')}</button><div class="breadcrumb"><strong>${crumbs}</strong></div><div class="top-actions"><form class="searchbar" id="search-form" role="search"><label for="global-search" class="sr-only">Search all grades / Tìm từ vựng mọi lớp</label><button class="search-trigger" type="button" data-action="focus-search" aria-label="Open search / Mở tìm kiếm">${icon('search')}</button><input id="global-search" type="search" autocomplete="off" placeholder="Search / Tìm từ…" value="${esc(query)}"></form><button class="profile" data-action="settings" aria-label="Profile settings / Cài đặt hồ sơ">${icon('settings')}</button></div></header><main class="page" id="main-content">${renderView()}</main></div><nav class="mobile-bottom-nav" aria-label="Main tabs / Mục chính">${navHTML()}</nav>`;
}

function pageHeading(title,description,eyebrow='',grade=true){
  const labels={discover:['Vocabulary for Maths, Sciences, Engineering, IT','Từ vựng Toán, Khoa học, Kỹ thuật và CNTT'],saved:['My wordbook','Sổ từ của mình'],review:['Review','Ôn tập'],progress:['Progress','Tiến độ'],dictionary:['Search vocabulary','Tra cứu từ vựng'],classroom:['Classroom','Lớp học']},pair=labels[view]||[title,description];
  return `<div class="page-heading simple-heading ${view==='discover'?'vocabulary-heading':''}"><div><h1 lang="en">${esc(pair[0])}</h1><div class="page-title-vi" lang="vi">${esc(pair[1])}</div></div>${grade?gradePicker():''}</div>`;
}

function gradePicker(){return `<label class="simple-grade"><span>Grade / Lớp</span><select data-grade-picker aria-label="Grade / Lớp">${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${state.grade===i+1?'selected':''}>${i+1}</option>`).join('')}</select></label>`;}

const heroArt = `<svg class="hero-art" viewBox="0 0 330 280" fill="none" aria-hidden="true">
  <circle cx="204" cy="152" r="102" fill="#d6e6f9"/><circle cx="204" cy="152" r="78" stroke="#bdd2ed" stroke-dasharray="3 7"/>
  <path d="m60 240 230-73m-197 92 220-73" stroke="#d3e3f5" stroke-width="1.5"/>
  <g transform="rotate(12 221 174)"><rect x="158" y="99" width="125" height="151" rx="16" fill="#aec8e6"/><rect x="153" y="92" width="125" height="151" rx="16" fill="#fff"/><rect x="162" y="102" width="107" height="114" rx="11" fill="#edf4fc"/>
  <ellipse cx="215" cy="158" rx="41" ry="14" stroke="#6b97c8" stroke-width="2.4"/><ellipse cx="215" cy="158" rx="41" ry="14" transform="rotate(60 215 158)" stroke="#6b97c8" stroke-width="2.4"/><ellipse cx="215" cy="158" rx="41" ry="14" transform="rotate(120 215 158)" stroke="#6b97c8" stroke-width="2.4"/><circle cx="215" cy="158" r="7" fill="#407cb8"/><circle cx="179" cy="151" r="4" fill="#c9e6a6"/><circle cx="231" cy="191" r="4" fill="#f2cc9c"/><rect x="185" y="226" width="57" height="4" rx="2" fill="#c8dcf1"/></g>
  <g transform="rotate(-14 125 124)"><rect x="78" y="72" width="95" height="117" rx="13" fill="#bdd2eb"/><rect x="73" y="67" width="95" height="117" rx="13" fill="#fff"/><rect x="82" y="76" width="77" height="78" rx="8" fill="#d9edc5"/><text x="99" y="129" fill="#77955a" font-size="40" font-weight="600" font-family="Georgia,serif">Aa</text><rect x="91" y="165" width="56" height="4" rx="2" fill="#d0e0f3"/></g>
  <g transform="rotate(8 254 71)"><rect x="220" y="39" width="67" height="60" rx="12" fill="#f9e2ba"/><text x="233" y="79" fill="#bb925b" font-size="26" font-family="Georgia,serif">H₂O</text></g>
  <path d="m294 128 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="#6595c6"/><path d="m97 219 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="#84acd6"/><circle cx="178" cy="48" r="4" fill="#c1d79c"/><circle cx="61" cy="115" r="3" fill="#a6c4e5"/><path d="m117 32 5 6m-10 0 6-5" stroke="#8badd6" stroke-width="2" stroke-linecap="round"/>
</svg>`;
function subjectCard(s){const words=packWords(s.id),lessons=packLessons(s.id),extra=courseInfo(s.id).scope==='enrichment';return `<button class="subject-card simple-subject ${s.color}" data-action="subject" data-subject="${s.id}" aria-label="${s.name}, grade ${state.grade} / ${s.vi}, lớp ${state.grade}"><span class="subject-icon">${icon(s.icon)}</span><div><h3 lang="en">${s.name}</h3><div class="subject-vi" lang="vi">${s.vi}</div><p class="simple-subject-meta">${lessons.length} topics / chủ đề${extra?' · Extra / Bổ trợ':''}</p></div>${icon('chevron','subject-chevron')}</button>`;}

function renderDiscover(){
  const previous=lessonById(state.lastLesson),last=previous&&previous.grade===state.grade?previous:null;
  return `${pageHeading('','','',false)}<div class="vocabulary-start"><p class="simple-instruction">Choose a subject<span lang="vi">Chọn môn để bắt đầu</span></p>${gradePicker()}</div>${last?`<section class="simple-continue"><div><span>Continue / Học tiếp</span><h2>${esc(last.en)}</h2><p lang="vi">${esc(last.title)}</p></div><button class="btn primary" data-action="lesson" data-lesson="${last.id}">Continue / Học tiếp ${icon('arrow')}</button></section>`:''}<div class="simple-subject-grid">${gradeSubjects().map(subjectCard).join('')}</div>${footer()}`;
}

function footer(){return `<footer class="page-footer simple-footer"><span>LexiLab · English–Vietnamese / Anh–Việt</span><div><button data-action="nav" data-view="progress">Progress / Tiến độ</button><button data-action="about">About / Giới thiệu</button></div></footer>`;}

function wordRow(w,i,meta=false){const s=subj(w.subject);return `<div class="word-row"><span class="word-row-number">${String(i+1).padStart(2,'0')}</span><div class="word-row-content"><h3 lang="en"><button data-action="word" data-word="${w.id}" title="Open flashcard / Mở thẻ từ">${esc(w.en)}</button></h3><p>${esc(w.vi)}</p>${meta?`<span class="word-meta">${s.name} · Grade ${w.grade} / Lớp ${w.grade}${w.active?'':' · Prior study / Từ đã lưu trước đây'}</span>`:''}</div>${state.progress[w.id]?.learned?`<span class="learned-mark" title="Remembered / Đã nhớ">${icon('checkcircle')}</span>`:''}<button class="small-icon-button" data-action="speak" data-word="${w.id}" aria-label="Pronounce ${esc(w.en)} / Nghe phát âm">${icon('sound')}</button><button class="small-icon-button ${state.saved.includes(w.id)?'saved':''}" data-action="save" data-word="${w.id}" aria-label="${state.saved.includes(w.id)?'Unsave / Bỏ lưu':'Save / Lưu'} ${esc(w.en)}" aria-pressed="${state.saved.includes(w.id)}">${icon('bookmark')}</button></div>`;}
function lessonCard(l){const words=lessonWords(l.id),seen=words.filter(w=>state.progress[w.id]?.seen).length,score=lessonBest(l.id);return `<button class="simple-topic" data-action="lesson" data-lesson="${l.id}" aria-label="Open topic ${l.number}: ${esc(l.en)} / Mở chủ đề"><span class="simple-topic-number">${String(l.number).padStart(2,'0')}</span><div class="simple-topic-text"><h3 lang="en">${esc(l.en)}</h3><p lang="vi">${esc(l.title)}</p><span>${words.length} words / từ${score>=0?` · Best / Tốt nhất: ${score}%`:seen===words.length?' · Studied / Đã học':''}</span></div>${icon('chevron')}</button>`;}

function renderSubject(){
  const s=subj(subjectId),words=packWords(subjectId),lessons=packLessons(subjectId),info=courseInfo();
  return `<button class="back-button" data-action="nav" data-view="discover">${icon('back')}Subjects / Môn học</button><div class="simple-course-heading"><div><h1 lang="en">${s.name}</h1><p lang="vi">${s.vi}</p><span class="simple-course-count">GRADE ${state.grade} / LỚP ${state.grade} · ${lessons.length} TOPICS / CHỦ ĐỀ · ${words.length} WORDS / TỪ</span>${info.scope==='enrichment'?'<span class="simple-extra">STEM enrichment / Làm quen STEM bổ trợ</span>':''}</div>${gradePicker()}</div><div class="simple-topic-list">${lessons.map(lessonCard).join('')}</div><div class="simple-course-actions"><button class="btn secondary" data-action="pack-quiz" data-subject="${s.id}">${icon('repeat')}Mixed review / Ôn tổng hợp</button></div>${footer()}`;
}

function renderLesson(){
  const l=lessonById(lessonId),s=subj(l.subject),words=lessonWords(l.id),all=packLessons(l.subject),next=all.find(x=>x.number===l.number+1);
  return `<button class="back-button" data-action="subject" data-subject="${s.id}">${icon('back')}${s.name} · Topics / Các bài</button><div class="simple-lesson-heading"><span class="simple-lesson-step">${s.name} · Grade ${state.grade} / Lớp ${state.grade} · ${l.number}/${all.length}</span><h1 lang="en">${esc(l.en)}</h1><p lang="vi">${esc(l.title)}</p><span>${words.length} words / từ</span></div><div class="simple-study-actions"><button class="btn primary" data-action="lesson-start" data-lesson="${l.id}">${icon('layers')}Study / Học thẻ từ</button><button class="btn secondary" data-action="lesson-quiz" data-lesson="${l.id}">${icon('checkcircle')}Quiz / Luyện tập</button></div><div class="word-list simple-word-list">${words.map((w,i)=>wordRow(w,i)).join('')}</div>${next?`<div class="simple-next"><button class="text-link" data-action="lesson" data-lesson="${next.id}">Next topic / Bài tiếp ${icon('arrow')}</button></div>`:''}${footer()}`;
}

function emptyHTML(ic,title,text,action='discover',label='Explore subjects / Khám phá môn học'){return `<div class="empty"><div class="empty-symbol">${icon(ic)}</div><h2>${title}</h2><p>${text}</p><button class="btn primary" data-action="nav" data-view="${action}">${label} ${icon('arrow')}</button></div>`;}
function renderSaved(){
  const words=state.saved.map(byId).filter(Boolean),available=SUBJECTS.filter(s=>words.some(w=>w.subject===s.id)),filtered=filter==='all'?words:words.filter(w=>w.subject===filter);
  return `${pageHeading('Sổ từ của riêng bạn.','Giữ lại những từ thú vị và gặp lại chúng bất cứ lúc nào.','',false)}${words.length?`<div class="collection-tools"><button class="chip ${filter==='all'?'active':''}" data-action="filter" data-filter="all">All / Tất cả (${words.length})</button>${available.map(s=>`<button class="chip ${filter===s.id?'active':''}" data-action="filter" data-filter="${s.id}">${s.name} / ${s.vi}</button>`).join('')}<button class="btn primary" data-action="saved-study">${icon('layers')}Study saved words / Học từ đã lưu</button></div><p class="filter-note">Saved words from all grades, including previous study.<br><span lang="vi">Các từ bạn đã lưu từ mọi lớp, gồm cả từ đã học ở bản trước.</span></p><div class="word-list">${filtered.length?filtered.map((w,i)=>wordRow(w,i,true)).join(''):'<p class="filter-note">No saved words in this subject. Choose All.<br><span lang="vi">Chưa có từ trong môn này. Hãy chọn Tất cả.</span></p>'}</div>`:emptyHTML('bookmark','Your first page awaits. / Trang đầu tiên đang chờ bạn.','Save a word using its bookmark icon.<br><span lang="vi">Bấm biểu tượng lưu ở thẻ từ để tạo sổ từ của mình.</span>')}${footer()}`;
}

function renderReview(){
  const due=dueWords(),seen=WORDS.filter(w=>w.active&&state.progress[w.id]?.seen),upcoming=seen.filter(w=>!due.some(d=>d.id===w.id)).sort((a,b)=>state.progress[a.id].due-state.progress[b.id].due);
  return `${pageHeading('Gặp lại để nhớ lâu hơn.','Những từ cần một chút quan tâm sẽ trở lại đúng lúc.','',false)}${due.length?`<div class="lesson-intro"><span class="icon-box">${icon('repeat')}</span><div><h2>${due.length} words ready to review / từ đến lịch ôn</h2><p>Across all grades · up to 20 words per session.<br><span lang="vi">Từ mọi lớp đã học · tối đa 20 từ mỗi lượt.</span></p></div><button class="btn primary" data-action="review-start">Review now / Ôn ngay ${icon('arrow')}</button></div><div class="word-list">${due.map((w,i)=>wordRow(w,i,true)).join('')}</div>`:seen.length?`<section class="empty"><div class="empty-symbol">${icon('checkcircle')}</div><h2>You’re all caught up! / Bạn đã ôn đủ hôm nay!</h2><p>No words are due yet. ${upcoming.length?`Next review: ${formatDue(state.progress[upcoming[0].id].due)}.`:''}<br><span lang="vi">Chưa có từ đến lịch ôn. Bạn vẫn có thể ôn lại các từ đã học.</span></p><button class="btn primary" data-action="review-all">Review ${seen.length} words / Ôn ${seen.length} từ ${icon('repeat')}</button></section>`:emptyHTML('repeat','Meet it again. Remember more. / Gặp lại để nhớ thêm.','Study a topic to start your review schedule: 1, 3, then 7 days.<br><span lang="vi">Học một bài để bắt đầu lịch ôn sau 1, 3, rồi 7 ngày. Từ chưa nhớ sẽ quay lại ngay.</span>')}${footer()}`;
}

function formatDue(timestamp){return new Date(timestamp).toLocaleDateString('vi-VN',{day:'numeric',month:'numeric',year:'numeric'});}
function streak(){let n=0;const d=new Date();if(!(state.activity[dayKey(d)]||[]).length)d.setDate(d.getDate()-1);while((state.activity[dayKey(d)]||[]).length){n++;d.setDate(d.getDate()-1);}return n;}
function renderProgress(){
  const words=gradeWords(),learned=totalLearned(),days=Object.keys(state.activity).filter(d=>state.activity[d]?.length).length,quiz=state.quizzes,accuracy=quiz.length?Math.round(quiz.reduce((n,q)=>n+q.correct,0)/quiz.reduce((n,q)=>n+q.total,0)*100):0;
  const dates=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d;}),max=Math.max(state.goal,...dates.map(d=>(state.activity[dayKey(d)]||[]).length));
  return `${pageHeading('Những bước nhỏ, tiến bộ thật.','Mỗi từ bạn học đều được ghi lại trong hành trình này.')}<div class="stats-grid">${[['book',learned,'Words remembered / Từ đã nhớ'],['sun',streak(),'Day streak / Ngày liên tiếp'],['flag',days,'Days studied / Ngày đã học'],['checkcircle',quiz.length?`${accuracy}%`:'—','Quiz accuracy / Tỉ lệ trả lời đúng']].map(([ic,n,label])=>`<div class="stat-card"><div class="stat-icon">${icon(ic)}</div><div class="stat-number">${n}</div><div class="stat-label">${label}</div></div>`).join('')}</div><div class="progress-columns"><section class="progress-table"><div class="card-heading"><h2>Grade ${state.grade} progress / Tiến độ lớp ${state.grade}</h2><span class="goal-label">${learnedCount(words)}/${words.length} words / từ</span></div>${gradeSubjects().map(s=>{const list=packWords(s.id),n=learnedCount(list);return `<div class="progress-table-row ${s.color}"><span class="subject-icon">${icon(s.icon)}</span><strong>${s.name}<small lang="vi">${s.vi}</small></strong><div class="progress-track"><div class="progress-fill" style="width:${percent(n,list.length)}%"></div></div><small>${n}/${list.length}</small></div>`;}).join('')}</section><section class="card"><div class="card-heading"><h2>Last 7 days / 7 ngày vừa qua</h2>${icon('chart')}</div><p class="goal-label">Words studied per day, across all grades.<br><span lang="vi">Số từ học mỗi ngày, ở mọi lớp.</span></p><div class="week-chart">${dates.map((d,i)=>{const n=(state.activity[dayKey(d)]||[]).length;return `<div class="week-bar ${i===6?'today':''}"><span class="amount">${n}</span><div class="bar" style="height:${Math.max(3,n/max*110)}px" role="img" aria-label="${d.getDate()}/${d.getMonth()+1}: ${n} words / từ"></div><span>${d.getDate()}/${d.getMonth()+1}</span></div>`;}).join('')}</div><p class="notice" style="margin-bottom:0">${learned?'Keep building your knowledge, one word at a time.<br><span lang="vi">Tiếp tục tích lũy kiến thức, từng từ một nhé.</span>':'Start with four words today.<br><span lang="vi">Học bốn từ đầu tiên để bắt đầu hành trình.</span>'}</p></section></div>${footer()}`;
}

function normalize(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();}
function searchResults(){const q=normalize(query.trim());return q?WORDS.filter(w=>w.active&&normalize(`${w.en} ${w.vi} ${subj(w.subject).name}`).includes(q)):[];}
function dictionaryContent(){const list=searchResults();return `${query.trim()?`<p class="result-count">${list.length} results for “${esc(query)}” · all 12 grades<br><span lang="vi">${list.length} kết quả · tìm trong cả 12 lớp</span></p>${list.length?`<div class="word-list">${list.map((w,i)=>wordRow(w,i,true)).join('')}</div>`:emptyHTML('search','No matching word yet. / Chưa tìm thấy từ này.',`Try an English word, Vietnamese meaning or subject name.<br><span lang="vi">Thử từ tiếng Anh, nghĩa tiếng Việt hoặc tên môn.</span><br>${CATALOG.entries} entries by grade / mục từ theo lớp.`)}`:emptyHTML('search','What are you curious about? / Bạn đang tò mò về từ nào?','Search in English or Vietnamese, for example: gravity, nguyên tử, Maths.<br><span lang="vi">Nhập từ tiếng Anh, nghĩa tiếng Việt hoặc tên môn ở thanh tìm kiếm.</span>')}`;}

function renderDictionary(){return `${pageHeading('Một từ, nhiều điều để biết.',`Tra cứu nhanh trong kho từ vựng STEM Anh–Việt.`,'GÓC TRA CỨU',false)}<div id="dictionary-results">${dictionaryContent()}</div>${footer()}`;}
function renderView(){return ({discover:renderDiscover,subject:renderSubject,lesson:renderLesson,saved:renderSaved,review:renderReview,progress:renderProgress,dictionary:renderDictionary,classroom:()=>renderClassroom()}[view]||renderDiscover)();}
function navigate(to){view=to;filter='all';drawer=false;if(to!=='dictionary')query='';render();window.scrollTo({top:0,behavior:'instant'});}
function showSubject(id){if(!gradeSubjects().some(s=>s.id===id))return;subjectId=id;navigate('subject');}
function showLesson(id){const l=lessonById(id);if(!l||!gradeSubjects().some(s=>s.id===l.subject)||l.grade!==state.grade)return;lessonId=id;subjectId=l.subject;state.lastLesson=id;saveState();navigate('lesson');if(typeof trackClass==='function')trackClass('lesson_open',null,id);}
function packQuizWords(id){const lessons=packLessons(id),used=new Set(),words=[],target=Math.min(20,Math.max(12,lessons.length));for(const l of lessons){const w=shuffle(lessonWords(l.id)).find(w=>!used.has(w.id));if(w){words.push(w);used.add(w.id);}}const rest=shuffle(packWords(id).filter(w=>!used.has(w.id)));while(words.length<target&&rest.length)words.push(rest.pop());return shuffle(words.slice(0,target));}

function studyLesson(id,mode='cards'){const l=lessonById(id);if(!l)return;startStudy(lessonWords(id),`${subj(l.subject).name} · Topic ${l.number} / Chủ đề ${l.number} · Grade ${l.grade}`,mode,{lessonId:l.id,packKey:`${l.subject}-${l.grade}`});}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),3200);}
function saveWord(id){if(!byId(id))return;const added=!state.saved.includes(id);state.saved=added?[...state.saved,id]:state.saved.filter(x=>x!==id);saveState();const scroll=window.scrollY;render();window.scrollTo(0,scroll);if(session)renderSession();toast(added?'Saved to your wordbook. / Đã thêm vào sổ từ.':'Word unsaved. / Đã bỏ lưu từ.');}
function speak(id){playPronunciation(id);}
function setModal(content,cls=''){currentModal=cls||'dialog';$('#modal-root').innerHTML=`<div class="modal-overlay" data-action="overlay-close"><section class="modal ${cls}" role="dialog" aria-modal="${document.querySelector('#pronunciation-player:not([hidden])')?'false':'true'}" aria-label="${cls==='study'?'Vocabulary practice / Học từ vựng':'LexiLab dialog / Cửa sổ LexiLab'}">${content}</section></div>`;document.body.style.overflow='hidden';requestAnimationFrame(()=>$('#modal-root .close-modal')?.focus({preventScroll:true}));}
function closeModal(){session=null;currentModal=null;$('#modal-root').innerHTML='';document.body.style.overflow='';render();}
const closeButton = ()=>`<button class="close-modal" data-action="close" aria-label="Close / Đóng cửa sổ">${icon('close')}</button>`;
function showGrades(){setModal(`<div class="modal-heading"><div><h2>Choose your grade / Chọn lớp</h2><p>Choose a grade to explore its vocabulary.<br><span lang="vi">Chọn lớp để khám phá từ vựng.</span></p></div>${closeButton()}</div>${[['Primary / Tiểu học',1,5],['Lower secondary / Trung học cơ sở',6,9],['Upper secondary / Trung học phổ thông',10,12]].map(([label,a,b])=>`<p class="grade-section-label">${label}</p><div class="grades">${Array.from({length:b-a+1},(_,i)=>`<button class="grade-option ${state.grade===a+i?'active':''}" data-action="set-grade" data-grade="${a+i}" ${state.grade===a+i?'aria-current="true"':''}>Grade ${a+i} / Lớp ${a+i}</button>`).join('')}</div>`).join('')}<div class="grade-hint">Sciences: Grades 1–7 / Lớp 1–7.<br>Physics, Chemistry, Biology: Grades 8–12 / Lớp 8–12.<br>Maths, Engineering, IT: Grades 1–12 / Lớp 1–12.</div>`);}
function showSettings(){setModal(`<div class="modal-heading"><div><h2>Study settings / Cài đặt</h2><p>Make this space yours.<br><span lang="vi">Tùy chỉnh góc học theo cách bạn thích.</span></p></div>${closeButton()}</div><form id="settings-form"><label class="form-field">Name / Tên<input name="name" maxlength="28" placeholder="Name or nickname / Tên hoặc biệt danh" value="${esc(state.name)}"></label><label class="form-field">Grade / Lớp<select name="grade">${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${state.grade===i+1?'selected':''}>Grade ${i+1} / Lớp ${i+1}</option>`).join('')}</select></label><label class="form-field">Daily goal / Mục tiêu<select name="goal">${[4,8,12,16].map(n=>`<option value="${n}" ${state.goal==n?'selected':''}>${n} words / từ mỗi ngày${n===8?' · suggested / gợi ý':''}</option>`).join('')}</select></label><p class="form-hint">Your wordbook and progress are stored in this browser.<br><span lang="vi">Sổ từ và tiến độ lưu trên trình duyệt này.</span></p><button class="btn primary full-width" type="submit">Save settings / Lưu ${icon('check')}</button></form>`);}
function showAbout(){setModal(`<div class="modal-heading"><div><h2>About LexiLab / Về LexiLab</h2><p>English for curious minds.<br><span lang="vi">Tiếng Anh cho những bộ óc tò mò.</span></p></div>${closeButton()}</div><div class="info-copy"><p><strong>Textbook companion / Đồng hành SGK</strong><br>Kết nối tri thức với cuộc sống · NXB Giáo dục Việt Nam</p><p><strong>${LESSONS.length} vocabulary topics / chủ đề từ vựng</strong> · ${CATALOG.entries} entries by grade / mục từ theo lớp · ${CATALOG.uniqueEnglish} distinct English terms / từ tiếng Anh khác nhau.</p><p>Vocabulary is organised by grade and textbook topics.<br><span lang="vi">Từ vựng được tổ chức theo lớp và chủ đề sách.</span></p><p>Sciences 1–3: Nature and Society; 4–5: Science; 6–7: Natural Science. Physics, Chemistry and Biology 8–9 are branches of the integrated Natural Science textbook.<br><span lang="vi">Sciences lớp 1–3: Tự nhiên và Xã hội; 4–5: Khoa học; 6–7: Khoa học tự nhiên. Physics, Chemistry, Biology lớp 8–9 thuộc sách Khoa học tự nhiên.</span></p><p>Technology and Computing 1–2 are clearly labelled STEM enrichment.<br><span lang="vi">Engineering và IT lớp 1–2 được ghi rõ là làm quen STEM bổ trợ.</span></p><p>Classroom reports use shared storage. Teachers can view only the classes they created.<br><span lang="vi">Báo cáo lớp học lưu trên hệ thống; giáo viên chỉ xem lớp mình tạo.</span></p><p>Personal progress and saved words stay in this browser. Previously saved words are retained, including supplementary terms.<br><span lang="vi">Tiến độ và sổ từ lưu trên trình duyệt; các từ đã lưu từ bản trước được giữ lại.</span></p></div>`);}

function rateWord(w,known){const now=Date.now(),old=state.progress[w.id]||{},stage=known?Math.max(1,Math.min(3,(old.stage||0)+(old.lastDay===dayKey()?0:1))):0;const days=known?[0,1,3,7][stage]:0;state.progress[w.id]={seen:true,learned:known,stage,due:now+days*86400000,lastDay:dayKey()};const arr=state.activity[dayKey()]||[];if(!arr.includes(w.id))state.activity[dayKey()]=[...arr,w.id];saveState();}
function startStudy(words,title,mode='cards',meta={}){if(!words.length){toast('Save a word to begin. / Hãy lưu một từ để bắt đầu.');return;}session={words:words.slice(0,mode==='review'?20:undefined),title,mode:mode==='review'?'cards':mode,index:0,flipped:false,known:0,answers:[],answerRecords:[],trackingId:crypto.randomUUID(),selected:null,finished:false,...meta};if(session.mode==='quiz')prepareQuestion();renderSession();}
function shuffle(arr){const list=[...arr];for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;}
function prepareQuestion(){const w=session.words[session.index],other=shuffle(WORDS.filter(x=>x.active&&x.id!==w.id&&x.grade===w.grade&&x.subject===w.subject&&x.vi!==w.vi));const options=[w];for(const x of other){if(!options.some(o=>o.vi===x.vi))options.push(x);if(options.length===4)break;}session.options=shuffle(options);session.selected=null;}
function renderSession(){if(!session)return;const s=session,w=s.words[s.index],total=s.words.length;if(s.finished){renderFinish();return;}const top=`<div class="study-topline"><strong>${esc(s.title)}</strong><span>${s.index+1} / ${total}</span>${closeButton()}</div><div class="study-progress"><div style="width:${s.index/total*100}%"></div></div>`;
  if(s.mode==='quiz'){const answered=s.selected!==null,correct=answered&&s.selected===w.id;setModal(`${top}<p class="quiz-question">Choose the correct Vietnamese meaning.<br><span lang="vi">Chọn nghĩa tiếng Việt đúng của từ.</span></p><h2 class="quiz-word">${esc(w.en)}</h2><div class="quiz-options">${s.options.map((o,i)=>`<button class="quiz-option ${answered?(o.id===w.id?'correct':o.id===s.selected?'wrong':''):''}" data-action="answer" data-word="${o.id}" ${answered?'disabled':''}><span class="option-letter">${'ABCD'[i]}</span>${esc(o.vi)}${answered&&o.id===w.id?icon('check'):''}</button>`).join('')}</div>${answered?`<div class="quiz-feedback ${correct?'correct':'wrong'}"><strong>${correct?'Correct! Well done. / Chính xác! Bạn làm tốt lắm.':`Let’s remember / Mình nhớ lại nhé: ${esc(w.en)} = ${esc(w.vi)}.`}</strong><p>${esc(w.example)}</p></div><div class="quiz-next"><button class="btn primary" data-action="quiz-next">${s.index===total-1?'Results / Kết quả':'Next / Tiếp theo'} ${icon('arrow')}</button></div>`:'<p class="study-footer">Take your time. You can do this.<br><span lang="vi">Đọc kỹ một chút, bạn làm được mà.</span></p>'}`,'study');return;}
  setModal(`${top}<div class="study-card ${s.flipped?'flipped':''}"><button class="study-save ${state.saved.includes(w.id)?'saved':''}" data-action="save" data-word="${w.id}" aria-label="${state.saved.includes(w.id)?'Unsave / Bỏ lưu':'Save / Lưu'} từ" aria-pressed="${state.saved.includes(w.id)}">${icon('bookmark')}</button><span class="study-tag">${subj(w.subject).name} · GRADE ${w.grade} / LỚP ${w.grade}</span><button class="flash-face" data-action="flip" aria-label="Flip card ${esc(w.en)} / Lật thẻ từ"><h2 lang="en">${esc(w.en)}</h2>${s.flipped?`<div class="study-meaning" lang="vi">${esc(w.vi)}</div>`:""}${s.flipped?`<p class="study-example" lang="en"><span class="example-label">EXAMPLE / VÍ DỤ</span>${esc(w.example)}</p>`:IPA[w.en]?`<div class="study-ipa">${IPA[w.en]}</div>`:''}</button>${studyAudio(w)}<button class="flip-hint" data-action="flip">${icon('repeat')}${s.flipped?'Hide meaning / Ẩn nghĩa':'Reveal meaning / Lật thẻ'}</button></div><div class="study-controls">${s.flipped?`<button class="btn secondary" data-action="rate" data-known="false">${icon('repeat')}Review again / Ôn thêm</button><button class="btn primary" data-action="rate" data-known="true">${icon('check')}Got it / Đã nhớ</button>`:`<button class="btn primary" data-action="flip">Flip card / Lật thẻ ${icon('repeat')}</button>`}</div><p class="study-footer">${s.flipped?'Choose how well you remember. / Tự đánh giá mức độ ghi nhớ.':'Listen and try saying the word. / Nghe và thử đọc to.'}</p>`,'study');}
function renderFinish(){const s=session,total=s.words.length,correct=s.mode==='quiz'?s.answers.filter(Boolean).length:s.known;setModal(`<div style="display:flex;justify-content:flex-end">${closeButton()}</div><div class="finish"><div class="finish-icon">${icon(s.mode==='quiz'?'trophy':'spark')}</div><h2>${s.mode==='quiz'?(correct===total?'Great job! / Tuyệt lắm!':'Keep growing / Tiến bộ từng bước'):'Well done! / Thêm một khám phá!'}</h2><div class="finish-score">${correct}<span style="font-size:22px;color:#5c7896"> / ${total}</span></div><p>${s.mode==='quiz'?`correct answers / câu đúng. ${correct===total?'Quiz complete! / Bạn đã hoàn thành!':'Missed words are ready for review. / Từ chưa đúng đã vào lịch ôn.'}`:`words remembered / từ đã nhớ. ${total-correct?`${total-correct} words to revisit / từ cần ôn thêm.`:'Your next review is scheduled. / Đã hẹn ôn tập.'}`}</p><div class="finish-actions">${s.mode==='quiz'?'<button class="btn secondary" data-action="retry-quiz">Try again / Làm lại</button>':'<button class="btn secondary" data-action="session-quiz">Take a quiz / Luyện tập</button>'}<button class="btn primary" data-action="close">Done / Xong ${icon('check')}</button></div>${s.lessonId&&packLessons(lessonById(s.lessonId).subject).some(l=>l.number===lessonById(s.lessonId).number+1)?'<button class="text-link next-lesson-link" data-action="study-next-lesson">Next topic / Bài tiếp theo →</button>':''}</div>`,'study');}
function recordQuiz(){if(typeof trackClassQuiz==='function')trackClassQuiz(session);state.quizzes.push({date:dayKey(),correct:session.answers.filter(Boolean).length,total:session.words.length,lessonId:session.lessonId||null,packKey:session.packKey||null});state.quizzes=state.quizzes.slice(-500);saveState();}
function showSearch(){if(view!=='dictionary'){view='dictionary';filter='all';const input=$('#global-search'),selection=input.selectionStart;$('#main-content').innerHTML=renderDictionary();$('.breadcrumb strong').textContent='Dictionary / Tra cứu';$('.nav').innerHTML=navHTML();if(selection!==null)input.setSelectionRange(selection,selection);}else $('#dictionary-results').innerHTML=dictionaryContent();}

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');if(!b)return;
  const a=b.dataset.action;
  if(a==='overlay-close'&&e.target!==b)return;
  if(a==='nav'){e.preventDefault();navigate(b.dataset.view);}
  else if(a==='drawer'){drawer=!drawer;$('.sidebar').classList.toggle('open',drawer);$('.mobile-overlay').classList.toggle('visible',drawer);}
  else if(a==='focus-search')$('#global-search').focus();
  else if(a==='subject')showSubject(b.dataset.subject);
  else if(a==='lesson')showLesson(b.dataset.lesson);
  else if(a==='lesson-start')studyLesson(b.dataset.lesson);
  else if(a==='lesson-quiz')studyLesson(b.dataset.lesson,'quiz');
  else if(a==='pack-quiz'){const id=b.dataset.subject;startStudy(packQuizWords(id),`${subj(id).name} · Course review / Ôn tổng hợp`,'quiz',{packKey:`${id}-${state.grade}`});}
  else if(a==='grades')showGrades();
  else if(a==='set-grade'){state.grade=Number(b.dataset.grade);saveState();view='discover';query='';closeModal();toast(`Grade ${state.grade} opened. / Đã mở lớp ${state.grade}.`);}
  else if(a==='settings')showSettings();
  else if(a==='about')showAbout();
  else if(a==='close'||a==='overlay-close')closeModal();
  else if(a==='save')saveWord(b.dataset.word);
  else if(a==='speak')speak(b.dataset.word);
  else if(a==='word'){const w=byId(b.dataset.word);if(w)startStudy([w],`${subj(w.subject).name} · Explore a word / Khám phá một từ`);}
  else if(a==='start')studyLesson(nextLesson(b.dataset.subject).id);
  else if(a==='quiz')startStudy(packWords(b.dataset.subject),`${subj(b.dataset.subject).name} · Quiz / Luyện tập`,'quiz');
  else if(a==='daily'){const untouched=gradeWords().filter(w=>!todayWords().includes(w.id)),list=(untouched.length?untouched:gradeWords()).slice(0,4);startStudy(list,'Daily practice / Học mỗi ngày');}
  else if(a==='review-start')startStudy(dueWords(),'Spaced review / Ôn tập cách quãng','review');
  else if(a==='review-all')startStudy(WORDS.filter(w=>w.active&&state.progress[w.id]?.seen),'Review studied words / Ôn từ đã học','review');
  else if(a==='saved-study'){const words=state.saved.map(byId).filter(Boolean).filter(w=>filter==='all'||w.subject===filter);startStudy(words,'Your wordbook / Sổ từ của bạn');}
  else if(a==='filter'){filter=b.dataset.filter;render();}
  else if(a==='flip'&&session){session.flipped=!session.flipped;renderSession();}
  else if(a==='rate'&&session){if(!session.flipped)return;const known=b.dataset.known==='true';rateWord(session.words[session.index],known);if(typeof trackClass==='function')trackClass('card',session.words[session.index],session.lessonId,known);if(known)session.known++;session.index++;session.flipped=false;if(session.index>=session.words.length)session.finished=true;renderSession();}
  else if(a==='answer'&&session&&session.mode==='quiz'&&session.selected===null){const w=session.words[session.index],correct=b.dataset.word===w.id;session.selected=b.dataset.word;session.answers.push(correct);session.answerRecords.push({wordId:w.id,choiceId:b.dataset.word});rateWord(w,correct);renderSession();}
  else if(a==='quiz-next'&&session&&session.selected!==null){session.index++;if(session.index>=session.words.length){session.finished=true;recordQuiz();}else prepareQuestion();renderSession();}
  else if(a==='session-quiz'&&session){const {words,title,lessonId,packKey}=session;startStudy(words,title.replace('Explore a word / Khám phá một từ','Quiz / Luyện tập'),'quiz',{lessonId,packKey});}
  else if(a==='retry-quiz'&&session){const {words,title,lessonId,packKey}=session;startStudy(words,title,'quiz',{lessonId,packKey});}
  else if(a==='study-next-lesson'&&session){const l=lessonById(session.lessonId),next=l&&packLessons(l.subject).find(x=>x.number===l.number+1);if(next){lessonId=next.id;subjectId=next.subject;view='lesson';render();studyLesson(next.id);}}
});
document.addEventListener('input',e=>{if(e.target.id==='global-search'){query=e.target.value;clearTimeout(searchTimer);searchTimer=setTimeout(showSearch,150);}});
document.addEventListener('submit',e=>{
  if(e.target.id==='search-form'){e.preventDefault();clearTimeout(searchTimer);query=$('#global-search').value;showSearch();}
  if(e.target.id==='settings-form'){e.preventDefault();const data=new FormData(e.target),oldGrade=state.grade;state.name=String(data.get('name')).trim().slice(0,28);state.grade=Number(data.get('grade'));state.goal=Number(data.get('goal'));saveState();if(['subject','lesson'].includes(view)&&(oldGrade!==state.grade||!gradeSubjects().some(s=>s.id===subjectId)))view='discover';closeModal();toast('Settings saved. / Đã lưu cài đặt.');}
});
document.addEventListener('keydown',e=>{
  const input=['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName);
  if(e.key==='Escape'){if(currentModal)closeModal();else if(drawer){drawer=false;$('.sidebar').classList.remove('open');$('.mobile-overlay').classList.remove('visible');}else if(view==='dictionary'){query='';navigate('discover');}}
  if(e.key==='/'&&!input&&!currentModal){e.preventDefault();$('#global-search').focus();}
  if(currentModal&&e.key==='Tab'){const items=[...document.querySelectorAll('#modal-root button:not(:disabled),#modal-root input,#modal-root select,#modal-root [tabindex="0"],#pronunciation-player:not([hidden]) button:not([hidden]),#pronunciation-player:not([hidden]) a[href],#pronunciation-player:not([hidden]) audio')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
  if(session&&!session.finished&&session.mode==='cards'&&!input){if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();session.flipped=!session.flipped;renderSession();}}
});
window.addEventListener('storage',e=>{if(e.key===STORAGE&&!currentModal){try{const updated=JSON.parse(e.newValue);if(updated&&Array.isArray(updated.saved)&&updated.progress){state={...DEFAULT,...updated};render();}}catch{}}});
document.addEventListener('change',e=>{if(!e.target.matches('[data-grade-picker]'))return;state.grade=Number(e.target.value);saveState();if(view==='lesson')view='subject';if(view==='subject'&&!gradeSubjects().some(s=>s.id===subjectId))view='discover';render();window.scrollTo({top:0,behavior:'instant'});});
render();
