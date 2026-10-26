(() => {
'use strict';
const root=document.querySelector('#designer'),parent=window.longreadTimeline,media=gsap.matchMedia();
const fit=()=>{root.style.setProperty('--designer-scale',Math.min(innerWidth/1512,innerHeight/1024));root.style.setProperty('--customize-scale',Math.min(innerWidth*.53/304,innerHeight*.57/624));};fit();addEventListener('resize',fit,{passive:true});
const screen=root.querySelector('.three-screen'),warm=document.createElement('div');warm.className='warm-reveal';screen.prepend(warm);
const tabs=[...root.querySelectorAll('[data-theme]')],theme={value:0};let jump=null;
function markTheme(index){tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===index)));}
tabs.forEach((tab,i)=>tab.addEventListener('click',()=>jump?.(i)));
function directTheme(index){
 markTheme(index);const base=index===2?'114-6622':index===1?'114-6508':'114-5903';for(const [sel,suffix] of [['.three-back','img'],['.three-attach',index===2?'img1':'img2'],['.three-send',index===2?'img2':'img3']])root.querySelector(sel).src='assets/designer-'+base+'-'+suffix+'.svg';gsap.set(warm,{clipPath:index===1?'circle(150% at 12% 83%)':'circle(0% at 12% 83%)'});
 gsap.set(screen,{backgroundColor:index===2?'#0f0f0f':'#f5f5f9'});
 gsap.set(root.querySelectorAll('.three-status,.three-composer'),{backgroundColor:index===2?'#0f0f0f':index===1?'#fff1e4':'#f5f5f9'});
 gsap.set('.theme-decor',{autoAlpha:index===1?1:0});gsap.set('.theme-message',{backgroundColor:index===1?'#ffd9c4':'#ffffff'});
 gsap.set(root.querySelector('.three-contact'),{backgroundColor:index===2?'#262626':'white',color:index===2?'white':'#0f0f0f'});
 gsap.set(root.querySelector('.three-status span'),{color:index===2?'white':'#0f0f0f'});
 gsap.set(root.querySelector('.three-contact-photo'),{autoAlpha:index===2?0:1});root.querySelector('.theme-heart').style.display=index===1?'inline':'none';
}
media.add('(prefers-reduced-motion: no-preference)',()=>{
 const mobile=innerWidth<=600,start=parent.duration(),tl=gsap.timeline({defaults:{ease:'sine.inOut'}});
 tl.to('#presence .three-phone',{left:mobile?'69%':1193.767,top:mobile?'40%':156,duration:1.25},0)
 .fromTo('.designer-role',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.65},1.3)
 .to('.participant-row',{left:mobile?'50%':317.691,top:mobile?'32%':361.4,duration:1},2)
 .to('#presence',{autoAlpha:0,duration:.9},4)
 .fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9},4)
 .fromTo('.designer-material h2,.designer-lead',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.7},4.25)
 .fromTo('.scatter',{autoAlpha:0,y:9},{autoAlpha:.6,y:0,duration:.5,stagger:.3},5.15)
 .to('.designer-material',{autoAlpha:0,duration:.7},8)
 .to('.lesha-material',{autoAlpha:1,duration:.7},8.4)
 .fromTo('.lesha-portrait',{autoAlpha:0},{autoAlpha:1,duration:.65},9.1)
 .fromTo('.lesha-material h2',{autoAlpha:0},{autoAlpha:1,duration:.6},9.85)
 .to('.lesha-material',{autoAlpha:0,duration:.7},11.6)
 .to('.customize-material',{autoAlpha:1,duration:.7},12)
 .fromTo('.customize-phone',{y:80,autoAlpha:0},{y:0,autoAlpha:1,duration:1},12)
 .to('.chat-shade',{autoAlpha:1,duration:.55},13.1)
 .fromTo('.chat-sheet',{yPercent:115,y:0,autoAlpha:0},{yPercent:0,y:0,autoAlpha:1,duration:.8},13.45)
 .fromTo('.customize-note',{autoAlpha:0},{autoAlpha:1,duration:.8},14.2);
 root.querySelectorAll('.setting-row').forEach((row,i)=>tl.to(row,{backgroundColor:'#f3eeff',duration:.25},14.4+i*.65).to(row,{backgroundColor:'#ffffff',duration:.25},14.85+i*.65));
 tl.to('.chat-sheet',{yPercent:115,autoAlpha:0,duration:.7},17.35)
 .to('.chat-shade',{autoAlpha:0,duration:.6},17.55)
 .to('.customize-title,.customize-note',{autoAlpha:0,duration:.65},17.6)
 .to('.customize-phone',{top:mobile?'17%':200.076,duration:.8},17.7)
 .set('.customize-phone .three-back',{attr:{src:'assets/designer-114-5903-img.svg'}},18.1)
 .set('.customize-phone .three-attach',{attr:{src:'assets/designer-114-5903-img2.svg'}},18.1)
 .set('.customize-phone .three-send',{attr:{src:'assets/designer-114-5903-img3.svg'}},18.1)
 .to('.theme-title',{autoAlpha:1,duration:.7},18.25)
 .to('.theme-message',{autoAlpha:1,duration:.55},18.65)
 .to('.theme-question,.theme-tabs',{autoAlpha:1,duration:.65},19.2)
 .addLabel('ordinary',20.1).to({},{duration:.8},20.1)
 .to(warm,{clipPath:'circle(150% at 12% 83%)',duration:1},21)
 .to('.theme-decor',{autoAlpha:1,duration:.8},21.15)
 .to(theme,{value:1,duration:.8,onUpdate:()=>markTheme(Math.round(theme.value))},21)
 .to(root.querySelectorAll('.three-status,.three-composer'),{backgroundColor:'#fff1e4',duration:1},21)
 .to('.theme-message',{backgroundColor:'#ffd9c4',duration:1},21)
 .set('.customize-phone .three-back',{attr:{src:'assets/designer-114-6508-img.svg'}},21.5)
 .set('.customize-phone .three-attach',{attr:{src:'assets/designer-114-6508-img2.svg'}},21.5)
 .set('.customize-phone .three-send',{attr:{src:'assets/designer-114-6508-img3.svg'}},21.5)
 .set('.theme-heart',{display:'inline'},21.5).addLabel('personal',22.2)
 .to({},{duration:.8},22.2)
 .to(warm,{autoAlpha:0,duration:.9},23.1)
 .to(screen,{backgroundColor:'#0f0f0f',duration:.9},23.1)
 .to(root.querySelectorAll('.three-status,.three-composer'),{backgroundColor:'#0f0f0f',duration:.9},23.1)
 .to('.theme-decor',{autoAlpha:0,duration:.7},23.1)
 .to(root.querySelector('.three-contact-photo'),{autoAlpha:0,duration:.7},23.1)
 .to(root.querySelector('.three-contact'),{backgroundColor:'#262626',color:'#ffffff',duration:.9},23.1)
 .to(root.querySelector('.three-status span'),{color:'#ffffff',duration:.9},23.1)
 .to(root.querySelector('.three-composer span'),{backgroundColor:'#262626',duration:.9},23.1)
 .to(root.querySelector('.three-composer i'),{backgroundColor:'#ffffff',duration:.9},23.1)
 .to('.theme-message',{backgroundColor:'#ffffff',duration:.9},23.1)
 .set('.customize-phone .three-back',{attr:{src:'assets/designer-114-6622-img.svg'}},23.3)
 .set('.customize-phone .three-attach',{attr:{src:'assets/designer-114-6622-img1.svg'}},23.3)
 .set('.customize-phone .three-send',{attr:{src:'assets/designer-114-6622-img2.svg'}},23.3)
 .set('.theme-heart',{display:'none'},23.3)
 .to(theme,{value:2,duration:.8,onUpdate:()=>markTheme(Math.round(theme.value))},23.1)
 .addLabel('minimal',24.2).to({},{duration:1.2},24.2);
 parent.add(tl,start);window.designerTimeline=tl;
 jump=i=>{const time=start+tl.labels[['ordinary','personal','minimal'][i]],st=parent.scrollTrigger;window.scrollTo({top:st.start+(time/parent.duration())*(st.end-st.start),behavior:'smooth'});};
 return ()=>{jump=null;};
});
media.add('(prefers-reduced-motion: reduce)',()=>{
 const selectors=['.designer-material','.lesha-material','.customize-material'];
 jump=directTheme;window.applyReducedTheme=directTheme;
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{
 const index=Math.min(99,Math.floor(self.progress*100))-20;gsap.set(root,{autoAlpha:index>0?1:0});
 if(index===0){gsap.set('#presence',{autoAlpha:1});gsap.set('.three-content',{autoAlpha:1});gsap.set('.designer-role',{autoAlpha:1});gsap.set('#presence .three-phone',{left:innerWidth<=600?'69%':1193.767,top:innerWidth<=600?'40%':156});gsap.set('.participant-row',{left:innerWidth<=600?'50%':317.691,top:innerWidth<=600?'32%':361.4});}
 gsap.set(selectors,{autoAlpha:0});if(index>0)gsap.set(selectors[Math.min(index-1,2)],{autoAlpha:1});
 if(index===3){gsap.set('.chat-shade,.chat-sheet',{autoAlpha:1});gsap.set('.chat-sheet',{y:0,yPercent:0});gsap.set('.theme-title,.theme-question,.theme-tabs,.theme-message',{autoAlpha:0});}
 if(index>=4){if(index<=6)directTheme(index-4);gsap.set('.chat-shade,.chat-sheet,.customize-title,.customize-note',{autoAlpha:0});gsap.set('.theme-title,.theme-question,.theme-tabs,.theme-message',{autoAlpha:1});}
 }});
});
})();
