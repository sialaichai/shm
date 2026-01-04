import * as THREE from 'three';

export class Interaction {
    constructor(scene, camera, ui, maze) {
        this.scene = scene;
        this.camera = camera;
        this.ui = ui;
        this.maze = maze;

        this.raycaster = new THREE.Raycaster();
        this.center = new THREE.Vector2(0, 0); // Center of screen
        
        // Reusable vector to prevent memory leaks
        this.workingVector = new THREE.Vector3(); 
        
        // Click listener
        document.addEventListener('click', this.onClick.bind(this));
    }

    // --- PROXIMITY CHECK (Runs every frame) ---
    check() {
        if (!this.camera || !this.ui) return;

        const playerPos = this.camera.position;
        
        // 1. Update Direction
        this.camera.getWorldDirection(this.workingVector);

        // 2. Raycast forward
        this.raycaster.set(playerPos, this.workingVector);
        this.raycaster.far = 2; // Trigger distance (2 units)

        // 3. Find Intersections
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            
            // If we hit a Token or Door, trigger it using its unique ID
            if (object.userData.type === 'token' || object.userData.type === 'door') {
                this.ui.showQuestion(object.userData.id, () => {
                    // Action on success
                    if (object.userData.type === 'token') {
                        this.maze.removeToken(object);
                    } else {
                        this.maze.openDoor(object);
                    }
                });
            }
        }
    }

    // --- CLICK CHECK (Runs only on mouse click) ---
    onClick() {
        // Only allow clicking if game is active
        if (!this.ui.isGameActive) return;

        // Pointer Lock Check (Optional: ensure user is "in" the game)
        if (document.pointerLockElement !== document.body) {
            document.body.requestPointerLock();
            return;
        }

        this.raycaster.setFromCamera(this.center, this.camera);
        this.raycaster.far = 10; // Clicks can reach further than walking

        // Get all interactables
        const interactables = [...this.maze.tokens, ...this.maze.doors];
        const intersects = this.raycaster.intersectObjects(interactables);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.handleInteraction(object);
        }
    }

    handleInteraction(object) {
        // PASS UNIQUE ID (object.userData.id) -> NOT LEVEL
        if (object.userData.type === 'token') {
            this.ui.showQuestion(object.userData.id, () => {
                // UI handles scoring. We just remove the object.
                this.maze.removeToken(object);
            });
        } 
        else if (object.userData.type === 'door') {
            this.ui.showQuestion(object.userData.id, () => {
                // UI handles scoring. We just open the door.
                this.maze.openDoor(object);
            });
        }
    }
}
