(function(){
  const el = document.getElementById('cursor-glow');
  if(el && window.matchMedia('(min-width:721px)').matches){
    let tx=0,ty=0,x=0,y=0;
    window.addEventListener('mousemove', e=>{ tx=e.clientX; ty=e.clientY; });
    function tick(){
      x += (tx-x)*0.14; y += (ty-y)*0.14;
      el.style.left = x+'px'; el.style.top = y+'px';
      requestAnimationFrame(tick);
    }
    tick();
  }
  window.addEventListener('load', ()=>{
    setTimeout(()=>{ const s=document.getElementById('splash'); if(s) s.classList.add('hidden'); }, 400);
  });
})();
