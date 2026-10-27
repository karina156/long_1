(() => {
 'use strict';
 const loader = document.querySelector('#preloader');
 const content = document.querySelector('#content');
 const people = [...document.querySelectorAll('.person')];
 const percent = (number, dimension) => `${number / dimension * 100}%`;
 gsap.registerPlugin(ScrollTrigger);
 const media = gsap.matchMedia();
 function setPeoplePositions(end = false) {
  people.forEach(person => {
   const [x,y] = person.dataset[end ? 'end' : 'start'].split(',').map(Number);
   gsap.set(person, { left: percent(x,1512), top: percent(y,982) });
  });
 }
 setPeoplePositions();
 // Five states from Figma share a continuous timeline, with rests at the titles.
 media.add('(prefers-reduced-motion: no-preference)', () => {
  const typewriters = [...document.querySelectorAll('#intro .between-title, #intro .more-title')].map(heading => {
   const output = heading.querySelector('.typed');
   const letters = Array.from(heading.dataset.text);
   output.textContent = '';
   return { heading, output, letters, cursor: { count: 0 } };
  });
  gsap.set('.people-title', { scale: .12037, fontWeight: 400, '--title-ink': 1 });
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom bottom', scrub: 1.4, invalidateOnRefresh: true } });
  tl.addLabel('circle',0)
   .to(loader,{autoAlpha:0,duration:.6,ease:'sine.inOut'},.05)
   .to('.seed-state',{ autoAlpha:0, duration:.25 },.4)
   .fromTo('.ring-state',{ autoAlpha:0 },{ autoAlpha:1, duration:.25 },.4)
   .fromTo('.ring',{ scale:.0225 },{ scale:1, duration:.8, ease:'sine.inOut' },.4)
   .to('.people-title',{ autoAlpha:1, duration:.3 },1)
   .addLabel('title',1.3)
   .to('.ring-state',{ autoAlpha:0, duration:.6 },1.7)
   .to('.people-background',{ autoAlpha:1, duration:.6 },1.7)
   .to('.people-title',{ scale:1, top:'47.607%', left:'50.501%', fontWeight:400, duration:.65, ease:'sine.inOut' },1.7)
   .to('.people-title',{ '--title-ink':0, duration:.4 },2.35)
   .to(people,{ autoAlpha:1, duration:.25, stagger:.045 },2.1)
   .addLabel('people',2.9)
   .to('.people-title',{ autoAlpha:0, duration:.35 },3.3)
   .to('.between-title',{ autoAlpha:1, duration:.01 },3.6);
  people.forEach(person => {
   const [x,y] = person.dataset.end.split(',').map(Number);
   tl.to(person,{ left:percent(x,1512), top:percent(y,982), duration:.9, ease:'sine.inOut' },3.25);
  });
  tl.addLabel('screen',4.2)
   .to(['.people-background','.people'],{ autoAlpha:0, duration:.5 },4.65)
   .to('.between-title',{ autoAlpha:0, duration:.01 },4.7)
   .fromTo('.more-state',{ autoAlpha:0,yPercent:12 },{ autoAlpha:1,yPercent:0,duration:.7,ease:'sine.inOut' },4.85)
   .to('.scroll-cue',{ autoAlpha:0,duration:.2 },.25)
   .addLabel('more',5.6);
  // Each heading types, holds, and erases before the scene changes.
  // Scroll drives both directions, so reversing never leaves a stale word.
  const phases = [
   { typeAt:3.6, typeDuration:.4, eraseAt:4.3, eraseDuration:.35 },
   { typeAt:5.15, typeDuration:.45, eraseAt:6.15, eraseDuration:.45 }
  ];
  typewriters.forEach((item,index) => {
   const phase=phases[index];
   const render=() => {
    const count=Math.max(0,Math.min(item.letters.length,Math.round(item.cursor.count)));
    item.output.textContent=item.letters.slice(0,count).join('');
    item.heading.classList.toggle('is-typing',count>0 && count<item.letters.length);
   };
   tl.to(item.cursor,{ count:item.letters.length,duration:phase.typeDuration,onUpdate:render },phase.typeAt)
    .to(item.cursor,{ count:0,duration:phase.eraseDuration,onUpdate:render },phase.eraseAt);
  });
  tl.to({},{ duration:.3 },6.6);
  window.longreadTimeline=tl;
  return () => { window.longreadTimeline=null; typewriters.forEach(item => { item.output.textContent=item.letters.join(''); item.heading.classList.remove('is-typing'); }); };
 });
 // Reduced motion uses discrete compositions, without zooming or moving faces.
 media.add('(prefers-reduced-motion: reduce)', () => {
  const targets=['#preloader','.seed-state','.ring-state','.people-background','.people-title','.people','.between-title','.more-state'];
  let current=-1;
  const showState = state => {
   if (state===current) return;
   current=state;
   gsap.set(targets,{ autoAlpha:0 });
   gsap.set(people,{ autoAlpha:1 });
   if(state===0) gsap.set(loader,{ autoAlpha:1 });
   if(state===1) gsap.set(['.ring-state','.people-title'],{ autoAlpha:1 });
   if(state===1) gsap.set('.people-title',{ scale:.12037, fontWeight:400, '--title-ink':1, top:'50%', left:'50%' });
   if(state===2) gsap.set('.people-title',{ scale:1, fontWeight:400, '--title-ink':0, top:'47.607%', left:'50.501%' });
   if(state===2 || state===3) {
    setPeoplePositions(state===3);
    gsap.set(['.people-background','.people',state===2?'.people-title':'.between-title'],{ autoAlpha:1 });
   }
   if(state>=4 && state<=6) gsap.set('.more-state',{ autoAlpha:1 });
   gsap.set('.more-title',{autoAlpha:state===4?1:0});
   gsap.set('.scroll-cue',{ autoAlpha:state===0?1:0 });
  };
  showState(0);
  ScrollTrigger.create({ trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>showState(Math.min(99,Math.floor(self.progress*100))) });
 });
 const pageLoaded=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{ once:true }));
 const imagesLoaded=Promise.all([...document.images].map(image=>image.decode()));
 const fontsLoaded=Promise.all([
  document.fonts.load('500 24px Onest','Печатает Мы здесь не одни'),
  document.fonts.load('400 24px Onest','Между нами — экран'),
  document.fonts.load('500 12px Inter','00 · a')
 ]).then(()=>document.fonts.ready);
 Promise.all([pageLoaded,imagesLoaded,fontsLoaded]).then(()=>{
  content.inert=false;
  content.setAttribute('aria-busy','false');
  document.documentElement.classList.remove('is-loading');
  ScrollTrigger.refresh();
  loader.setAttribute('aria-busy','false');
  window.dispatchEvent(new Event('longread:ready'));
 }).catch(()=>{
  loader.querySelector('.word').textContent='Не загрузилось';
  loader.querySelector('.dots').hidden=true;
  const retry=loader.querySelector('.retry');
  retry.hidden=false;
  retry.addEventListener('click',()=>window.location.reload(),{ once:true });
 });
})();
