import * as THREE from 'three';

export class Interaction {
    constructor(scene, camera, ui, maze) {
        this.scene = scene;
        this.camera = camera;
        this.ui = ui;
        this.maze = maze;

        this.raycaster = new THREE.Raycaster();
        this.center = new THREE.Vector2(0, 0); 
        this.workingVector = new THREE.Vector3(); 
        
        document.addEventListener('click', this.onClick.bind(this));
    }

    check() {
        if (!this.camera || !this.ui) return;
        
        this.camera.getWorldDirection(this.workingVector);
        const playerPos = this.camera.position;
        
        this.raycaster.set(playerPos, this.workingVector);
        this.raycaster.far = 4; 

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const object = intersects[0].object;

            // WALKING LOGIC (Was already correct, kept it safe)
            if (object.userData.type === 'token') {
                this.ui.showQuestion(object.userData.id, () => {
                    this.maze.removeToken(object);
                });
            } 
            else if (object.userData.type === 'door') {
                this.ui.showQuestion(object.userData.id, () => {
                    this.maze.openDoor(object);
                });
            }
        }
    }

    onClick() {
        if (!this.ui.isGameActive) return;
        
        // Ensure pointer lock so clicks don't drift
        if (document.pointerLockElement !== document.body) {
            document.body.requestPointerLock();
            return;
        }

        this.raycaster.setFromCamera(this.center, this.camera);
        this.raycaster.far = 10; // Clicks reach further

        // Check against all maze objects
        const interactables = [...this.maze.tokens, ...this.maze.doors];
        const intersects = this.raycaster.intersectObjects(interactables);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleInteraction(object);
        }
    }

    handleInteraction(object) {
        // --- THE FIX IS HERE ---
        
        // 1. We pass 'object.userData.id' (Unique ID), NOT 'level'.
        // 2. We DELETED 'this.ui.addScore(10)'. The UI class now calculates points itself.
        
        if (object.userData.type === 'token') {
            this.ui.showQuestion(object.userData.id, () => {
                this.maze.removeToken(object);
            });
        } 
        else if (object.userData.type === 'door') {
            this.ui.showQuestion(object.userData.id, () => {
                this.maze.openDoor(object);
            });
        }
    }
}
