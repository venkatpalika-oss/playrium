const assert=require('node:assert/strict');const {create,configs}=require('../components/rebuild-core.js');
function advance(g,t){for(let i=0;i<Math.round(t*120);i++)g.step(1/120);}
function nextCycle(g){const cycle=g.state.cycle;while(g.state.cycle===cycle&&g.state.status==='playing')g.step(1/120);}
for(const slug of Object.keys(configs)){
 const a=create(slug,123),b=create(slug,123);a.start();b.start();advance(a,2);advance(b,2);assert.deepEqual(a.state,b.state,slug+' deterministic');
 const fresh=create(slug,123);assert.equal(fresh.state.score,0);assert.equal(fresh.state.t,0);assert.equal(fresh.state.status,'ready');
}
for(const slug of ['daruma-drop','sungka-streak','tinikling-tempo']){
 const g=create(slug,1);g.start();let safety=0;
 while(g.state.status==='playing'&&safety++<50){const target=g.state.kind==='strike'?g.state.blocks.find(b=>b.id===g.state.selectedBlock).target:.74;while(g.state.phase<target)g.step(1/120);g.input('action',g.state.kind==='dance'?g.state.progress%2:0);if(g.state.kind==='sow'&&g.state.tray>=3)g.input('bank');if(g.state.status==='playing')nextCycle(g);}
 assert.equal(g.state.status,'won',slug+' full clear');assert.ok(g.state.score>0);
 const lose=create(slug);lose.start();advance(lose,10);assert.equal(lose.state.status,'lost',slug+' no-input failure');
}
{
 const g=create('sungka-streak');g.start();advance(g,1.7);g.input('action');assert.equal(g.state.tray,1);assert.equal(g.state.progress,0);nextCycle(g);g.input('action');assert.equal(g.state.tray,0);assert.equal(g.state.progress,0);assert.equal(g.state.lives,2);
}
{
 const g=create('goldfish-scoop',4);g.start();while(g.state.items.length){const f=g.state.items[0];g.state.x=f.x;g.state.y=f.y;g.input('action');advance(g,.43);}assert.equal(g.state.status,'won');assert.equal(g.state.score,1200);
 const fail=create('goldfish-scoop');fail.start();advance(fail,60.1);assert.equal(fail.state.status,'lost');
 const rest=create('goldfish-scoop');rest.start();rest.state.stability=40;rest.input('rest');assert.equal(rest.state.stability,70);assert.equal(rest.state.t,4);assert.equal(rest.state.rests,1);
}
{
 const g=create('parol-glow',10);g.start();while(g.state.status==='playing'){advance(g,8);for(const p of [...g.state.sequence])g.input('memory',p);}assert.equal(g.state.status,'won');assert.equal(g.state.progress,8);
 const bad=create('parol-glow',10);bad.start();for(let i=0;i<3;i++){advance(bad,8);bad.input('memory',(bad.state.sequence[0]+1)%5);}assert.equal(bad.state.status,'lost');
}
for(const slug of ['jeepney-jam','koinobori-festival']){
 const g=create(slug,1);g.start();for(let i=0;i<24000&&g.state.status==='playing';i++){
 const good=g.state.items.find(o=>o.type==='good');if(good&&!g.state.items.some(o=>o.type==='bad'&&o.y>370&&o.y<460))g.input('aim',{x:good.x,y:410});g.step(1/120);
 }assert.equal(g.state.status,'won',slug+' steer through seeded route');assert.equal(g.state.lives,3);
 const bad=create(slug,1);bad.start();for(let i=0;i<24000&&bad.state.status==='playing';i++){const hazard=bad.state.items.find(o=>o.type==='bad');if(hazard)bad.input('aim',{x:hazard.x,y:410});bad.step(1/120);}assert.equal(bad.state.status,'lost');
}
{
 const g=create('matka-mania');g.start();g.state.load=3;for(let i=0;i<6000&&g.state.status==='playing';i++){g.state.axis=g.state.balance>.06?-1:g.state.balance<-.06?1:0;g.step(1/120);}assert.equal(g.state.status,'won');assert.equal(g.state.score,18000);
 const bad=create('matka-mania');bad.start();bad.state.axis=1;advance(bad,8);assert.equal(bad.state.status,'lost');
}
{
 const g=create('sensu-spinner',12);g.start();for(let i=0;i<30000&&g.state.status==='playing';i++){
 const p=g.state.items.find(p=>p.y>320&&p.vy>0&&p.x<325);if(p){g.state.x=p.x;g.input('action');}g.step(1/120);
 }assert.equal(g.state.status,'won',`fan caught ${g.state.progress}`);
 const bad=create('sensu-spinner',12);bad.start();advance(bad,40);assert.equal(bad.state.status,'lost');
}
{
 const g=create('gravity-playground',8);g.start();g.input('action');g.input('action');assert.equal(g.state.items.length,1);
 // A feedback controller chooses gravity to steer the real orb physics to each beacon.
 const targets=[[400,420],[400,80],[80,80],[80,420],[240,250]];
 for(let i=0;i<7200&&g.state.status==='playing';i++){
  const ball=g.state.items[0],t=targets[g.state.progress];
  const ax=(t[0]-ball.x)*4-ball.vx*2.6,ay=(t[1]-ball.y)*4-ball.vy*2.6;
  const direction=Math.abs(ax)>Math.abs(ay)?(ax>0?3:1):(ay>0?0:2);
  while(g.state.gravity!==direction)g.input('gravity');g.step(1/120);
 }
 assert.equal(g.state.status,'won','gravity route can be completed');
 const bad=create('gravity-playground');bad.start();advance(bad,60.1);assert.equal(bad.state.status,'lost');
 const reset=create('gravity-playground');reset.start();reset.input('action');reset.input('clear');assert.equal(reset.state.items.length,0);assert.equal(reset.state.progress,0);
}
// No simulated time passes after a terminal state, regardless of more input.
const ended=create('tinikling-tempo');ended.start();advance(ended,15);const frozen=JSON.stringify(ended.state);ended.input('action');advance(ended,4);assert.equal(JSON.stringify(ended.state),frozen);
console.log('PASS: all 10 deterministic engines; ten scored wins/losses; risk/bank, rarity, rest, load, gravity route/reset; terminal input ignored.');
