(() => {
 'use strict';
 const root=document.querySelector('#presence'),media=gsap.matchMedia();
 const fit=()=>{
  const scale=Math.min(innerWidth*.58/304.465,innerHeight*.64/624.802);
  root.style.setProperty('--presence-scale',Math.min(innerWidth/1512,innerHeight/982));
  root.style.setProperty('--three-phone-scale',scale);
  root.style.setProperty('--three-avatar-top',`calc(18svh + ${624.802*scale+16}px)`);
 };
 fit();window.addEventListener('resize',fit,{passive:true});
 function typeText(tl,selector,start,duration){
  const element=root.querySelector(selector),walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),parts=[];let node;
  while((node=walker.nextNode()))parts.push({node,letters:Array.from(node.textContent)});
  const cursor={count:0},total=parts.reduce((n,p)=>n+p.letters.length,0);
  element.setAttribute('aria-label',element.textContent);
  const render=()=>{let left=Math.round(cursor.count);for(const part of parts){part.node.textContent=part.letters.slice(0,Math.max(0,left)).join('');left-=part.letters.length;}};
  render();tl.to(cursor,{count:total,duration,ease:'none',onUpdate:render},start);
  return ()=>parts.forEach(part=>{part.node.textContent=part.letters.join('');});
 }
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  const mobile=innerWidth<=600,cleanups=[];
  const parent=window.longreadTimeline;
  const tl=gsap.timeline({defaults:{ease:'sine.inOut'},onUpdate:()=>{root.querySelector('.research-content').classList.toggle('is-drifting',tl.time()>=8.4&&tl.time()<10.2);root.classList.toggle('has-chat-interface',tl.time()>=15.9);}});
  tl.fromTo('.presence-panel',{yPercent:90,scale:.4,autoAlpha:0},{yPercent:0,scale:1,autoAlpha:1,duration:1},0)
   .fromTo('.unknown-sender',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.5},1.15)
   .fromTo('.sender-divider',{autoAlpha:0},{autoAlpha:1,duration:.4},1.8)
   .fromTo('.known-sender',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.5},2.35)
   .fromTo('.sender-conclusion',{autoAlpha:0},{autoAlpha:1,duration:.5},3.05)
   .fromTo('.sender-note',{autoAlpha:0},{autoAlpha:1,duration:.5},3.45)
   .to('.number-content',{autoAlpha:0,duration:.5},4.5)
   .to('.presence-panel',{top:mobile?'28%':361,height:mobile?'44%':260,duration:.8},4.6)
   .to('.definition-content',{autoAlpha:1,duration:.5},5.45)
   .to('.definition-content',{autoAlpha:0,duration:.5},6.8)
   .to('.presence-panel',{top:mobile?'4%':76,height:mobile?'92%':824,duration:.8},6.9)
   .to('.research-content',{autoAlpha:1,duration:.4},7.75)
   .fromTo('.john',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.4},8.45)
   .fromTo('.ederyn',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.4},8.75)
   .fromTo('.bruce',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.4},9.05)
   .to('.research-content',{autoAlpha:0,duration:.5},9.7)
   .to('.presence-panel',{top:mobile?'4%':64,height:mobile?'92%':855,duration:.8},9.8)
   .to('.closeness-content',{autoAlpha:1,duration:.5},10.65)
   .fromTo('.concept-left',{x:0},{x:()=>innerWidth<=600?innerWidth*.38-113.62:289,duration:1.3},11.2)
   .fromTo('.concept-right',{x:0},{x:()=>innerWidth<=600?-innerWidth*.02-13.34:-291,duration:1.3},11.2)
   .to('.closeness-content',{autoAlpha:0,duration:.6},13.0)
   .to('.presence-panel',{autoAlpha:0,duration:.7},13.4)
   .to('.three-background',{autoAlpha:1,duration:.7},13.4)
   .fromTo('.three-content',{autoAlpha:0,yPercent:12},{autoAlpha:1,yPercent:0,duration:.8},13.8)

   .to({},{duration:.6},16.8);
  gsap.set(root.querySelectorAll('.participant-row figure'),{autoAlpha:0,y:10});
  root.querySelectorAll('.participant-row figure').forEach((avatar,index)=>{tl.fromTo(avatar,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.45,immediateRender:false},14.8+index*.55);});
  cleanups.push(typeText(tl,'.definition-term',5.9,.5));
  cleanups.push(typeText(tl,'.research-copy',7.75,.65));
  cleanups.push(typeText(tl,'.closeness-conclusion',11.9,.7));
  cleanups.push(typeText(tl,'.three-title',13.9,.6));
  const bridge=parent.duration();
  parent.to('#continuation',{autoAlpha:0,duration:.9,ease:'sine.inOut'},bridge)
   .fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9,ease:'sine.inOut'},bridge)
   .add(tl,bridge+.9);
  return ()=>cleanups.forEach(fn=>fn());
 });
 media.add('(prefers-reduced-motion: reduce)',()=>{
  const mobile=innerWidth<=600;
  const show=index=>{
   gsap.set(['.number-content','.definition-content','.research-content','.closeness-content','.three-content','.presence-panel','.three-background'],{autoAlpha:0});
   if(index<4)gsap.set('.presence-panel',{autoAlpha:1,top:mobile?(index===1?'28%':'4%'):[121,361,76,64][index],height:mobile?(index===1?'44%':'92%'):[741,260,824,855][index]});
   gsap.set(['.number-content','.definition-content','.research-content','.closeness-content','.three-content'][index],{autoAlpha:1});
   if(index===3){gsap.set('.concept-left',{x:innerWidth<=600?innerWidth*.38-113.62:289});gsap.set('.concept-right',{x:innerWidth<=600?-innerWidth*.02-13.34:-291});}
   if(index===4){root.classList.remove('has-chat-interface');gsap.set('.three-background',{autoAlpha:1});gsap.set('#presence .three-phone',{left:'50%',top:mobile?'18%':164.94});gsap.set('.participant-row',{left:'50%',top:mobile?'var(--three-avatar-top)':805.71});gsap.set('.designer-role',{autoAlpha:0});}
  };
  gsap.set(root,{autoAlpha:0});
  ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{const index=Math.min(99,Math.floor(self.progress*100))-15;gsap.set(root,{autoAlpha:index>=0&&index<5?1:0});if(index>=0&&index<5)show(index);}});
 });
})();
