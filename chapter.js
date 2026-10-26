(() => {
 'use strict';
 gsap.registerPlugin(ScrollTrigger);
 const track=document.querySelector('#exchange');
 const stage=track.querySelector('.exchange-stage');
 const media=gsap.matchMedia();
 const orbitState={distance:0};
 const orbitArt=document.querySelector('.poll-art');
 const orbitControls=document.querySelector('.poll-controls');
 let orbitLimit=40;
 const drawOrbit=()=>{
  const angles=LongreadOrbit.pairAngles(orbitState.distance/90,orbitLimit);
  angles.forEach((angle,index)=>{
   const radians=angle*Math.PI/180;
   gsap.set(index===0?'.satellite-one':'.satellite-two',{x:319*Math.cos(radians),y:319*Math.sin(radians),xPercent:-50,yPercent:-50,rotation:0});
  });
 };
 const measureOrbit=()=>{
  const art=orbitArt.getBoundingClientRect();
  if(!art.width) return;
  const scale=art.width/638;
  orbitLimit=LongreadOrbit.safeLimit(art.top+art.height/2,319*scale,27.1335*scale,orbitControls.getBoundingClientRect().top,16);
  drawOrbit();
 };

 const fit=()=>{
  const mobile=innerWidth<=600;
  const phoneScale=mobile?Math.min(innerWidth*.82/422.16,innerHeight*.8/866.23):Math.min(innerWidth/1512,innerHeight/982);
  const pollScale=mobile?Math.min(innerWidth*.8/550,innerHeight*.43/550):Math.min(innerWidth/1512,innerHeight/982);
  track.style.setProperty('--phone-scale',phoneScale);
  track.style.setProperty('--poll-scale',pollScale);
  measureOrbit();
 };
 fit();window.addEventListener('resize',fit,{passive:true});
 window.addEventListener('longread:ready',measureOrbit);
 document.fonts.ready.then(measureOrbit);

 function typeOnTimeline(timeline,selector,phase){
  const heading=document.querySelector(selector);
  const output=heading.querySelector('.typed');
  const letters=Array.from(heading.dataset.text);
  const cursor={count:0};
  output.textContent='';
  const render=()=>{
   const count=Math.max(0,Math.min(letters.length,Math.round(cursor.count)));
   output.textContent=letters.slice(0,count).join('');
   heading.classList.toggle('is-typing',count>0&&count<letters.length);
  };
  timeline.to(cursor,{count:letters.length,duration:phase.typeDuration,ease:'none',onUpdate:render},phase.typeAt)
   .to(cursor,{count:0,duration:phase.eraseDuration,ease:'none',onUpdate:render},phase.eraseAt);
  return ()=>{output.textContent=letters.join('');heading.classList.remove('is-typing');};
 }

 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const cleanups=[];
  const parent=window.longreadTimeline;
  const role=gsap.timeline({defaults:{ease:'none'}});
  role.to('.role-section',{autoAlpha:1,duration:.01},0);
  cleanups.push(typeOnTimeline(role,'.role-title',{typeAt:.15,typeDuration:.4,eraseAt:.95,eraseDuration:.25}));
  role.to('.role-section',{autoAlpha:0,duration:.01},1.25);
  parent.add(role,6.9);
  const tl=gsap.timeline({defaults:{ease:'none'}});
  tl.fromTo('#exchange',{autoAlpha:0},{autoAlpha:1,duration:.01},0)
   .fromTo('.phone-entry',{yPercent:110},{yPercent:0,duration:.7,ease:'sine.inOut'},0);
  tl.addLabel('waiting',0)
   .to(['#exchange .typing-status','#exchange .chat-typing','#exchange .waiting-icon'],{autoAlpha:0,duration:.15},1.25)
   .to(['#exchange .online-status','#exchange .answered-icon'],{autoAlpha:1,duration:.15},1.25)
   .to('#exchange .phone-contact',{left:151.49,width:90.5,duration:.2},1.25)
   .to('#exchange .messages',{top:627.49,left:.24,duration:.2},1.4)
   .fromTo('#exchange .incoming',{y:8,autoAlpha:0},{y:0,autoAlpha:1,duration:.2},1.45)
   .to('.more-state',{autoAlpha:0,duration:.4},1.45)
   .to('.exchange-raster',{autoAlpha:1,duration:.4},1.45)
   .addLabel('answer',1.7)
   .to('.agreed',{autoAlpha:1,duration:.01},1.85)
   .to('.offended',{autoAlpha:1,duration:.01},2.35)
   .to(['.agreed','.offended'],{autoAlpha:0,duration:.01},3.35)
   .to('.phone-position',{yPercent:-115,autoAlpha:0,duration:.65,ease:'sine.inOut'},3.45)
   .to('.tired',{autoAlpha:1,duration:.01},3.8)
   .addLabel('tired',4.2)
   .to('.tired',{autoAlpha:0,duration:.01},5.1)
   .to('.poll',{autoAlpha:1,duration:.55},5.2)
   .fromTo('.poll-ring-holder',{scale:.7},{scale:1,duration:.55,ease:'sine.inOut'},5.2)
   .fromTo('.poll-options button',{autoAlpha:0},{autoAlpha:1,duration:.25,stagger:.07},5.65)
   .fromTo(orbitState,{distance:0},{distance:90,duration:1.4,onUpdate:drawOrbit},5.2)
   .addLabel('poll',6.2).to({},{duration:.45},6.6);
  cleanups.push(typeOnTimeline(tl,'.agreed',{typeAt:1.85,typeDuration:.35,eraseAt:2.85,eraseDuration:.3}));
  cleanups.push(typeOnTimeline(tl,'.offended',{typeAt:2.35,typeDuration:.3,eraseAt:3.05,eraseDuration:.25}));
  cleanups.push(typeOnTimeline(tl,'.tired',{typeAt:3.8,typeDuration:.4,eraseAt:4.7,eraseDuration:.35}));
  parent.add(tl,8.2);
  const waiting=()=>stage.classList.toggle('is-waiting',parent.time()>=8.2 && parent.time()<9.45);
  parent.eventCallback('onUpdate',waiting);
  return ()=>{parent.eventCallback('onUpdate',null);cleanups.forEach(fn=>fn());stage.classList.remove('is-waiting');};
 });

 media.add('(prefers-reduced-motion: reduce)',()=>{
  const showState=index=>{
   gsap.set(['.role-section','#exchange','.phone-position','.exchange-raster','.agreed','.offended','.tired','.poll','#exchange .incoming','#exchange .online-status','#exchange .answered-icon','#exchange .typing-status','#exchange .chat-typing','#exchange .waiting-icon'],{autoAlpha:0});
   stage.classList.remove('is-waiting');
   if(index===5) gsap.set('.role-section',{autoAlpha:1});
   if(index>=6 && index<=9) gsap.set('#exchange',{autoAlpha:1});
   if(index===6) gsap.set('#exchange .messages',{top:613.23,left:0});
   if(index===7) gsap.set('#exchange .messages',{top:627.49,left:.24});
   if(index===6) gsap.set(['.phone-position','#exchange .typing-status','#exchange .chat-typing','#exchange .waiting-icon'],{autoAlpha:1});
   if(index===7) gsap.set(['.phone-position','.exchange-raster','#exchange .incoming','#exchange .online-status','#exchange .answered-icon','.agreed','.offended'],{autoAlpha:1});
   if(index===8) gsap.set(['.exchange-raster','.tired'],{autoAlpha:1});
   if(index===9) gsap.set('.poll',{autoAlpha:1});
  };
  showState(0);
  ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>showState(Math.min(99,Math.floor(self.progress*100)))});
 });

 const options=[...document.querySelectorAll('.poll-options button')];
 const dialog=document.querySelector('.answer-dialog');
 const summary=dialog.querySelector('.choice-summary');
 const note=dialog.querySelector('.choice-note');
 const returnButton=dialog.querySelector('.return-reading');
 let returnFocus=null;
 let readingPosition=0;
 let closeTimer=null;
 let onExit=null;let popupClose=null;const signal=document.createElement('p'),detail=document.createElement('p');signal.className='popup-signal';detail.className='popup-detail';note.after(signal,detail);function paintPopup(o){gsap.set([summary,note,signal,detail],{autoAlpha:1});summary.textContent=o.title;note.textContent=o.text||'';signal.textContent=o.status||'';signal.hidden=!o.status;detail.textContent=o.detail||'';detail.hidden=!o.detail;returnButton.textContent=o.action||'Вернуться к чтению';}window.longreadPopup={open:(o,trigger)=>{paintPopup(o);popupClose=o.onClose||null;openAnswer(trigger);},update:paintPopup,close:closeAnswerProxy};function closeAnswerProxy(){closeAnswer();}
 const openAnswer=button=>{
  returnFocus=button;
  readingPosition=window.scrollY;
  document.documentElement.classList.add('is-modal-open');
  if(!dialog.open) dialog.showModal();
  returnButton.focus({preventScroll:true});
 };
 const closeAnswer=()=>{
  if(!dialog.open || dialog.classList.contains('is-closing')) return;const done=popupClose;popupClose=null;done?.();
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){dialog.close();return;}
  const finish=()=>{if(dialog.open) dialog.close();};
  onExit=event=>{if(event.target===dialog && event.animationName==='dialog-exit') finish();};
  dialog.addEventListener('animationend',onExit);
  dialog.classList.add('is-closing');
  closeTimer=window.setTimeout(finish,400);
 };
 returnButton.addEventListener('click',closeAnswer);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeAnswer();});
 dialog.addEventListener('close',()=>{
  window.clearTimeout(closeTimer);
  if(onExit) dialog.removeEventListener('animationend',onExit);
  onExit=null;
  dialog.classList.remove('is-closing');
  document.documentElement.classList.remove('is-modal-open');
  window.scrollTo({top:readingPosition,left:0,behavior:'instant'});
  returnFocus?.focus({preventScroll:true});
 });
 const outside=event=>{
  const bounds=dialog.getBoundingClientRect();
  return event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom;
 };
 let startedOnBackdrop=false;
 dialog.addEventListener('pointerdown',event=>{startedOnBackdrop=event.target===dialog && outside(event);});
 dialog.addEventListener('click',event=>{
  if(startedOnBackdrop && event.target===dialog && outside(event)) closeAnswer();
  startedOnBackdrop=false;
 });
 const storageKey='longread:ladno:first-choice';
 const choose=(answer,persist=true)=>{
  if(!options.some(button=>button.dataset.answer===answer)) return;
  options.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.answer===answer)));
  summary.textContent=`Вы выбрали: ${answer}`;
  const explanations={'Улыбка':'Для одного человека скобки — улыбка, для другого — вежливость или ирония. Единственного правильного ответа здесь нет.','Смех':'Длинная цепочка скобок может читаться как смех или насмешка. Значение складывается между людьми.','Ирония':'Ирония — одно из возможных прочтений. Собеседник мог написать те же скобки с другой интонацией.','Зависит от человека':'Привычки собеседника и предыдущие разговоры помогают прочитать знак. Общего словаря для всех нет.'};paintPopup({title:`Вы выбрали: ${answer}`,text:explanations[answer]||'Одна и та же реплика допускает разные прочтения. Дальше попробуйте представить, что это «ладно» написали вы.'});
  if(persist){try{localStorage.setItem(storageKey,answer);}catch{/* Choice remains available in this view if storage is disabled. */}}
 };
 options.forEach(button=>button.addEventListener('click',()=>{choose(button.dataset.answer);openAnswer(button);}));
 try{choose(localStorage.getItem(storageKey),false);}catch{/* No saved choice. */}
})();
