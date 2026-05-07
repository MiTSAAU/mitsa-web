// About MiTSA — light paper section, brutalist link cards
const About = () => {
  return (
    <section id="about" className="on-light section-pad" style={{position:'relative', background:'var(--paper)'}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:64, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
        textTransform:'uppercase', color:'var(--ink-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="tape">§ 03 — THE HOST</span></span>
        <span style={{color:'var(--ink)', fontWeight:700}}>MITSA · ADELAIDE UNI</span>
      </div>

      <div className="about-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:96, alignItems:'start'}}>
        <div className="about-emblem-col" style={{position:'sticky', top:120}}>
          <Emblem/>
          <div style={{marginTop:32}}>
            <h3 className="display" style={{
              fontFamily:'var(--display)', fontWeight:400,
              fontSize:'clamp(36px, 4.6vw, 64px)', lineHeight:0.92,
              letterSpacing:'-0.04em', color:'var(--ink)', textWrap:'pretty',
              textTransform:'uppercase'
            }}>
              MASTER'S IN<br/>
              <span style={{
                color:'transparent',
                WebkitTextStroke:'2px var(--ink)'
              }}>TECHNOLOGY</span><br/>
              STUDENT ASSOC.
            </h3>
            <div style={{
              fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
              color:'var(--ink-dim)', textTransform:'uppercase', marginTop:16, fontWeight:600
            }}>
              MiTSA · Adelaide University
            </div>
          </div>
        </div>

        <div>
          <p style={{
            fontFamily:'var(--sans)', fontWeight:600,
            fontSize:'clamp(20px, 2.4vw, 28px)', lineHeight:1.4,
            color:'var(--ink)', textWrap:'pretty', marginBottom:24, letterSpacing:'-0.01em'
          }}>
            MiTSA is the student-run hub for Adelaide University's Master's in Technology cohort —
            a community of engineers, scientists, and founders-in-formation
            charting the distance between the lecture hall and the working world.
          </p>
          <p style={{
            fontFamily:'var(--sans)', fontWeight:500,
            fontSize:16, lineHeight:1.6, color:'var(--ink-dim)',
            textWrap:'pretty', maxWidth:620, marginBottom:64
          }}>
            We host the gatherings where the noise of academia and the noise of
            industry briefly synchronise. <span style={{color:'var(--ink)', fontWeight:700}}>Industry Night</span> is the loudest of them.
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
      <rect x="20" y="20" width="260" height="260" fill="none" stroke="var(--ink)" strokeWidth="2"/>
      <rect x="20" y="20" width="260" height="36" fill="var(--ink)"/>
      <text x="150" y="44" textAnchor="middle" fontFamily="Space Mono" fontSize="11" letterSpacing="3" fill="var(--acid)" fontWeight="700">MITSA · ADELAIDE UNI</text>

      <rect x="40" y="76" width="220" height="180" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 4"/>

      <text x="150" y="200" textAnchor="middle"
        fontFamily="Archivo Black" fontSize="160" fontWeight="400"
        fill="var(--ink)">M</text>

      <rect x="135" y="216" width="30" height="30" fill="var(--acid)" stroke="var(--ink)" strokeWidth="2"/>
      <text x="150" y="237" textAnchor="middle" fontFamily="Archivo Black" fontSize="14" fill="var(--ink)">26</text>

      <text x="40" y="275" fontFamily="Space Mono" fontSize="9" letterSpacing="2" fill="var(--ink-dim)" fontWeight="600">SIGNAL//001</text>
      <text x="260" y="275" textAnchor="end" fontFamily="Space Mono" fontSize="9" letterSpacing="2" fill="var(--ink-dim)" fontWeight="600">ADELAIDE/AU</text>
    </svg>
  </div>
);

const Transmissions = () => {
  const items = [
    { num:'01', label:'INSTAGRAM', value:'@mastersintechnology', href:'https://www.instagram.com/mastersintechnology/', color:'var(--warn)' },
    { num:'02', label:'WEBSITE',   value:'mitsa.tech',           href:'https://www.mitsa.tech/',                       color:'var(--signal)' },
    { num:'03', label:'EMAIL',     value:'mitsa@clubs.youx.org.au', href:'mailto:mitsa@clubs.youx.org.au',             color:'var(--acid)' },
  ];

  return (
    <div id="connect">
      <div className="tape" style={{marginBottom:20}}>● OPEN CHANNELS</div>
      <div style={{display:'flex', flexDirection:'column', gap:0, border:'1.5px solid var(--ink)'}}>
        {items.map((it,i)=>(
          <a key={i} href={it.href} target="_blank" rel="noopener"
             className="trans-card"
             style={{
               display:'grid', gridTemplateColumns:'48px 140px 1fr auto',
               gap:20, alignItems:'center',
               padding:'20px 24px',
               background:'var(--paper)',
               borderTop: i===0 ? 'none' : '1.5px solid var(--ink)',
               position:'relative', transition:'all 0.2s', color:'var(--ink)'
             }}>
            <span style={{
              fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
              fontWeight:700
            }}>[{it.num}]</span>
            <span className="trans-label" style={{
              fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
              textTransform:'uppercase', fontWeight:700
            }}>
              {it.label}
            </span>
            <span className="trans-value display" style={{
              fontFamily:'var(--display)', fontWeight:400,
              fontSize:'clamp(20px, 2.6vw, 36px)', lineHeight:1, letterSpacing:'-0.03em',
              overflow:'hidden', textOverflow:'ellipsis', textTransform:'uppercase'
            }}>
              {it.value}
            </span>
            <span className="trans-arrow" style={{
              width:42, height:42,
              background:it.color, color:'var(--ink)',
              border:'1.5px solid var(--ink)',
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              fontSize:18, transition:'transform 0.25s', fontWeight:700
            }}>→</span>
          </a>
        ))}
      </div>
      <style>{`
        .trans-card{cursor:pointer}
        .trans-card:hover{background:var(--ink); color:var(--bone)}
        .trans-card:hover .trans-arrow{transform:rotate(-45deg) scale(1.05); border-color:var(--bone)}
        @media (max-width:720px){
          .trans-card{grid-template-columns:32px 1fr 42px !important; padding:14px 16px !important}
          .trans-label{display:none !important}
        }
      `}</style>
    </div>
  );
};

window.About = About;
