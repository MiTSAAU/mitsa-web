// About MiTSA — astro emblem + brutalist link cards with 3D tilt
const About = () => {
  return (
    <section id="about" className="section-pad" style={{position:'relative'}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:64, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
        textTransform:'uppercase', color:'var(--ink-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="blueprint-label" style={{borderColor:'var(--c-lime)', background:'rgba(196,255,58,0.08)', color:'var(--c-lime)'}}>§ 03 — THE HOST</span></span>
        <span style={{color:'var(--ink-faint)'}}>MITSA · UWA</span>
      </div>

      <div className="about-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:96, alignItems:'start'}}>
        <div className="about-emblem-col" style={{position:'sticky', top:120}}>
          <Emblem/>
          <div style={{marginTop:32}}>
            <h3 style={{
              fontFamily:'var(--sans)', fontWeight:700,
              fontSize:'clamp(36px, 4.6vw, 64px)', lineHeight:0.95,
              letterSpacing:'-0.03em',
              color:'var(--ink)', textWrap:'pretty'
            }}>
              Master's in<br/>
              <span style={{
                fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
                background:'linear-gradient(95deg, var(--c-cyan), var(--c-violet), var(--c-magenta))',
                WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent'
              }}>Technology</span><br/>
              Student Association
            </h3>
            <div style={{
              fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
              color:'var(--ink-dim)', textTransform:'uppercase', marginTop:16, fontWeight:500
            }}>
              MiTSA · The University of Western Australia
            </div>
          </div>
        </div>

        <div>
          <p style={{
            fontFamily:'var(--serif)',
            fontSize:'clamp(22px, 2.6vw, 32px)', lineHeight:1.4,
            color:'var(--ink)', textWrap:'pretty', marginBottom:32, letterSpacing:'-0.01em'
          }}>
            MiTSA is the student-run hub for UWA's Master's in Technology cohort —
            a community of engineers, scientists, and founders-in-formation
            charting the distance between the lecture hall and the working world.
          </p>
          <p style={{
            fontFamily:'var(--serif)', fontStyle:'italic',
            fontSize:18, lineHeight:1.6, color:'var(--ink-dim)',
            textWrap:'pretty', maxWidth:620, marginBottom:64
          }}>
            We host the gatherings where the noise of academia and the noise of
            industry briefly synchronise. <span style={{color:'var(--c-cyan)', fontWeight:600, fontStyle:'normal'}}>Industry Night</span> is the loudest of them.
          </p>

          <Transmissions/>
        </div>
      </div>

      <style>{`
        @media (max-width:900px){
          .about-grid{grid-template-columns:1fr !important; gap:48px !important}
          .about-emblem-col{position:static !important}
        }
      `}</style>
    </section>
  );
};

const Emblem = () => (
  <div style={{position:'relative', width:300, height:300, maxWidth:'100%'}}>
    <svg viewBox="0 0 300 300" style={{width:'100%', height:'100%'}}>
      <defs>
        <linearGradient id="emblemFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4cf0ff"/>
          <stop offset="50%" stopColor="#8b6cff"/>
          <stop offset="100%" stopColor="#ff5cb6"/>
        </linearGradient>
        <radialGradient id="emblemBg">
          <stop offset="0%" stopColor="rgba(76,240,255,0.4)"/>
          <stop offset="100%" stopColor="rgba(76,240,255,0)"/>
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="140" fill="url(#emblemBg)"/>
      <circle cx="150" cy="150" r="130" fill="none" stroke="var(--c-cyan)" strokeWidth="1"/>
      <path id="emblemArc" d="M 30 150 A 120 120 0 1 1 270 150 A 120 120 0 1 1 30 150" fill="none"/>
      <text fontFamily="JetBrains Mono" fontSize="9" letterSpacing="6" fill="var(--c-cyan)" fontWeight="500">
        <textPath href="#emblemArc" startOffset="0">
          MiTSA · MASTER'S IN TECHNOLOGY · STUDENT ASSOCIATION · UWA · MiTSA · MASTER'S IN TECHNOLOGY · STUDENT ASSOCIATION · UWA · 
        </textPath>
      </text>

      <circle cx="150" cy="150" r="100" fill="none" stroke="var(--line-bright)" strokeWidth="0.8" strokeDasharray="3 5"/>
      <circle cx="150" cy="150" r="70" fill="none" stroke="url(#emblemFill)" strokeWidth="2"/>

      <text x="150" y="172" textAnchor="middle"
        fontFamily="Instrument Serif" fontSize="78" fontStyle="italic" fontWeight="400"
        fill="url(#emblemFill)">M</text>

      <g style={{transformOrigin:'150px 150px', animation:'spin 18s linear infinite'}}>
        <circle cx="150" cy="50" r="6" fill="var(--c-magenta)"/>
        <circle cx="150" cy="50" r="11" fill="none" stroke="var(--c-magenta)" opacity="0.4" strokeWidth="0.8"/>
      </g>
      <g style={{transformOrigin:'150px 150px', animation:'spin 28s linear infinite reverse'}}>
        <circle cx="220" cy="150" r="4" fill="var(--c-lime)"/>
      </g>
      <g style={{transformOrigin:'150px 150px', animation:'spin 38s linear infinite'}}>
        <circle cx="150" cy="240" r="3" fill="var(--c-cyan)"/>
      </g>
    </svg>
  </div>
);

const Transmissions = () => {
  const items = [
    { num:'01', label:'INSTAGRAM', value:'@mastersintechnology', href:'https://www.instagram.com/mastersintechnology/', color:'var(--c-magenta)' },
    { num:'02', label:'WEBSITE',   value:'mitsa.tech',           href:'https://www.mitsa.tech/',                       color:'var(--c-cyan)' },
    { num:'03', label:'EMAIL',     value:'mitsa@clubs.youx.org.au', href:'mailto:mitsa@clubs.youx.org.au',             color:'var(--c-lime)' },
  ];

  return (
    <div id="connect">
      <div className="blueprint-label" style={{marginBottom:20}}>● OPEN CHANNELS</div>
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {items.map((it,i)=>(
          <Tilt key={i} max={4} scale={1.02}>
            <a href={it.href} target="_blank" rel="noopener"
               className="trans-card"
               style={{
                 display:'grid', gridTemplateColumns:'48px 140px 1fr auto',
                 gap:20, alignItems:'center',
                 padding:'20px 24px',
                 background:'rgba(15,24,64,0.6)', backdropFilter:'blur(12px)',
                 border:`1px solid var(--line-bright)`,
                 position:'relative', transition:'all 0.4s'
               }}>
              <span style={{
                fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
                color:it.color, fontWeight:700
              }}>[{it.num}]</span>
              <span className="trans-label" style={{
                fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
                textTransform:'uppercase', color:'var(--ink-dim)', fontWeight:500
              }}>
                {it.label}
              </span>
              <span className="trans-value" style={{
                fontFamily:'var(--serif)',
                fontSize:'clamp(20px, 2.4vw, 30px)', lineHeight:1, color:'var(--ink)',
                overflow:'hidden', textOverflow:'ellipsis'
              }}>
                {it.value}
              </span>
              <span className="trans-arrow" style={{
                width:42, height:42,
                background:it.color, color:'var(--bg)',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontSize:18, transition:'transform 0.4s', fontWeight:700
              }}>→</span>
            </a>
          </Tilt>
        ))}
      </div>
      <style>{`
        .trans-card{cursor:pointer}
        .trans-card:hover{border-color:var(--c-cyan); box-shadow:8px 8px 0 0 rgba(76,240,255,0.3)}
        .trans-card:hover .trans-arrow{transform:rotate(-45deg) scale(1.1)}
        @media (max-width:720px){
          .trans-card{grid-template-columns:32px 1fr 42px !important; padding:14px 16px !important}
          .trans-label{display:none}
        }
      `}</style>
    </div>
  );
};

window.About = About;
