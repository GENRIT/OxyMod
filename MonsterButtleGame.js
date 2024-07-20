// script.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('gameCanvas');
  const upgradeButton = document.getElementById('upgradeButton');
  
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const clock = new THREE.Clock();
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);
  
  // Load and render the 3D character model
  const skinViewer = new skinview3d.SkinViewer({
    canvas: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    skin: "https://example.com/your-skin-url.png"
  });
  skinViewer.camera.position.set(0, 0, 70);
  scene.add(skinViewer.mesh);

  // Resize handler
  window.addEventListener('resize', () => {
    skinViewer.width = window.innerWidth;
    skinViewer.height = window.innerHeight;
    skinViewer.camera.aspect = window.innerWidth / window.innerHeight;
    skinViewer.camera.updateProjectionMatrix();
  });

  // Game state
  let player = { position: { x: 0, y: 0 }, health: 100, attack: 10 };
  let enemies = [];
  let structures = [];

  // Procedural generation logic
  function generateStructures() {
    // Placeholder logic for procedural generation
    for (let i = 0; i < 10; i++) {
      const structure = new THREE.BoxGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const mesh = new THREE.Mesh(structure, material);
      mesh.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, 0);
      structures.push(mesh);
      scene.add(mesh);
    }
  }
  
  generateStructures();

  // Character control
  let isDragging = false;
  canvas.addEventListener('mousedown', () => { isDragging = true; });
  canvas.addEventListener('mouseup', () => { isDragging = false; });
  canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaX = event.movementX * 0.1;
      const deltaY = event.movementY * 0.1;
      player.position.x += deltaX;
      player.position.y += deltaY;
      skinViewer.mesh.position.set(player.position.x, player.position.y, 0);
    }
  });

  // Combat logic
  function attack() {
    enemies.forEach((enemy, index) => {
      const distance = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y);
      if (distance < 10) {
        enemy.health -= player.attack;
        if (enemy.health <= 0) {
          scene.remove(enemy.mesh);
          enemies.splice(index, 1);
        }
      }
    });
  }

  upgradeButton.addEventListener('click', () => {
    player.attack += 5; // Upgrade logic
  });

  // Enemy class
  class Enemy {
    constructor() {
      this.position = { x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 };
      this.health = 50;
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(this.position.x, this.position.y, 0);
      scene.add(this.mesh);
    }

    move() {
      // Placeholder for enemy movement logic
      const direction = Math.random() < 0.5 ? -1 : 1;
      this.position.x += direction * Math.random();
      this.position.y += direction * Math.random();
      this.mesh.position.set(this.position.x, this.position.y, 0);
    }
  }

  // Create enemies
  function spawnEnemies() {
    for (let i = 0; i < 5; i++) {
      enemies.push(new Enemy());
    }
  }
  
  spawnEnemies();

  // Game loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    
    enemies.forEach(enemy => {
      enemy.move();
    });

    attack(); // Player attack logic

    skinViewer.render();
    renderer.render(scene, camera);
  }
  
  animate();
});


// script.js additions

function cullObjects() {
  const frustum = new THREE.Frustum();
  const cameraViewProjectionMatrix = new THREE.Matrix4();

  camera.updateMatrixWorld();
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

  structures.forEach(structure => {
    structure.visible = frustum.intersectsObject(structure);
  });

  enemies.forEach(enemy => {
    enemy.mesh.visible = frustum.intersectsObject(enemy.mesh);
  });
}

// Update game loop to include culling
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  enemies.forEach(enemy => {
    enemy.move();
  });

  attack(); // Player attack logic

  cullObjects(); // Cull off-screen objects

  skinViewer.render();
  renderer.render(scene, camera);
}
