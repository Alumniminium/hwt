import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

export default function GarageBackground() {
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!canvasRef) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

    // Isometric camera setup
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      100
    );

    // Position camera for isometric view (45° horizontal, ~35° vertical)
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor tiles pattern
    const tileSize = 2;
    for (let x = -10; x < 10; x += tileSize) {
      for (let z = -10; z < 10; z += tileSize) {
        if ((x / tileSize + z / tileSize) % 2 === 0) {
          const tileGeometry = new THREE.PlaneGeometry(tileSize - 0.1, tileSize - 0.1);
          const tileMaterial = new THREE.MeshStandardMaterial({
            color: 0x252525,
            roughness: 0.9,
          });
          const tile = new THREE.Mesh(tileGeometry, tileMaterial);
          tile.rotation.x = -Math.PI / 2;
          tile.position.set(x + tileSize / 2, 0.01, z + tileSize / 2);
          scene.add(tile);
        }
      }
    }

    // Back wall
    const wallGeometry = new THREE.PlaneGeometry(20, 8);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.9,
    });
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 4, -10);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 4, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 4, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Workbench (simple minimalist table)
    const benchTop = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.1, 2),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a })
    );
    benchTop.position.set(-5, 1.5, -8);
    benchTop.castShadow = true;
    scene.add(benchTop);

    // Bench legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });

    [-1.8, 1.8].forEach(x => {
      [-0.8, 0.8].forEach(z => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(-5 + x, 0.75, -8 + z);
        leg.castShadow = true;
        scene.add(leg);
      });
    });

    // Shelving unit
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x2d2d2d });
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.08, 0.8),
        shelfMaterial
      );
      shelf.position.set(6, 1 + i * 1.2, -9.5);
      shelf.castShadow = true;
      scene.add(shelf);
    }

    // Side supports for shelves
    [-1.4, 1.4].forEach(x => {
      const support = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 4, 0.8),
        shelfMaterial
      );
      support.position.set(6 + x, 2, -9.5);
      scene.add(support);
    });

    // Small boxes on shelves (clutter)
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
    [
      { x: 5.5, y: 1.1, z: -9.5 },
      { x: 6.3, y: 1.1, z: -9.5 },
      { x: 6.8, y: 2.3, z: -9.5 },
    ].forEach(pos => {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.3, 0.4),
        boxMaterial
      );
      box.position.set(pos.x, pos.y, pos.z);
      box.castShadow = true;
      scene.add(box);
    });

    // Handle window resize
    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = (frustumSize * aspect) / -2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        'z-index': 0,
        'pointer-events': 'none',
      }}
    />
  );
}
