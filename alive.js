(() => {
'use strict';
const root=document.querySelector('#alive'),parent=window.longreadTimeline,media=gsap.matchMedia();
const fit=()=>{root.style.setProperty('--alive-scale',Math.min(innerWidth/1512,innerHeight/982));root.style.setProperty('--alive-mobile-art',Math.min(innerWidth/1512,innerHeight/982));root.style.setProperty('--alive-phone-scale',Math.min(innerWidth*.7/422,innerHeight*.73/866));};fit();addEventListener('resize',fit,{passive:true});
media.add('(prefers-reduced-motion: no-preference)',()=>{
 const mobile=innerWidth<=600,orbitOne={angle:0},orbitTwo={angle:0};
 const moveOrb=(selector,dx,dy,angle)=>{const c=Math.cos(angle),sn=Math.sin(angle);gsap.set(selector,{x:dx*c-dy*.62*sn-dx,y:Math.max(-380,Math.min(380,dx*.62*sn+dy*c))-dy});};
 const tl=gsap.timeline({defaults:{ease:'sine.inOut'},onUpdate:()=>root.classList.toggle('is-typing',tl.time()>=27&&tl.time()<=38.5)});
 tl.to(orbitOne,{angle:100*Math.PI/180,duration:4.4,ease:'none',onUpdate:()=>moveOrb('.alive-orb.one img',504,-301,orbitOne.angle)},0)
 .to(orbitTwo,{angle:-115*Math.PI/180,duration:4.4,ease:'none',onUpdate:()=>moveOrb('.alive-orb.two img',-514,284,orbitTwo.angle)},0)
 .to('.alive-ring',{scale:2.7,duration:1.4},2.8)
 .to('.alive-orb',{autoAlpha:0,scale:1.8,duration:1.1},3.3)
 .to('.alive-opening h2',{fontSize:65,duration:1.2},3)
 .to('.alive-opening',{autoAlpha:0,duration:.8},5.4)
 .to('.alive-side-bg',{autoAlpha:1,duration:.8},5.4)
 .to('.alive-notice',{autoAlpha:1,duration:.8},6)
 .fromTo('.alive-notification',{y:-32,autoAlpha:0},{y:0,autoAlpha:1,duration:.65},6.6)
 .to('.alive-notification',{y:-32,autoAlpha:0,duration:.6},8.9)
 .to('.alive-phone',{top:mobile?'22%':58,scale:mobile?Math.min(innerWidth*.58/422,innerHeight*.54/866):1,duration:.8},9)
 .to('.notice-left',{autoAlpha:1,duration:.6},9.45)
 .to('.notice-right',{autoAlpha:1,duration:.6},10.3)
 .fromTo('.notice-transition-circle',{autoAlpha:1,scale:1,width:()=>1.1*Math.hypot(innerWidth,innerHeight)/(mobile?1:Math.min(innerWidth/1512,innerHeight/982)),height:()=>1.1*Math.hypot(innerWidth,innerHeight)/(mobile?1:Math.min(innerWidth/1512,innerHeight/982)),y:()=>(innerHeight+1.1*Math.hypot(innerWidth,innerHeight))/(2*(mobile?1:Math.min(innerWidth/1512,innerHeight/982)))},{y:0,duration:1.3,ease:'sine.inOut',immediateRender:false},11.7)
 .to('.alive-notice,.alive-side-bg',{autoAlpha:0,duration:.25},13)
 .to('.system-bg',{autoAlpha:1,duration:.25},13)
 .fromTo('.system-panel',{autoAlpha:0,yPercent:95,scale:.4},{autoAlpha:1,yPercent:0,scale:1,duration:1},13.25)
 .set('.notice-transition-circle',{autoAlpha:0},13.25)
 .to('.system-principle',{autoAlpha:1,duration:.6},14.4);
 root.querySelectorAll('.system-list p').forEach((el,i)=>tl.to(el,{color:'#0f0f0f',duration:.25},15.2+i*.7).to(el,{color:'#d6c6f5',duration:.25},15.7+i*.7));
 tl.to('.system-principle',{autoAlpha:0,duration:.6},19.2)
 .to('.system-bg',{autoAlpha:0,duration:.8},19.2)
 .to('.delivery-bg',{autoAlpha:1,duration:.8},19.2)
 .to('.system-panel',{top:mobile?'4%':57,height:mobile?'92%':858,duration:.8},19.25)
 .to('.delivery-scene',{autoAlpha:1,duration:.6},20.2)
 .fromTo('.delivery-message',{scale:.9,autoAlpha:0},{scale:1,autoAlpha:1,duration:.7},20.2)
 .fromTo('.second-check',{autoAlpha:0},{autoAlpha:1,duration:.5},23)
 .to('.sent-label',{autoAlpha:0,y:-6,duration:.4},23)
 .fromTo('.delivered-label',{autoAlpha:0,y:6},{autoAlpha:1,y:0,duration:.4},23.1)
 .to('.copy-delivered',{autoAlpha:1,duration:.6},23.75)
 .to('.copy-delivered',{autoAlpha:0,duration:.55},26)
 .to('.delivery-message',{autoAlpha:0,scale:.95,duration:.65},26.1)
 .to('.delivery-typing',{autoAlpha:1,duration:.65},26.9)
 .to('.copy-person',{autoAlpha:1,duration:.6},27.5)
 .to('.copy-person',{autoAlpha:0,duration:.55},29.8)
 .to('.copy-imagine',{autoAlpha:1,duration:.6},30.4)
 .to('.copy-imagine',{autoAlpha:0,duration:.55},33.2)
 .to('.copy-unseen',{autoAlpha:1,duration:.65},33.85)
 .fromTo('.copy-unseen p:last-child',{autoAlpha:0},{autoAlpha:1,duration:.65},34.8)
 .to('.delivery-typing',{scale:1.04,duration:.4,yoyo:true,repeat:1},34.8)
 .to({},{duration:2.9},35.6);
 const bridge=parent.duration();parent.to('#designer',{autoAlpha:0,duration:.9},bridge).fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9},bridge).add(tl,bridge+.9);window.aliveTimeline=tl;
 return ()=>root.classList.remove('is-typing');
});
media.add('(prefers-reduced-motion: reduce)',()=>{
 const all=['.alive-opening','.alive-notice','.alive-side-bg','.system-bg','.delivery-bg','.system-panel','.system-principle','.delivery-scene'];
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{
 const index=Math.min(99,Math.floor(self.progress*100))-30;gsap.set(root,{autoAlpha:index>=0?1:0});gsap.set(all,{autoAlpha:0});if(index<0)return;
 if(index<2){gsap.set('.alive-opening',{autoAlpha:1});gsap.set('.alive-ring',{autoAlpha:1,scale:index===1?2.7:1});gsap.set('.alive-orb',{autoAlpha:index===0?1:0});return;}
 if(index<4){gsap.set('.alive-side-bg,.alive-notice',{autoAlpha:1});gsap.set('.alive-notification',{autoAlpha:index===2?1:0});gsap.set('.notice-left,.notice-right',{autoAlpha:index===3?1:0});return;}
 gsap.set('.system-panel',{autoAlpha:1,top:innerWidth<=600?'4%':index===4?62:57,height:innerWidth<=600?'92%':858});
 if(index===4){gsap.set('.system-bg,.system-principle',{autoAlpha:1});return;}
 gsap.set('.delivery-bg,.delivery-scene',{autoAlpha:1});gsap.set('.delivery-message',{autoAlpha:index<7?1:0});gsap.set('.second-check',{autoAlpha:index===6?1:0});gsap.set('.sent-label',{autoAlpha:index===5?1:0});gsap.set('.delivered-label',{autoAlpha:index===6?1:0});gsap.set('.delivery-typing',{autoAlpha:index>=7?1:0});gsap.set('.delivery-copy',{autoAlpha:0});const copy=['.copy-delivered','.copy-person','.copy-imagine','.copy-unseen'][index-6];if(copy)gsap.set(copy,{autoAlpha:1});
 }});
});
})();
