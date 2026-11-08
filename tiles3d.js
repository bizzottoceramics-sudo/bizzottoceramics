(function () {
  const canvas = document.getElementById('tile3d');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 6, 9);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const light = new THREE.DirectionalLight(0xffffff, 0.9);
  light.position.set(5, 10, 7);
  scene.add(light);

  const colors = [0xf6f3ee, 0xb5573a, 0x1e1e1e, 0xd9c9a8];
  const N = innerWidth < 700 ? 5 : 8;
  const size = 1.2, gap = 0.08;
  const group = new THREE.Group();
  scene.add(group);
  const tiles = [];

  for (let x = 0; x < N; x++) {
    for (let z = 0; z < N; z++) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size, 0.12, size),
        new THREE.MeshStandardMaterial({
          color: colors[(x + z) % colors.length],
          roughness: 0.25,
          metalness: 0.1
        })
      );
      mesh.position.set((x - N / 2) * (size + gap), 0, (z - N / 2) * (size + gap));
      mesh.userData.d = Math.hypot(x - N / 2, z - N / 2);
      group.add(mesh);
      tiles.push(mesh);
    }
  }

  let target = 0, current = 0;
  function onScroll() {
    const max = document.body.scrollHeight - innerHeight;
    target = max > 0 ? scrollY / max : 0;
  }
  addEventListener('scroll', onScroll);
  onScroll();

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    current += (target - current) * 0.06;
    const t = clock.getElapsedTime();

    group.rotation.y = current * Math.PI * 2;
    camera.position.y = 6 - current * 3;
    camera.lookAt(0, 0, 0);

    tiles.forEach((m) => {
      const d = m.userData.d;
      m.position.y = Math.sin(t * 1.5 + d * 0.6) * 0.15;
      m.rotation.x = Math.sin(current * Math.PI * 2 + d * 0.5) * 0.6;
    });

    renderer.render(scene, camera);
  }
  animate();
})();
