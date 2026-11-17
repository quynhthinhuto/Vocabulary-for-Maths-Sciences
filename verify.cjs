const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const context = vm.createContext({
  assert,structuredClone,console,setTimeout,clearTimeout,
  localStorage:{getItem:()=>null,setItem:()=>{}},
  document:{addEventListener:()=>{}},window:{addEventListener:()=>{}}
});
for(const file of ['data','catalog'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8'),context);
vm.runInContext('const legacyIds = WORDS.map(w=>w.id);',context);
for(const file of ['curriculum-data','curriculum'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8'),context);
vm.runInContext(fs.readFileSync('dist/app.js','utf8').replace(/\nrender\(\);\s*$/,'\n'),context);
vm.runInContext(String.raw`
assert.equal(TEXTBOOK_COURSES.length,58);
assert.equal(LESSONS.length,428);
assert.equal(CATALOG.entries,2453);
assert.equal(CATALOG.uniqueEnglish,1598);
assert.equal(new Set(WORDS.map(w=>w.id)).size,WORDS.length);
assert.equal(new Set(LESSONS.map(l=>l.id)).size,LESSONS.length);
assert.equal(legacyIds.length,1970);
assert.ok(legacyIds.every(id=>byId(id)),'All previous word IDs retained');
assert.equal(TEXTBOOK_COURSES.filter(c=>c.scope==='enrichment').length,4);
let packs=0,quizQuestions=0;
for(let grade=1;grade<=12;grade++){
  state.grade=grade;
  const subjects=gradeSubjects();
  assert.equal(subjects.length,grade<=7?4:6);
  assert.equal(subjects.some(s=>s.id==='sciences'),grade<=7);
  for(const id of ['physics','chemistry','biology'])assert.equal(subjects.some(s=>s.id===id),grade>=8);
  view='discover';assert.ok(renderDiscover().includes('Choose a subject'));assert.ok(!renderDiscover().includes('hero-art'));
  for(const subject of subjects){
    subjectId=subject.id;view='subject';
    const words=packWords(subject.id),lessons=packLessons(subject.id),course=courseInfo();
    assert.ok(words.length>=20);assert.ok(words.every(w=>w.active));
    assert.equal(new Set(words.map(w=>w.en.toLowerCase())).size,words.length);
    assert.ok(renderSubject().includes(lessons.length+' TOPICS / CHỦ ĐỀ'));
    assert.equal(course.scope==='enrichment',grade<=2&&['engineering','it'].includes(subject.id));
    const included=new Set();
    for(const l of lessons){
      lessonId=l.id;view='lesson';const html=renderLesson();
      assert.ok(html.indexOf(esc(l.en))<=html.indexOf(esc(l.title)));
      assert.ok(l.en&&l.title&&l.wordIds.length>=4);
      assert.equal(new Set(lessonWords(l.id).map(w=>w.vi)).size,l.wordIds.length);
      if(l.scope!=='enrichment'){
        assert.match(l.sourceUrl,/^https:\/\/(truonghocsoquocgia.nxbgd.vn|hanhtrangso.nxbgd.vn)\//);
        assert.ok(l.sourceRef&&l.sourceTitle);
      }
      for(const w of lessonWords(l.id)){
        assert.equal(w.grade,grade);assert.equal(w.subject,subject.id);
        assert.ok(w.lessonIds.includes(l.id));included.add(w.id);
      }
    }
    assert.equal(included.size,words.length);
    const review=packQuizWords(subject.id);
    assert.equal(review.length,Math.min(words.length,20,Math.max(12,lessons.length)));
    assert.equal(new Set(review.map(w=>w.id)).size,review.length);
    assert.ok(lessons.every(l=>review.some(w=>l.wordIds.includes(w.id))));
    for(const word of words){
      assert.ok(word.en&&word.vi&&word.example);
      assert.ok(!/MISSING|TODO/.test(word.example));
      session={words:[word],index:0};prepareQuestion();
      assert.equal(session.options.length,4);
      assert.equal(new Set(session.options.map(w=>w.vi)).size,4);
      assert.ok(session.options.some(w=>w.id===word.id));
      assert.ok(session.options.every(w=>w.grade===grade&&w.subject===subject.id));
      quizQuestions++;
    }
    packs++;
  }
}
assert.equal(packs,58);
const unitTitles=(s,g)=>TEXTBOOK_COURSES.find(c=>c.subject===s&&c.grade===g).units.map(l=>l.titleEn).join(' ');
assert.match(unitTitles('maths',2),/Multiplication and division/);
assert.match(unitTitles('maths',2),/1,000/);
assert.match(unitTitles('physics',11),/Oscillation|oscillation/);
assert.match(unitTitles('physics',12),/Thermal/);
assert.match(unitTitles('physics',12),/Nuclear/);
assert.ok(!/quantum/i.test(unitTitles('physics',12)));
assert.match(unitTitles('engineering',7),/forest|Forest/);
assert.match(unitTitles('engineering',7),/aquaculture|Aquaculture/);
assert.ok(!/database/i.test(unitTitles('it',8)));
assert.match(unitTitles('it',11),/database|Database/);
// Legacy saved words remain available while new courses use active vocabulary only.
const prior=WORDS.find(w=>!w.active);
state.saved=[prior.id];state.progress[prior.id]={seen:true,learned:true,due:0};
view='saved';assert.ok(renderSaved().includes('Prior study'));
assert.ok(!dueWords().some(w=>w.id===prior.id));
for(const name of ['review','progress','dictionary']){view=name;assert.ok(renderView().length>100);}
query='nguyen tu';assert.ok(searchResults().some(w=>normalize(w.vi).includes(query)));
assert.ok(searchResults().every(w=>w.active));
state.progress={};state.activity={};state.grade=1;
const w=gradeWords()[0];
rateWord(w,false);assert.equal(state.progress[w.id].learned,false);assert.ok(dueWords().some(x=>x.id===w.id));
rateWord(w,true);assert.equal(state.progress[w.id].stage,1);
assert.ok(Math.abs(state.progress[w.id].due-Date.now()-86400000)<1000);
state.progress[w.id].lastDay='2000-01-01';rateWord(w,true);assert.equal(state.progress[w.id].stage,2);
assert.ok(Math.abs(state.progress[w.id].due-Date.now()-3*86400000)<1000);
state.progress[w.id].lastDay='2000-01-01';rateWord(w,true);assert.equal(state.progress[w.id].stage,3);
assert.ok(Math.abs(state.progress[w.id].due-Date.now()-7*86400000)<1000);
rateWord(w,false);assert.equal(state.progress[w.id].stage,0);assert.equal(todayWords().length,1);
console.log('PASS: 58 courses, 428 textbook/enrichment topics, 2453 active entries, '+quizQuestions+' question pools; source links; grade gating; English-first titles; retained 1970 legacy IDs; cross-topic reviews; search; daily deduplication; 1/3/7-day review.');
`,context);
// Verify browser storage loads existing saved words/history without dropping IDs.
const migration=vm.createContext({structuredClone,document:{addEventListener:()=>{}},window:{addEventListener:()=>{}},setTimeout,clearTimeout,
  localStorage:{getItem:()=>JSON.stringify({grade:2,name:'Minh',goal:8,saved:['maths-2-0'],progress:{'maths-2-0':{seen:true,learned:true}},activity:{'2026-11-15':['maths-2-0']},quizzes:[{lessonId:'maths-2-lesson-1',correct:3,total:4}]}),setItem:()=>{}}
});
for(const file of ['data','catalog','curriculum-data','curriculum','app'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8').replace(/\nrender\(\);\s*$/,'\n'),migration);
assert.equal(vm.runInContext('state.saved[0]',migration),'maths-2-0');
assert.equal(vm.runInContext('state.progress["maths-2-0"].learned',migration),true);
assert.equal(vm.runInContext('state.quizzes.length',migration),1);
const lum=hex=>{const a=hex.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722;};
for(const [fg,bg] of [['245fa6','ffffff'],['203750','f2f6fb'],['586f88','ffffff'],['526e89','fafdff'],['4f6d88','fafdff']])assert.ok((Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05)>=4.5,fg+' on '+bg);
console.log('PASS: existing browser history migration and core text/button contrast >= 4.5:1.');
