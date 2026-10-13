/* Deterministic game rules. Rendering and browser input live in rebuild-ui.js. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.PlayriumRebuild=api;})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const configs={
 'daruma-drop':{title:'Daruma Drop',kind:'strike',label:'Precision / Japan',accent:'#f77e73',goal:6,action:'Strike',intro:'Choose your block. Clear the tower. Narrow bands award more points, but demand a cleaner strike.',controls:'Choose a numbered block, then tap Strike or Space inside its mint band. Amber blocks have smaller targets and higher rewards. Three misses end the run.'},
 'goldfish-scoop':{title:'Goldfish Scoop',kind:'fish',label:'Festival / Japan',accent:'#68cde0',goal:8,action:'Scoop',intro:'Rescue eight fish in 60 seconds. Fast golden fish earn triple points; empty scoops damage your paper.',controls:'Move the net with your finger, mouse, or arrow buttons. Tap Scoop or press Space. Empty scoops wear the paper. Rest repairs the net, but costs four seconds; you get two rests.'},
 'sensu-spinner':{title:'Sensu Spinner',kind:'fan',label:'Wind / Japan',accent:'#e9a8d3',goal:16,action:'Fan gust',intro:'Guide sixteen falling petals into the basket. Catch at least eight for a clear.',controls:'Move the fan under a petal, then tap Fan gust or Space to send it toward the basket. Gusts reach 100 pixels around the fan.'},
 'koinobori-festival':{title:'Koinobori Festival',kind:'kite',label:'Flight / Japan',accent:'#8ddcb7',goal:12,action:'Catch updraft',intro:'Collect twelve wind rings on your flight. Avoid the bamboo gates.',controls:'Drag left or right, or use the arrow buttons. Tap Catch updraft or Space to climb above a gate; wind energy recharges while gliding. You have three hearts.'},
 'sungka-streak':{title:'Sungka Streak',kind:'sow',label:'Timing / Philippines',accent:'#eec278',goal:21,action:'Collect shell',intro:'Collect shells on the beat, then decide when to bank. Longer streaks pay more, but a miss loses your unbanked shells.',controls:'Tap Collect shell or Space inside the mint band. Bank stash secures your shells; bigger stashes earn a multiplier. Bank 21 shells to win. Three misses end the run. An arcade adaptation, not traditional Sungka.'},
 'tinikling-tempo':{title:'Tinikling Tempo',kind:'dance',label:'Rhythm / Philippines',accent:'#c1dc8d',goal:25,action:'Hop left',intro:'Follow alternating footwork through twenty-five bamboo claps. Read the next foot, then move on the beat.',controls:'Alternate Hop left and Hop right inside the mint band. Keyboard: J for left, K for right. The next foot is shown above the poles. Wrong feet, early hops and missed beats cost a heart.'},
 'parol-glow':{title:'Parol Glow',kind:'memory',label:'Memory / Philippines',accent:'#f5d078',goal:8,action:'',intro:'Watch the lantern, then repeat its light sequence. Build up to eight lights.',controls:'Tap the numbered lantern points, use buttons 1–5, or number keys. The sequence grows each round; three mistakes end your run.'},
 'jeepney-jam':{title:'Jeepney Jam',kind:'road',label:'Arcade / Philippines',accent:'#f5a46e',goal:20,action:'',intro:'Collect twenty fares through the city. Change lanes to avoid the traffic.',controls:'Use Left and Right, arrow keys, or tap a lane. Three crashes end the route. Fares are yellow; traffic is red.'},
 'matka-mania':{title:'Matka Mania',kind:'balance',label:'Balance / India',accent:'#bba4ee',goal:600,action:'',intro:'Choose your cargo: a light pot or a high-value stack. Carry it 600 metres while countering the market winds.',controls:'Hold Left or Right to counter the wind. When the marker leaves the safe band, your stability drains. More pots multiply your score and amplify the wind. Choose your load before starting.'},
 'gravity-playground':{title:'Gravity Playground',kind:'gravity',label:'Physics / Originals',accent:'#a7b6fa',goal:5,action:'Launch orb',intro:'One orb. Five beacons. Change gravity to guide your orb through the route before 60 seconds run out.',controls:'Launch your orb, then rotate gravity: Down → Left → Up → Right → Zero. Light the numbered beacons in order. Reset orb returns it to the launch pad without resetting the timer.'}
};
function create(slug,seed=Date.now()){
 const c=configs[slug];if(!c)throw Error('Unknown game');
 let rng=seed>>>0;const random=()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296;};
 const s={slug,kind:c.kind,status:'ready',t:0,score:0,lives:3,progress:0,x:240,y:410,targetX:240,targetY:410,axis:0,vertical:0,phase:0,cycle:0,acted:false,cooldown:0,feedback:'Ready when you are.',flash:0,items:[],spawn:0,resolved:0,wind:0,balance:0,stability:100,lane:1,gravity:0,sequence:[],round:1,index:0,showAt:0,mode:'watch',invulnerable:0,tray:0,rests:2,load:1,selectedBlock:0,blocks:Array.from({length:6},(_,i)=>({id:i,target:.3+i*.095,width:i%2?.065:.12,bonus:i%2?300:100}))};
 const say=text=>{s.feedback=text;s.flash=.7;};
 function finish(win){s.status=win?'won':'lost';say(win?'Challenge complete. Your score is saved.':s.lives<=0?'No hearts left. Try another run.':['fish','gravity'].includes(c.kind)&&s.t>=60?'Time is up. Try another route.':s.stability<=0?'Your condition reached zero. Try a gentler approach.':'Round over. Try a different approach.');}
 function miss(text='Miss — reset and try the next one.'){s.lives--;say(text);if(s.lives<=0)finish(false);}
 function point(amount=100){s.score+=amount;s.progress++;say('Nice! Keep going.');if(c.goal&&s.progress>=c.goal)finish(true);}
 function start(){Object.assign(s,{status:'playing'});say({strike:'Choose a block. Watch its mint target.',fish:'Golden fish are worth triple. Aim before scooping.',fan:'Fan beneath a petal to guide it right.',kite:'Collect rings. Spend wind energy to rise.',sow:'Collect, then bank. Unbanked shells are at risk.',dance:'Left foot first. Watch the mint band.',memory:'Watch the lights before your turn.',road:'Yellow fares. Red traffic. Read the next row.',balance:'Counter the wind. Hold a direction to correct.',gravity:'Launch your orb. Gravity starts downward.'}[c.kind]);if(c.kind==='fish')for(let i=0;i<8;i++)s.items.push({x:50+random()*380,y:110+random()*300,vx:(random()>.5?1:-1)*(i<2?72:30+random()*15),vy:random()*12-6,id:i,rare:i<2});if(c.kind==='memory'){s.sequence=[Math.floor(random()*5)];s.showAt=s.t;s.mode='watch';}}
 function input(type,value){
  if(s.status!=='playing')return;
  if(type==='block'){if(s.blocks.some(b=>b.id===value))s.selectedBlock=value;return;}
  if(type==='bank'&&c.kind==='sow'&&s.tray){s.score+=s.tray*100*(1+Math.floor(s.tray/3));s.progress+=s.tray;say('Stash secured.');s.tray=0;if(s.progress>=21)finish(true);return;}
  if(type==='rest'&&c.kind==='fish'&&s.rests>0){s.rests--;s.t+=4;s.stability=Math.min(100,s.stability+30);say('Paper repaired. Four seconds spent.');return;}
  if(type==='aim'){s.targetX=clamp(value.x,22,458);s.targetY=clamp(value.y,65,485);if(c.kind==='road')s.lane=clamp(Math.floor(value.x/160),0,2);return;}
  if(type==='lane'){s.lane=clamp(s.lane+value,0,2);return;}
  if(type==='gravity'){s.gravity=(s.gravity+1)%5;say(['Gravity down','Gravity left','Gravity up','Gravity right','Zero gravity'][s.gravity]);return;}
  if(type==='clear'){s.items=[];say('Orb returned to launch pad.');return;}
  if(type==='memory'){
   if(s.mode!=='repeat')return;
   s.selected=value;s.selectedUntil=s.t+.25;
   if(value!==s.sequence[s.index]){miss('Different light. Watch the sequence once more.');s.index=0;s.mode='watch';s.showAt=s.t+.7;return;}
   s.index++;s.score+=50;
   if(s.index===s.sequence.length){s.progress=s.round;say('Sequence complete!');if(s.round===8){finish(true);return;}s.round++;s.sequence.push(Math.floor(random()*5));s.index=0;s.mode='watch';s.showAt=s.t+.8;}return;
  }
  if(type!=='action'||s.cooldown>0)return;
  if(c.kind==='kite'){if(s.stability>=30){s.stability-=30;s.y=Math.max(150,s.y-90);say('Riding an updraft.');}else say('Let your wind energy recharge.');return;}
  if(['strike','sow','dance'].includes(c.kind)){
   if(s.acted)return;s.acted=true;
   const block=s.blocks.find(b=>b.id===s.selectedBlock);const target=c.kind==='strike'?block.target:.74;const distance=Math.abs(s.phase-target),window=c.kind==='strike'?block.width:c.kind==='sow'?Math.max(.065,.14-s.tray*.008):.14;
   if(distance<=window&&(c.kind!=='dance'||(value??0)===s.progress%2)){
    if(c.kind==='sow'){s.tray++;say(s.tray+' shells at risk — bank or keep your streak.');}
    else if(c.kind==='strike'){point(block.bonus+(distance<.025?100:0));s.blocks=s.blocks.filter(b=>b.id!==block.id);s.selectedBlock=s.blocks[0]?.id??0;}
    else point(distance<.04?150:100);s.hopUntil=s.t+.4;
   }else {if(c.kind==='sow')s.tray=0;miss('Outside the mint band. Watch the next pass.');}
   return;
  }
  if(c.kind==='fish'){
   s.cooldown=.42;let nearest=-1,best=34;
   s.items.forEach((f,i)=>{const d=Math.hypot(f.x-s.x,f.y-s.y);if(d<best){nearest=i;best=d;}});
   if(nearest>=0){const f=s.items.splice(nearest,1)[0];point(f.rare?300:100);}else {s.stability-=18;say('Empty scoop — line up with a fish.');if(s.stability<=0)finish(false);}return;
  }
  if(c.kind==='fan'){
   s.cooldown=.3;let count=0;s.items.forEach(p=>{if(Math.abs(p.x-s.x)<100&&p.y>180){const flight=(75+Math.sqrt(75*75+90*Math.max(0,440-p.y)))/45;p.vx=(380-p.x)*.7/(1-Math.exp(-.7*flight));p.vy=-75;count++;}});say(count?'A little wind goes a long way.':'Move beneath a petal first.');return;
  }
  if(c.kind==='gravity'){
   if(s.items.length){say('One orb at a time. Rotate gravity to guide it.');return;}
   s.items.push({x:80,y:420,vx:0,vy:0,r:16,id:0});
  }
 }
 function step(dt){
  if(s.status!=='playing')return;
  // The caller feeds fixed simulation steps. Clamp accidental long calls defensively.
  dt=clamp(dt,0,1/30);s.t+=dt;s.flash=Math.max(0,s.flash-dt);s.cooldown=Math.max(0,s.cooldown-dt);s.invulnerable=Math.max(0,s.invulnerable-dt);
  if(s.axis)s.targetX=clamp(s.targetX+s.axis*280*dt,22,458);
  if(s.vertical)s.targetY=clamp(s.targetY+s.vertical*240*dt,65,485);
  const mix=1-Math.exp(-18*dt);if(c.kind!=='road')s.x+=(s.targetX-s.x)*mix;if(c.kind!=='kite')s.y+=(s.targetY-s.y)*mix;
  if(['strike','sow','dance'].includes(c.kind)){
   const duration=Math.max(1.15,2.3-s.progress*.035);s.phase+=dt/duration;
   if(s.phase>=1){if(!s.acted){if(c.kind==='sow')s.tray=0;miss('The moment passed. Try the next beat.');}s.phase-=1;s.acted=false;s.cycle++;}return;
  }
  if(c.kind==='fish'){
   s.items.forEach(f=>{f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.x<28||f.x>452){f.vx*=-1;f.x=clamp(f.x,28,452);}if(f.y<85||f.y>440)f.vy*=-1;});if(s.t>=60)finish(false);return;
  }
  if(c.kind==='memory'){
   if(s.mode==='watch'&&s.t>=s.showAt+s.sequence.length*.75+.35){s.mode='repeat';say('Your turn — repeat the lights.');}return;
  }
  if(c.kind==='balance'){
   s.wind=Math.sin(s.t*.9)*.31+Math.sin(s.t*2.1)*.13;
   s.balance=clamp(s.balance+(s.wind*(.7+s.load*.45)+s.axis*.95-s.balance*.22)*dt,-1.2,1.2);
   if(Math.abs(s.balance)>.62)s.stability-=35*dt;else s.stability=Math.min(100,s.stability+6*dt);
   s.progress=Math.min(600,s.t*16);s.score=Math.floor(s.progress*10*s.load);
   if(s.stability<=0)finish(false);else if(s.progress>=600)finish(true);return;
  }
  if(c.kind==='road'||c.kind==='kite'){
   const road=c.kind==='road';if(!road){s.y=Math.min(410,s.y+38*dt);s.stability=Math.min(100,s.stability+12*dt);}const speed=(road?140:105)+s.progress*3;
   if(road)s.x+=((s.lane*160+80)-s.x)*(1-Math.exp(-20*dt));
   if(s.t>=s.spawn){s.spawn=s.t+1.45;const lane=Math.floor(random()*3);s.items.push({x:lane*160+80,y:-30,type:'good'});s.items.push({x:((lane+1+Math.floor(random()*2))%3)*160+80,y:-30,type:'bad'});}
   s.items.forEach(o=>{o.y+=speed*dt;if(!o.done&&Math.abs(o.y-(road?410:s.y))<(road?32:25)&&Math.abs(o.x-s.x)<(road?42:35)){
    o.done=true;if(o.type==='good')point();else if(!s.invulnerable){miss('Ouch! Find the clear lane.');s.invulnerable=1.2;}
   }});s.items=s.items.filter(o=>!o.done&&o.y<540);return;
  }
  if(c.kind==='fan'){
   if(s.t>=s.spawn&&s.resolved+s.items.length<16){s.spawn=s.t+1.4;s.items.push({x:55+random()*290,y:50,vx:random()*20-10,vy:25});}
   s.items.forEach(p=>{p.vy+=45*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.exp(-.7*dt);if(p.y>=440){p.done=true;s.resolved++;if(p.x>=330&&p.x<=440){s.score+=100;s.progress++;say('Petal caught.');}else say('Petal drifted past.');}});
   s.items=s.items.filter(p=>!p.done);if(s.resolved===16)finish(s.progress>=8);return;
  }
  if(c.kind==='gravity'){
   if(s.t>=60){finish(false);return;}
   const beacon=[[400,420],[400,80],[80,80],[80,420],[240,250]][s.progress];
   if(beacon&&s.items.some(b=>Math.hypot(b.x-beacon[0],b.y-beacon[1])<32)){point(Math.max(100,Math.round(600-s.t*5)));}
   const vectors=[[0,350],[-350,0],[0,-350],[350,0],[0,0]],g=vectors[s.gravity];
   for(const b of s.items){b.vx+=g[0]*dt;b.vy+=g[1]*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;
    if(b.x<b.r||b.x>480-b.r){b.x=clamp(b.x,b.r,480-b.r);b.vx*=-.78;}if(b.y<b.r||b.y>500-b.r){b.y=clamp(b.y,b.r,500-b.r);b.vy*=-.78;}
   }
   for(let i=0;i<s.items.length;i++)for(let j=i+1;j<s.items.length;j++){
    const a=s.items[i],b=s.items[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),sum=a.r+b.r;
    if(d<sum){const nx=d>0?dx/d:1,ny=d>0?dy/d:0,overlap=(sum-d)/2;a.x-=nx*overlap;a.y-=ny*overlap;b.x+=nx*overlap;b.y+=ny*overlap;const rel=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(rel<0){const impulse=rel*.88;a.vx+=impulse*nx;a.vy+=impulse*ny;b.vx-=impulse*nx;b.vy-=impulse*ny;}}
   }
  }
 }
 return {state:s,config:c,start,input,step};
}
return {configs,create,clamp};
});
