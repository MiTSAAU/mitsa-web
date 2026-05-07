// Meta — light paper section with brutalist data cards + marquee strip
const Meta = () => {
  const stats = [
    { k:'DATE',     v:'18.05.26', sub:'MON · 17:30 ACST',     accent:'var(--signal)' },
    // ACST = Adelaide standard time (UTC+9:30)
    { k:'PANELS',   v:'02',       sub:'RESEARCH / INDUSTRY',  accent:'var(--warn)' },
    { k:'PANELISTS',v:'10',       sub:'FIVE EACH PANEL',      accent:'var(--acid)' },
    { k:'ENTRY',    v:'TKT',     sub:'STUDENTS · ADELAIDE UNI', accent:'var(--ink)' },
  ];

  return (
    <section className="on-light" style={{position:'relative', padding:'0 0 120px', background:'var(--paper)'}}>
      {/* marquee runs across the seam between dark hero and light section */}
      <Marquee/>

      <div style={{padding:'80px 32px 0'}}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
          margin:'0 0 32px', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
          textTransform:'uppercase', color:'var(--ink-dim)', flexWrap:'wrap', gap:8
        }}>
          <span><span className="tape signal">§ 01 — TRANSMISSION DATA</span></span>
          <span style={{color:'var(--ink)', fontWeight:700}}>● SIGNAL LOCK</span>
        </div>

        <div className="stats-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0,
          border:'1.5px solid var(--ink)'
        }}>
          {stats.map((s,i)=>(
            <StatCard key={i} {...s} idx={i} last={i===3}/>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media (max-width:480px){.stats-grid{grid-template-columns:1fr !important}}
      `}</style>
    </section>
  );
};

const StatCard = ({k, v, sub, accent, idx, last}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      className="stat-cell"
      style={{
        position:'relative',
        background: hover ? accent : 'var(--paper)',
        color: hover ? (accent === 'var(--ink)' ? 'var(--bone)' : 'var(--night)') : 'var(--ink)',
        borderRight: last ? 'none' : '1.5px solid var(--ink)',
        padding:'28px 24px 24px',
        minHeight:240,
        transition:'background 0.25s, color 0.25s',
        cursor:'default', overflow:'hidden',
        display:'flex', flexDirection:'column', justifyContent:'space-between'
      }}>
      <div style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
        fontWeight:700,
        display:'flex', justifyContent:'space-between', alignItems:'flex-start'
      }}>
        <span>[0{idx+1}] {k}</span>
        <span>↗</span>
      </div>

      <div className="display" style={{
        fontFamily:'var(--display)', fontWeight:400,
        fontSize:'clamp(56px, 7vw, 120px)',
        lineHeight:0.85, letterSpacing:'-0.05em',
        wordBreak:'break-all'
      }}>
        {v}
      </div>

      <div style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase',
        fontWeight:700,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        borderTop:'1.5px solid currentColor', paddingTop:12
      }}>
        <span>{sub}</span>
        <span style={{
          width:8, height:8, background:'currentColor',
          opacity: hover ? 1 : 0.3, transition:'opacity 0.25s'
        }}/>
      </div>

      <style>{`
        @media (max-width:900px){
          .stat-cell:nth-child(2n){border-right:none !important}
          .stat-cell:nth-child(-n+2){border-bottom:1.5px solid var(--ink)}
        }
        @media (max-width:480px){
          .stat-cell{border-right:none !important; border-bottom:1.5px solid var(--ink) !important}
          .stat-cell:last-child{border-bottom:none !important}
        }
      `}</style>
    </div>
  );
};

const Marquee = () => {
  const phrases = ['INDUSTRY × RESEARCH', '◆', 'A NETWORKING SIGNAL', '◆', 'ADELAIDE · 18 MAY 2026', '◆', 'STUDENTS · INDUSTRY · ACADEMIA', '◆'];
  const items = [...phrases, ...phrases, ...phrases];

  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background:'var(--ink)', color:'var(--acid)',
      borderTop:'1.5px solid var(--ink)', borderBottom:'1.5px solid var(--ink)',
      padding:'18px 0',
    }}>
      <div className="marquee-track" style={{
        display:'flex', gap:48, whiteSpace:'nowrap',
        fontFamily:'var(--display)', fontWeight:400,
        fontSize:'clamp(28px, 4.5vw, 56px)',
        letterSpacing:'-0.03em', textTransform:'uppercase'
      }}>
        {items.map((p,i)=>(
          <span key={i} style={{
            color: p==='◆' ? 'var(--bone)' : 'var(--acid)',
            fontSize: p==='◆' ? '0.7em' : '1em',
            display:'inline-flex', alignItems:'center'
          }}>{p}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}
        .marquee-track{animation:marquee 32s linear infinite}
      `}</style>
    </div>
  );
};

window.Meta = Meta;
