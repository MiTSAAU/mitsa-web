// Top navigation: brutalist with hard-edged elements + live timestamp
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
      position:'fixed', top:24, left:24, right:24, zIndex:50,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 16px',
      background:'rgba(6,9,26,0.7)',
      backdropFilter:'blur(14px) saturate(1.4)',
      WebkitBackdropFilter:'blur(14px) saturate(1.4)',
      border:'1px solid var(--c-cyan)',
      boxShadow:'0 0 0 1px rgba(76,240,255,0.15), 0 8px 40px rgba(0,0,0,0.4)',
      fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
      color:'var(--ink-dim)'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <Logomark/>
        <span style={{color:'var(--ink)', fontWeight:600}}>MITSA</span>
        <span style={{color:'var(--c-cyan)'}}>×</span>
        <span style={{display:'none'}} className="nav-sub">INDUSTRY NIGHT '26</span>
      </div>

      <div className="nav-links" style={{display:'flex', gap:24}}>
        {links.map(l=>(
          <a key={l.label} href={l.href} className="nav-link"
             style={{display:'flex', alignItems:'center', gap:6, color:'var(--ink-dim)'}}>
            <span style={{color:'var(--c-cyan)', fontSize:9}}>[{l.n}]</span>
            <span>{l.label}</span>
          </a>
        ))}
      </div>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <span className="nav-time" style={{color:'var(--ink)', fontWeight:500}}>{time}</span>
        <span style={{
          width:8,height:8,borderRadius:0,
          background:'var(--c-lime)',
          boxShadow:'0 0 0 3px rgba(196,255,58,0.3)',
          animation:'pulse 1.6s ease-in-out infinite'
        }}/>
        <a href="#connect" className="rsvp-btn" style={{
          padding:'8px 14px',
          background:'var(--c-cyan)',
          color:'var(--bg)',
          fontWeight:700, letterSpacing:'0.18em', fontSize:10,
          border:'1px solid var(--c-cyan)',
          transition:'all 0.3s'
        }}>RSVP →</a>
        <button className="nav-burger" onClick={()=>setOpen(!open)} style={{
          display:'none', padding:8, border:'1px solid var(--c-cyan)', color:'var(--c-cyan)'
        }}>≡</button>
      </div>
    </nav>

    {/* Mobile menu */}
    {open && (
      <div style={{
        position:'fixed', top:80, left:24, right:24, zIndex:49,
        background:'var(--bg)', border:'1px solid var(--c-cyan)',
        padding:'24px', display:'flex', flexDirection:'column', gap:12
      }} onClick={()=>setOpen(false)}>
        {links.map(l=>(
          <a key={l.label} href={l.href}
             style={{
               fontFamily:'var(--mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase',
               color:'var(--ink)', padding:'10px 0', borderBottom:'1px solid var(--line)'
             }}>
            <span style={{color:'var(--c-cyan)', marginRight:12}}>[{l.n}]</span>{l.label}
          </a>
        ))}
      </div>
    )}

    <style>{`
      .nav-link{transition:color .3s; position:relative}
      .nav-link:hover{color:var(--c-cyan)}
      .nav-link::after{
        content:""; position:absolute; left:0; right:0; bottom:-4px;
        height:2px; background:var(--c-cyan); transform:scaleX(0); transform-origin:left;
        transition:transform .4s ease;
      }
      .nav-link:hover::after{transform:scaleX(1)}
      .rsvp-btn:hover{background:var(--c-magenta); border-color:var(--c-magenta); color:#fff;
        box-shadow:0 0 24px rgba(255,92,182,0.6)}
      @keyframes pulse{
        0%,100%{box-shadow:0 0 0 3px rgba(196,255,58,0.3)}
        50%{box-shadow:0 0 0 8px rgba(196,255,58,0.0)}
      }
      @media (min-width:721px){.nav-sub{display:inline !important}}
      @media (max-width:900px){
        .nav-links{display:none !important}
        .nav-burger{display:inline-flex !important; align-items:center; justify-content:center;
          font-size:18px; line-height:1; width:36px; height:36px}
      }
      @media (max-width:480px){
        .nav-time{display:none}
      }
    `}</style>
    </>
  );
};

const Logomark = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" style={{display:'block'}}>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4cf0ff"/>
        <stop offset="100%" stopColor="#ff5cb6"/>
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="20" height="20" fill="none" stroke="var(--c-cyan)" strokeWidth="1"/>
    <circle cx="11" cy="11" r="6" fill="url(#logoGrad)"/>
    <circle cx="11" cy="11" r="9" fill="none" stroke="var(--c-cyan)" strokeWidth="0.5" strokeDasharray="2 2"/>
  </svg>
);

window.Nav = Nav;
window.Logomark = Logomark;
