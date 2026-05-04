// Footer — gigantic glowing date + brutalist info row
const Footer = () => {
  const [time, setTime] = React.useState('');
  React.useEffect(()=>{
    const fmt = ()=>setTime(new Date().toUTCString().slice(0,25));
    fmt(); const id=setInterval(fmt,1000);
    return ()=>clearInterval(id);
  },[]);

  return (
    <footer style={{
      position:'relative', borderTop:'1px solid var(--c-cyan)',
      padding:'80px 32px 32px', overflow:'hidden'
    }}>
      <div style={{
        fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
        fontSize:'clamp(80px, 18vw, 320px)', lineHeight:0.85,
        letterSpacing:'-0.04em',
        background:'linear-gradient(95deg, var(--c-cyan) 0%, var(--c-violet) 30%, var(--c-magenta) 60%, var(--c-orange) 100%)',
        WebkitBackgroundClip:'text', backgroundClip:'text',
        color:'transparent',
        backgroundSize:'200% 100%',
        animation:'gradShiftFooter 10s ease-in-out infinite',
        marginBottom:48, textAlign:'center', userSelect:'none',
        filter:'drop-shadow(0 0 32px rgba(76,240,255,0.3))'
      }}>
        18.05.26
        <style>{`@keyframes gradShiftFooter{0%,100%{background-position:0% 0}50%{background-position:100% 0}}`}</style>
      </div>

      <div className="footer-row" style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        flexWrap:'wrap', gap:32,
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
        textTransform:'uppercase', color:'var(--ink-dim)'
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          <span style={{color:'var(--c-cyan)', fontWeight:700}}>MITSA · INDUSTRY NIGHT 2026</span>
          <span>UWA · Master's in Technology Student Association</span>
          <span style={{color:'var(--ink-faint)'}}>{time}</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6, textAlign:'right'}}>
          <span>NETWORKING · RESEARCH · INDUSTRY</span>
          <span style={{color:'var(--c-lime)', fontWeight:700}}>● TRANSMITTING</span>
          <span style={{color:'var(--ink-faint)'}}>See you on the 18th</span>
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
