(function(global){
'use strict';
class PauseModel{
 constructor(now=()=>performance.now()){this.now=now;this.elapsed=0;this.running=false;this.active=false;this.last=0;}
 setActive(active){if(!active)this.pause();this.active=active;}
 play(){if(!this.active)return;if(this.elapsed>=6000)this.elapsed=0;this.last=this.now();this.running=true;}
 tick(){if(this.running){const now=this.now();this.elapsed=Math.min(6000,this.elapsed+Math.max(0,now-this.last));this.last=now;if(this.elapsed===6000)this.running=false;}return this.elapsed;}
 pause(){this.tick();this.running=false;}
}
if(typeof module==='object'&&module.exports)module.exports=PauseModel;else global.PauseModel=PauseModel;
})(typeof window==='object'?window:globalThis);
