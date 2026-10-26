(() => {
'use strict';
const root=document.querySelector('#brackets'),parent=window.longreadTimeline,media=gsap.matchMedia();
const fit=()=>{root.style.setProperty('--brackets-scale',Math.min(innerWidth/1512,innerHeight/982));root.style.setProperty('--erased-scale',Math.min(innerWidth*.65/422.16,innerHeight*.54/866.23));root.style.setProperty('--cat-scale',Math.min(innerWidth*.68/422.16,innerHeight*.63/866.23));};fit();addEventListener('resize',fit,{passive:true});
root.querySelectorAll('.bracket-scale button').forEach(button=>button.addEventListener('click',()=>root.querySelectorAll('.bracket-scale button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))));
const readingNotes={'Улыбка':'Для одного человека скобки — улыбка, для другого — вежливость или ирония. Единственного правильного ответа здесь нет.','Смех':'Длинная цепочка скобок может читаться как смех или насмешка. Значение складывается между людьми.','Ирония':'Ирония — одно из возможных прочтений. Собеседник мог написать те же скобки с другой интонацией.','Зависит от человека':'Привычки собеседника и предыдущие разговоры помогают прочитать знак. Общего словаря для всех нет.'};
root.querySelectorAll('[data-reading]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-reading]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));root.querySelector('.reading-explanation').textContent='';window.longreadPopup.open({title:'Вы выбрали: '+button.dataset.reading,text:readingNotes[button.dataset.reading]},button);}));
const draft=root.querySelector('.own-draft'),letters=Array.from('Завтра в семь, как договаривались?)'),cursor={count:0};const renderDraft=()=>draft.textContent=letters.slice(0,Math.round(cursor.count)).join('');
media.add('(prefers-reduced-motion: no-preference)',()=>{
 const mobile=innerWidth<=600,tl=gsap.timeline({defaults:{ease:'sine.inOut'}});
 tl.to('#signs',{autoAlpha:0,duration:.9},0).fromTo(root,{autoAlpha:0},{autoAlpha:1,duration:.9},0)
 .to('.farewell-scene',{autoAlpha:1,duration:.8},.4);
 root.querySelectorAll('.farewell-example').forEach((el,i)=>tl.fromTo(el,{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.65},1.4+i*.8));
 tl.fromTo('.farewell-left',{autoAlpha:0,y:-8},{autoAlpha:1,y:0,duration:.6},.7)
 .fromTo('.farewell-right',{autoAlpha:0,y:-8},{autoAlpha:1,y:0,duration:.6},3.8)
 .to('.farewell-scene',{autoAlpha:0,duration:.8},5.4)
 .to('.clock-scene',{autoAlpha:1,duration:.8},5.6)
 .fromTo('.bracket-scale button',{autoAlpha:0,scale:.9},{autoAlpha:1,scale:1,duration:.5,stagger:.25},6.5)
 .fromTo('.clock-note',{autoAlpha:0},{autoAlpha:1,duration:.6},7.9)
 .to('.clock-scene',{autoAlpha:0,duration:.8},10)
 .to('.brackets-field',{autoAlpha:1,duration:.8},10)
 .to('.bracket-poll-scene',{autoAlpha:1,duration:.8},10.2)
 .fromTo('.bracket-panel',{yPercent:70,scale:.5},{yPercent:0,scale:1,duration:.9},10.2)
 .fromTo('.large-brackets,.bracket-poll-scene h2,.bracket-form,.reading-hint,.reading-explanation',{autoAlpha:0},{autoAlpha:1,duration:.6,stagger:.3},11.2)
 .to('.bracket-poll-scene,.brackets-field',{autoAlpha:0,duration:.8},14.2)
 .to('.erased-scene',{autoAlpha:1,duration:.8},14.4)
 .to('.erased-phone .phone-composer',{top:716.13,height:121.41,duration:.5},15.1)
 .to('.erased-phone .phone-composer',{top:743.13,height:94.41,duration:.7},17.8)
 .to('.erased-phone .message-placeholder',{height:71.3,duration:.5},15.1)
 .to(cursor,{count:letters.length,duration:1.3,ease:'none',onUpdate:renderDraft},15.1)
 .to(cursor,{count:letters.length-1,duration:.25,ease:'none',onUpdate:renderDraft},17.2)
 .to('.erased-left,.erased-right',{autoAlpha:0,duration:.65},17.6)
 .to('.own-draft',{autoAlpha:0,duration:.4},17.8)
 .set('.erased-phone .contact-name',{textContent:'Лёша'},18)
 .set('.erased-phone .contact-avatar img',{attr:{src:'assets/bracket-43-175-img1.png'}},18)
 .to('.erased-phone',{top:mobile?'19%':58,scale:mobile?Math.min(innerWidth*.65/422.16,innerHeight*.63/866.23):1,duration:1},17.8)
 .to('.erased-phone .message-placeholder',{height:43.83,top:14.99,fontSize:16.2,paddingTop:11.41,duration:.7},17.8)
 .set('.draft-placeholder',{display:'inline'},18.3)
 .to('.sent-final',{autoAlpha:1,duration:.55},18.5)
 .to('.recipient-left,.recipient-right',{autoAlpha:1,duration:.6,stagger:.5},18.7)
 .to('.erased-scene',{autoAlpha:0,duration:.8},22)
 .to('.brackets-field',{autoAlpha:1,duration:.8},22)
 .to('.dot-scene',{autoAlpha:1,duration:.8},22.2)
 .fromTo('.dot-panel',{yPercent:65,scale:.5},{yPercent:0,scale:1,duration:.9},22.2)
 .fromTo('.dot-scene h2,.dot-explain,.dot-good',{autoAlpha:0},{autoAlpha:1,duration:.6,stagger:.3},23.2)
 .fromTo('.dot-second span',{autoAlpha:0,y:-5},{autoAlpha:1,y:0,duration:.45},24.8)
 .fromTo('.dot-study,.dot-caution',{autoAlpha:0},{autoAlpha:1,duration:.6,stagger:.5},25.3)
 .to('.dot-scene',{autoAlpha:0,duration:.8},28.3)
 .to('.sticker-intro',{autoAlpha:1,duration:.8},28.5)
 .to('.sticker-intro,.brackets-field',{autoAlpha:0,duration:1.3},31.1)
 .fromTo('.sticker-context',{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:1.3},31.5)
 .fromTo('.context-question',{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.7},33.4)
 .to('.sticker-context>p',{autoAlpha:0,duration:.7},35.7)
 .to('.context-question',{scale:mobile?.65:.53,x:mobile?0:78,y:mobile?-120:-175,autoAlpha:0,duration:1.2},35.7)
 .to('.cat-scene',{autoAlpha:1,duration:1},36)
 .to('.sticker-context',{autoAlpha:0,duration:.3},37)
 .fromTo('.cat-history>.q2204,.cat-history>.a2206,.cat-history>.q2208,.sleepy-cat',{autoAlpha:0,y:6},{autoAlpha:1,y:0,duration:.45,stagger:.45},36.2)
 .fromTo('.cat-first-title',{autoAlpha:0},{autoAlpha:1,duration:.6},38.2)
 .to('.cat-history',{top:310.49,duration:1},40.8)
 .to('.q2210',{autoAlpha:1,duration:.55},41.2)
 .to('.a2211',{autoAlpha:1,duration:.55},42.4)
 .to('.cat-first-title',{autoAlpha:0,duration:.5},43.1)
 .to('.cat-last-title',{autoAlpha:1,duration:.6},43.7)
 .to('.cat-conclusion',{autoAlpha:1,duration:.6},44.5)
 .to({},{duration:2},45.5);
 const start=parent.duration();parent.add(tl,start);window.bracketsTimeline=tl;
});
media.add('(prefers-reduced-motion: reduce)',()=>{
 const scenes=['.farewell-scene','.clock-scene','.bracket-poll-scene','.erased-scene','.erased-scene','.dot-scene','.sticker-intro','.sticker-context','.cat-scene','.cat-scene'];
 ScrollTrigger.create({trigger:'#intro',start:'top top',end:'bottom bottom',onUpdate:self=>{
 const state=Math.min(99,Math.floor(self.progress*100))-50;gsap.set(root,{autoAlpha:state>=0&&state<10?1:0});gsap.set([...new Set(scenes)],{autoAlpha:0});if(state<0||state>=10)return;gsap.set(scenes[state],{autoAlpha:1});gsap.set('.brackets-field',{autoAlpha:[2,5,6].includes(state)?1:0});
 draft.textContent=letters.join('');gsap.set('.own-draft,.erased-left,.erased-right',{autoAlpha:state===3?1:0});gsap.set('.sent-final,.recipient-left,.recipient-right',{autoAlpha:state===4?1:0});gsap.set('.erased-phone .contact-name',{textContent:state===4?'Лёша':'Аня'});gsap.set('.erased-phone .contact-avatar img',{attr:{src:state===4?'assets/bracket-43-175-img1.png':'assets/next-38-161-img2.png'}});
 gsap.set('.cat-history',{top:state===9?280:415.91});gsap.set('.q2210,.a2211,.cat-last-title,.cat-conclusion',{autoAlpha:state===9?1:0});gsap.set('.cat-first-title',{autoAlpha:state===8?1:0});
 }});
});
})();
