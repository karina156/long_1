(() => {
 'use strict';
 const root=document.querySelector('#continuation');
 const media=gsap.matchMedia();
 const fit=()=>root.style.setProperty('--continuation-scale',Math.min(innerWidth/1512,innerHeight/982));
 fit();window.addEventListener('resize',fit,{passive:true});
 function typeText(timeline,selector,start,duration,erase){
  const heading=root.querySelector(selector);
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
  const parts=[];let node;while((node=walker.nextNode()))parts.push({node,letters:Array.from(node.textContent)});
  const total=parts.reduce((sum,part)=>sum+part.letters.length,0),cursor={count:0};
  const render=()=>{let remaining=Math.round(cursor.count);for(const part of parts){part.node.textContent=part.letters.slice(0,Math.max(0,remaining)).join('');remaining-=part.letters.length;}};
  heading.setAttribute('aria-label',heading.textContent);render();
  timeline.to(cursor,{count:total,duration,ease:'none',onUpdate:render},start);
  if(erase!==undefined)timeline.to(cursor,{count:0,duration:.45,ease:'none',onUpdate:render},erase);
  return ()=>parts.forEach(part=>{part.node.textContent=part.letters.join('');});
 }
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const mobile=innerWidth<=600,cleanups=[];
  const parent=window.longreadTimeline;
  const tl=gsap.timeline({defaults:{ease:'sine.inOut'}});
  tl.to('.reflection-content',{autoAlpha:0,duration:.5},1.3)
   .to('.explanation-background',{autoAlpha:1,duration:.6},1.4)
   .fromTo('.explain-card',{autoAlpha:0,yPercent:100,scale:.35},{autoAlpha:1,yPercent:0,scale:1,duration:1.1},1.5)
   .fromTo(['.example-content','.shared-avatar'],{autoAlpha:0},{autoAlpha:1,duration:.5},2.75);
  ['photo','time','status','marks'].forEach((sign,index)=>{
   const targets=[...root.querySelectorAll(`[data-sign="${sign}"]`)].filter(node=>!node.closest('.example-title'));
   const words=root.querySelectorAll(`.example-title [data-sign="${sign}"]`),start=3.65+index*.8;
   tl.fromTo(words,{color:'#0f0f0f'},{color:'#ed786f',duration:.18},start).to(words,{color:'#0f0f0f',duration:.18},start+.58);
   tl.fromTo(targets,{outlineWidth:0,outlineColor:'transparent'},{outlineWidth:2,outlineColor:'#ed786f',duration:.18},start)
    .to(targets,{outlineWidth:0,outlineColor:'transparent',duration:.18},start+.58);
  });
  tl.fromTo('.example-conclusion',{autoAlpha:0},{autoAlpha:1,duration:.45},7.1)
   .to('.example-content',{autoAlpha:0,duration:.6},8.2)
   .to('.shared-avatar',{left:mobile?'calc(50% - 55px)':510.91,top:mobile?'31%':212.78,width:mobile?110:156.43,height:mobile?110:156.43,boxShadow:'0 0 16px rgba(0,0,0,.25)',duration:.8},8.2)
   .to('.avatar-small',{autoAlpha:0,duration:.4},8.55)
   .to('.avatar-large',{autoAlpha:1,duration:.4},8.55)
   .to('.avatar-content',{autoAlpha:1,duration:.6},8.6)
   .fromTo('.avatar-past',{autoAlpha:0},{autoAlpha:1,duration:.4},9.4)
   .fromTo('.avatar-now',{autoAlpha:0},{autoAlpha:1,duration:.4},9.9)
   .to(['.avatar-content','.shared-avatar'],{autoAlpha:0,duration:.65},11.4)
   .to('.unseen-title',{autoAlpha:1,duration:.05},12.05)
   .to('.unseen-title',{autoAlpha:0,duration:.05},14)
   .to('.explain-card',{autoAlpha:0,scale:.98,duration:.7},14.05)
   .to('.explanation-background',{width:'131.9947%',height:'131.9947%',duration:1.2},14.2)
   .to('.human-title',{autoAlpha:1,duration:.05},15)
   .to({},{duration:.5},16.8);
  cleanups.push(typeText(tl,'.reflection-title',0,.55));
  cleanups.push(typeText(tl,'.reflection-question',.5,.4));
  cleanups.push(typeText(tl,'.example-title',2.8,.7,7.65));
  cleanups.push(typeText(tl,'.avatar-title',8.6,.65,10.9));
  cleanups.push(typeText(tl,'.unseen-title',12.05,.5,13.5));
  cleanups.push(typeText(tl,'.human-title',15,.7));
  tl.eventCallback('onUpdate',()=>root.querySelector('.shared-avatar').classList.toggle('is-floating',tl.time()>=9.1 && tl.time()<11.4));
  const bridge=parent.duration();
  parent.to('#exchange',{autoAlpha:0,duration:.9,ease:'sine.inOut'},bridge)
   .fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9,ease:'sine.inOut'},bridge)
   .add(tl,bridge+.9);
  return ()=>{root.querySelector('.shared-avatar').classList.remove('is-floating');cleanups.forEach(restore=>restore());};
 });
 media.add('(prefers-reduced-motion: reduce)',()=>{
  const show=index=>{
   gsap.set(['.reflection-content','.explain-card','.example-content','.shared-avatar','.avatar-content','.unseen-title','.human-title','.explanation-background'],{autoAlpha:0});
   gsap.set('.explanation-background',{width:index===4?'131.9947%':'100%',height:index===4?'131.9947%':'100%'});
   if(index===0)gsap.set('.reflection-content',{autoAlpha:1});
   if(index>=1)gsap.set('.explanation-background',{autoAlpha:1});
   if(index>=1&&index<=3)gsap.set('.explain-card',{autoAlpha:1});
   if(index===1){gsap.set(['.example-content','.shared-avatar','.avatar-small'],{autoAlpha:1});gsap.set('.avatar-large',{autoAlpha:0});gsap.set('.shared-avatar',{clearProps:'left,top,width,height,boxShadow'});}
   if(index===2){gsap.set(['.avatar-content','.shared-avatar','.avatar-large'],{autoAlpha:1});gsap.set('.avatar-small',{autoAlpha:0});gsap.set('.shared-avatar',{left:innerWidth<=600?'calc(50% - 55px)':510.91,top:innerWidth<=600?'31%':212.78,width:innerWidth<=600?110:156.43,height:innerWidth<=600?110:156.43});}
   if(index===3)gsap.set('.unseen-title',{autoAlpha:1});
   if(index===4)gsap.set('.human-title',{autoAlpha:1});
  };
  gsap.set(root,{autoAlpha:0});
  ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{const index=Math.min(99,Math.floor(self.progress*100))-10;gsap.set(root,{autoAlpha:index>=0&&index<5?1:0});if(index>=0&&index<5)show(index);}});
 });
})();
