// Reactive starfield with mouse parallax
(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio||1, 2);
  let W=0, H=0;
  let stars = [], shooters = [];
  let mx = 0, my = 0;
  let scrollY = 0;

  function resize(){
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width = W*dpr; canvas.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function makeStars(){
    const total = Math.floor((W*H)/2200);
    stars = [];
    for(let i=0;i<total;i++){
      const depth = Math.random();
      stars.push({
        x: Math.random()*W,
        y: Math.random()*H*3,
        z: depth,
        r: 0.3 + depth*1.6,
        a: 0.25 + Math.random()*0.7,
        tw: Math.random()*Math.PI*2,
        tws: 0.4 + Math.random()*1.4,
        hue: Math.random() < 0.07 ? 'cyan' : (Math.random() < 0.12 ? 'magenta' : (Math.random() < 0.06 ? 'lime' : 'white'))
      });
    }
  }

  function spawnShooter(){
    const startX = Math.random()*W;
    const startY = Math.random()*H*0.4 - 40;
    shooters.push({
      x:startX, y:startY,
      vx:(Math.random()*1.5+1.2)*(Math.random()<0.5?-1:1),
      vy:1.6+Math.random()*1.4,
      life:0, maxLife:60+Math.random()*40,
      len:80+Math.random()*100,
      color: Math.random()<0.5 ? 'rgba(76,240,255,' : 'rgba(255,255,255,'
    });
  }

  let last = performance.now();
  function tick(t){
    const dt = Math.min(64, t-last); last = t;
    ctx.clearRect(0,0,W,H);

    for(const s of stars){
      const py = s.y - scrollY*(0.06 + s.z*0.4);
      const px = s.x + mx*(s.z*22);
      const yy = ((py % (H*1.2)) + H*1.2) % (H*1.2) - H*0.1;
      s.tw += dt*0.001*s.tws;
      const tw = (Math.sin(s.tw)*0.5+0.5);
      const alpha = s.a * (0.5 + tw*0.5);

      let color;
      if(s.hue === 'cyan')        color = `rgba(76,240,255,${alpha})`;
      else if(s.hue === 'magenta')color = `rgba(255,92,182,${alpha*0.9})`;
      else if(s.hue === 'lime')   color = `rgba(196,255,58,${alpha*0.85})`;
      else                        color = `rgba(234,242,255,${alpha})`;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(px, yy, s.r, 0, Math.PI*2);
      ctx.fill();

      if(s.z > 0.85 && tw > 0.85){
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(px-s.r*5, yy); ctx.lineTo(px+s.r*5, yy);
        ctx.moveTo(px, yy-s.r*5); ctx.lineTo(px, yy+s.r*5);
        ctx.stroke();
      }
    }

    if(Math.random() < 0.005) spawnShooter();
    for(let i=shooters.length-1;i>=0;i--){
      const sh = shooters[i];
      sh.x += sh.vx*dt*0.06;
      sh.y += sh.vy*dt*0.06;
      sh.life += dt*0.06;
      const lifeRatio = sh.life/sh.maxLife;
      const alpha = Math.max(0, 1-lifeRatio);
      const tailX = sh.x - sh.vx*sh.len*0.5;
      const tailY = sh.y - sh.vy*sh.len*0.5;
      const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
      grad.addColorStop(0, sh.color+alpha+')');
      grad.addColorStop(1, sh.color+'0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y); ctx.lineTo(tailX, tailY);
      ctx.stroke();
      if(sh.life > sh.maxLife || sh.x < -100 || sh.x > W+100 || sh.y > H+100){
        shooters.splice(i,1);
      }
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', ()=>{ resize(); makeStars(); });
  window.addEventListener('mousemove', e=>{
    mx = (e.clientX/window.innerWidth - 0.5);
    my = (e.clientY/window.innerHeight - 0.5);
  });
  window.addEventListener('scroll', ()=>{ scrollY = window.scrollY; }, {passive:true});

  resize(); makeStars();
  requestAnimationFrame(tick);
})();
