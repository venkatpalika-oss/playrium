/* Experience-specific briefs and collection navigation. No analytics or network requests. */
(function () {
  'use strict';
  const slug = document.body.dataset.experience;
  const experience = (window.PLAYRIUM_EXPERIENCES || []).find(e => e.slug === slug);
  const stage = document.getElementById('hero') || document.getElementById('stageWrap');
  if (!experience || !stage) return;
  const briefs = {
    'gully-cricket': ['Street sport', 'Time your swing and make every ball count.', 'Tap the play area or press Space to swing. Watch the ball before committing.', 'Finish the over, then use Bowl Again to improve your score.'],
    'matka-mania': ['Balance challenge', 'A steady hand beats a fast one.', 'Use the left and right arrow keys or the game’s pointer controls to balance the pots.', 'Keep the stack steady while the street moves beneath you. Carry Again starts a fresh attempt.'],
    'kancha-kings': ['Precision sport', 'Read the angle. Make the shot.', 'Pull the play marble to begin. Drag back your striker, aim, and release to shoot.', 'Experiment with power and angle to knock marbles out of the circle.'],
    'balloon-bazaar': ['Discovery toy', 'A night market full of little surprises.', 'Pop the start balloon, then tap balloons in the scene. Open the almanac to revisit your discoveries.', 'Explore at your own pace. There is no need to race through the surprises.'],
    'spend-crore': ['Money sandbox', 'A very big budget. Your decisions.', 'Start Spending, choose a category, and buy items within your remaining balance.', 'Watch the balance change and switch to the world view to see your purchases.'],
    'hydraulic-press-lab': ['Physics sandbox', 'Choose an object. Discover its breaking point.', 'Enter the lab, pick an object from the shelf, then hold the press control.', 'Try different materials and inspect the crush log. Use slow motion to study the result.'],
    'world-size-explorer': ['Scale explorer', 'Put the world into perspective.', 'Start Exploring, choose objects from the shelf, and move them onto the comparison board.', 'Compare familiar objects at surprising scales. Reset lets you build a fresh comparison.'],
    'moksha-patam': ['Traditional board game', 'Every climb has a story.', 'Select Roll Dice and watch your piece travel across the board.', 'Reach the end through ladders and snakes. Play again to try a different journey.'],
    'pie-break': ['Aim & release', 'Ten slices. Find your perfect throw.', 'Pull back the stone and release to throw it toward the ring.', 'Clear all ten slices in as few throws as possible.'],
    'seven-stones': ['Against the clock', 'Knock it down. Build it back.', 'Throw the ball to scatter the stack. Drag each stone back into the circle.', 'Rebuild all seven stones before the timer runs out.'],
    'stapu': ['Timing & sequence', 'One careful toss. Eight squares.', 'Throw when the needle reaches the target zone. Tap the squares in order, skipping the stone.', 'Finish the hop through square eight while avoiding fouls.'],
    'rangoli-maker': ['Creative studio', 'One mark becomes a pattern.', 'Choose a color and stamp, then draw on the canvas. Change symmetry to explore new patterns.', 'Create at your own pace and save your finished image.'],
    'daruma-drop': ['Balance & precision', 'Clear the stack. Keep your balance.', 'Drag a block outward to knock it free. Small, controlled movements help the stack stay upright.', 'Remove every block without toppling the Daruma for a Perfect Clear.'],
    'goldfish-scoop': ['Gentle precision', 'Patient hands catch more.', 'Move the paper scoop gently through the water. Lift it out to rest the paper.', 'Catch every fish before the paper tears. Rough movement wears it down faster.'],
    'sensu-spinner': ['Wind & motion', 'Turn a flick into a breeze.', 'Move the fan and flick it to create gusts that guide petals toward the basket.', 'Sixteen petals fall each round. Catch as many as you can and build your streak.'],
    'koinobori-festival': ['Flight challenge', 'Follow the wind. Find your way up.', 'Steer left and right to stay in rising wind columns and avoid bamboo poles.', 'Reach the top of the sky. Leaving the wind makes your koinobori sink.'],
    'sungka-streak': ['Rhythm & timing', 'Wait for the store. Catch the moment.', 'Tap the game area or press Space when the sowing hand reaches the store.', 'Bank 21 shells to win. Three timing misses end the round.'],
    'tinikling-tempo': ['Rhythm challenge', 'Find the beat. Keep your feet clear.', 'Tap the game area or press Space to hop as the bamboo poles clap.', 'Survive 25 claps. Three misses end the dance.'],
    'parol-glow': ['Light & timing', 'Catch an ember. Complete the star.', 'Tap the glowing point when it reaches full brightness.', 'Light all eight points. Early taps and fading embers cost a life.'],
    'jeepney-jam': ['Traffic challenge', 'Pick your lane. Make the route.', 'Tap the left or right side of the game area, or use arrow keys, to change lanes.', 'Collect 20 fares while avoiding traffic. Three crashes end the route.'],
    'zen-ripple': ['Quiet discovery', 'A small place to slow down.', 'Touch or drag across the water. Use the sun control to explore the time of day.', 'No score, no timer. Watch ripples, koi, and flowers respond to your touch.'],
    'gravity-playground': ['Physics studio', 'Build a world. Change its rules.', 'Choose objects from the library. Change the world, gravity strength, or direction.', 'Try a scene, observe the interactions, then undo or reset to experiment again.'],
    'cloud-painter': ['Creative studio', 'Make something that drifts.', 'Choose a sky, select a drawing tool, and paint. Add weather from the right-hand controls.', 'Hide the tools to enjoy your scene, or download your artwork as a PNG.']
  };
  const brief = briefs[slug];
  const title = experience.title.replace(/™/g, '');
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  const intro = el('section', 'pr-game-intro');
  intro.setAttribute('aria-label', 'Experience overview');
  const heading = el('div');
  heading.append(el('p','pr-game-kicker',(experience.country || 'Playrium Originals') + ' / ' + brief[0]), el('p','pr-game-name',title), el('p','pr-game-subtitle',brief[1]));
  const tools = el('div','pr-game-tools');
  const enter = el('button','pr-enter','Play area ↓'); enter.type='button';
  const help = el('button','','How to play'); help.type='button';
  const browse = el('a','','All games'); browse.href='experiences.html';
  tools.append(enter,help,browse); intro.append(heading,tools); stage.before(intro);
  stage.setAttribute('role','region'); stage.setAttribute('aria-label',title+' play area');
  stage.tabIndex=-1;
  const guide = el('section','pr-game-guide');
  guide.setAttribute('aria-label','Game guide');
  ['Controls','Your objective'].forEach((label,i)=>{
    const column=el('div'); const text=el('p','',brief[i+2]);
    if(i===0) text.id='pr-game-controls';
    column.append(el('h2','',label),text); guide.append(column);
  });
  stage.after(guide);
  const overlay=document.getElementById('overlay');
  const marks={
    'daruma-drop':'<rect x="18" y="8" width="28" height="24" rx="11"/><path d="M24 19h4m8 0h4M26 26h12"/><rect x="14" y="37" width="36" height="8" rx="3"/><rect x="11" y="49" width="42" height="8" rx="3"/>',
    'goldfish-scoop':'<path d="M12 32c12-18 26-18 36 0-10 18-24 18-36 0Zm36 0 10-12v24Z"/><circle cx="23" cy="29" r="2"/><path d="M30 19v-7m0 40v-7"/>',
    'sensu-spinner':'<path d="M32 54 5 22Q32-5 59 22ZM32 54 17 14m15 40V9m0 45 15-40M27 57h10"/>',
    'koinobori-festival':'<path d="M10 9v47m0-43h35l13 10-13 10H10m0 8h27l10 7-10 7H10"/><circle cx="19" cy="23" r="3"/><path d="m32 18 5 5-5 5"/>',
    'sungka-streak':'<rect x="5" y="19" width="54" height="27" rx="12"/><circle cx="17" cy="32" r="5"/><circle cx="32" cy="32" r="5"/><circle cx="47" cy="32" r="5"/><path d="M28 8h8m-4-4v8"/>',
    'tinikling-tempo':'<path d="m10 8 20 48M34 8l20 48M14 18l8-3M20 33l8-3M38 18l8-3M44 33l8-3"/><path d="M8 52h12m25-42h12"/>',
    'parol-glow':'<path d="m32 5 8 18 19 2-15 14 5 20-17-11-17 11 5-20L5 25l19-2ZM32 5v43M5 25l44 34m10-34L15 59"/>',
    'jeepney-jam':'<rect x="10" y="13" width="44" height="37" rx="8"/><path d="M17 13V8h30v5M10 34h44M32 14v20M18 50v7m28-7v7M22 45h20"/><circle cx="18" cy="41" r="2"/><circle cx="46" cy="41" r="2"/>'
  };
  if(overlay && marks[slug]){
    const mark=el('div','pr-game-mark');mark.setAttribute('aria-hidden','true');
    mark.innerHTML='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">'+marks[slug]+'</svg>';
    overlay.prepend(mark);
  }
  const dialog=el('dialog','pr-game-help');
  dialog.setAttribute('aria-labelledby','pr-help-title');
  const dialogTitle=el('h2','',title); dialogTitle.id='pr-help-title';
  const close=el('button','','Got it'); close.type='button';
  dialog.append(dialogTitle,el('p','',brief[2]),el('p','',brief[3]),close); document.body.append(dialog);
  help.addEventListener('click',()=>dialog.showModal());
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>help.focus({preventScroll:true}));
  enter.addEventListener('click',()=>{stage.scrollIntoView({block:'start',behavior:'instant'});stage.focus({preventScroll:true});});
  // A toolbar key must not also swing, jump, or steer the game behind it.
  document.addEventListener('keydown',e=>{
    if(!['Space','ArrowLeft','ArrowRight'].includes(e.code)) return;
    if(dialog.open || !stage.contains(e.target) || e.target.closest('button,input,select,a,[role="button"]')) e.stopPropagation();
  },true);
  stage.addEventListener('click',e=>{
    if(e.target.closest('#startBtn,#playBtn,#againBtn,#replayBtn,#restartBtn,#playMarbleWrap,#playBalloonWrap')) {
      queueMicrotask(()=>stage.focus({preventScroll:true}));
    }
  });
  ['playMarbleWrap','playBalloonWrap'].forEach(id=>{
    const control=document.getElementById(id); if(!control)return;
    control.tabIndex=0;control.setAttribute('role','button');control.setAttribute('aria-label','Play '+title);
    control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();control.click();}});
  });
  // Existing game code attaches to these controls; only improve their semantics.
  stage.querySelectorAll('button[title]').forEach(button=>{
    if(!button.hasAttribute('aria-label')) button.setAttribute('aria-label',/mute|sound/i.test(button.title)?'Toggle sound':button.title);
  });
  const time=document.getElementById('timeBtn');
  if(time && time.tagName==='DIV') {
    time.tabIndex=0; time.setAttribute('role','button');
    time.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();time.click();}
    });
  }
  stage.querySelectorAll('canvas').forEach(canvas=>{
    if(!canvas.hasAttribute('aria-label')) canvas.setAttribute('aria-label',title+' scene');
  });
})();
