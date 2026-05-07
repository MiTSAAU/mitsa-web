// Countdown to Industry Night — 18 May 2026, 17:30 ACST (UTC+8)
const Countdown = () => {
  // Target: 18 May 2026, 17:30 Adelaide time (ACST UTC+9:30 — non-DST in May)
  const TARGET = new Date('2026-05-18T17:30:00+09:30').getTime();

  const calc = () => {
    const now = Date.now();
    const diff = Math.max(0, TARGET - now);
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s, done: diff === 0 };
  };

  const [t, setT] = React.useState(calc());

  React.useEffect(()=>{
    const id = setInterval(()=> setT(calc()), 1000);
    return ()=> clearInterval(id);
  },[]);

  const pad = (n, w=2) => String(n).padStart(w, '0');

  const cells = [
    { label:'DAYS',    val: pad(t.d, 3) },
    { label:'HOURS',   val: pad(t.h)    },
    { label:'MINUTES', val: pad(t.m)    },
    { label:'SECONDS', val: pad(t.s)    },
  ];

  return (
    <div className="countdown" style={{
      display:'grid',
      gridTemplateColumns:'auto repeat(4, 1fr)',
      alignItems:'stretch',
      border:'1.5px solid var(--paper-on-night)',
      background:'rgba(11,11,15,0.6)',
      backdropFilter:'blur(10px)',
      maxWidth:920,
      margin:'0 auto',
    }}>
      <div className="countdown-tag" style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'0 18px',
        background:'var(--acid)', color:'var(--night)',
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
        fontWeight:700, textTransform:'uppercase',
        writingMode:'vertical-rl', transform:'rotate(180deg)',
        justifyContent:'center'
      }}>
        T-MINUS · LAUNCH 18.05.26
      </div>

      {cells.map((c, i)=>(
        <CountCell key={c.label} val={c.val} label={c.label} last={i===cells.length-1}/>
      ))}

      <style>{`
        @media (max-width:720px){
          .countdown{grid-template-columns:repeat(4, 1fr) !important}
          .countdown-tag{display:none !important}
        }
        @media (max-width:420px){
          .countdown{grid-template-columns:repeat(2, 1fr) !important}
        }
      `}</style>
    </div>
  );
};

const CountCell = ({ val, label, last }) => {
  const prev = React.useRef(val);
  const [flip, setFlip] = React.useState(false);
  React.useEffect(()=>{
    if(prev.current !== val){
      setFlip(true);
      const id = setTimeout(()=> setFlip(false), 380);
      prev.current = val;
      return ()=> clearTimeout(id);
    }
  },[val]);

  return (
    <div style={{
      borderLeft:'1.5px solid var(--paper-on-night)',
      padding:'18px 12px 14px',
      textAlign:'center',
      position:'relative',
      overflow:'hidden'
    }}>
      <div style={{
        fontFamily:'var(--display)', fontWeight:400,
        fontSize:'clamp(40px, 6.6vw, 86px)',
        lineHeight:1,
        letterSpacing:'-0.04em',
        color:'var(--paper-on-night)',
        fontVariantNumeric:'tabular-nums',
        transform: flip ? 'translateY(-3px)' : 'translateY(0)',
        transition:'transform 0.18s cubic-bezier(.6,.0,.2,1)'
      }}>
        {val}
      </div>
      <div style={{
        marginTop:8,
        fontFamily:'var(--mono)', fontSize:9, letterSpacing:'0.28em',
        color: flip ? 'var(--acid)' : 'var(--paper-on-night-dim)',
        fontWeight:700, textTransform:'uppercase',
        transition:'color 0.4s'
      }}>
        {label}
      </div>
      {/* tick marks */}
      <div style={{
        position:'absolute', left:6, top:6, width:6, height:6,
        borderTop:'1.5px solid var(--paper-on-night-dim)',
        borderLeft:'1.5px solid var(--paper-on-night-dim)'
      }}/>
      <div style={{
        position:'absolute', right:6, top:6, width:6, height:6,
        borderTop:'1.5px solid var(--paper-on-night-dim)',
        borderRight:'1.5px solid var(--paper-on-night-dim)'
      }}/>
    </div>
  );
};

window.Countdown = Countdown;
