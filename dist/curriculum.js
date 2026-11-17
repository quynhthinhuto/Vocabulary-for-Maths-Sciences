// Keep old IDs available for existing wordbooks and study history.
// Only active textbook or explicitly labelled enrichment words form the new courses.
const CURRICULUM_PROFILE={id:'kntt-2018',name:'Kết nối tri thức với cuộc sống',publisher:'NXB Giáo dục Việt Nam',checked:'2026-11-16'};
const COURSE_INDEX=new Map();
const activeWordIndex=new Map();
const legacyIndex=new Map();
const legacyTermIndex=new Map();
const tidy=s=>String(s).normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase();
for(const w of WORDS){
  w.active=false;
  const key=`${w.subject}|${w.grade}|${tidy(w.en)}|${tidy(w.vi)}`;
  if(!legacyIndex.has(key))legacyIndex.set(key,w);
  const termKey=`${w.subject}|${w.grade}|${tidy(w.en)}`;
  if(!legacyTermIndex.has(termKey))legacyTermIndex.set(termKey,[]);
  legacyTermIndex.get(termKey).push(w);
}
function termHash(s){let h=2166136261;for(const ch of s){h^=ch.codePointAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
LESSONS.splice(0);
for(const course of TEXTBOOK_COURSES){
  const packKey=`${course.subject}-${course.grade}`;
  const lessonIds=[];
  course.units.forEach((unit,n)=>{
    const id=`kntt-${packKey}-${n+1}`;
    const wordIds=[];
    for(const entry of unit.words){
      const key=`${packKey}|${tidy(entry.en)}`;
      let w=activeWordIndex.get(key);
      if(!w){
        w=legacyIndex.get(`${course.subject}|${course.grade}|${tidy(entry.en)}|${tidy(entry.vi)}`);
        if(!w){
          const candidates=legacyTermIndex.get(`${course.subject}|${course.grade}|${tidy(entry.en)}`)||[];
          w=candidates.find(old=>{const a=tidy(old.vi),b=tidy(entry.vi);return Math.min(a.length,b.length)>=4&&(a.includes(b)||b.includes(a));});
        }
        if(!w){
          const slug=tidy(entry.en).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,32)||'term';
          w={id:`kntt-${packKey}-${slug}-${termHash(key)}`,subject:course.subject,grade:course.grade};
          WORDS.push(w);
        }
        Object.assign(w,entry,{active:true,scope:course.scope,lessonIds:[]});
        activeWordIndex.set(key,w);
      }
      if(!w.lessonIds.includes(id))w.lessonIds.push(id);
      if(!wordIds.includes(w.id))wordIds.push(w.id);
    }
    LESSONS.push({id,subject:course.subject,grade:course.grade,number:n+1,title:unit.titleVi,en:unit.titleEn,wordIds,sourceTitle:unit.sourceTitle,sourceUrl:unit.sourceUrl,sourceRef:unit.sourceRef,scope:course.scope,track:course.track});
    lessonIds.push(id);
  });
  COURSE_INDEX.set(packKey,{...course,units:undefined,lessonIds});
}
Object.assign(CATALOG,{version:3,lessons:LESSONS.length,entries:activeWordIndex.size,uniqueEnglish:new Set([...activeWordIndex.values()].map(w=>tidy(w.en))).size});
