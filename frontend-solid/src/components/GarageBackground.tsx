import { onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

export default function GarageBackground() {
  let canvasRef: HTMLCanvasElement | undefined;
  let animationFrameId: number;
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.OrthographicCamera;
  let scene: THREE.Scene;
  let particles: THREE.Points;
  let time = 0;

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

    const frustumSize = 18;
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
    scene.background = new THREE.Color(0x1a1a2e);

    // Orthographic camera for isometric view - adjusted for better view
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 18;
    camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    camera.position.set(12, 10, 12); // Better angle
    camera.lookAt(0, 2, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = createFlatMaterial(0x2d3561);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Floor tiles (checkerboard)
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if ((x + z) % 2 === 0) {
          const tileGeometry = new THREE.PlaneGeometry(1.8, 1.8);
          const tileMaterial = createFlatMaterial(0x3a4578);
          const tile = new THREE.Mesh(tileGeometry, tileMaterial);
          tile.rotation.x = -Math.PI / 2;
          tile.position.set(x * 2, 0.01, z * 2);
          scene.add(tile);
        }
      }
    }

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(20, 8);
    const backWallMaterial = createFlatMaterial(0x1f2847);
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 4, -10);
    scene.add(backWall);

    // Back wall accent stripe
    const stripeGeometry = new THREE.PlaneGeometry(20, 0.4);
    const stripeMaterial = createFlatMaterial(0xf39c12);
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 2.5, -9.9);
    scene.add(stripe);

    // Wall posters/decorations
    const posterColors = [0xe74c3c, 0x9b59b6, 0x3498db];
    for (let i = 0; i < 3; i++) {
      const posterGeometry = new THREE.PlaneGeometry(1, 1.3);
      const posterMaterial = createFlatMaterial(posterColors[i]);
      const poster = new THREE.Mesh(posterGeometry, posterMaterial);
      poster.position.set(-6 + i * 5, 6, -9.9);
      scene.add(poster);
    }

    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(20, 8);
    const leftWallMaterial = createFlatMaterial(0x252d4f);
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 4, 0);
    scene.add(leftWall);

    // Window on left wall
    const windowFrame = new THREE.BoxGeometry(0.15, 2, 2.5);
    const windowMaterial = createFlatMaterial(0x2c3e50);
    const windowObj = new THREE.Mesh(windowFrame, windowMaterial);
    windowObj.rotation.y = Math.PI / 2;
    windowObj.position.set(-9.9, 5, 3);
    scene.add(windowObj);

    const windowGlass = new THREE.PlaneGeometry(2, 1.8);
    const glassMaterial = createFlatMaterial(0x6dd5ed);
    const glass = new THREE.Mesh(windowGlass, glassMaterial);
    glass.rotation.y = Math.PI / 2;
    glass.position.set(-9.85, 5, 3);
    scene.add(glass);

    // Right wall
    const rightWallGeometry = new THREE.PlaneGeometry(20, 8);
    const rightWallMaterial = createFlatMaterial(0x252d4f);
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 4, 0);
    scene.add(rightWall);

    // Workbench
    const benchTopGeometry = new THREE.BoxGeometry(6, 0.2, 2);
    const benchTopMaterial = createFlatMaterial(0x95a5a6);
    const benchTop = new THREE.Mesh(benchTopGeometry, benchTopMaterial);
    benchTop.position.set(-4, 2, -6);
    scene.add(benchTop);

    // Bench legs
    const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
    const legMaterial = createFlatMaterial(0x7f8c8d);
    const legPositions = [
      [-6.5, 1, -6.8],
      [-1.5, 1, -6.8],
      [-6.5, 1, -5.2],
      [-1.5, 1, -5.2],
    ];
    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      scene.add(leg);
    });

    // Computer monitor
    const monitorScreenGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
    const monitorScreenMaterial = createFlatMaterial(0x1abc9c);
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

    // Keyboard on desk
    const keyboardGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.4);
    const keyboardMaterial = createFlatMaterial(0x34495e);
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(-4, 2.15, -5.2);
    scene.add(keyboard);

    // Mouse
    const mouseGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.2);
    const mouseMaterial = createFlatMaterial(0x2c3e50);
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.position.set(-3, 2.15, -5.2);
    scene.add(mouse);

    // Coffee cup
    const cupGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.25, 16);
    const cupMaterial = createFlatMaterial(0xe74c3c);
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(-2.5, 2.25, -6);
    scene.add(cup);

    // Desk lamp
    const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const lampBaseMaterial = createFlatMaterial(0x2c3e50);
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(-6, 2.15, -5.5);
    scene.add(lampBase);

    const lampArmGeometry = new THREE.BoxGeometry(0.08, 0.6, 0.08);
    const lampArm = new THREE.Mesh(lampArmGeometry, lampBaseMaterial);
    lampArm.position.set(-6, 2.5, -5.5);
    scene.add(lampArm);

    const lampHeadGeometry = new THREE.ConeGeometry(0.2, 0.3, 16);
    const lampHeadMaterial = createFlatMaterial(0xf39c12);
    const lampHead = new THREE.Mesh(lampHeadGeometry, lampHeadMaterial);
    lampHead.rotation.x = Math.PI;
    lampHead.position.set(-6, 2.95, -5.5);
    scene.add(lampHead);

    // Shelving unit
    const shelfMaterial = createFlatMaterial(0x34495e);
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

    // Boxes on shelves
    const boxColors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6];
    const shelfItems = [
      { x: 4, y: 2.5, z: -7.3, size: 0.8 },
      { x: 5.2, y: 2.5, z: -7.3, size: 0.6 },
      { x: 6, y: 2.5, z: -7.3, size: 0.7 },
      { x: 4.2, y: 4, z: -7.3, size: 0.5 },
      { x: 5.5, y: 4, z: -7.3, size: 0.9 },
      { x: 4.5, y: 5.5, z: -7.3, size: 0.6 },
    ];

    shelfItems.forEach((item, i) => {
      const boxGeometry = new THREE.BoxGeometry(item.size, item.size * 0.75, 0.6);
      const boxMaterial = createFlatMaterial(boxColors[i % boxColors.length]);
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(item.x, item.y, item.z);
      scene.add(box);
    });

    // Tool board on right wall
    const toolBoardGeometry = new THREE.PlaneGeometry(1.5, 2.5);
    const toolBoardMaterial = createFlatMaterial(0x3a4578);
    const toolBoard = new THREE.Mesh(toolBoardGeometry, toolBoardMaterial);
    toolBoard.rotation.y = -Math.PI / 2;
    toolBoard.position.set(9.9, 4, 5);
    scene.add(toolBoard);

    // Tools on board
    const toolColors = [0xe67e22, 0xecf0f1, 0x95a5a6];
    for (let i = 0; i < 5; i++) {
      const toolGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.05);
      const toolMaterial = createFlatMaterial(toolColors[i % toolColors.length]);
      const tool = new THREE.Mesh(toolGeometry, toolMaterial);
      tool.rotation.y = -Math.PI / 2;
      tool.position.set(9.85, 3 + i * 0.5, 4.5 + (i % 2) * 0.4);
      scene.add(tool);
    }

    // Rolling chair
    const chairSeatGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
    const chairMaterial = createFlatMaterial(0xe74c3c);
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.set(-3, 1.2, -4);
    scene.add(chairSeat);

    const chairPostGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 16);
    const chairPostMaterial = createFlatMaterial(0x2c3e50);
    const chairPost = new THREE.Mesh(chairPostGeometry, chairPostMaterial);
    chairPost.position.set(-3, 0.7, -4);
    scene.add(chairPost);

    // Small plant
    const plantPotGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.2, 16);
    const plantPotMaterial = createFlatMaterial(0x95a5a6);
    const plantPot = new THREE.Mesh(plantPotGeometry, plantPotMaterial);
    plantPot.position.set(2, 0.1, 6);
    scene.add(plantPot);

    const plantGeometry = new THREE.SphereGeometry(0.25, 8, 8);
    const plantMaterial = createFlatMaterial(0x2ecc71);
    const plant = new THREE.Mesh(plantGeometry, plantMaterial);
    plant.position.set(2, 0.45, 6);
    scene.add(plant);

    // Floating ambient particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = Math.random() * 8;
      positions[i + 2] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf39c12,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Animation loop with particle movement
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.005;

      // Animate particles
      if (particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(time + i) * 0.002;
          if (positions[i] > 10) positions[i] = 0;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.y = time * 0.05;
      }

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
