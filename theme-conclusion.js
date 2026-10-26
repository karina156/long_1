(() => {
'use strict';
const root=document.querySelector('#designer'),source=root.querySelector('.customize-phone'),fan=root.querySelector('.theme-fan'),parent=window.longreadTimeline,media=gsap.matchMedia();
for(const [name,index] of [['personal',0],['normal',1]]){
 const phone=source.cloneNode(true);phone.className='three-phone fan-phone fan-'+name;phone.setAttribute('aria-hidden','true');phone.removeAttribute('role');phone.removeAttribute('aria-label');
 for(const el of [phone,...phone.querySelectorAll('[style]')])el.removeAttribute('style');
 phone.querySelectorAll('.chat-sheet,.chat-shade,.warm-reveal').forEach(el=>el.remove());
 const paths=index===0?['img','img2','img3']:['img','img2','img3'];
 ['.three-back','.three-attach','.three-send'].forEach((sel,i)=>phone.querySelector(sel).src='assets/conclusion-114-5973-'+paths[i]+'.svg');
 if(index===0)phone.querySelector('.theme-decor img').src='assets/conclusion-114-5973-img4.svg';
 fan.append(phone);
}
media.add('(prefers-reduced-motion: no-preference)',()=>{
 const mobile=innerWidth<=600,start=parent.duration(),tl=gsap.timeline({defaults:{ease:'sine.inOut'}});
 tl.to('.theme-title,.theme-question,.theme-tabs',{autoAlpha:0,duration:.7},0)
 .fromTo('.fan-personal',{autoAlpha:0,x:0,y:0,rotation:0},{autoAlpha:1,x:mobile?-105:-345,y:0,rotation:0,duration:1},.15)
 .fromTo('.fan-normal',{autoAlpha:0,x:0,y:0,rotation:0},{autoAlpha:1,x:mobile?105:345,y:0,rotation:0,duration:1},.15)
 .to('.fan-personal',{x:mobile?-45:-75.76,y:12,rotation:5,autoAlpha:1,duration:1.3},1.45)
 .to('.fan-normal',{x:0,y:-20.08,rotation:0,autoAlpha:1,duration:1.3},1.45)
 .to(source,{x:mobile?38:63.39,y:-31.44,rotation:-4,autoAlpha:1,duration:1.3},1.45)
 .fromTo('.mood-message',{autoAlpha:0},{autoAlpha:1,duration:.7},2.2)
 .to('.fan-personal',{autoAlpha:.16,duration:1.1},3.4)
 .to('.fan-normal',{autoAlpha:.22,duration:1.1},3.4)
 .to(source,{autoAlpha:.12,duration:1.1},3.4)
 .to('.mood-title',{autoAlpha:1,duration:.7},4.5)
 .to('.theme-fan,.customize-material,.mood-title,.mood-message',{autoAlpha:0,duration:.8},6.4)
 .to('.choice-scene',{autoAlpha:1,duration:.8},6.65)
 .fromTo('.choice-intro,.choice-note,.choice-photo',{autoAlpha:0},{autoAlpha:1,duration:.65},7.55)
 .fromTo('.choice-title',{autoAlpha:0},{autoAlpha:1,duration:.7},8.4)
 .to('.choice-scene',{autoAlpha:0,duration:.8},10.8)
 .to('.self-scene',{autoAlpha:1,duration:.85},11.1)
 .to({},{duration:2},12.1);
 parent.add(tl,start);window.themeConclusionTimeline=tl;
});
media.add('(prefers-reduced-motion: reduce)',()=>{
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{
 const state=Math.min(99,Math.floor(self.progress*100));
 gsap.set(['.theme-fan','.mood-title','.mood-message','.choice-scene','.self-scene'],{autoAlpha:0});
 if(state===27){gsap.set('.customize-material',{autoAlpha:0});gsap.set(['.theme-fan','.mood-title','.mood-message'],{autoAlpha:1});gsap.set('.fan-personal',{autoAlpha:.16,x:innerWidth<=600?-45:-75.76,y:12,rotation:5});gsap.set('.fan-normal',{autoAlpha:.22,x:0,y:-20.08});}
 if(state===28){gsap.set('.customize-material',{autoAlpha:0});gsap.set('.choice-scene',{autoAlpha:1});}
 if(state===29){gsap.set('.customize-material',{autoAlpha:0});gsap.set('.self-scene',{autoAlpha:1});}
 }});
});
})();
