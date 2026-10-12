(function(){
'use strict';
const slug=document.body.dataset.experience,{configs,create,clamp}=PlayriumRebuild,c=configs[slug];
let game=create(slug),paused=false,last=0,acc=0,held=new Set(),best=0,lastStatus='ready';
const $=id=>document.getElementById(id),canvas=$('rb-canvas'),ctx=canvas.getContext('2d'),cover=$('rb-cover');
const store='playrium.rebuild.v1.'+slug;
try{best=Number(localStorage.getItem(store))||0;}catch{}
$('rb-best').textContent=best;document.documentElement.style.setProperty('--accent',c.accent);
$('rb-intro').textContent=c.intro;$('rb-instructions').textContent=c.controls;$('rb-objective').textContent=c.intro;
const moving=['fish','fan','kite','balance','road'].includes(c.kind);
const controls=$('rb-controls');controls.dataset.kind=c.kind;
function button(text,fn,label){const b=document.createElement('button');b.type='button';b.textContent=text;if(label)b.setAttribute('aria-label',label);if(fn)b.addEventListener('click',fn);controls.append(b);return b;}
function hold(text,axis){const b=button(text,null,axis<0?'Move left':'Move right');const stop=()=>{held.delete(b);syncAxis();};b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);held.add(b);b.dataset.axis=axis;syncAxis();if(c.kind==='road'&&!paused)game.input('lane',axis);});['pointerup','pointercancel','lostpointercapture'].forEach(e=>b.addEventListener(e,stop));b.addEventListener('click',e=>{if(e.detail===0&&!paused){if(c.kind==='road')game.input('lane',axis);else if(c.kind==='balance'){game.state.balance=clamp(game.state.balance+axis*.12,-1.2,1.2);}else game.input('aim',{x:game.state.targetX+axis*30,y:game.state.targetY});}});}
if(moving){hold('←',-1);hold('→',1);}
if(c.kind==='fish'){
 for(const [text,value] of [['↑',-1],['↓',1]]){const b=button(text,null,value<0?'Move up':'Move down');const end=()=>{held.delete(b);syncAxis();};b.addEventListener('pointerdown',e=>{b.setPointerCapture(e.pointerId);b.dataset.vertical=value;held.add(b);syncAxis();});['pointerup','pointercancel','lostpointercapture'].forEach(e=>b.addEventListener(e,end));b.addEventListener('click',e=>{if(e.detail===0)game.input('aim',{x:game.state.targetX,y:game.state.targetY+value*30});});}
}
if(c.action){const b=button(c.action,()=>{if(!paused)game.input('action');});b.className='rb-primary';b.id='rb-action';}
if(c.kind==='dance')button('Hop right',()=>{if(!paused)game.input('action',1);});
if(c.kind==='strike')for(let i=0;i<6;i++){const b=button(String(i+1),()=>{if(!paused)game.input('block',i);},'Select block '+(i+1));b.dataset.block=i;}
if(c.kind==='fish')button('Rest +30%',()=>{if(!paused)game.input('rest');});
if(c.kind==='sow')button('Bank stash',()=>{if(!paused)game.input('bank');});
if(c.kind==='balance'){$('rb-settings').innerHTML='<label for="rb-load">Cargo for next run</label><select id="rb-load"><option value="1">1 pot · calm · 1× score</option><option value="2">2 pots · lively · 2× score</option><option value="3">3 pots · wild · 3× score</option></select>'; }
if(c.kind==='memory')for(let i=0;i<5;i++){const b=button(String(i+1),()=>{if(!paused)game.input('memory',i);},'Lantern point '+(i+1));b.dataset.point=i;}
if(c.kind==='gravity'){button('Gravity',()=>{if(!paused)game.input('gravity');});button('Reset orb',()=>{if(!paused)game.input('clear');});}
function syncAxis(){game.state.axis=0;game.state.vertical=0;for(const key of held){if(typeof key==='string'){if(key==='ArrowLeft')game.state.axis--;if(key==='ArrowRight')game.state.axis++;if(key==='ArrowUp')game.state.vertical--;if(key==='ArrowDown')game.state.vertical++;}else{game.state.axis+=Number(key.dataset.axis)||0;game.state.vertical+=Number(key.dataset.vertical)||0;}}game.state.axis=clamp(game.state.axis,-1,1);game.state.vertical=clamp(game.state.vertical,-1,1);}
function clearInput(){held.clear();syncAxis();}
function start(){game=create(slug);if(c.kind==='balance')game.state.load=Number($('rb-load').value);game.start();paused=false;acc=0;last=0;lastStatus='playing';cover.hidden=true;$('rb-pause').textContent='Pause';clearInput();canvas.closest('.rb-board').scrollIntoView({block:'start',behavior:'instant'});canvas.focus({preventScroll:true});}
$('rb-start').addEventListener('click',()=>{if(paused){paused=false;cover.hidden=true;last=0;$('rb-pause').textContent='Pause';canvas.focus({preventScroll:true});}else start();});
$('rb-restart').addEventListener('click',start);
function pause(){if(game.state.status!=='playing'||paused)return;paused=true;clearInput();cover.hidden=false;$('rb-cover-title').textContent='Take your time';$('rb-intro').textContent='Your round is paused. Resume when you are ready.';$('rb-start').textContent='Resume';$('rb-pause').textContent='Resume';}
$('rb-pause').addEventListener('click',()=>{if(paused)$('rb-start').click();else {pause();$('rb-start').focus({preventScroll:true});}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('blur',pause);
const dialog=$('rb-help');$('rb-how').addEventListener('click',()=>{pause();dialog.showModal();});$('rb-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>$('rb-how').focus());
canvas.addEventListener('keydown',e=>{if(['Space','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();if(paused||game.state.status!=='playing')return;if(e.code.startsWith('Arrow')){held.add(e.code);syncAxis();if(!e.repeat&&c.kind==='road'&&['ArrowLeft','ArrowRight'].includes(e.code))game.input('lane',e.code==='ArrowLeft'?-1:1);}if(e.code==='Space'&&!e.repeat&&c.kind!=='dance')game.input('action');if(c.kind==='dance'&&!e.repeat&&['KeyJ','KeyK'].includes(e.code))game.input('action',e.code==='KeyJ'?0:1);if(/^[1-5]$/.test(e.key)&&!e.repeat)game.input('memory',Number(e.key)-1);if(e.code==='KeyP')pause();});
window.addEventListener('keyup',e=>{held.delete(e.code);syncAxis();});canvas.addEventListener('blur',clearInput);
function position(e){const r=canvas.getBoundingClientRect();const scale=Math.min(r.width/480,r.height/500);return{x:(e.clientX-r.left-(r.width-480*scale)/2)/scale,y:(e.clientY-r.top-(r.height-500*scale)/2)/scale};}
let pointer=false;
canvas.addEventListener('pointerdown',e=>{if(paused)return;pointer=true;canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});const p=position(e);game.input('aim',p);if(c.kind==='memory'){for(let i=0;i<5;i++){const q=starPoint(i);if(Math.hypot(p.x-q.x,p.y-q.y)<38)game.input('memory',i);}}});
canvas.addEventListener('pointermove',e=>{if(!paused&&(pointer||e.pointerType==='mouse'))game.input('aim',position(e));});['pointerup','pointercancel','lostpointercapture'].forEach(name=>canvas.addEventListener(name,()=>{pointer=false;}));
function resize(){const d=Math.min(devicePixelRatio||1,2);canvas.width=480*d;canvas.height=500*d;ctx.setTransform(d,0,0,d,0,0);}resize();window.addEventListener('resize',resize);
function rect(x,y,w,h,color,r=12){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function circle(x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
function line(x,y,x2,y2,color,width=2){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();}
function text(value,x,y,size=16,color='#d8e8e7',align='center'){ctx.fillStyle=color;ctx.font=`600 ${size}px system-ui`;ctx.textAlign=align;ctx.fillText(value,x,y);}
function fish(x,y,color,dir=1,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(dir*scale,scale);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,0,20,11,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(-15,0);ctx.lineTo(-31,-12);ctx.lineTo(-31,12);ctx.closePath();ctx.fill();circle(11,-3,3,'#172a36');ctx.restore();}
function starPoint(i){const a=-Math.PI/2+i*Math.PI*2/5;return{x:240+Math.cos(a)*145,y:250+Math.sin(a)*145};}
function meter(s){const x=48,y=446,w=384;rect(x,y,w,14,'#40515b',7);const b=s.blocks.find(b=>b.id===s.selectedBlock);const win=c.kind==='strike'?(b?.width||.12):c.kind==='sow'?Math.max(.065,.14-s.tray*.008):.14;const target=c.kind==='strike'?(b?.target||.74):.74;rect(x+w*(target-win),y,w*win*2,14,'#a4e4bf',7);circle(x+w*s.phase,y+7,10,s.acted?'#81929b':'#fff2c9');text(s.acted?'Wait for the next pass':'Act inside the mint band',240,425,13);}
function draw(){const s=game.state;ctx.clearRect(0,0,480,500);const grad=ctx.createLinearGradient(0,0,0,500);const palette={strike:['#482c3c','#1d2631'],fish:['#174c5a','#102d3b'],fan:['#473449','#1d283a'],kite:['#335c69','#182e45'],sow:['#44392d','#1c3030'],dance:['#374e3e','#172b31'],memory:['#343454','#171f34'],road:['#353745','#182634'],balance:['#574537','#272e36'],gravity:['#252c4c','#111f33']}[c.kind];grad.addColorStop(0,palette[0]);grad.addColorStop(1,palette[1]);ctx.fillStyle=grad;ctx.fillRect(0,0,480,500);
 for(let i=0;i<7;i++){line(0,i*80,480,i*80,'#ffffff05');}
 if(['strike','sow','dance','fan'].includes(c.kind)){
  line(0,56,480,56,'#e0cda226',1);for(const x of [32,448]){line(x,0,x,68,'#d7c6a733');circle(x,85,23,'#e6bc8a0b');rect(x-10,67,20,29,'#cda57730',8);line(x,98,x,114,'#cda57755');}
 }
 if(['memory','gravity'].includes(c.kind))for(let i=0;i<35;i++){const x=(i*137+17)%480,y=(i*83+11)%500;circle(x,y,i%3===0?1.6:.8,'#d3d9ed55');}
 if(c.kind==='fish'){for(let i=0;i<6;i++){const x=i%2?455:15,y=65+i*75;circle(x,y,22,'#669e8628');line(x,y,x+13,y-11,'#a8cb9f33');}for(let i=0;i<10;i++){const x=(i*103+21)%480,y=(i*97+30)%500;circle(x,y,2,'#c0e6db33');}}

 if(c.kind==='strike'){
  circle(240,220,153,'#f77e7308');ctx.strokeStyle='#e8b29820';ctx.lineWidth=2;ctx.beginPath();ctx.arc(240,220,145,Math.PI,Math.PI*2);ctx.stroke();rect(65,392,350,8,'#d7b39020',3);rect(90,381,300,12,'#637177',4);
  const left=6-s.progress,base=377;for(let i=0;i<left;i++){rect(172,base-(i+1)*36,136,31,s.blocks[i]?.id===s.selectedBlock?'#a4e4bf':s.blocks[i]?.id%2?'#dcaf76':'#879fa5',8);text((s.blocks[i]?.id??i)+1,240,base-(i+1)*36+21,15,'#203540');line(181,base-(i+1)*36+24,298,base-(i+1)*36+24,'#0002');}
  const y=base-left*36-36;circle(240,y,36,'#e47769');rect(213,y-17,54,31,'#f9e6c5',14);circle(227,y-4,4,'#24343c');circle(251,y-4,4,'#24343c');line(228,y+8,250,y+8,'#b45046',3);
  rect(65+(s.flash>0&&s.acted?45:0),332,45,32,'#e6c48f',7);line(83,363,83,391,'#b0845a',9);text(`${left} blocks · select your next strike`,240,40,14);meter(s);controls.querySelectorAll('[data-block]').forEach(b=>{b.disabled=!s.blocks.some(x=>x.id===Number(b.dataset.block));b.setAttribute('aria-pressed',String(Number(b.dataset.block)===s.selectedBlock));});
 }else if(c.kind==='fish'){
  for(let i=0;i<5;i++){ctx.strokeStyle='#69cce51a';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(240,80+i*85,180,18,0,0,7);ctx.stroke();}
  s.items.forEach(f=>fish(f.x,f.y,f.rare?'#f7d374':'#f88c7c',Math.sign(f.vx)));line(s.x,s.y+32,s.x+30,s.y+95,'#d4b993',7);circle(s.x,s.y,33,s.cooldown?'#c2f5da55':'#bde1db22');ctx.strokeStyle='#d5e6c1';ctx.lineWidth=3;ctx.beginPath();ctx.arc(s.x,s.y,33,0,7);ctx.stroke();text(`Paper ${Math.max(0,s.stability)}% · ${Math.max(0,Math.ceil(60-s.t))}s · ${s.rests} rests`,240,35,14);
 }else if(c.kind==='sow'){
  rect(24,150,432,170,'#b28b62',65);for(let i=0;i<6;i++){circle(68+i*68,190,23,'#594a3c');circle(68+i*68,278,23,'#594a3c');}rect(303,209,94,50,'#b1e8c2',24);text('STORE',350,240,12,'#273e36');const x=48+384*s.phase;circle(x,228,13,'#fff1d0');text(`${s.progress} / 21 secured`,240,75,18);text(`${s.tray} at risk · ${1+Math.floor(s.tray/3)}× bank bonus`,240,110,15,c.accent);meter(s);
 }else if(c.kind==='dance'){
  const gap=15+Math.abs(s.phase-.74)*200;rect(45,270-gap,390,18,'#b8cf89',6);rect(45,295+gap,390,18,'#b8cf89',6);for(let i=0;i<6;i++){line(75+i*65,270-gap,75+i*65,288-gap,'#67794d',3);line(75+i*65,295+gap,75+i*65,313+gap,'#67794d',3);}
  const hop=s.hopUntil>s.t?Math.sin((s.hopUntil-s.t)/.4*Math.PI)*65:0;circle(221,290-hop,15,'#f8d6b0');circle(259,290-hop,15,'#f8d6b0');text(`${s.progress} clean claps`,240,70,22);text(`NEXT FOOT: ${s.progress%2?'RIGHT →':'← LEFT'}`,240,105,18,c.accent);meter(s);
 }else if(c.kind==='memory'){
  let lit=-1;if(s.mode==='watch'){const elapsed=s.t-s.showAt,index=Math.floor(elapsed/.75);if(elapsed>=0&&index<s.sequence.length&&elapsed% .75<.48)lit=s.sequence[index];}else if(s.selectedUntil>s.t)lit=s.selected;
  for(let i=0;i<5;i++){const a=starPoint(i),b=starPoint((i+2)%5);line(a.x,a.y,b.x,b.y,'#bcaa6944',3);circle(a.x,a.y,lit===i?40:32,lit===i?'#ffe9a4':'#52616a');text(i+1,a.x,a.y+7,22,lit===i?'#293039':'#fff');}text(s.mode==='watch'?'WATCH THE LIGHTS':`YOUR TURN · ${s.index+1} / ${s.round}`,240,40,14);text(`Sequence ${s.round} of 8`,240,460,15);
  controls.querySelectorAll('[data-point]').forEach(b=>{b.disabled=s.mode!=='repeat'||s.status!=='playing';});
 }else if(c.kind==='road'){
  rect(30,0,420,500,'#263640',0);for(let x of [160,320])for(let y=-60;y<500;y+=90)rect(x-2,(y+s.t*140%90),4,45,'#78868c',2);
  s.items.forEach(o=>{if(o.type==='good'){circle(o.x,o.y,16,'#f4d37d');text('₱',o.x,o.y+6,17,'#473e25');}else{rect(o.x-29,o.y-38,58,76,'#dc8177',9);rect(o.x-23,o.y-21,46,18,'#334954',4);}});
  rect(s.x-29,371,58,80,s.invulnerable?'#faf4d0':c.accent,10);rect(s.x-23,386,46,22,'#355666',5);rect(s.x-36,388,7,17,'#bfd1d6',2);rect(s.x+29,388,7,17,'#bfd1d6',2);text('PLAY',s.x,438,10,'#46382b');
 }else if(c.kind==='kite'){
  for(let i=0;i<4;i++){const y=(i*150+s.t*50)%600-50;rect(i%2?280:25,y,150,28,'#e6eee615',20);}
  s.items.forEach(o=>{if(o.type==='good'){ctx.strokeStyle='#c6efd1';ctx.lineWidth=5;ctx.beginPath();ctx.arc(o.x,o.y,24,0,7);ctx.stroke();}else{rect(o.x-37,o.y-12,74,24,'#9ab583',4);line(o.x-12,o.y-12,o.x-12,o.y+12,'#597355',3);}});
  fish(s.x,s.y,s.invulnerable?'#fff1db':c.accent,1,1.5);for(let i=0;i<3;i++)line(s.x-38,s.y-3+i*6,s.x-68,s.y-10+i*10,'#cbe5db',2);text(`WIND ENERGY ${Math.round(s.stability)}%`,240,35,12);
 }else if(c.kind==='fan'){
  s.items.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.y*.025);ctx.fillStyle='#e6afd5';ctx.beginPath();ctx.ellipse(0,0,9,16,0,0,7);ctx.fill();ctx.restore();});rect(330,442,110,32,'#c4a67b',8);for(let x=340;x<440;x+=14)line(x,446,x,470,'#8c7555',2);
  ctx.fillStyle=c.accent;ctx.beginPath();ctx.moveTo(s.x,470);ctx.arc(s.x,470,65,Math.PI*1.15,Math.PI*1.85);ctx.closePath();ctx.fill();for(let i=0;i<5;i++)line(s.x,470,s.x+Math.cos(Math.PI*(1.15+i*.175))*62,470+Math.sin(Math.PI*(1.15+i*.175))*62,'#795d79',2);if(s.cooldown)for(let i=0;i<3;i++)line(s.x-25+i*25,380,s.x-15+i*25,340,'#def1ed',2);text(`${s.resolved} / 16 petals landed · catch 8 to clear`,240,32,13);
 }else if(c.kind==='balance'){
  for(let i=0;i<7;i++){const x=(i*90-s.t*40)%630;rect(x,280,65,105,'#3c4b4d',5);rect(x-5,268,75,20,i%2?'#7c7361':'#735b61',4);}rect(0,397,480,103,'#9a826033',0);ctx.save();ctx.translate(240,290);ctx.rotate(s.balance*.45);line(0,20,0,80,'#c6cabd',16);circle(0,0,19,'#ecc5a0');for(let i=0;i<s.load;i++){ctx.fillStyle=['#dfad84','#c99571','#b88064'][i];ctx.beginPath();ctx.ellipse(0,-37-i*35,27-i*3,21,0,0,7);ctx.fill();rect(-18+i*2,-63-i*35,36-i*4,8,'#e8bc95',3);}ctx.restore();line(236,365,216,395,'#c6cabd',10);line(246,365,262,395,'#c6cabd',10);
  rect(48,440,384,14,'#695d5b',7);rect(121,440,238,14,'#8abc9e',7);circle(240+s.balance*160,447,10,'#fff0cc');text(`Stability ${Math.round(s.stability)}%`,240,40,17);text(s.wind>0?'Wind →':'← Wind',240,68,13);
 }else if(c.kind==='gravity'){
  for(let x=24;x<480;x+=32)for(let y=20;y<500;y+=32)circle(x,y,1,'#b5c7dd25');s.items.forEach(b=>{circle(b.x,b.y,b.r+7,'#a7b6fa18');circle(b.x,b.y,b.r,['#a7b6fa','#f1b59e','#a5dfc2','#e4c875','#d6b0e5'][b.id]);circle(b.x-b.r*.3,b.y-b.r*.3,b.r*.25,'#ffffff66');});line(s.targetX-9,s.targetY,s.targetX+9,s.targetY,'#e2e5ef66');line(s.targetX,s.targetY-9,s.targetX,s.targetY+9,'#e2e5ef66');text(['DOWN ↓','LEFT ←','UP ↑','RIGHT →','ZERO ·'][s.gravity],240,35,14);const beacons=[[400,420],[400,80],[80,80],[80,420],[240,250]];beacons.forEach((p,i)=>{circle(p[0],p[1],i===s.progress?29:18,i<s.progress?'#8ddcb7':i===s.progress?'#e5d594':'#425967');text(i+1,p[0],p[1]+5,14,'#19353d');});text(`${Math.max(0,Math.ceil(60-s.t))}s · light beacon ${Math.min(5,s.progress+1)}`,240,475,12);
 }
}
function update(){const s=game.state;$('rb-score').textContent=s.score;$('rb-progress').textContent=c.goal?`${Math.floor(s.progress)} / ${c.goal}`:s.items.length+' balls';$('rb-lives').textContent=['fish','balance'].includes(c.kind)?Math.max(0,Math.round(s.stability))+'%':c.kind==='gravity'?Math.max(0,Math.ceil(60-s.t))+'s':c.kind==='fan'?`${16-s.resolved} left`:'♥'.repeat(Math.max(0,s.lives))||'—';$('rb-bar').style.width=c.goal?Math.min(100,s.progress/c.goal*100)+'%':'0%';$('rb-feedback').textContent=s.feedback;
 if(s.status!==lastStatus){lastStatus=s.status;if(['won','lost'].includes(s.status)){
  if(s.score>best){best=s.score;try{localStorage.setItem(store,String(best));}catch{}$('rb-best').textContent=best;}
  clearInput();cover.hidden=false;$('rb-cover-title').textContent=s.status==='won'?'A lovely finish':'One more try?';$('rb-intro').textContent=`Score ${s.score} · Best ${best}. ${s.status==='won'?'Try again for cleaner timing.':c.intro}`;$('rb-start').textContent='Play again';$('rb-start').focus({preventScroll:true});
 }}
}
function frame(now){if(!last)last=now;const dt=Math.min((now-last)/1000,.05);last=now;if(!paused&&!document.hidden){acc+=dt;while(acc>=1/120){game.step(1/120);acc-=1/120;}}else acc=0;draw();update();requestAnimationFrame(frame);}requestAnimationFrame(frame);
})();
