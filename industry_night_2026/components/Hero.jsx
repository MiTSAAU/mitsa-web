// Hero — neo-brutalist with Three.js 3D object behind, countdown timer, bold display type
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

  const tx = mouse.x * 4;
  const ty = mouse.y * 3;

  return (
    <section id="top" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'120px 24px 60px', overflow:'hidden'
    }}>
      <CornerBrackets/>

      {/* Top meta strip */}
      <div className="hero-meta-top" style={{
        position:'absolute', top:96, left:0, right:0,
        display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        padding:'0 32px', flexWrap:'wrap', gap:16, zIndex:6
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          <span className="tape">◆ EDITION 01 / 2026</span>
          <div className="mono" style={{color:'var(--paper-on-night-dim)'}}>LAT 34.93°S · LONG 138.60°E</div>
          <div className="mono" style={{color:'var(--paper-on-night-faint)'}}>OBSERVATION POST · ADELAIDE</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8, textAlign:'right', alignItems:'flex-end'}}>
          <span className="tape signal">● TRANSMITTING</span>
          <div className="mono" style={{color:'var(--paper-on-night-dim)'}}>FREQ 26.05.18 · 17:30</div>
          <div className="mono" style={{color:'var(--paper-on-night-faint)'}}>SIGNAL ORIGIN · MITSA</div>
        </div>
      </div>

      {/* Floating sticker chips */}
      <Chip x="6%"  y="30%" rot="-4" color="signal" delay="0.6">10 PANELISTS</Chip>
      <Chip x="9%"  y="68%" rot="2"  color="warn"   delay="1.1">RES + IND</Chip>
      <Chip x="78%" y="72%" rot="-3" color="bone"   delay="0.4">18.05.26</Chip>

      {/* Title block */}
      <div style={{
        position:'relative', textAlign:'center', zIndex:7,
        transform:`translate(${tx}px, ${ty}px)`,
        transition:'transform 0.18s cubic-bezier(.2,.8,.2,1)',
        maxWidth:1280, width:'100%'
      }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:10,
          padding:'8px 14px',
          background:'var(--night)', border:'1.5px solid var(--paper-on-night)',
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.32em',
          color:'var(--paper-on-night)', textTransform:'uppercase', marginBottom:32, fontWeight:700
        }}>
          ▶ MITSA TRANSMITS
        </div>

        <h1 className="display" style={{
          fontFamily:'var(--display)', fontWeight:400,
          fontSize:'clamp(64px, 16vw, 240px)', lineHeight:0.84,
          letterSpacing:'-0.05em',
          color:'var(--paper-on-night)',
          margin:0,
          textTransform:'uppercase'
        }}>
          INDUSTRY
        </h1>

        <h1 className="display" aria-label="Night" style={{
          fontFamily:'var(--display)', fontWeight:400,
          fontSize:'clamp(64px, 16vw, 240px)', lineHeight:0.84,
          letterSpacing:'-0.05em',
          color:'transparent',
          WebkitTextStroke:'2px var(--acid)',
          margin:0,
          textTransform:'uppercase',
          textShadow:'0 0 24px rgba(197,255,46,0.25)'
        }}>
          NIGHT
        </h1>

        <p style={{
          maxWidth:560, margin:'36px auto 0',
          fontFamily:'var(--sans)', fontWeight:500,
          fontSize:'clamp(15px, 1.4vw, 18px)', lineHeight:1.5,
          color:'var(--paper-on-night-dim)', textWrap:'pretty'
        }}>
          A networking signal where students align trajectories with the
          architects of <U c="var(--signal)">research</U> and the velocity of <U c="var(--acid)">industry</U>.
        </p>

        <div style={{display:'flex', gap:14, justifyContent:'center', marginTop:36, flexWrap:'wrap'}}>
          <a href="#panelists" className="cta-primary" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'16px 24px',
            background:'var(--acid)', color:'var(--night)',
            fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
            textTransform:'uppercase', fontWeight:700,
            border:'1.5px solid var(--acid)', position:'relative'
          }}>
            <span>MEET PANELISTS</span><span className="cta-arrow">↓</span>
          </a>
          <a href="#connect" className="cta-secondary" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'16px 24px',
            background:'transparent', color:'var(--paper-on-night)',
            border:'1.5px solid var(--paper-on-night)',
            fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
            textTransform:'uppercase', fontWeight:700
          }}>
            ABOUT THE HOST →
          </a>
        </div>

        {/* Countdown */}
        <div style={{marginTop:48}}>
          <Countdown/>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="hero-meta-bottom" style={{
        position:'absolute', bottom:24, left:0, right:0,
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        padding:'0 32px', flexWrap:'wrap', gap:16, zIndex:6
      }}>
        <ScrollIndicator/>
        <div style={{textAlign:'right'}}>
          <div className="mono" style={{marginBottom:6, color:'var(--paper-on-night-dim)'}}>SAVE THE DATE</div>
          <div className="display" style={{
            fontSize:'clamp(28px, 4vw, 44px)',
            color:'var(--paper-on-night)', lineHeight:1
          }}>
            18 MAY <span style={{color:'var(--acid)'}}>2026</span>
          </div>
          <div className="mono" style={{marginTop:6, color:'var(--paper-on-night-dim)'}}>17:30 ACDT · LOCATION TBA</div>
        </div>
      </div>

      <style>{`
        .cta-primary{transition:all .25s}
        .cta-primary:hover{background:var(--night); border-color:var(--acid); color:var(--acid);
          box-shadow:6px 6px 0 0 var(--acid); transform:translate(-2px,-2px)}
        .cta-primary:hover .cta-arrow{animation:arrowBounce 0.8s ease infinite}
        .cta-secondary{transition:all .25s}
        .cta-secondary:hover{background:var(--signal); color:var(--bone); border-color:var(--signal);
          box-shadow:6px 6px 0 0 var(--signal); transform:translate(-2px,-2px)}
        @keyframes arrowBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}
        @media (max-width:720px){
          .hero-meta-top{position:static !important; padding:0 !important; margin-bottom:32px}
          .hero-meta-bottom{position:static !important; padding:0 !important; margin-top:48px}
        }
      `}</style>
    </section>
  );
};

const U = ({children, c}) => (
  <span style={{
    background:`linear-gradient(transparent 78%, ${c} 78%, ${c} 96%, transparent 96%)`,
    color:'var(--paper-on-night)', fontWeight:700
  }}>{children}</span>
);

const Chip = ({children, x, y, rot, color, delay}) => {
  const colors = {
    acid:   {bg:'var(--acid)',           fg:'var(--night)', glow:'rgba(197,255,46,0.4)'},
    signal: {bg:'var(--signal)',         fg:'var(--bone)',  glow:'rgba(42,43,255,0.5)'},
    warn:   {bg:'var(--warn)',           fg:'var(--bone)',  glow:'rgba(255,77,23,0.5)'},
    bone:   {bg:'var(--bone)',           fg:'var(--night)', glow:'rgba(236,231,219,0.3)'},
  };
  const c = colors[color];
  return (
    <div className="chip" style={{
      position:'absolute', left:x, top:y,
      transform:`rotate(${rot}deg)`,
      padding:'8px 14px',
      background:c.bg, color:c.fg,
      border:'1.5px solid '+c.fg,
      fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
      textTransform:'uppercase', fontWeight:700,
      boxShadow:`4px 4px 0 0 var(--paper-on-night)`,
      animation:`floatChip 6s ease-in-out infinite ${delay}s`,
      whiteSpace:'nowrap', zIndex:6
    }}>
      {children}
      <style>{`@keyframes floatChip{0%,100%{translate:0 0}50%{translate:0 -10px}} @media(max-width:900px){.chip{display:none}}`}</style>
    </div>
  );
};

const CornerBrackets = () => {
  const corner = (style) => (
    <div style={{...style, position:'absolute', width:24, height:24,
      borderColor:'var(--paper-on-night)', borderStyle:'solid', borderWidth:0, zIndex:3}}/>
  );
  return (
    <>
      {corner({top:80, left:24, borderTop:'2px solid', borderLeft:'2px solid'})}
      {corner({top:80, right:24, borderTop:'2px solid', borderRight:'2px solid'})}
      {corner({bottom:24, left:24, borderBottom:'2px solid', borderLeft:'2px solid'})}
      {corner({bottom:24, right:24, borderBottom:'2px solid', borderRight:'2px solid'})}
    </>
  );
};

const ScrollIndicator = () => (
  <div style={{display:'flex', alignItems:'center', gap:10,
    fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
    textTransform:'uppercase', color:'var(--paper-on-night-dim)'}}>
    <span style={{color:'var(--acid)', fontWeight:700}}>SCROLL</span>
    <div style={{width:1, height:32, background:'linear-gradient(to bottom, var(--acid), transparent)', animation:'scrollPulse 2s ease-in-out infinite'}}/>
    <style>{`@keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}`}</style>
  </div>
);

window.Hero = Hero;
