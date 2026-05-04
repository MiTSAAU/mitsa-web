// 3D Tilt wrapper: tilts child on cursor, no-op on touch/mobile
const Tilt = ({children, max=10, scale=1, style, className}) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({rx:0, ry:0, on:false});
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(max-width:720px)').matches;

  if(isTouch){
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({rx: (0.5 - y) * max * 2, ry: (x - 0.5) * max * 2, on:true});
  };
  const onLeave = () => setT({rx:0, ry:0, on:false});

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.on?scale:1})`,
        transition: t.on ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(.2,.8,.2,1)',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

window.Tilt = Tilt;
