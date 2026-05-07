// Location — venue card and map marker near the finale
const Location = () => {
  const address = 'Adelaide SA 5005, Australia';
  const venue = 'Union House 605 Rumours Function Room, University of Adelaide';
  const query = encodeURIComponent(`${venue}, ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://maps.google.com/maps?q=${query}&output=embed`;

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
              filter:'grayscale(1) contrast(1.2) invert(0.92) hue-rotate(180deg)'
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
            MAP MARKER · UNION HOUSE
          </div>
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
