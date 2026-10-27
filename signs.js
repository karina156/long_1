(() => {
'use strict';
const root=document.querySelector('#signs'),parent=window.longreadTimeline,media=gsap.matchMedia();
const fit=()=>{const scale=Math.min(innerWidth*.4/290.922,innerHeight*.52/588.883);root.style.setProperty('--signs-scale',Math.min(innerWidth/1512,innerHeight/982));root.style.setProperty('--pause-scale',scale);root.style.setProperty('--pause-controls',`${588.883*scale+12}px`);root.style.setProperty('--dash-scale',Math.min(innerWidth/1512,innerHeight/982));};fit();addEventListener('resize',fit,{passive:true});
const demos=[...root.querySelectorAll('[data-pause]')].map(el=>{const model=new PauseModel(),button=el.querySelector('.pause-play');button.addEventListener('click',()=>{if(model.running)model.pause();else model.play();render();});return {el,model,button};});
const reactionButtons=[...root.querySelectorAll('[data-reaction]')],reactionBadge=root.querySelector('.reaction-good>span');reactionButtons.forEach(button=>button.addEventListener('click',()=>{reactionBadge.textContent=button.dataset.reaction;reactionBadge.setAttribute('aria-label','Выбрана реакция: '+button.getAttribute('aria-label'));reactionButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
let framePending=0,pauseActive=false;
function render(){let running=false;for(const {el,model,button} of demos){const elapsed=model.tick();el.classList.toggle('is-running',model.running);el.classList.toggle('is-complete',elapsed===6000);el.querySelector('.pause-clock').textContent=(elapsed/1000).toFixed(1).replace('.',',')+' / 6,0';button.setAttribute('aria-label',model.running?'Приостановить паузу':elapsed===6000?'Повторить паузу':'Запустить паузу');running ||= model.running;}if(running&&!framePending)framePending=requestAnimationFrame(()=>{framePending=0;render();});}
function activePause(active){active=active&&!document.hidden;if(active===pauseActive)return;pauseActive=active;for(const demo of demos)demo.model.setActive(active&&!document.hidden);render();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)activePause(false);});
media.add('(prefers-reduced-motion: no-preference)',()=>{
 const mobile=innerWidth<=600,tl=gsap.timeline({defaults:{ease:'sine.inOut'},onUpdate:()=>{const t=tl.time();activePause(t>=4&&t<6.5);root.querySelector('.emoji-study').classList.toggle('is-floating',t>=18.7&&t<21.3);root.querySelector('.traces-scene').classList.toggle('is-wandering',t>=10.9&&t<16.6);document.querySelector('#alive').classList.toggle('is-typing',t<2.8);}});
 tl.to('.copy-unseen p:first-child',{autoAlpha:0,duration:.65},0)
 .to('#alive',{autoAlpha:0,duration:.9},3)
 .fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9},3)
 .to('.pause-scene',{autoAlpha:1,duration:.8},3.5)
 .to('.pause-scene',{autoAlpha:0,duration:.8},6.5)
 .to('.distance-scene',{autoAlpha:1,duration:.6},7.45)
 .to('.distance-scene',{autoAlpha:0,duration:.8},10.2)
 .to('.traces-scene',{autoAlpha:1,duration:.8},10.4);
 root.querySelectorAll('.trace-chip').forEach((chip,i)=>tl.fromTo(chip,{autoAlpha:0,y:i%2?15:-15},{autoAlpha:1,y:0,duration:.5},10.9+i*.35));
 tl.fromTo('.traces-scene h2',{autoAlpha:0},{autoAlpha:1,duration:.6},13.100000000000001)
 .to('.trace-heart',{scale:1.15,duration:.25,yoyo:true,repeat:1},13.5)
 .to('.traces-scene',{autoAlpha:0,duration:.8},15.8)
 .to('.emoji-scene',{autoAlpha:1,duration:.8},16)
 .fromTo('.emoji-panel',{yPercent:60,scale:.6},{yPercent:0,scale:1,duration:1},16)
 .fromTo('.emoji-intro,.emoji-number',{autoAlpha:0},{autoAlpha:1,duration:.65},17.1)
 .fromTo('.emoji-study',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.7},18)
 .to('.emoji-scene',{autoAlpha:0,duration:.8},20.5)
 .to('.reaction-scene',{autoAlpha:1,duration:.8},20.7)
 .fromTo('.reaction-menu,.reaction-good',{autoAlpha:0},{autoAlpha:1,duration:.7,stagger:.2},21)
 .fromTo('.reaction-thought',{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.6,stagger:.17},22.2)
 .to('.reaction-scene',{autoAlpha:0,duration:.8},24.7)
 .to('.manner-scene',{autoAlpha:1,duration:.8},24.9)
 .to('.manner-scene',{autoAlpha:0,duration:1.2},28.2)
 .to('.dash-scene',{autoAlpha:1,duration:1.2},28.6)
 .to('.dash-background',{autoAlpha:0,duration:2.2},31.8)
 .to('.dash-scene h2',{autoAlpha:0,duration:.7},32)
 .fromTo('.dash-dark',{autoAlpha:1,clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)',duration:2.2},31.8)
 .to('.dash-art',{autoAlpha:1,duration:.8},34)
 .fromTo('.dash-art .dash-line',{scaleX:.1},{scaleX:1,duration:1},32.8)
 .to('.dash-art',{x:mobile?0:-488,y:mobile?-innerHeight*.25:-48,scale:mobile?Math.min(innerWidth/1512,innerHeight/982)*.65:.65,autoAlpha:0,duration:1.2},35.7)
 .to('.dash-final-art',{autoAlpha:1,duration:.8},36.1);
 root.querySelectorAll('.dash-poem>p').forEach((line,i)=>tl.fromTo(line,{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.5},36.9+i*.55));
 tl.fromTo('.dash-poem span',{color:'white'},{color:'#ed786f',duration:.45,yoyo:true,repeat:1},38.9)
 .to('.dash-credit',{autoAlpha:1,duration:.65},39.5)
 .to({},{duration:2},40.3);
 const heading=root.querySelector('.distance-scene h2'),walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT),pieces=[];let node;while(node=walker.nextNode())pieces.push({node,text:node.textContent});
 const full=pieces.map(p=>p.text).join('');heading.setAttribute('aria-label',heading.innerText);const typing={count:0};
 tl.fromTo(typing,{count:0},{count:full.length,duration:.9,ease:'none',onUpdate:()=>{let left=Math.floor(typing.count);pieces.forEach(p=>{p.node.textContent=p.text.slice(0,Math.max(0,left));left-=p.text.length;});}},7.55);
 tl.to(heading,{top:mobile?innerHeight*.18:230,duration:1.3},8.5);
 tl.fromTo('.distance-lesha',{left:mobile?innerWidth*.12:260,top:mobile?innerHeight*.65:670},{left:mobile?innerWidth/2-64:666,top:mobile?innerHeight/2-32:446,duration:1.3},8.5);
 tl.fromTo('.distance-anya',{left:mobile?innerWidth*.88-64:1150,right:'auto',top:mobile?innerHeight*.65:670},{left:mobile?innerWidth/2:756,top:mobile?innerHeight/2-32:446,duration:1.3},8.5);
 const start=parent.duration();parent.add(tl,start);window.signsTimeline=tl;
 return ()=>{activePause(false);pieces.forEach(p=>p.node.textContent=p.text);root.querySelector('.traces-scene').classList.remove('is-wandering');};
});
media.add('(prefers-reduced-motion: reduce)',()=>{
 const scenes=['.pause-scene','.distance-scene','.traces-scene','.emoji-scene','.reaction-scene','.manner-scene','.dash-scene'];
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{
 const state=Math.min(99,Math.floor(self.progress*100))-40;activePause(state===1);gsap.set(root,{autoAlpha:state>0?1:0});gsap.set(scenes,{autoAlpha:0});
 if(state===0){gsap.set('#alive',{autoAlpha:1});gsap.set('.copy-unseen p:first-child',{autoAlpha:0});return;}if(state<0){gsap.set('.copy-unseen p:first-child',{autoAlpha:1});return;}
 gsap.set(scenes[Math.min(state-1,6)],{autoAlpha:1});gsap.set('.dash-art,.dash-final-art,.dash-dark,.dash-poem>p,.dash-credit',{autoAlpha:0});
 if(state>=8){gsap.set('.dash-background,.dash-scene h2',{autoAlpha:0});gsap.set('.dash-dark',{autoAlpha:1});gsap.set(state===8?'.dash-art':'.dash-final-art',{autoAlpha:1});if(state===9)gsap.set('.dash-poem>p,.dash-credit',{autoAlpha:1});}
 }});
});
})();
