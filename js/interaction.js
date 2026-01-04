import * as THREE from 'three';

export class Interaction {
  constructor(scene, camera, ui, maze) {
    this.scene = scene;
    this.camera = camera;
    this.ui = ui;
    this.maze = maze;
    this.raycaster = new THREE.Raycaster();
    this.center = new THREE.Vector2(0, 0); // Center of screen
    this.workingVector = new THREE.Vector3(); // Reusable vector

    document.addEventListener('click', this.onClick.bind(this));
  }

  check() {
    if (!this.camera || !this.ui || !this.ui.isGameActive) return;

    const playerPos = this.camera.position.clone();
    this.camera.getWorldDirection(this.workingVector);
    this.raycaster.set(playerPos, this.workingVector);
    this.raycaster.far = 4;

    // Intersect only with tokens and doors (for performance and correctness)
    const interactables = [...this.maze.tokens, ...this.maze.doors];
    const intersects = this.raycaster.intersectObjects(interactables);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.handleInteraction(object);
    }
  }

  onClick() {
    if (!this.ui.isGameActive) return;

    if (document.pointerLockElement !== document.body) {
      document.body.requestPointerLock();
      return;
    }

    this.raycaster.setFromCamera(this.center, this.camera);
    const interactables = [...this.maze.tokens, ...this.maze.doors];
    const intersects = this.raycaster.intersectObjects(interactables);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.handleInteraction(object);
    }
  }

  handleInteraction(object) {
    const { type, id } = object.userData;

    if (type === 'token') {
      // ✅ PASS ID (not level) so UI can track per-question attempts
      this.ui.showQuestion(id, () => {
        this.maze.removeToken(object);
        // ❌ DO NOT add score here — scoring is handled by UI based on first attempt
      });
    } else if (type === 'door') {
      // ✅ Same for doors
      this.ui.showQuestion(id, () => {
        this.maze.openDoor(object);
      });
    }
  }
}
