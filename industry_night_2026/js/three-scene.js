// 3D rotating object — neo-brutalist wireframe geometry
(function(){
  if (typeof THREE === 'undefined') {
    console.warn('three.js not loaded');
    return;
  }
  const stage = document.getElementById('three-stage');
  if (!stage) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);

  // Group holding the rotating object
  const group = new THREE.Group();
  scene.add(group);

  // ---- Inner solid: dark icosahedron with a faint emissive look
  const innerGeo = new THREE.IcosahedronGeometry(1.55, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x15151B,
    transparent: true,
    opacity: 0.95,
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerMesh);

  // ---- Wireframe overlay (signal blue)
  const wireGeo = new THREE.IcosahedronGeometry(1.58, 2);
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x2A2BFF,
    transparent: true,
    opacity: 0.85,
  });
  const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(wireGeo), wireMat);
  group.add(wireframe);

  // ---- Outer cage: larger, sparser, acid lime
  const cageGeo = new THREE.IcosahedronGeometry(2.4, 0);
  const cageMat = new THREE.LineBasicMaterial({
    color: 0xC5FF2E,
    transparent: true,
    opacity: 0.55,
  });
  const cage = new THREE.LineSegments(new THREE.WireframeGeometry(cageGeo), cageMat);
  group.add(cage);

  // ---- Edge glow ring (a torus seen edge-on)
  const ringGeo = new THREE.TorusGeometry(2.9, 0.012, 8, 96);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xC5FF2E, transparent:true, opacity:0.7 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI/2.2;
  group.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.3, 0.008, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0x2A2BFF, transparent:true, opacity:0.5 })
  );
  ring2.rotation.x = Math.PI/3;
  ring2.rotation.z = Math.PI/4;
  group.add(ring2);

  // ---- Floating point dots around the cage (subtle stars belonging to the object)
  const dotsGeo = new THREE.BufferGeometry();
  const N = 80;
  const positions = new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const r = 2.6 + Math.random()*1.4;
    const t = Math.random()*Math.PI*2;
    const p = (Math.random()-0.5)*Math.PI;
    positions[i*3]   = r*Math.cos(p)*Math.cos(t);
    positions[i*3+1] = r*Math.sin(p);
    positions[i*3+2] = r*Math.cos(p)*Math.sin(t);
  }
  dotsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dotsMat = new THREE.PointsMaterial({
    color: 0xECE7DB, size: 0.04, transparent:true, opacity:0.7, sizeAttenuation:true
  });
  const dots = new THREE.Points(dotsGeo, dotsMat);
  group.add(dots);

  // Mouse parallax
  let mx = 0, my = 0;
  let tx = 0, ty = 0;
  window.addEventListener('mousemove', (e)=>{
    mx = (e.clientX/window.innerWidth - 0.5);
    my = (e.clientY/window.innerHeight - 0.5);
  });

  // Resize
  function resize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Push group right & adjust scale on small screens
    if(window.innerWidth < 760){
      group.position.set(0, -0.6, 0);
      group.scale.setScalar(0.7);
    } else {
      group.position.set(0, 0, 0);
      group.scale.setScalar(1);
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // Hide while user has scrolled past hero (perf)
  let visible = true;
  window.addEventListener('scroll', ()=>{
    visible = window.scrollY < window.innerHeight * 1.2;
    stage.style.opacity = visible ? '1' : '0';
  }, { passive:true });

  const clock = new THREE.Clock();
  function tick(){
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();
    if(visible){
      // Smoothly track mouse
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;

      group.rotation.y = t * 0.18 + tx * 0.6;
      group.rotation.x = Math.sin(t*0.12) * 0.18 + ty * 0.4;

      wireframe.rotation.y = -t * 0.05;
      cage.rotation.y =  t * 0.07;
      cage.rotation.x = -t * 0.04;

      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.18;

      dots.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
