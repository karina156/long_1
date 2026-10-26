(function (root) {
 'use strict';
 // Keep the entire satellite above the text's protected horizontal edge.
 function safeLimit(centerY, radius, satelliteRadius, textTop, gap = 16) {
  if (!(radius > 0)) return 40;
  const ratio = (textTop - gap - satelliteRadius - centerY) / radius;
  return Math.min(85, Math.asin(Math.max(-1, Math.min(1, ratio))) * 180 / Math.PI);
 }
 // The forbidden bottom arc is excluded. Reflect travel at either safe endpoint.
 function reflectedAngle(distance, limit) {
  const low = 180 - limit;
  const high = 360 + limit;
  const span = high - low;
  if (span <= 0) return 270;
  const start = Math.max(low, Math.min(400, high - 8));
  // A cosine turn slows to zero at the safe boundary instead of snapping back.
  const startPhase = Math.acos(1 - 2 * (start - low) / span);
  const phase = startPhase + distance * Math.PI / span;
  return low + span * (1 - Math.cos(phase)) / 2;
 }
 // Two equal-mass satellites on the same protected arc. Simulation time is
 // derived entirely from scroll progress, so stopping or reversing scroll is stable.
 function pairAngles(progress,limit){
  const low=180-limit,span=Math.max(0,180+2*limit);
  if(!span)return [270,270];
  const separation=Math.min(.4,10.2/span);
  let x=[.22,.78],v=[.12,-.10];
  const end=Math.max(0,Math.min(1,progress))*7,step=1/180;
  for(let t=0;t<end;){
   const dt=Math.min(step,end-t);
   for(let i=0;i<2;i++){
    const acceleration=.012*Math.sin(t*(1.3+i*.37)+i*2.1)+.006*Math.cos(t*2.7+i);
    v[i]=Math.max(-.17,Math.min(.17,v[i]+acceleration*dt));x[i]+=v[i]*dt;
    if(x[i]<0){x[i]=-x[i];v[i]=Math.abs(v[i]);}
    if(x[i]>1){x[i]=2-x[i];v[i]=-Math.abs(v[i]);}
   }
   if(x[1]-x[0]<separation){
    const midpoint=(x[0]+x[1])/2;
    x=[midpoint-separation/2,midpoint+separation/2];
    if(x[0]<0)x=[0,separation];
    if(x[1]>1)x=[1-separation,1];
    if(v[0]>v[1])v=[v[1],v[0]];
   }
   t+=dt;
  }
  return x.map(value=>low+span*value);
 }
 const api = { safeLimit, reflectedAngle, pairAngles };
 if (typeof module === 'object' && module.exports) module.exports = api;
 else root.LongreadOrbit = api;
})(typeof window === 'object' ? window : globalThis);
