// Event meta — brutalist data cards with 3D tilt + marquee
const Meta = () => {
  const stats = [
    { k:'DATE',     v:'18.05.26',  sub:'MON · 17:30 ACST',   accent:'var(--c-cyan)' },
    { k:'PANELS',   v:'02',        sub:'RESEARCH / INDUSTRY', accent:'var(--c-magenta)' },
    { k:'PANELISTS',v:'10',        sub:'FIVE EACH PANEL',     accent:'var(--c-lime)' },
    { k:'ENTRY',    v:'FREE',      sub:'STUDENTS · UWA',      accent:'var(--c-violet)' },
  ];

  return (
    <section style={{position:'relative', padding:'80px 32px 120px'}}>
      <Marquee/>

      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        margin:'80px 0 32px', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
        textTransform:'uppercase', color:'var(--ink-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="blueprint-label">§ 01 — TRANSMISSION DATA</span></span>
        <span style={{color:'var(--c-lime)', fontWeight:700}}>● SIGNAL LOCK</span>
      </div>

      <div className="stats-grid" style={{
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16
      }}>
        {stats.map((s,i)=>(
          <Tilt key={i} max={6} scale={1.03}>
            <StatCard {...s} idx={i}/>
          </Tilt>
        ))}
      </div>

      <style>{`
        @media (max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media (max-width:480px){.stats-grid{grid-template-columns:1fr !important}}
      `}</style>
    </section>
  );
};

const StatCard = ({k, v, sub, accent, idx}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        position:'relative',
        background:'rgba(15,24,64,0.5)',
        backdropFilter:'blur(12px)',
        border:`1px solid ${hover ? accent : 'var(--line-bright)'}`,
        padding:'20px',
        minHeight:200,
        transition:'border-color 0.3s, box-shadow 0.4s, transform 0.4s',
        boxShadow: hover ? `0 0 0 1px ${accent}, 0 0 32px ${accent}40, 8px 8px 0 0 ${accent}` : '4px 4px 0 0 rgba(91,140,255,0.15)',
        cursor:'default', overflow:'hidden'
      }}>
      {/* Corner ticks */}
      <div style={{position:'absolute', top:0, left:0, width:8, height:1, background:accent}}/>
      <div style={{position:'absolute', top:0, left:0, width:1, height:8, background:accent}}/>
      <div style={{position:'absolute', top:0, right:0, width:8, height:1, background:accent}}/>
      <div style={{position:'absolute', top:0, right:0, width:1, height:8, background:accent}}/>
      <div style={{position:'absolute', bottom:0, left:0, width:8, height:1, background:accent}}/>
      <div style={{position:'absolute', bottom:0, left:0, width:1, height:8, background:accent}}/>
      <div style={{position:'absolute', bottom:0, right:0, width:8, height:1, background:accent}}/>
      <div style={{position:'absolute', bottom:0, right:0, width:1, height:8, background:accent}}/>

      <div style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
        color: accent, fontWeight:700,
        display:'flex', justifyContent:'space-between'
      }}>
        <span>[0{idx+1}] {k}</span>
        <span>↗</span>
      </div>
      <div style={{
        fontFamily:'var(--serif)', fontWeight:400,
        fontSize:'clamp(42px, 4.5vw, 64px)',
        color:'var(--ink)', marginTop:48, lineHeight:1,
        letterSpacing:'-0.02em'
      }}>
        {v}
      </div>
      <div style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase',
        color:'var(--ink-dim)', marginTop:12, fontWeight:500
      }}>
        {sub}
      </div>
    </div>
  );
};

const Marquee = () => {
  const phrases = ['INDUSTRY × RESEARCH', '◆', 'A NETWORKING SIGNAL', '◆', 'PERTH · 18 MAY 2026', '◆', 'STUDENTS · INDUSTRY · ACADEMIA', '◆'];
  const items = [...phrases, ...phrases, ...phrases];

  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background:'var(--c-cyan)', color:'var(--bg)',
      borderTop:'1px solid var(--bg)', borderBottom:'1px solid var(--bg)',
      padding:'14px 0',
      boxShadow:'0 0 32px rgba(76,240,255,0.4)'
    }}>
      <div className="marquee-track" style={{
        display:'flex', gap:48, whiteSpace:'nowrap',
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
        fontSize:'clamp(28px, 4.5vw, 56px)',
      }}>
        {items.map((p,i)=>(
          <span key={i} style={{
            color: p==='◆' ? 'var(--bg)' : 'var(--bg)',
            fontStyle: p==='◆' ? 'normal' : 'italic',
            fontSize: p==='◆' ? '0.6em' : '1em',
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
