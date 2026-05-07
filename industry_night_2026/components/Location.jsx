// Location — venue card and map marker near the finale
const Location = () => {
  const address = 'Adelaide SA 5005, Australia';
  const venue = 'Union House 605 Rumours Function Room, University of Adelaide';
  const mapTarget = 'The University of Adelaide, Adelaide SA 5005, Australia';
  const query = encodeURIComponent(`${venue}, ${address}`);
  const mapQuery = encodeURIComponent(mapTarget);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <section id="location" className="section-pad" style={{
      position:'relative',
      background:'var(--night)',
      borderTop:'1.5px solid var(--paper-on-night)',
      borderBottom:'1.5px solid var(--paper-on-night)'
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:40, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
        textTransform:'uppercase', color:'var(--paper-on-night-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="tape signal">§ 04 — THE COORDINATES</span></span>
        <span style={{color:'var(--acid)', fontWeight:700}}>● LOCATION LOCK</span>
      </div>

      <div className="location-grid" style={{
        display:'grid',
        gridTemplateColumns:'0.9fr 1.1fr',
        gap:32,
        alignItems:'stretch'
      }}>
        <div style={{
          border:'1.5px solid var(--paper-on-night)',
          background:'var(--night)',
          boxShadow:'10px 10px 0 0 var(--acid)',
          padding:'28px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          minHeight:360
        }}>
          <div>
            <div className="display" style={{
              fontFamily:'var(--display)', fontWeight:400,
              fontSize:'clamp(48px, 7vw, 110px)',
              lineHeight:0.86,
              letterSpacing:'-0.05em',
              textTransform:'uppercase',
              color:'var(--paper-on-night)'
            }}>
              WHERE IT'S<br/>
              <span style={{color:'transparent', WebkitTextStroke:'2px var(--acid)'}}>HAPPENING</span>
            </div>

            <div style={{
              marginTop:32,
              display:'grid',
              gap:0,
              border:'1.5px solid var(--paper-on-night)'
            }}>
              <InfoRow label="VENUE" value={venue}/>
              <InfoRow label="ADDRESS" value={address}/>
              <InfoRow label="TIME" value="18 MAY 2026 · 17:30 ACST"/>
            </div>
          </div>

          <a href={mapsUrl} target="_blank" rel="noopener" style={{
            marginTop:28,
            display:'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            padding:'14px 18px',
            background:'var(--acid)',
            color:'var(--night)',
            fontFamily:'var(--mono)',
            fontSize:11,
            letterSpacing:'0.22em',
            textTransform:'uppercase',
            fontWeight:700
          }}>
            OPEN DIRECTIONS →
          </a>
        </div>

        <div style={{
          position:'relative',
          minHeight:360,
          border:'1.5px solid var(--paper-on-night)',
          background:'var(--night-2)',
          overflow:'hidden'
        }}>
          <iframe
            title="Union House 605 Rumours Function Room map"
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              position:'absolute',
              inset:0,
              width:'100%',
              height:'100%',
              border:0,
              filter:'grayscale(1) contrast(1.2) invert(0.92) hue-rotate(180deg)',
              pointerEvents:'none'
            }}
          />
          <div style={{
            position:'absolute',
            top:16,
            left:16,
            padding:'8px 12px',
            background:'var(--signal)',
            color:'var(--bone)',
            fontFamily:'var(--mono)',
            fontSize:10,
            letterSpacing:'0.18em',
            textTransform:'uppercase',
            fontWeight:700,
            pointerEvents:'none'
          }}>
            MAP MARKER · ADELAIDE UNI
          </div>
          <MapPin/>
        </div>
      </div>

      <style>{`
        @media (max-width:900px){
          .location-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  );
};

const MapPin = () => (
  <div className="ai-map-pin" style={{
    position:'absolute',
    left:'50%',
    top:'45%',
    width:92,
    height:112,
    transform:'translate(-50%, -100%)',
    pointerEvents:'none',
    filter:'drop-shadow(0 0 18px rgba(197,255,46,0.55))',
    zIndex:3
  }}>
    <div className="pin-scan" style={{
      position:'absolute',
      left:'50%',
      top:18,
      width:118,
      height:118,
      transform:'translate(-50%, -50%)',
      border:'1.5px solid var(--acid)',
      opacity:0.5
    }}/>
    <svg viewBox="0 0 92 112" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <defs>
        <linearGradient id="pinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C5FF2E"/>
          <stop offset="55%" stopColor="#2A2BFF"/>
          <stop offset="100%" stopColor="#FF4D17"/>
        </linearGradient>
      </defs>
      <path d="M46 4 C24 4 10 19 10 40 C10 66 46 108 46 108 C46 108 82 66 82 40 C82 19 68 4 46 4 Z"
        fill="var(--night)" stroke="url(#pinGrad)" strokeWidth="3"/>
      <circle cx="46" cy="40" r="21" fill="rgba(11,11,15,0.9)" stroke="var(--acid)" strokeWidth="2"/>
      <path d="M30 42 H40 L46 29 L53 53 L58 42 H64" fill="none" stroke="var(--acid)" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
      <g stroke="var(--signal)" strokeWidth="1.5" fill="var(--acid)">
        <line x1="27" y1="24" x2="37" y2="33"/>
        <line x1="65" y1="24" x2="55" y2="33"/>
        <line x1="26" y1="56" x2="38" y2="48"/>
        <line x1="66" y1="56" x2="54" y2="48"/>
        <circle cx="27" cy="24" r="3"/>
        <circle cx="65" cy="24" r="3"/>
        <circle cx="26" cy="56" r="3"/>
        <circle cx="66" cy="56" r="3"/>
      </g>
      <text x="46" y="75" textAnchor="middle" fontFamily="Space Mono" fontSize="8" letterSpacing="1.5" fill="var(--paper-on-night)" fontWeight="700">AI NODE</text>
    </svg>
    <div className="pin-shadow" style={{
      position:'absolute',
      left:'50%',
      bottom:-3,
      width:62,
      height:16,
      transform:'translateX(-50%)',
      border:'1.5px solid var(--acid)',
      borderRadius:'50%',
      background:'rgba(197,255,46,0.12)'
    }}/>
    <style>{`
      .ai-map-pin{animation:pinFloat 2.4s ease-in-out infinite}
      .ai-map-pin .pin-scan{animation:pinScan 2.4s ease-out infinite}
      .ai-map-pin .pin-shadow{animation:pinShadow 2.4s ease-in-out infinite}
      @keyframes pinFloat{0%,100%{translate:0 0}50%{translate:0 -8px}}
      @keyframes pinScan{0%{scale:.35; opacity:.8}70%{scale:1.15; opacity:0}100%{scale:1.15; opacity:0}}
      @keyframes pinShadow{0%,100%{scale:1; opacity:.5}50%{scale:.78; opacity:.25}}
      @media (max-width:720px){
        .ai-map-pin{left:50% !important; top:45% !important; width:76px !important; height:92px !important}
      }
    `}</style>
  </div>
);

const InfoRow = ({label, value}) => (
  <div style={{
    display:'grid',
    gridTemplateColumns:'110px 1fr',
    borderTop:'1.5px solid var(--paper-on-night)'
  }}>
    <div style={{
      padding:'14px',
      background:'var(--paper-on-night)',
      color:'var(--night)',
      fontFamily:'var(--mono)',
      fontSize:10,
      letterSpacing:'0.18em',
      textTransform:'uppercase',
      fontWeight:700
    }}>
      {label}
    </div>
    <div style={{
      padding:'14px',
      color:'var(--paper-on-night)',
      fontFamily:'var(--sans)',
      fontSize:15,
      lineHeight:1.4,
      fontWeight:600
    }}>
      {value}
    </div>
  </div>
);

window.Location = Location;
