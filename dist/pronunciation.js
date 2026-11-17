'use strict';
// Keep one native media element. play() is called directly from the user's tap.
const pronunciationState={word:null,request:0,utterance:null,voices:[],timer:null};
const pronunciationElement=id=>document.getElementById(id);
const pronunciationTerm=value=>value.normalize('NFC').trim().replace(/\s+/g,' ').toLowerCase();
function pronunciationStatus(text){pronunciationElement('pronunciation-status').textContent=text;}
function stopDeviceVoice(){
  const old=pronunciationState.utterance;pronunciationState.utterance=null;
  if(old&&window.speechSynthesis)window.speechSynthesis.cancel();
}
function refreshPronunciationVoices(){try{pronunciationState.voices=window.speechSynthesis?.getVoices()||[];}catch{pronunciationState.voices=[];}}
function pronunciationPanel(word){
  const panel=pronunciationElement('pronunciation-player');panel.hidden=false;
  pronunciationElement('pronunciation-word').textContent=word.en;
  pronunciationElement('pronunciation-meaning').textContent=word.vi;
  pronunciationElement('pronunciation-device').hidden=!(window.speechSynthesis&&window.SpeechSynthesisUtterance);
  document.querySelector('#modal-root .modal')?.setAttribute('aria-modal','false');
}
function pronunciationFailure(error,request){
  if(request!==pronunciationState.request||error?.name==='AbortError')return;
  clearTimeout(pronunciationState.timer);
  pronunciationStatus(error?.name==='NotAllowedError'?'Tap Play ▶ in the audio controls below. / Chạm Play ▶ trên thanh phát âm thanh.':'Audio could not play. Try Play again or Open audio. / Chưa phát được. Thử Nghe lại hoặc Mở âm thanh.');
}
function startPronunciationAudio(){
  const word=pronunciationState.word;if(!word)return;
  const audio=pronunciationElement('pronunciation-audio'),request=++pronunciationState.request;
  clearTimeout(pronunciationState.timer);stopDeviceVoice();
  const key=PRONUNCIATION_AUDIO[pronunciationTerm(word.en)];
  if(!key){pronunciationStatus('Choose Device voice to hear this word. / Chọn Giọng máy để nghe từ này.');return;}
  const url='/audio/v1/'+key+'.m4a';
  audio.pause();audio.muted=false;audio.volume=1;audio.playbackRate=1;
  if(audio.getAttribute('src')!==url)audio.src=url;
  else try{audio.currentTime=0;}catch{}
  pronunciationElement('pronunciation-open').href=url;
  pronunciationStatus('Loading audio… / Đang tải âm thanh…');
  audio.onplaying=()=>{if(request===pronunciationState.request){clearTimeout(pronunciationState.timer);pronunciationStatus('Playing / Đang phát');}};
  audio.onended=()=>{if(request===pronunciationState.request){clearTimeout(pronunciationState.timer);pronunciationStatus('Tap Play again to listen once more. / Chạm Nghe lại để nghe thêm lần nữa.');}};
  audio.onerror=()=>pronunciationFailure(null,request);
  pronunciationState.timer=setTimeout(()=>{if(request===pronunciationState.request&&audio.paused)pronunciationStatus('Tap Play ▶, or check media volume and Bluetooth output. / Chạm Play ▶, kiểm tra âm lượng phát nội dung và Bluetooth.');},10000);
  try{
    // Do not await a fetch or voice-loading callback before this call: iPhone
    // needs the initial playback request to happen inside the tap handler.
    const playing=audio.play();if(playing?.catch)playing.catch(error=>pronunciationFailure(error,request));
  }catch(error){pronunciationFailure(error,request);}
}
function playPronunciation(id){const word=byId(id);if(!word)return;pronunciationState.word=word;pronunciationPanel(word);startPronunciationAudio();}
function playDevicePronunciation(){
  const word=pronunciationState.word,synth=window.speechSynthesis;if(!word||!synth||!window.SpeechSynthesisUtterance)return;
  const request=++pronunciationState.request;clearTimeout(pronunciationState.timer);
  pronunciationElement('pronunciation-audio').pause();
  if(synth.speaking||synth.pending)synth.cancel();if(synth.paused)synth.resume();
  refreshPronunciationVoices();
  const voice=pronunciationState.voices.find(v=>/^en[-_]GB$/i.test(v.lang))||pronunciationState.voices.find(v=>/^en[-_]US$/i.test(v.lang))||pronunciationState.voices.find(v=>/^en(?:[-_]|$)/i.test(v.lang));
  const utterance=new window.SpeechSynthesisUtterance(word.en);
  if(voice)utterance.voice=voice;utterance.lang=voice?.lang||'en-GB';utterance.rate=.85;utterance.volume=1;
  pronunciationState.utterance=utterance; // Retain it until end/error on Safari.
  pronunciationStatus('Starting device voice… / Đang mở giọng máy…');
  utterance.onstart=()=>{if(request===pronunciationState.request){clearTimeout(pronunciationState.timer);pronunciationStatus('Playing device voice / Đang phát giọng máy');}};
  utterance.onend=()=>{if(request===pronunciationState.request){pronunciationState.utterance=null;pronunciationStatus('Ready to replay / Sẵn sàng nghe lại');}};
  utterance.onerror=event=>{if(request!==pronunciationState.request||['interrupted','canceled'].includes(event.error))return;clearTimeout(pronunciationState.timer);pronunciationState.utterance=null;pronunciationStatus('Device voice is unavailable. Use Play again or Open audio. / Giọng máy chưa sẵn sàng. Dùng Nghe lại hoặc Mở âm thanh.');};
  pronunciationState.timer=setTimeout(()=>{if(request===pronunciationState.request)pronunciationStatus('Device voice did not start. Use Play again. / Giọng máy chưa phát. Hãy chọn Nghe lại.');},6000);
  try{synth.speak(utterance);}catch{utterance.onerror({error:'synthesis-failed'});}
}
function closePronunciation(){
  pronunciationState.request++;clearTimeout(pronunciationState.timer);stopDeviceVoice();
  pronunciationElement('pronunciation-audio').pause();pronunciationElement('pronunciation-player').hidden=true;
  document.querySelector('#modal-root .modal')?.setAttribute('aria-modal','true');
}
refreshPronunciationVoices();
window.speechSynthesis?.addEventListener?.('voiceschanged',refreshPronunciationVoices);
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  if(button.dataset.action==='audio-replay')startPronunciationAudio();
  if(button.dataset.action==='audio-device')playDevicePronunciation();
  if(button.dataset.action==='audio-close')closePronunciation();
});
window.addEventListener('pagehide',closePronunciation);

document.addEventListener('play',event=>{if(event.target.tagName!=='AUDIO')return;for(const audio of document.querySelectorAll('audio'))if(audio!==event.target)audio.pause();stopDeviceVoice();},true);
