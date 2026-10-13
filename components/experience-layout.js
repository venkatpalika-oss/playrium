/* Bring existing games and creative studios into the collection's new visual system. */
(function(){
 const stage=document.getElementById('hero')||document.getElementById('stageWrap');
 const intro=document.querySelector('.pr-game-intro'),guide=document.querySelector('.pr-game-guide');
 if(!stage||!intro||!guide)return;
 const slug=document.body.dataset.experience;
 const ideas={
 'gully-cricket':['Read the delivery','Wait for the ball to reach your bat. Try a full over, then replay and compare your shot timing.','Six-ball challenge'],
 'kancha-kings':['Plan the next shot','Aim at the edge of a cluster. Try a gentle shot before increasing the pull-back distance.','Aim & release'],
 'balloon-bazaar':['Build your collection','Pop different balloons and check the almanac. Look for surprises you have not found yet.','Explore at your pace'],
 'spend-crore':['Give your spending a theme','Build a neighbourhood with smaller homes or spend on larger properties. Compare what each choice does to your budget.','Decision sandbox'],
 'hydraulic-press-lab':['Compare two materials','Crush a soft object, then a harder one. Use slow motion to inspect the difference and revisit your crush log.','Experiment freely'],
 'world-size-explorer':['Test your intuition','Place two countries together and compare their areas at the same scale. Try a smaller country before adding a larger one.','Scale & discovery'],
 'moksha-patam':['Follow the board','Roll, follow the ladders, and see where the snakes take you. Read the virtue or vice behind each move.','Traditional board game'],
 'pie-break':['Choose your angle','Pull back from the stone and release toward the ring. Aim for a remaining slice rather than repeating the same throw.','Precision challenge'],
 'seven-stones':['Build from the base','Scatter the stones, then return them one at a time. Keep your next stone close to the target before releasing.','Build against the clock'],
 'stapu':['Remember the skipped square','Land the toss in the target zone, then hop through the squares in order while avoiding the stone.','Timing & sequence'],
 'rangoli-maker':['Start small','Choose one colour and one shape. Add a few marks, change symmetry, then save a pattern you like.','Creative studio'],
 'zen-ripple':['Make a little room','Trace a slow circle through the water. Change the light and watch how the scene responds.','No score. No rush.'],
 'cloud-painter':['Build a sky in layers','Choose a sky, sketch a cloud, then introduce a little weather. Hide the controls to enjoy your composition.','Creative studio']
 };
 const [title,tip,label]=ideas[slug];
 const main=document.createElement('main');main.className='pe-main';intro.before(main);main.append(intro);
 const layout=document.createElement('div');layout.className='pe-layout';main.append(layout);
 const board=document.createElement('section');board.className='pe-board';board.setAttribute('aria-label','Interactive experience');layout.append(board);
 const bar=document.createElement('div');bar.className='pe-board-bar';bar.innerHTML='<span>'+label+'</span><span>PLAYRIUM</span>';board.append(bar,stage);
 if(slug==='rangoli-maker'){const panel=stage.querySelector('.panel');panel.classList.add('pe-rangoli-tools');board.append(panel);}
 const side=document.createElement('aside');side.className='pe-side';layout.append(side);
 const tools=intro.querySelector('.pr-game-tools');side.append(tools,guide);
 const n=document.createElement('section');n.className='pe-tip';const h=document.createElement('h2');h.textContent=title;const p=document.createElement('p');p.textContent=tip;n.append(h,p);side.append(n);
 const note=document.createElement('p');note.className='pe-note';note.textContent='Touch controls · No account needed';side.append(note);
 // Re-run the engine's own geometry setup after moving into its final container.
 requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
 tools.querySelector('.pr-enter')?.addEventListener('click',()=>board.scrollIntoView({block:'start',behavior:'instant'}));
 stage.addEventListener('click',e=>{if(e.target.closest('#startBtn,#playBtn,#playMarbleWrap,#playBalloonWrap'))board.scrollIntoView({block:'start',behavior:'instant'});});
 // Keep keyboard play inside the experience rather than the global previous/next shortcuts.
 stage.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)&&!e.target.closest('button,input,select,a'))e.preventDefault();});
})();
