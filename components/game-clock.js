/* A monotonic gameplay clock. Hidden tabs/help dialogs don't consume a round.
   Long rendering stalls advance at most 50ms, avoiding unseen timing penalties. */
(function(root){
 'use strict';
 function createClock(readTime){
  let last=readTime(), elapsed=0;const reasons=new Set();
  const step=t=>Math.max(0,Math.min(50,t-last));
  return {
   now(){return elapsed+(reasons.size?0:step(readTime()));},
   tick(t=readTime()){t=Math.max(t,readTime());if(!reasons.size)elapsed+=step(t);last=t;return elapsed;},
   pause(reason){if(!reasons.size)this.tick();reasons.add(reason);},
   resume(reason){reasons.delete(reason);last=readTime();},
   get paused(){return reasons.size>0;}
  };
 }
 const api={createClock,blend:(base,dt)=>1-Math.pow(1-base,Math.max(0,dt)/(1000/60))};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 else {
  root.PlayriumTiming=api;
  root.PlayriumGameClock=createClock(()=>performance.now());
  const visibility=()=>document.hidden?root.PlayriumGameClock.pause('visibility'):root.PlayriumGameClock.resume('visibility');
  document.addEventListener('visibilitychange',visibility);visibility();
 }
})(typeof window!=='undefined'?window:globalThis);
