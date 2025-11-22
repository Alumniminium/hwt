import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

export default function GarageBackground() {
  let canvasRef: HTMLCanvasElement | undefined;
  let animationFrameId: number;
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.OrthographicCamera;
  let scene: THREE.Scene;

  const createFlatMaterial = (color: number) => {
    return new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });
  };

  const resizeRenderer = () => {
    if (!canvasRef || !camera || !renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // Adjust orthographic camera for aspect ratio
    const frustumSize = 20;
    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  onMount(() => {
    if (!canvasRef) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e); // Dark blue-gray background

    // Orthographic camera for isometric view (zoomed out to see entire room)
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20;
    camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    camera.position.set(15, 12, 15); // Positioned to see entire room
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false; // Disable shadows for flat look

    // Floor (larger to fill more of the room)
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = createFlatMaterial(0x2d3561); // Dark blue-purple
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Floor grid pattern (checkerboard)
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if ((x + z) % 2 === 0) {
          const tileGeometry = new THREE.PlaneGeometry(1.8, 1.8);
          const tileMaterial = createFlatMaterial(0x3a4578); // Slightly lighter blue
          const tile = new THREE.Mesh(tileGeometry, tileMaterial);
          tile.rotation.x = -Math.PI / 2;
          tile.position.set(x * 2, 0.01, z * 2);
          scene.add(tile);
        }
      }
    }

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(20, 10);
    const backWallMaterial = createFlatMaterial(0x1f2847); // Darker blue
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 5, -10);
    scene.add(backWall);

    // Back wall accent stripe
    const stripeGeometry = new THREE.PlaneGeometry(20, 0.5);
    const stripeMaterial = createFlatMaterial(0xf39c12); // Orange accent
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 3, -9.9);
    scene.add(stripe);

    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
    const leftWallMaterial = createFlatMaterial(0x252d4f); // Medium blue
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 5, 0);
    scene.add(leftWall);

    // Right wall
    const rightWallGeometry = new THREE.PlaneGeometry(20, 10);
    const rightWallMaterial = createFlatMaterial(0x252d4f); // Medium blue
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 5, 0);
    scene.add(rightWall);

    // Workbench (simple flat design)
    const benchTopGeometry = new THREE.BoxGeometry(6, 0.2, 2);
    const benchTopMaterial = createFlatMaterial(0x95a5a6); // Light gray
    const benchTop = new THREE.Mesh(benchTopGeometry, benchTopMaterial);
    benchTop.position.set(-4, 2, -6);
    scene.add(benchTop);

    // Bench legs
    const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
    const legMaterial = createFlatMaterial(0x7f8c8d); // Darker gray
    const positions = [
      [-6.5, 1, -6.8],
      [-1.5, 1, -6.8],
      [-6.5, 1, -5.2],
      [-1.5, 1, -5.2],
    ];
    positions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      scene.add(leg);
    });

    // Shelving unit (simple flat design)
    const shelfMaterial = createFlatMaterial(0x34495e); // Dark blue-gray
    const backingGeometry = new THREE.BoxGeometry(4, 6, 0.2);
    const backing = new THREE.Mesh(backingGeometry, shelfMaterial);
    backing.position.set(5, 3, -8);
    scene.add(backing);

    // Shelves
    for (let i = 0; i < 4; i++) {
      const shelfGeometry = new THREE.BoxGeometry(4, 0.15, 1);
      const shelf = new THREE.Mesh(shelfGeometry, createFlatMaterial(0x5d6d7e));
      shelf.position.set(5, i * 1.5 + 0.5, -7.5);
      scene.add(shelf);
    }

    // Boxes on shelves (colorful accents)
    const boxColors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6];
    for (let i = 0; i < 3; i++) {
      const boxGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.6);
      const boxMaterial = createFlatMaterial(
        boxColors[i % boxColors.length]
      );
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(4 + i * 1.2, 2.5, -7.3);
      scene.add(box);
    }

    // Computer monitor on workbench
    const monitorScreenGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
    const monitorScreenMaterial = createFlatMaterial(0x1abc9c); // Teal screen
    const monitorScreen = new THREE.Mesh(
      monitorScreenGeometry,
      monitorScreenMaterial
    );
    monitorScreen.position.set(-4, 3, -6);
    scene.add(monitorScreen);

    const monitorStandGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.3);
    const monitorStandMaterial = createFlatMaterial(0x2c3e50);
    const monitorStand = new THREE.Mesh(
      monitorStandGeometry,
      monitorStandMaterial
    );
    monitorStand.position.set(-4, 2.4, -6);
    scene.add(monitorStand);

    // Ambient light (no shadows for flat look)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    window.addEventListener('resize', resizeRenderer);

    onCleanup(() => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeRenderer);
      renderer.dispose();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        'z-index': '-1',
      }}
    />
  );
}
