// Footer — dark night finale, gigantic stroked date
const Footer = () => {
  const [time, setTime] = React.useState('');
  React.useEffect(()=>{
    const fmt = ()=>setTime(new Date().toUTCString().slice(0,25));
    fmt(); const id=setInterval(fmt,1000);
    return ()=>clearInterval(id);
  },[]);

  return (
    <footer style={{
      position:'relative', borderTop:'1.5px solid var(--paper-on-night)',
      padding:'80px 32px 32px', overflow:'hidden', background:'var(--night)'
    }}>
      <div className="display" style={{
        fontFamily:'var(--display)', fontWeight:400,
        fontSize:'clamp(80px, 22vw, 380px)', lineHeight:0.84,
        letterSpacing:'-0.05em',
        color:'transparent',
        WebkitTextStroke:'2.5px var(--acid)',
        marginBottom:48, textAlign:'center', userSelect:'none',
        textTransform:'uppercase'
      }}>
        18.05.26
      </div>

      <div style={{
        display:'flex', justifyContent:'center', marginBottom:48
      }}>
        <div style={{
          display:'flex', gap:0, border:'1.5px solid var(--paper-on-night)'
        }}>
          <div style={{padding:'12px 18px', background:'var(--acid)', color:'var(--night)',
            fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em', fontWeight:700,
            borderRight:'1.5px solid var(--paper-on-night)'}}>
            ★ SAVE THE DATE
          </div>
          <div style={{padding:'12px 18px', background:'var(--night)', color:'var(--paper-on-night)',
            fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em', fontWeight:700}}>
            17:30 ACST · ADELAIDE
          </div>
        </div>
      </div>

      <div className="footer-row" style={{
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        flexWrap:'wrap', gap:32,
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
        textTransform:'uppercase', color:'var(--paper-on-night-dim)',
        borderTop:'1.5px solid var(--rule-on-night)', paddingTop:24
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          <span style={{color:'var(--acid)', fontWeight:700}}>MITSA · INDUSTRY NIGHT 2026</span>
          <span style={{fontWeight:600}}>Adelaide University · Master's in Technology Student Association</span>
          <span style={{color:'var(--paper-on-night-faint)'}}>{time}</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6, textAlign:'right'}}>
          <span style={{fontWeight:600}}>NETWORKING · RESEARCH · INDUSTRY</span>
          <span style={{color:'var(--acid)', fontWeight:700}}>● TRANSMITTING</span>
          <span style={{color:'var(--paper-on-night-faint)'}}>See you on the 18th</span>
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
