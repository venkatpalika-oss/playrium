/* Stage geometry shared by the thirteen preserved experience engines. */
(function(){
 const stage=()=>document.getElementById('hero')||document.getElementById('stageWrap');
 window.PlayriumSurface={
  get width(){return stage()?.clientWidth||window.innerWidth;},
  get height(){return stage()?.clientHeight||window.innerHeight;},
  point(e){const r=stage().getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
 };
})();
