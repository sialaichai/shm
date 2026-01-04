import * as THREE from 'three';

export class Interaction {
    constructor(scene, camera, ui, maze) {
        this.scene = scene;
        this.camera = camera;
        this.ui = ui;
        this.maze = maze;

        this.raycaster = new THREE.Raycaster();
        this.center = new THREE.Vector2(0, 0); // Center of screen
        // Create the Raycaster and direction vector ONCE to save memory
        this.workingVector = new THREE.Vector3(); // Reusable vector
        document.addEventListener('click', this.onClick.bind(this));
    }

    check() {
        if (!this.camera || !this.ui) return;
        // FIX: Ensure vector exists before filling it
        this.camera.getWorldDirection(this.workingVector);
        const playerPos = this.camera.position;
        const playerDir = new THREE.Vector3();
        this.camera.getWorldDirection(playerDir);
        // Update raycaster
        this.raycaster.set(playerPos, this.workingVector);
        this.raycaster.far = 4; // Interaction range (3-4 units is good)

        //const intersects = this.raycaster.intersectObjects(this.scene.children);
        //const raycaster = new THREE.Raycaster(playerPos, playerDir, 0, 3); // 3 units reach
        //const intersects = raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const object = intersects[0].object;

            // --- UPDATED LOGIC HERE ---
            if (object.userData.type === 'token') {
                // Pass the unique ID (userData.id) so UI remembers if we failed it before
                this.ui.showQuestion(object.userData.id, () => {
                    this.maze.removeToken(object);
                });
            } 
            else if (object.userData.type === 'door') {
                // Pass the unique ID for doors too
                this.ui.showQuestion(object.userData.id, () => {
                    this.maze.openDoor(object);
                });
            }
            // --------------------------
        }
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
