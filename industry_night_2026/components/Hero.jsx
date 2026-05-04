// Hero — astro/blueprint with 3D wireframe planet, glitchy massive type, sticker chips
const Hero = () => {
  const [mouse, setMouse] = React.useState({x:0,y:0});

  React.useEffect(()=>{
    const onMove = (e)=>{
      const cx = window.innerWidth/2;
      const cy = window.innerHeight/2;
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', onMove);
    return ()=>window.removeEventListener('mousemove', onMove);
  },[]);

  const dist = Math.min(1, Math.sqrt(mouse.x**2 + mouse.y**2));
  const shift = mouse.x * 8 * dist;
  const tx = mouse.x * 6;
  const ty = mouse.y * 4;

  return (
    <section id="top" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'140px 24px 80px', overflow:'hidden'
    }}>
      <Planet mouse={mouse}/>

      {/* Crosshair / corner brackets */}
      <CornerBrackets/>

      {/* Top meta strip — blueprint annotations */}
      <div className="hero-meta-top" style={{
        position:'absolute', top:108, left:0, right:0,
        display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        padding:'0 32px', flexWrap:'wrap', gap:16, zIndex:6
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          <span className="blueprint-label">◆ EDITION 01</span>
          <div className="mono">LAT 31.95°S — LONG 115.86°E</div>
          <div className="mono" style={{color:'var(--ink-faint)'}}>OBSERVATION POST · PERTH</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6, textAlign:'right'}}>
          <span className="blueprint-label" style={{borderColor:'var(--c-magenta)', background:'rgba(255,92,182,0.08)', color:'var(--c-magenta)'}}>
            ● TRANSMITTING
          </span>
          <div className="mono">FREQ 26.05.18.1730</div>
          <div className="mono" style={{color:'var(--ink-faint)'}}>SIGNAL ORIGIN · MITSA</div>
        </div>
      </div>

      {/* Floating sticker chips */}
      <Chip x="6%"  y="36%" rot="-6" color="lime"     delay="0">  FREE ENTRY  </Chip>
      <Chip x="80%" y="28%" rot="5"  color="cyan"     delay="0.6">10 PANELISTS</Chip>
      <Chip x="9%"  y="72%" rot="3"  color="magenta"  delay="1.1">RES + IND</Chip>
      <Chip x="78%" y="76%" rot="-4" color="violet"   delay="0.4">18.05.26</Chip>

      {/* Title block */}
      <div style={{
        position:'relative', textAlign:'center', zIndex:7,
        transform:`translate(${tx}px, ${ty}px)`,
        transition:'transform 0.18s cubic-bezier(.2,.8,.2,1)'
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:10,
          padding:'7px 14px',
          background:'rgba(6,9,26,0.6)', backdropFilter:'blur(8px)',
          border:'1px solid var(--c-cyan)',
          fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.32em',
          color:'var(--c-cyan)', textTransform:'uppercase', marginBottom:32, fontWeight:500
        }}>
          ╴╴ MITSA TRANSMITS ╴╴
        </div>

        <GlitchTitle text="INDUSTRY" shift={shift}/>
        <div style={{marginTop:'-0.05em'}}>
          <ItalicTitle text="Night"/>
        </div>

        <p style={{
          maxWidth:580, margin:'40px auto 0',
          fontFamily:'var(--serif)', fontStyle:'italic',
          fontSize:'clamp(18px, 2vw, 26px)', lineHeight:1.45,
          color:'var(--ink-dim)', textWrap:'pretty'
        }}>
          A networking signal where students align trajectories with the
          architects of <U c="var(--c-cyan)">research</U> and the velocity of <U c="var(--c-magenta)">industry</U>.
        </p>

        <div style={{display:'flex', gap:16, justifyContent:'center', marginTop:48, flexWrap:'wrap'}}>
          <a href="#panelists" className="cta-primary" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'18px 28px',
            background:'var(--c-cyan)', color:'var(--bg)',
            fontFamily:'var(--mono)', fontSize:12, letterSpacing:'0.22em',
            textTransform:'uppercase', fontWeight:700,
            border:'1px solid var(--c-cyan)', position:'relative'
          }}>
            <span>MEET PANELISTS</span><span className="cta-arrow">↓</span>
          </a>
          <a href="#connect" className="cta-secondary" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'18px 28px',
            background:'transparent', color:'var(--ink)',
            border:'1px solid var(--line-bright)',
            fontFamily:'var(--mono)', fontSize:12, letterSpacing:'0.22em',
            textTransform:'uppercase', fontWeight:600
          }}>
            ABOUT THE HOST →
          </a>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="hero-meta-bottom" style={{
        position:'absolute', bottom:32, left:0, right:0,
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        padding:'0 32px', flexWrap:'wrap', gap:16, zIndex:6
      }}>
        <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--ink-dim)'}}>
          <ScrollIndicator/>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="mono" style={{marginBottom:6}}>SAVE THE DATE</div>
          <div style={{
            fontFamily:'var(--serif)', fontSize:'clamp(34px, 5vw, 48px)', fontWeight:400,
            color:'var(--ink)', lineHeight:1, letterSpacing:'-0.02em'
          }}>
            18 May <span style={{fontStyle:'italic',
              background:'linear-gradient(95deg, var(--c-cyan), var(--c-magenta))',
              WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent'}}>2026</span>
          </div>
          <div className="mono" style={{marginTop:6}}>17:30 · LOCATION TBA</div>
        </div>
      </div>

      <style>{`
        .cta-primary{transition:all .3s}
        .cta-primary:hover{background:var(--c-magenta); border-color:var(--c-magenta); color:#fff;
          box-shadow:0 0 32px rgba(255,92,182,0.5); transform:translateY(-2px)}
        .cta-primary:hover .cta-arrow{animation:arrowBounce 0.8s ease infinite}
        .cta-secondary{transition:all .3s}
        .cta-secondary:hover{background:var(--c-lime); color:var(--bg); border-color:var(--c-lime); transform:translateY(-2px)}
        @keyframes arrowBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
        @media (max-width:720px){
          .hero-meta-top{position:static !important; padding:0 !important; margin-bottom:48px}
          .hero-meta-bottom{position:static !important; padding:0 !important; margin-top:64px}
        }
      `}</style>
    </section>
  );
};

const U = ({children, c}) => (
  <span style={{
    background:`linear-gradient(transparent 70%, ${c} 70%, ${c} 92%, transparent 92%)`,
    color:'var(--ink)', fontStyle:'italic', fontWeight:500
  }}>{children}</span>
);

const GlitchTitle = ({text, shift=0}) => (
  <h1 style={{
    fontFamily:'var(--sans)', fontWeight:700,
    fontSize:'clamp(64px, 14vw, 220px)', lineHeight:0.86,
    letterSpacing:'-0.05em', color:'var(--ink)',
    margin:0, position:'relative', display:'block'
  }}>
    <span aria-hidden style={{
      position:'absolute', inset:0, color:'#ff5cb6', mixBlendMode:'screen',
      transform:`translate(${shift}px, ${-shift*0.3}px)`, opacity:0.85
    }}>{text}</span>
    <span aria-hidden style={{
      position:'absolute', inset:0, color:'#4cf0ff', mixBlendMode:'screen',
      transform:`translate(${-shift}px, ${shift*0.3}px)`, opacity:0.85
    }}>{text}</span>
    <span style={{position:'relative'}}>{text}</span>
  </h1>
);

const ItalicTitle = ({text}) => (
  <h1 style={{
    fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
    fontSize:'clamp(58px, 13vw, 200px)', lineHeight:0.86,
    letterSpacing:'-0.03em', margin:0,
    background:'linear-gradient(95deg, var(--c-cyan) 0%, var(--c-violet) 40%, var(--c-magenta) 80%, var(--c-orange) 100%)',
    WebkitBackgroundClip:'text', backgroundClip:'text',
    color:'transparent',
    backgroundSize:'200% 100%',
    animation:'gradShift 8s ease-in-out infinite'
  }}>
    {text}
    <style>{`@keyframes gradShift{0%,100%{background-position:0% 0}50%{background-position:100% 0}}`}</style>
  </h1>
);

const Chip = ({children, x, y, rot, color, delay}) => {
  const colors = {
    lime:    {bg:'var(--c-lime)',    fg:'var(--bg)', glow:'rgba(196,255,58,0.5)'},
    cyan:    {bg:'var(--c-cyan)',    fg:'var(--bg)', glow:'rgba(76,240,255,0.5)'},
    magenta: {bg:'var(--c-magenta)', fg:'#fff',      glow:'rgba(255,92,182,0.5)'},
    violet:  {bg:'var(--c-violet)',  fg:'#fff',      glow:'rgba(139,108,255,0.5)'},
  };
  const c = colors[color];
  return (
    <div className="chip" style={{
      position:'absolute', left:x, top:y,
      transform:`rotate(${rot}deg)`,
      padding:'8px 14px',
      background:c.bg, color:c.fg,
      border:'1px solid '+c.fg,
      fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
      textTransform:'uppercase', fontWeight:700,
      boxShadow:`4px 4px 0 0 var(--bg-2), 0 0 24px ${c.glow}`,
      animation:`floatChip 6s ease-in-out infinite ${delay}s`,
      whiteSpace:'nowrap', zIndex:6
    }}>
      {children}
      <style>{`@keyframes floatChip{0%,100%{translate:0 0}50%{translate:0 -10px}} @media(max-width:720px){.chip{display:none}}`}</style>
    </div>
  );
};

const Planet = ({mouse}) => {
  const tx = mouse.x * 14;
  const ty = mouse.y * 10;
  return (
    <div style={{
      position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
      pointerEvents:'none', zIndex:2, perspective:'1500px'
    }}>
      <div style={{
        position:'relative',
        width:'min(80vh, 90vw)', height:'min(80vh, 90vw)',
        transform:`rotateX(${20+ty}deg) rotateY(${tx}deg)`,
        transition:'transform 0.4s cubic-bezier(.2,.8,.2,1)',
        transformStyle:'preserve-3d'
      }}>
        {/* Spinning wireframe planet */}
        <svg viewBox="-100 -100 200 200" style={{
          width:'60%', height:'60%', position:'absolute',
          top:'20%', left:'20%',
          animation:'planetSpin 60s linear infinite',
          filter:'drop-shadow(0 0 32px rgba(76,240,255,0.4))'
        }}>
          <defs>
            <radialGradient id="planetCore">
              <stop offset="0%" stopColor="rgba(76,240,255,0.4)"/>
              <stop offset="60%" stopColor="rgba(91,140,255,0.15)"/>
              <stop offset="100%" stopColor="rgba(91,140,255,0)"/>
            </radialGradient>
          </defs>
          <circle r="90" fill="url(#planetCore)"/>
          <circle r="80" fill="none" stroke="var(--c-cyan)" strokeWidth="0.4" opacity="0.6"/>
          {/* Latitudes */}
          {[-60,-40,-20,0,20,40,60].map(lat=>{
            const ry = Math.cos(lat*Math.PI/180);
            return <ellipse key={lat} cx="0" cy={Math.sin(lat*Math.PI/180)*80} rx="80" ry={Math.abs(ry)*8} fill="none" stroke="var(--c-cyan)" strokeWidth="0.3" opacity={0.3+ry*0.2}/>;
          })}
          {/* Longitudes */}
          {[0,30,60,90,120,150].map(lon=>{
            const rx = Math.sin(lon*Math.PI/180);
            return <ellipse key={lon} cx="0" cy="0" rx={Math.abs(rx)*80} ry="80" fill="none" stroke="var(--c-cyan)" strokeWidth="0.3" opacity={0.4}/>;
          })}
          {/* Surface dots */}
          {Array.from({length:18}).map((_,i)=>{
            const a = (i/18)*Math.PI*2;
            const lat = Math.sin(i*1.7)*0.7;
            const x = Math.cos(a)*80*Math.cos(lat);
            const y = Math.sin(lat)*80;
            return <circle key={i} cx={x} cy={y} r="1.4" fill={i%3===0?'var(--c-magenta)':'var(--c-cyan)'} opacity="0.9"/>;
          })}
        </svg>

        {/* Outer dashed ring */}
        <div style={{
          position:'absolute', inset:0, borderRadius:'50%',
          border:'1px dashed rgba(76,240,255,0.3)',
          animation:'ringSpin 120s linear infinite',
          transform:'rotateX(75deg)'
        }}>
          <div style={{position:'absolute', top:'-5px', left:'50%', width:10, height:10,
            background:'var(--c-magenta)', boxShadow:'0 0 14px var(--c-magenta)', borderRadius:'50%'}}/>
        </div>
        <div style={{
          position:'absolute', inset:'12%', borderRadius:'50%',
          border:'1px solid rgba(255,92,182,0.3)',
          animation:'ringSpin 80s linear infinite reverse',
          transform:'rotateX(70deg) rotateZ(30deg)'
        }}>
          <div style={{position:'absolute', top:'-4px', left:'50%', width:8, height:8,
            background:'var(--c-lime)', boxShadow:'0 0 14px var(--c-lime)', borderRadius:'50%'}}/>
        </div>
      </div>
      <style>{`
        @keyframes planetSpin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}
        @keyframes ringSpin{to{transform:rotateX(75deg) rotateZ(360deg)}}
      `}</style>
    </div>
  );
};

const CornerBrackets = () => {
  const corner = (style) => (
    <div style={{...style, position:'absolute', width:24, height:24,
      borderColor:'var(--c-cyan)', borderStyle:'solid', borderWidth:0, zIndex:3}}/>
  );
  return (
    <>
      {corner({top:80, left:24, borderTop:'1px solid', borderLeft:'1px solid'})}
      {corner({top:80, right:24, borderTop:'1px solid', borderRight:'1px solid'})}
      {corner({bottom:24, left:24, borderBottom:'1px solid', borderLeft:'1px solid'})}
      {corner({bottom:24, right:24, borderBottom:'1px solid', borderRight:'1px solid'})}
    </>
  );
};

const ScrollIndicator = () => (
  <div style={{display:'flex', alignItems:'center', gap:10}}>
    <span style={{color:'var(--c-cyan)'}}>SCROLL</span>
    <div style={{width:1, height:32, background:'linear-gradient(to bottom, var(--c-cyan), transparent)', animation:'scrollPulse 2s ease-in-out infinite'}}/>
    <style>{`@keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}`}</style>
  </div>
);

window.Hero = Hero;
