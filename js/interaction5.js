import * as THREE from 'three';

export class Interaction {
    constructor(scene, camera, ui, maze) {
        this.scene = scene;
        this.camera = camera;
        this.ui = ui;
        this.maze = maze;

        this.raycaster = new THREE.Raycaster();
        this.center = new THREE.Vector2(0, 0); // Center of screen

        document.addEventListener('click', this.onClick.bind(this));
    }

    check() {
        if (!this.ui.isGameActive) return;

        // Optional: Highlight object under cursor
    }

    onClick() {
        if (!this.ui.isGameActive) return;
        if (document.pointerLockElement !== document.body) {
            document.body.requestPointerLock();
            return;
        }

        this.raycaster.setFromCamera(this.center, this.camera);

        // Intersect with Tokens and Doors from Maze
        // Maze needs to expose these groups or arrays
        const interactables = [...this.maze.tokens, ...this.maze.doors];
        const intersects = this.raycaster.intersectObjects(interactables);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleInteraction(object);
        }
    }

    handleInteraction(object) {
        if (object.userData.type === 'token') {
            this.ui.showQuestion(object.userData.level, () => {
                // On success
                this.maze.removeToken(object);
                this.ui.addScore(10);
            });
        } else if (object.userData.type === 'door') {
            this.ui.showQuestion(object.userData.level, () => {
                // On success
                this.maze.openDoor(object);
            });
        }
    }
}
