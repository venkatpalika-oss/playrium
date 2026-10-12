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
function fn(file,name){const s=fs.readFileSync(path.join(__dirname,'..',file),'utf8');const start=s.indexOf('function '+name+'(');assert.ok(start>=0);let i=s.indexOf('{',start),depth=1;for(i++;depth;i++){if(s[i]==='{')depth++;if(s[i]==='}')depth--;}return s.slice(start,i);}
for(const hz of [30,60,120]){
 for(const tap of [550,700,850]){
  let now=0,misses=0,hits=0;const c={state:'playing',targetStation:7,STORE_INDEX:7,currentStation:6,alreadyTapped:false,legDuration:700,legStart:0,store:0,STATION_COUNT:8,gameClock:{now:()=>now},windowHalfFor:()=>190,onPerfectSow(){hits++},onMiss(){misses++},startLeg(t){c.legStart=t;c.alreadyTapped=false},stations:Array(8).fill({x:0,y:0}),spawnShellPop(){},tone(){}};
  vm.runInNewContext(fn('sungka-streak.html','tryTap')+'\n'+fn('sungka-streak.html','updatePhysics'),c);
  for(now=0;now<tap;now+=1000/hz)c.updatePhysics(now);
  now=tap;c.tryTap();assert.equal(hits,1,`${hz}Hz tap ${tap}ms must count`);assert.equal(misses,0);
 }
}
let dodges=0,caught=0;
const c={state:'playing',jumping:true,jumpStart:500,JUMP_DURATION:420,clapProcessed:false,legStart:0,legDuration:900,onDodge(){dodges++},onCaught(){caught++},startCycle(t){this.next=t}};
vm.runInNewContext(fn('tinikling-tempo.html','updatePhysics'),c);c.updatePhysics(930);assert.equal(dodges,1,'a late frame must judge the jump at the clap, not at render time');assert.equal(caught,0);
const wear=[];
for(const hz of [30,60,120]){
 const p={poi:{x:0,y:0,radius:10},pointerActive:true,pointerX:0,pointerY:0,PlayriumTiming:{blend},poolCX:0,poolCY:0,poolR:100000,state:'playing',durability:100,fish:[],spawnRipple(){},updateDurBar(){},triggerTear(){throw Error('unexpected tear')}};
 vm.runInNewContext(fn('goldfish-scoop.html','updatePoi'),p);
 for(let i=0;i<hz;i++){const dt=1000/hz;p.pointerX=p.poi.x+(3*dt/16.6)/blend(.3,dt);p.updatePoi(dt);}
 wear.push(100-p.durability);
}
assert.ok(Math.max(...wear)-Math.min(...wear)<1e-8,'actual scoop wear must be equal for the same movement at different refresh rates');
let expired=0,locked=0;
const p={state:'playing',activeIndex:0,slots:[{x:10,y:10}],tapRadius:30,gameClock:{now:()=>1501},chargeStart:0,chargeDuration:1400,READY_FROM:.68,onTimeout(){expired++},onLockIn(){locked++},onEarlyFail(){}};
vm.runInNewContext(fn('parol-glow.html','tryTapAt'),p);p.tryTapAt(10,10);assert.equal(expired,1);assert.equal(locked,0);
console.log('PASS: nested pause/resume, stall handling, 30/60/120Hz steering, early/on-time/late Sungka taps, delayed-frame Tinikling judging and refresh-independent wear.');
