// Top navigation — neo-brutalist with hard edges + live timestamp
const Nav = () => {
  const [time, setTime] = React.useState('');
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{
    const fmt = () => setTime(new Date().toTimeString().slice(0,8));
    fmt();
    const id = setInterval(fmt, 1000);
    return ()=>clearInterval(id);
  },[]);

  const links = [
    { label:'Index',     href:'#top',       n:'00' },
    { label:'Panelists', href:'#panelists', n:'01' },
    { label:'About',     href:'#about',     n:'02' },
    { label:'Connect',   href:'#connect',   n:'03' },
  ];

  return (
    <>
    <nav style={{
      position:'fixed', top:20, left:20, right:20, zIndex:50,
      display:'flex', alignItems:'stretch', justifyContent:'space-between',
      background:'var(--night)',
      border:'1.5px solid var(--paper-on-night)',
      fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase',
      color:'var(--paper-on-night-dim)'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
        borderRight:'1.5px solid var(--paper-on-night)', background:'var(--acid)', color:'var(--night)'}}>
        <Logomark/>
        <span style={{fontWeight:700, letterSpacing:'0.22em'}}>MITSA</span>
        <span>×</span>
        <span style={{display:'none', fontWeight:700}} className="nav-sub">INDUSTRY NIGHT '26</span>
      </div>

      <div className="nav-links" style={{display:'flex', alignItems:'center', gap:24, padding:'0 16px'}}>
        {links.map(l=>(
          <a key={l.label} href={l.href} className="nav-link"
             style={{display:'flex', alignItems:'center', gap:6, color:'var(--paper-on-night-dim)'}}>
            <span style={{color:'var(--acid)', fontSize:9, fontWeight:700}}>[{l.n}]</span>
            <span style={{fontWeight:700}}>{l.label}</span>
          </a>
        ))}
      </div>

      <div style={{display:'flex', alignItems:'stretch'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'0 14px',
          borderLeft:'1.5px solid var(--paper-on-night)'}}>
          <span className="nav-time" style={{color:'var(--paper-on-night)', fontWeight:700}}>{time}</span>
          <span style={{
            width:8,height:8,
            background:'var(--acid)',
            boxShadow:'0 0 0 3px rgba(197,255,46,0.3)',
            animation:'pulse 1.6s ease-in-out infinite'
          }}/>
        </div>
        <a href="https://events.humanitix.com/industry-night-sem-1-2026" target="_blank" rel="noopener" className="rsvp-btn" style={{
          display:'inline-flex', alignItems:'center',
          padding:'10px 16px',
          background:'var(--signal)', color:'var(--bone)',
          fontWeight:700, letterSpacing:'0.18em', fontSize:10,
          borderLeft:'1.5px solid var(--paper-on-night)',
          transition:'all 0.25s'
        }}>GET TICKETS →</a>
        <button className="nav-burger" onClick={()=>setOpen(!open)} style={{
          display:'none', padding:'0 12px', borderLeft:'1.5px solid var(--paper-on-night)',
          color:'var(--acid)', background:'var(--night)', fontSize:18
        }}>≡</button>
      </div>
    </nav>

    {open && (
      <div style={{
        position:'fixed', top:74, left:20, right:20, zIndex:49,
        background:'var(--night)', border:'1.5px solid var(--paper-on-night)',
        padding:'18px', display:'flex', flexDirection:'column', gap:10
      }} onClick={()=>setOpen(false)}>
        {links.map(l=>(
          <a key={l.label} href={l.href}
             style={{
               fontFamily:'var(--mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase',
               color:'var(--paper-on-night)', padding:'10px 0', borderBottom:'1px solid var(--rule-on-night)',
               fontWeight:700
             }}>
            <span style={{color:'var(--acid)', marginRight:12}}>[{l.n}]</span>{l.label}
          </a>
        ))}
      </div>
    )}

    <style>{`
      .nav-link{transition:color .25s; position:relative}
      .nav-link:hover{color:var(--acid)}
      .nav-link::after{
        content:""; position:absolute; left:0; right:0; bottom:-4px;
        height:2px; background:var(--acid); transform:scaleX(0); transform-origin:left;
        transition:transform .3s ease;
      }
      .nav-link:hover::after{transform:scaleX(1)}
      .rsvp-btn:hover{background:var(--acid); color:var(--night)}
      @keyframes pulse{
        0%,100%{box-shadow:0 0 0 3px rgba(197,255,46,0.3)}
        50%{box-shadow:0 0 0 8px rgba(197,255,46,0.0)}
      }
      @media (min-width:721px){.nav-sub{display:inline !important}}
      @media (max-width:900px){
        .nav-links{display:none !important}
        .nav-burger{display:inline-flex !important; align-items:center; justify-content:center;
          line-height:1; width:44px}
      }
      @media (max-width:480px){
        .nav-time{display:none}
      }
    `}</style>
    </>
  );
};

const Logomark = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" style={{display:'block'}}>
    <rect x="1" y="1" width="20" height="20" fill="none" stroke="var(--night)" strokeWidth="1.5"/>
    <rect x="6" y="6" width="10" height="10" fill="var(--night)"/>
    <rect x="9" y="9" width="4" height="4" fill="var(--acid)"/>
  </svg>
);

window.Nav = Nav;
window.Logomark = Logomark;
