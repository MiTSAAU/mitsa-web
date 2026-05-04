// Panelists — astro/blueprint with click-to-open modal card
const PANELISTS = {
  research: [
    { id:'r1', name:'Dr. Vega Aurelius',  title:'Computational Astrophysics', org:'UWA · School of Physics',  bio:'Investigates emergent structure in high-dimensional cosmological data; lead PI on the SPECTRA pipeline.', focus:['Cosmology','ML','Imaging'] },
    { id:'r2', name:'Dr. Lyra Okonkwo',   title:'Quantum Information',         org:'Curtin · Quantum Lab',     bio:'Builds error-corrected qubit topologies; founding member of the National Quantum Initiative.', focus:['Quantum','Hardware','Theory'] },
    { id:'r3', name:'Dr. Orion Mehta',    title:'Machine Perception',          org:'CSIRO Data61',             bio:'Self-supervised vision systems for satellite & seismic imagery; 60+ peer-reviewed publications.', focus:['Computer Vision','Self-Supervised','Geo'] },
    { id:'r4', name:'Dr. Cassia Reyes',   title:'Bioinformatics',              org:'Telethon Kids Institute',  bio:'Translates omics data into clinical decision tools; recipient of the 2025 Eureka Prize.', focus:['Genomics','Clinical AI','Health'] },
    { id:'r5', name:'Dr. Atlas Henrikson',title:'Robotics & Autonomy',         org:'UWA Robotics Group',       bio:'Designs control architectures for subsea autonomous vehicles; ex-DeepMind research scientist.', focus:['Robotics','Control','Autonomy'] },
  ],
  industry: [
    { id:'i1', name:'Sable Marchetti',  title:'VP of Engineering',     org:'Atlassian',           bio:'Scales platform infrastructure across distributed teams; champion of Perth\u2019s tech diaspora.', focus:['Platform','Leadership','Scale'] },
    { id:'i2', name:'Kavi Ramanathan',  title:'Founder & CTO',         org:'Halcyon AI',          bio:'Building agentic systems for industrial automation; previously led ML at Canva.', focus:['Agents','Startups','ML'] },
    { id:'i3', name:'Imogen Ferreira',  title:'Head of Product',       org:'Rio Tinto · Digital', bio:'Operationalises AI across mine sites at planetary scale; mentor at Startmate.', focus:['Product','AI Ops','Industry'] },
    { id:'i4', name:'Dashiell Park',    title:'Director, Cloud',       org:'Microsoft Azure',     bio:'Owns the APAC cloud strategy; advocate for open standards and edge inference.', focus:['Cloud','Strategy','Edge'] },
    { id:'i5', name:'Noor Abdelrahman', title:'Principal Engineer',    org:'Canva',               bio:'Lead architect on real-time collaborative design surfaces; conference circuit regular.', focus:['Realtime','Collab','Design Eng'] },
  ]
};

const PALETTE = {
  research: ['var(--c-cyan)','var(--c-blue)','var(--c-violet)','var(--c-magenta)','var(--c-lime)'],
  industry: ['var(--c-magenta)','var(--c-orange)','var(--c-lime)','var(--c-cyan)','var(--c-violet)'],
};

const Panelists = () => {
  const [panel, setPanel] = React.useState('research');
  const [open, setOpen] = React.useState(null); // index opened in modal
  const list = PANELISTS[panel];
  const colors = PALETTE[panel];

  // Lock body scroll when modal open
  React.useEffect(()=>{
    document.body.style.overflow = open !== null ? 'hidden' : '';
  },[open]);

  return (
    <section id="panelists" className="section-pad" style={{position:'relative'}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:32, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
        textTransform:'uppercase', color:'var(--ink-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="blueprint-label" style={{borderColor:'var(--c-magenta)', background:'rgba(255,92,182,0.08)', color:'var(--c-magenta)'}}>§ 02 — CATALOGUED</span></span>
        <span style={{color:'var(--ink-faint)'}}>CLICK A NODE TO OPEN DOSSIER</span>
      </div>

      <div className="panelists-head" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'baseline', marginBottom:64}}>
        <div>
          <h2 style={{
            fontFamily:'var(--sans)', fontWeight:700,
            fontSize:'clamp(48px, 8vw, 130px)', lineHeight:0.92,
            letterSpacing:'-0.05em', color:'var(--ink)', textWrap:'pretty'
          }}>
            Meet the<br/>
            <span style={{
              fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400,
              background:'linear-gradient(95deg, var(--c-cyan), var(--c-magenta), var(--c-orange))',
              WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent'
            }}>panelists.</span>
          </h2>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:24, paddingTop:24}}>
          <p style={{
            fontFamily:'var(--serif)', fontStyle:'italic',
            fontSize:'clamp(18px, 1.7vw, 24px)', lineHeight:1.5, color:'var(--ink-dim)',
            textWrap:'pretty', maxWidth:520
          }}>
            Two parallel panels run on the night — one charting the frontier
            of <U c="var(--c-cyan)">research</U>, one mapping the velocity of <U c="var(--c-magenta)">industry</U>.
            Toggle below to flip rosters.
          </p>
          <Toggle panel={panel} setPanel={setPanel}/>
        </div>
      </div>

      <Constellation list={list} colors={colors} onOpen={setOpen} key={panel}/>
      <Roster list={list} colors={colors} onOpen={setOpen} key={panel+'r'}/>

      {open !== null && (
        <PanelistModal p={list[open]} color={colors[open]} idx={open} panel={panel} onClose={()=>setOpen(null)}/>
      )}

      <style>{`
        @media (max-width:900px){
          .panelists-head{grid-template-columns:1fr !important; gap:32px !important; margin-bottom:48px !important}
        }
      `}</style>
    </section>
  );
};

const U = ({children, c}) => (
  <span style={{
    background:`linear-gradient(transparent 70%, ${c} 70%, ${c} 92%, transparent 92%)`,
    color:'var(--ink)', fontStyle:'italic', fontWeight:500
  }}>{children}</span>
);

const Toggle = ({panel, setPanel}) => {
  const wrapStyle = {
    display:'inline-flex', position:'relative',
    background:'rgba(15,24,64,0.5)', backdropFilter:'blur(12px)',
    border:'1px solid var(--c-cyan)',
    padding:4, gap:0, alignSelf:'flex-start'
  };
  const btn = (active) => ({
    padding:'14px 22px',
    fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
    textTransform:'uppercase',
    color: active ? 'var(--bg)' : 'var(--ink-dim)',
    transition:'color 0.4s', position:'relative', zIndex:2,
    cursor:'pointer', fontWeight:700
  });
  return (
    <div style={wrapStyle}>
      <div style={{
        position:'absolute', top:4, bottom:4,
        left: panel==='research' ? 4 : '50%',
        width:'calc(50% - 4px)',
        background: panel==='research' ? 'var(--c-cyan)' : 'var(--c-magenta)',
        transition:'left 0.5s cubic-bezier(.7,.2,.2,1), background 0.5s', zIndex:1,
        boxShadow: panel==='research' ? '0 0 24px rgba(76,240,255,0.6)' : '0 0 24px rgba(255,92,182,0.6)'
      }}/>
      <button style={btn(panel==='research')} onClick={()=>setPanel('research')}>
        <span style={{marginRight:10, opacity:0.7}}>[01]</span>RESEARCH
      </button>
      <button style={btn(panel==='industry')} onClick={()=>setPanel('industry')}>
        <span style={{marginRight:10, opacity:0.7}}>[02]</span>INDUSTRY
      </button>
    </div>
  );
};

const Constellation = ({list, colors, onOpen}) => {
  const W = 1200, H = 600;
  const POSITIONS = [
    {x:0.13, y:0.55},
    {x:0.32, y:0.22},
    {x:0.50, y:0.65},
    {x:0.68, y:0.25},
    {x:0.87, y:0.55},
  ];
  const nodes = list.map((p,i)=>({...p, x:POSITIONS[i].x*W, y:POSITIONS[i].y*H, color:colors[i]}));
  const edges = [[0,1],[1,2],[2,3],[3,4],[0,2],[2,4],[1,3]];
  const [hover, setHover] = React.useState(null);

  return (
    <div className="constellation-wrap" style={{
      position:'relative', width:'100%', aspectRatio:`${W}/${H}`, marginBottom:48,
      background:'rgba(15,24,64,0.45)', backdropFilter:'blur(12px)',
      border:'1px solid var(--c-cyan)',
      boxShadow:'0 0 0 1px rgba(76,240,255,0.15), 8px 8px 0 0 rgba(76,240,255,0.18)',
      overflow:'hidden'
    }}>
      {/* Brutalist label tab */}
      <div style={{
        position:'absolute', top:-1, left:-1,
        padding:'6px 14px', background:'var(--c-cyan)', color:'var(--bg)',
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', fontWeight:700, zIndex:2
      }}>
        STAR CHART · {list===PANELISTS.research?'RESEARCH':'INDUSTRY'}
      </div>
      <div style={{
        position:'absolute', top:-1, right:-1,
        padding:'6px 14px', background:'transparent', color:'var(--c-cyan)',
        border:'1px solid var(--c-cyan)', borderTopWidth:0, borderRightWidth:0,
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', fontWeight:700, zIndex:2
      }}>
        N=05
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:'100%', display:'block'}}>
        <defs>
          <pattern id="constGrid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(91,140,255,0.10)" strokeWidth="0.5"/>
          </pattern>
          {colors.map((c,i)=>(
            <radialGradient id={`g${i}`} key={i}>
              <stop offset="0%" stopColor={c} stopOpacity="0.7"/>
              <stop offset="100%" stopColor={c} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>
        <rect width={W} height={H} fill="url(#constGrid2)"/>

        {/* Crosshair markers in corners */}
        {[[40,40],[W-40,40],[40,H-40],[W-40,H-40]].map(([cx,cy],i)=>(
          <g key={i} stroke="var(--c-cyan)" strokeWidth="0.6" opacity="0.5">
            <line x1={cx-10} y1={cy} x2={cx+10} y2={cy}/>
            <line x1={cx} y1={cy-10} x2={cx} y2={cy+10}/>
          </g>
        ))}

        {/* Edges */}
        {edges.map(([a,b],i)=>{
          const A = nodes[a], B = nodes[b];
          const isActive = hover===a || hover===b;
          return (
            <line key={i}
              x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke={isActive ? A.color : 'rgba(140,200,255,0.25)'}
              strokeWidth={isActive ? 1.5 : 0.7}
              strokeDasharray={isActive ? '0' : '3 5'}
              style={{transition:'all 0.4s'}}
            />
          );
        })}

        {/* Pulses traveling */}
        {edges.slice(0,4).map(([a,b],i)=>{
          const A = nodes[a], B = nodes[b];
          return (
            <circle key={`p${i}`} r="2.5" fill={A.color}>
              <animateMotion dur={`${5+i}s`} repeatCount="indefinite"
                path={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}/>
            </circle>
          );
        })}

        {/* Nodes */}
        {nodes.map((n,i)=>{
          const isHover = hover===i;
          return (
            <g key={n.id}
               style={{cursor:'pointer'}}
               onMouseEnter={()=>setHover(i)}
               onMouseLeave={()=>setHover(null)}
               onClick={()=>onOpen(i)}>
              <circle cx={n.x} cy={n.y} r={isHover ? 60 : 40} fill={`url(#g${i})`} style={{transition:'r 0.4s'}}/>
              <circle cx={n.x} cy={n.y} r={isHover ? 22 : 16}
                fill="var(--bg)" stroke={n.color} strokeWidth="2"
                style={{transition:'all 0.4s', filter:isHover?`drop-shadow(0 0 14px ${n.color})`:'none'}}/>
              <circle cx={n.x} cy={n.y} r={isHover ? 7 : 5} fill={n.color}/>

              <text x={n.x} y={n.y - 32} textAnchor="middle"
                fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2"
                fill={isHover ? n.color : 'var(--ink-faint)'}
                fontWeight="700"
                style={{transition:'fill 0.3s'}}>
                [0{i+1}]
              </text>
              <text x={n.x} y={n.y + 50} textAnchor="middle"
                fontFamily="Instrument Serif" fontSize="22" fontWeight="400"
                fill="var(--ink)">
                {n.name}
              </text>
              <text x={n.x} y={n.y + 70} textAnchor="middle"
                fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.6"
                fill={isHover ? n.color : 'var(--ink-dim)'} fontWeight="500"
                style={{transition:'fill 0.3s'}}>
                {n.title.toUpperCase()} · TAP
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Roster = ({list, colors, onOpen}) => (
  <div style={{
    background:'rgba(15,24,64,0.45)', backdropFilter:'blur(12px)',
    border:'1px solid var(--line-bright)', overflow:'hidden'
  }}>
    {list.map((p,i)=>(
      <RosterRow key={p.id} p={p} i={i} color={colors[i]}
        onClick={()=>onOpen(i)}
        last={i===list.length-1}/>
    ))}
  </div>
);

const RosterRow = ({p, i, color, onClick, last}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick}
         onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
         className="roster-row"
         style={{
      borderBottom: last ? 'none' : '1px solid var(--line)',
      padding:'24px 28px',
      display:'grid',
      gridTemplateColumns:'48px 1.4fr 1.4fr 100px',
      gap:20, alignItems:'center',
      cursor:'pointer', position:'relative',
      background: hover ? `linear-gradient(90deg, ${color}22, transparent)` : 'transparent',
      transition:'background 0.4s'
    }}>
      {hover && <div style={{position:'absolute', left:0, top:0, bottom:0, width:3, background:color}}/>}
      <span style={{
        fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.18em',
        color: hover?color:'var(--ink-faint)',
        transition:'color 0.3s', fontWeight:700
      }}>[0{i+1}]</span>
      <span style={{
        fontFamily:'var(--sans)', fontWeight:600,
        fontSize:'clamp(20px, 2.4vw, 32px)', lineHeight:1.1, color:'var(--ink)',
        letterSpacing:'-0.02em'
      }}>
        {p.name}
      </span>
      <div style={{display:'flex', flexDirection:'column', gap:4}}>
        <span className="row-title" style={{
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
          textTransform:'uppercase',
          color: hover?color:'var(--ink-dim)', transition:'color 0.3s', fontWeight:600
        }}>
          {p.title}
        </span>
        <span className="row-org" style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:16, color:'var(--ink-dim)'}}>
          {p.org}
        </span>
      </div>
      <span style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
        color: hover?color:'var(--ink-faint)', transition:'color 0.3s',
        fontWeight:700, textAlign:'right'
      }}>
        OPEN ↗
      </span>
      <style>{`
        @media (max-width:720px){
          .roster-row{grid-template-columns:36px 1fr 60px !important; padding:18px 16px !important}
          .roster-row > div{grid-column:2 / span 1 !important}
          .roster-row .row-title{font-size:9px !important}
          .roster-row .row-org{font-size:13px !important}
        }
      `}</style>
    </div>
  );
};

const PanelistModal = ({p, color, idx, panel, onClose}) => {
  React.useEffect(()=>{
    const onKey = (e)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[onClose]);

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:100,
      background:'rgba(6,9,26,0.85)', backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px', animation:'modalFade 0.3s ease'
    }}>
      <div onClick={e=>e.stopPropagation()} className="modal-card" style={{
        position:'relative',
        width:'100%', maxWidth:720,
        background:'var(--bg-2)',
        border:`1px solid ${color}`,
        boxShadow:`0 0 0 1px ${color}40, 0 0 80px ${color}30, 12px 12px 0 0 ${color}80`,
        animation:'modalIn 0.4s cubic-bezier(.2,.8,.2,1)',
        maxHeight:'90vh', overflowY:'auto'
      }}>
        {/* Header strip */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'14px 20px',
          background:color, color:'var(--bg)',
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
          textTransform:'uppercase', fontWeight:700
        }}>
          <span>DOSSIER · {panel.toUpperCase()} · 0{idx+1}/05</span>
          <button onClick={onClose} style={{fontWeight:700, fontSize:14, cursor:'pointer'}}>✕ CLOSE</button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{padding:'40px', display:'grid', gridTemplateColumns:'180px 1fr', gap:32}}>
          {/* Avatar placeholder */}
          <div>
            <div style={{
              width:160, height:200,
              background:`linear-gradient(135deg, ${color}40, ${color}10)`,
              border:`1px solid ${color}`, position:'relative', overflow:'hidden'
            }}>
              <svg viewBox="0 0 160 200" style={{width:'100%', height:'100%'}}>
                <defs>
                  <pattern id="ap" width="8" height="8" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke={color} strokeOpacity="0.3" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="160" height="200" fill="url(#ap)"/>
                <circle cx="80" cy="80" r="36" fill="none" stroke={color} strokeWidth="1.5"/>
                <circle cx="80" cy="80" r="50" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3 3"/>
                <text x="80" y="90" textAnchor="middle" fontFamily="Instrument Serif" fontSize="42" fontStyle="italic" fill={color}>
                  {p.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </text>
                <text x="80" y="156" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="1.5" fill={color}>SUBJECT</text>
                <text x="80" y="172" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="1.5" fill={color}>{p.id.toUpperCase()}</text>
              </svg>
            </div>
            <div style={{
              marginTop:12, fontFamily:'var(--mono)', fontSize:9,
              letterSpacing:'0.22em', color:'var(--ink-faint)',
              textTransform:'uppercase', textAlign:'center'
            }}>
              ID · {p.id.toUpperCase()}-2026
            </div>
          </div>

          <div>
            <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', color, fontWeight:700, marginBottom:8}}>
              [{p.id.toUpperCase()}] · PANEL CONTRIBUTOR
            </div>
            <h3 style={{
              fontFamily:'var(--sans)', fontWeight:700,
              fontSize:'clamp(28px, 4vw, 48px)', lineHeight:1.05, letterSpacing:'-0.03em',
              color:'var(--ink)', marginBottom:8
            }}>{p.name}</h3>
            <div style={{
              fontFamily:'var(--serif)', fontStyle:'italic', fontSize:20,
              color:'var(--ink-dim)', marginBottom:24
            }}>
              {p.title} · <span style={{color}}>{p.org}</span>
            </div>

            {/* Focus tags */}
            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:24}}>
              {p.focus.map((f,i)=>(
                <span key={i} style={{
                  padding:'5px 10px',
                  border:`1px solid ${color}`, color,
                  fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
                  textTransform:'uppercase', fontWeight:600
                }}>{f}</span>
              ))}
            </div>

            <div style={{
              padding:'20px',
              background:'rgba(6,9,26,0.6)',
              border:`1px dashed ${color}80`,
              fontFamily:'var(--serif)', fontSize:18, lineHeight:1.6,
              color:'var(--ink)', textWrap:'pretty', marginBottom:24
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'0.22em', color, fontWeight:700, marginBottom:10, textTransform:'uppercase'}}>
                ⌖ FIELD NOTES
              </div>
              {p.bio}
            </div>

            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <button style={{
                padding:'12px 18px', background:color, color:'var(--bg)',
                fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
                fontWeight:700, textTransform:'uppercase', cursor:'pointer',
                border:`1px solid ${color}`
              }}>+ ADD TO RSVP</button>
              <button onClick={onClose} style={{
                padding:'12px 18px',
                fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
                fontWeight:700, textTransform:'uppercase', cursor:'pointer',
                border:'1px solid var(--line-bright)', color:'var(--ink)'
              }}>← BACK TO LINEUP</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalFade{from{opacity:0}to{opacity:1}}
        @keyframes modalIn{from{opacity:0;transform:translateY(20px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media (max-width:720px){
          .modal-body{grid-template-columns:1fr !important; padding:24px !important; gap:20px !important}
          .modal-body > div:first-child{display:flex; flex-direction:column; align-items:center}
        }
      `}</style>
    </div>
  );
};

window.Panelists = Panelists;
