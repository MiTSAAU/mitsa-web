// Panelists — neo-brutalist constellation + roster on DARK ground (the night)
const PANELISTS = {
  research: [
    { id:'r1', name:'Dr. Vega Aurelius',  image:'', title:'Computational Astrophysics', org:'Adelaide Uni · School of Physics',  bio:'Investigates emergent structure in high-dimensional cosmological data; lead PI on the SPECTRA pipeline.', focus:['Cosmology','ML','Imaging'] },
    { id:'r2', name:'Dr. Lyra Okonkwo',   image:'', title:'Quantum Information',         org:'Curtin · Quantum Lab',     bio:'Builds error-corrected qubit topologies; founding member of the National Quantum Initiative.', focus:['Quantum','Hardware','Theory'] },
    { id:'r3', name:'Dr. Orion Mehta',    image:'', title:'Machine Perception',          org:'CSIRO Data61',             bio:'Self-supervised vision systems for satellite & seismic imagery; 60+ peer-reviewed publications.', focus:['Computer Vision','Self-Supervised','Geo'] },
    { id:'r4', name:'Dr. Cassia Reyes',   image:'', title:'Bioinformatics',              org:'Telethon Kids Institute',  bio:'Translates omics data into clinical decision tools; recipient of the 2025 Eureka Prize.', focus:['Genomics','Clinical AI','Health'] },
    { id:'r5', name:'Dr. Atlas Henrikson',image:'', title:'Robotics & Autonomy',         org:'Adelaide Uni Robotics Group',       bio:'Designs control architectures for subsea autonomous vehicles; ex-DeepMind research scientist.', focus:['Robotics','Control','Autonomy'] },
  ],
  industry: [
    { id:'i1', name:'Matthew Hobson', image:'', title:'Senior Leader', org:'Databricks', bio:'Works with organisations on the real-world path to scaled AI, with public commentary around data access, AI adoption, trust and measurable value through the Databricks ecosystem.', focus:['Data + AI','Lakehouse','AI Strategy'] },
    { id:'i2', name:'Kat Docking', image:'', title:'Digital & Technology Graduate', org:'SA Power Networks', bio:'A Digital and Technology Graduate at SA Power Networks, South Australia’s electricity distributor, with early project experience connecting software, asset data and infrastructure insight.', focus:['Digital Tech','Utilities','Energy'] },
    { id:'i3', name:'Binduja Sasi', image:'', title:'Procurement Professional', org:'Dept for Infrastructure & Transport', bio:'A procurement professional at South Australia’s Department for Infrastructure and Transport, working across goods, services and construction in a large public infrastructure environment.', focus:['Procurement','Infrastructure','Public Sector'] },
    { id:'i4', name:'Toby Lewis', image:'', title:'Digital Strategy Executive', org:'Dept of Treasury & Finance', bio:'A solutions-focused senior executive with digital strategy expertise at South Australia’s Department of Treasury and Finance, where digital services support public value and state outcomes.', focus:['Digital Strategy','Government','Investment'] },
    { id:'i5', name:'Networking Guests', image:'', title:'Additional Industry Guests', org:'Networking Session', bio:'Additional guests will join the networking session, giving students more chances to connect with people working across technology, infrastructure, energy, government and data-led organisations.', focus:['Networking','Careers','Industry'] },
  ]
};

const PALETTE = {
  research: ['var(--signal)','var(--acid)','var(--signal)','var(--warn)','var(--acid)'],
  industry: ['var(--warn)','var(--acid)','var(--signal)','var(--warn)','var(--signal)'],
};

const Panelists = () => {
  const [panel, setPanel] = React.useState('research');
  const [open, setOpen] = React.useState(null);
  const list = PANELISTS[panel];
  const colors = PALETTE[panel];

  React.useEffect(()=>{
    document.body.style.overflow = open !== null ? 'hidden' : '';
  },[open]);

  return (
    <section id="panelists" className="section-pad" style={{position:'relative', background:'var(--night)'}}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:32, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
        textTransform:'uppercase', color:'var(--paper-on-night-dim)', flexWrap:'wrap', gap:8
      }}>
        <span><span className="tape warn">§ 02 — CATALOGUED</span></span>
        <span style={{color:'var(--paper-on-night-faint)'}}>CLICK A NODE TO OPEN DOSSIER</span>
      </div>

      <div className="panelists-head" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'baseline', marginBottom:64}}>
        <div>
          <h2 className="display" style={{
            fontFamily:'var(--display)', fontWeight:400,
            fontSize:'clamp(56px, 9vw, 150px)', lineHeight:0.86,
            letterSpacing:'-0.05em', color:'var(--paper-on-night)', textWrap:'pretty'
          }}>
            MEET THE<br/>
            <span style={{
              color:'transparent',
              WebkitTextStroke:'2px var(--acid)'
            }}>PANELISTS.</span>
          </h2>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:24, paddingTop:16}}>
          <p style={{
            fontFamily:'var(--sans)', fontWeight:500,
            fontSize:'clamp(16px, 1.5vw, 20px)', lineHeight:1.5, color:'var(--paper-on-night-dim)',
            textWrap:'pretty', maxWidth:520
          }}>
            Two parallel panels run on the night — one charting the frontier of <PanelistsUnderline c="var(--signal)">research</PanelistsUnderline>, one mapping the velocity of <PanelistsUnderline c="var(--acid)">industry</PanelistsUnderline>. Toggle below to flip rosters.
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

const PanelistsUnderline = ({children, c}) => (
  <span style={{
    background:`linear-gradient(transparent 78%, ${c} 78%, ${c} 96%, transparent 96%)`,
    color:'var(--paper-on-night)', fontWeight:700
  }}>{children}</span>
);

const Toggle = ({panel, setPanel}) => {
  const wrapStyle = {
    display:'inline-flex', position:'relative',
    background:'var(--night)',
    border:'1.5px solid var(--paper-on-night)',
    padding:0, gap:0, alignSelf:'flex-start'
  };
  const btn = (active, color) => ({
    padding:'14px 22px',
    fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.22em',
    textTransform:'uppercase',
    color: active ? 'var(--night)' : 'var(--paper-on-night-dim)',
    background: active ? color : 'transparent',
    transition:'color 0.25s, background 0.25s',
    cursor:'pointer', fontWeight:700,
    borderRight: active ? 'none' : '0'
  });
  return (
    <div style={wrapStyle}>
      <button style={btn(panel==='research', 'var(--signal)')} onClick={()=>setPanel('research')}>
        <span style={{marginRight:10, opacity:0.7}}>[01]</span>RESEARCH
      </button>
      <button style={{...btn(panel==='industry', 'var(--acid)'), borderLeft:'1.5px solid var(--paper-on-night)'}} onClick={()=>setPanel('industry')}>
        <span style={{marginRight:10, opacity:0.7}}>[02]</span>INDUSTRY
      </button>
    </div>
  );
};

const Constellation = ({list, colors, onOpen}) => {
  const W = 1200, H = 600;
  const POSITIONS = [
    {x:0.13, y:0.55},{x:0.32, y:0.22},{x:0.50, y:0.65},{x:0.68, y:0.25},{x:0.87, y:0.55},
  ];
  const nodes = list.map((p,i)=>({...p, x:POSITIONS[i].x*W, y:POSITIONS[i].y*H, color:colors[i]}));
  const edges = [[0,1],[1,2],[2,3],[3,4],[0,2],[2,4],[1,3]];
  const [hover, setHover] = React.useState(null);

  return (
    <div className="constellation-wrap" style={{
      position:'relative', width:'100%', aspectRatio:`${W}/${H}`, marginBottom:24,
      background:'var(--night-2)',
      border:'1.5px solid var(--paper-on-night)',
      overflow:'hidden'
    }}>
      <div style={{
        position:'absolute', top:0, left:0,
        padding:'8px 14px', background:'var(--acid)', color:'var(--night)',
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', fontWeight:700, zIndex:2,
        borderRight:'1.5px solid var(--night)', borderBottom:'1.5px solid var(--night)'
      }}>
        STAR CHART · {list===PANELISTS.research?'RESEARCH':'INDUSTRY'}
      </div>
      <div style={{
        position:'absolute', top:0, right:0,
        padding:'8px 14px', background:'var(--night)', color:'var(--acid)',
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', fontWeight:700, zIndex:2,
        borderLeft:'1.5px solid var(--paper-on-night)', borderBottom:'1.5px solid var(--paper-on-night)'
      }}>
        N=05
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:'100%', display:'block'}}>
        <defs>
          <pattern id="constGrid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(236,231,219,0.08)" strokeWidth="0.5"/>
          </pattern>
          {colors.map((c,i)=>(
            <radialGradient id={`g${i}`} key={i}>
              <stop offset="0%" stopColor={c} stopOpacity="0.5"/>
              <stop offset="100%" stopColor={c} stopOpacity="0"/>
            </radialGradient>
          ))}
        </defs>
        <rect width={W} height={H} fill="url(#constGrid2)"/>

        {[[40,40],[W-40,40],[40,H-40],[W-40,H-40]].map(([cx,cy],i)=>(
          <g key={i} stroke="var(--paper-on-night-dim)" strokeWidth="0.6" opacity="0.6">
            <line x1={cx-10} y1={cy} x2={cx+10} y2={cy}/>
            <line x1={cx} y1={cy-10} x2={cx} y2={cy+10}/>
          </g>
        ))}

        {edges.map(([a,b],i)=>{
          const A = nodes[a], B = nodes[b];
          const isActive = hover===a || hover===b;
          return (
            <line key={i}
              x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke={isActive ? A.color : 'rgba(236,231,219,0.25)'}
              strokeWidth={isActive ? 1.5 : 0.7}
              strokeDasharray={isActive ? '0' : '3 5'}
              style={{transition:'all 0.4s'}}
            />
          );
        })}

        {edges.slice(0,4).map(([a,b],i)=>{
          const A = nodes[a], B = nodes[b];
          return (
            <circle key={`p${i}`} r="2.5" fill={A.color}>
              <animateMotion dur={`${5+i}s`} repeatCount="indefinite"
                path={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}/>
            </circle>
          );
        })}

        {nodes.map((n,i)=>{
          const isHover = hover===i;
          return (
            <g key={n.id}
               style={{cursor:'pointer'}}
               onMouseEnter={()=>setHover(i)}
               onMouseLeave={()=>setHover(null)}
               onClick={()=>onOpen(i)}>
              <circle cx={n.x} cy={n.y} r={isHover ? 60 : 40} fill={`url(#g${i})`} style={{transition:'r 0.4s'}}/>
              <defs>
                <clipPath id={`avatarClip${i}`}>
                  <circle cx={n.x} cy={n.y} r={isHover ? 32 : 26}/>
                </clipPath>
                <pattern id={`hatch${i}`} width="6" height="6" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke={n.color} strokeOpacity="0.35" strokeWidth="1"/>
                </pattern>
              </defs>
              {n.image ? (
                <image href={n.image} x={n.x - (isHover?32:26)} y={n.y - (isHover?32:26)}
                  width={isHover?64:52} height={isHover?64:52}
                  preserveAspectRatio="xMidYMid slice" clipPath={`url(#avatarClip${i})`}
                  style={{transition:'all 0.3s'}}/>
              ) : (
                <>
                  <circle cx={n.x} cy={n.y} r={isHover ? 32 : 26} fill="var(--night)"
                    style={{transition:'r 0.3s'}}/>
                  <circle cx={n.x} cy={n.y} r={isHover ? 32 : 26} fill={`url(#hatch${i})`}
                    style={{transition:'r 0.3s'}}/>
                  <text x={n.x} y={n.y + 4} textAnchor="middle"
                    fontFamily="Archivo Black" fontSize={isHover?14:12}
                    fill={n.color} style={{transition:'all 0.3s'}}>
                    {n.name.replace(/^Dr\.\s*/,'').split(' ').map(w=>w[0]).slice(0,2).join('')}
                  </text>
                </>
              )}
              <circle cx={n.x} cy={n.y} r={isHover ? 32 : 26}
                fill="none" stroke={n.color} strokeWidth="2"
                style={{transition:'all 0.3s',
                  filter:isHover?`drop-shadow(0 0 14px ${n.color})`:'none'}}/>
              {/* tiny tick marks around the ring */}
              {[0,90,180,270].map(deg=>{
                const a = deg*Math.PI/180;
                const r = isHover ? 32 : 26;
                return (
                  <line key={deg}
                    x1={n.x + Math.cos(a)*r} y1={n.y + Math.sin(a)*r}
                    x2={n.x + Math.cos(a)*(r+5)} y2={n.y + Math.sin(a)*(r+5)}
                    stroke={n.color} strokeWidth="1.5" style={{transition:'all 0.3s'}}/>
                );
              })}

              <text x={n.x} y={n.y - 32} textAnchor="middle"
                fontFamily="Space Mono" fontSize="9" letterSpacing="2"
                fill={isHover ? n.color : 'var(--paper-on-night-faint)'}
                fontWeight="700">
                [0{i+1}]
              </text>
              <text x={n.x} y={n.y + 50} textAnchor="middle"
                fontFamily="Archivo Black" fontSize="18" fontWeight="400"
                fill="var(--paper-on-night)">
                {n.name.toUpperCase()}
              </text>
              <text x={n.x} y={n.y + 70} textAnchor="middle"
                fontFamily="Space Mono" fontSize="9" letterSpacing="1.6"
                fill={isHover ? n.color : 'var(--paper-on-night-dim)'} fontWeight="500"
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
    background:'var(--night-2)',
    border:'1.5px solid var(--paper-on-night)',
    overflow:'hidden'
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
      borderBottom: last ? 'none' : '1px solid var(--rule-on-night)',
      padding:'24px 28px',
      display:'grid',
      gridTemplateColumns:'48px 1.4fr 1.4fr 100px',
      gap:20, alignItems:'center',
      cursor:'pointer', position:'relative',
      background: hover ? color : 'transparent',
      color: hover ? 'var(--night)' : 'var(--paper-on-night)',
      transition:'background 0.2s, color 0.2s'
    }}>
      <span style={{
        fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.18em',
        fontWeight:700
      }}>[0{i+1}]</span>
      <span className="display" style={{
        fontFamily:'var(--display)', fontWeight:400,
        fontSize:'clamp(20px, 2.6vw, 36px)', lineHeight:1, letterSpacing:'-0.03em',
        textTransform:'uppercase'
      }}>
        {p.name}
      </span>
      <div style={{display:'flex', flexDirection:'column', gap:4}}>
        <span className="row-title" style={{
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
          textTransform:'uppercase', fontWeight:700
        }}>
          {p.title}
        </span>
        <span className="row-org" style={{fontFamily:'var(--sans)', fontWeight:500, fontSize:14, opacity:0.7}}>
          {p.org}
        </span>
      </div>
      <span style={{
        fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
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
      background:'rgba(11,11,15,0.85)', backdropFilter:'blur(6px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px', animation:'modalFade 0.3s ease'
    }}>
      <div onClick={e=>e.stopPropagation()} className="modal-card" style={{
        position:'relative',
        width:'100%', maxWidth:720,
        background:'var(--night)',
        border:`2px solid ${color}`,
        boxShadow:`12px 12px 0 0 ${color}`,
        animation:'modalIn 0.3s cubic-bezier(.2,.8,.2,1)',
        maxHeight:'90vh', overflowY:'auto'
      }}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'14px 20px',
          background:color, color:'var(--night)',
          fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em',
          textTransform:'uppercase', fontWeight:700,
          borderBottom:`2px solid ${color}`
        }}>
          <span>DOSSIER · {panel.toUpperCase()} · 0{idx+1}/05</span>
          <button onClick={onClose} style={{fontWeight:700, fontSize:12, cursor:'pointer'}}>✕ CLOSE</button>
        </div>

        <div className="modal-body" style={{padding:'36px', display:'grid', gridTemplateColumns:'180px 1fr', gap:32}}>
          <div>
            <div style={{
              width:160, height:160, borderRadius:'50%',
              background:`var(--night-2)`,
              border:`2px solid ${color}`, position:'relative', overflow:'hidden',
              boxShadow:`6px 6px 0 0 ${color}`
            }}>
              {p.image ? (
                <img src={p.image} alt={p.name}
                  style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
              ) : (
                <svg viewBox="0 0 160 160" style={{width:'100%', height:'100%'}}>
                  <defs>
                    <pattern id={`mhatch_${p.id}`} width="6" height="6" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="6" y2="6" stroke={color} strokeOpacity="0.22" strokeWidth="0.8"/>
                    </pattern>
                  </defs>
                  <rect width="160" height="160" fill={`url(#mhatch_${p.id})`}/>
                  <text x="80" y="92" textAnchor="middle" fontFamily="Archivo Black" fontSize="48" fill={color}>
                    {p.name.replace(/^Dr\.\s*/,'').split(' ').map(w=>w[0]).slice(0,2).join('')}
                  </text>
                </svg>
              )}
            </div>
            <div style={{
              marginTop:12, fontFamily:'var(--mono)', fontSize:9,
              letterSpacing:'0.22em', color:'var(--paper-on-night-faint)',
              textTransform:'uppercase', textAlign:'center'
            }}>
              ID · {p.id.toUpperCase()}-2026
            </div>
          </div>

          <div>
            <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.22em', color, fontWeight:700, marginBottom:8}}>
              [{p.id.toUpperCase()}] · PANEL CONTRIBUTOR
            </div>
            <h3 className="display" style={{
              fontFamily:'var(--display)', fontWeight:400,
              fontSize:'clamp(28px, 4vw, 48px)', lineHeight:0.9, letterSpacing:'-0.03em',
              color:'var(--paper-on-night)', marginBottom:8, textTransform:'uppercase'
            }}>{p.name}</h3>
            <div style={{
              fontFamily:'var(--mono)', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase',
              color:'var(--paper-on-night-dim)', marginBottom:24, fontWeight:600
            }}>
              {p.title} · <span style={{color}}>{p.org}</span>
            </div>

            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:24}}>
              {p.focus.map((f,i)=>(
                <span key={i} style={{
                  padding:'5px 10px',
                  border:`1.5px solid ${color}`, color,
                  fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.18em',
                  textTransform:'uppercase', fontWeight:700
                }}>{f}</span>
              ))}
            </div>

            <div style={{
              padding:'20px',
              background:'var(--night-2)',
              border:`1.5px dashed ${color}`,
              fontFamily:'var(--sans)', fontWeight:500,
              fontSize:15, lineHeight:1.6,
              color:'var(--paper-on-night)', textWrap:'pretty', marginBottom:24
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:9, letterSpacing:'0.22em', color, fontWeight:700, marginBottom:10, textTransform:'uppercase'}}>
                ⌖ FIELD NOTES
              </div>
              {p.bio}
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
