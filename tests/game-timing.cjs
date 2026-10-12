const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {createClock,blend}=require('../components/game-clock.js');
let real=0;const clock=createClock(()=>real);real=16;assert.equal(clock.tick(real),16);
clock.pause('help');real=5000;assert.equal(clock.now(),16);clock.pause('visibility');clock.resume('help');assert.ok(clock.paused);clock.resume('visibility');real+=16;assert.equal(clock.tick(real),32);
real+=30000;assert.equal(clock.tick(real),82,'long stalls must not skip a timing round');
let eventTime=0;const inputClock=createClock(()=>eventTime);eventTime=20;const inputNow=inputClock.now();assert.ok(inputClock.tick(16)>=inputNow,'RAF timestamps must not rewind an input timestamp');
for(const hz of [30,60,120]){
 let x=0;for(let i=0;i<hz;i++)x+=(100-x)*blend(.25,1000/hz);
 assert.ok(Math.abs(x-(100-100*Math.pow(.75,60)))<1e-8,'one-second steering must be independent of refresh rate');
}
// The old inline arcade engines were replaced. Verify both edges of the new timing windows.
const {create}=require('../components/rebuild-core.js');
for(const hz of [30,60,120]){
 for(const phase of [.605,.74,.875]){
  const g=create('tinikling-tempo');g.start();
  let elapsed=0,acc=0;const target=phase*2.3;
  while(elapsed<target){const dt=Math.min(1/hz,target-elapsed);elapsed+=dt;acc+=dt;while(acc>=1/120){g.step(1/120);acc-=1/120;}}
  g.input('action',0);assert.equal(g.state.progress,1,`${hz}Hz phase ${phase}`);
 }
}
console.log('PASS: clock pause/stalls; refresh-independent smoothing; rebuilt timing windows at 30/60/120Hz schedules.');
