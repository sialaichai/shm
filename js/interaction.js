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
        console.log("DEBUG: Interaction System Loaded");
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

            // --- WALKING LOGIC (This was already correct, but adding logs) ---
            if (object.userData.type === 'token') {
                console.log("DEBUG: Walking Collision with Token. ID:", object.userData.id);
                this.ui.showQuestion(object.userData.id, () => {
                    console.log("DEBUG: Token Removed (Walking)");
                    this.maze.removeToken(object);
                });
            } 
            else if (object.userData.type === 'door') {
                console.log("DEBUG: Walking Collision with Door. ID:", object.userData.id);
                this.ui.showQuestion(object.userData.id, () => {
                    console.log("DEBUG: Door Opened (Walking)");
                    this.maze.openDoor(object);
                });
            }
        }
    }

    onClick() {
        if (!this.ui.isGameActive) return;
        
        if (document.pointerLockElement !== document.body) {
            document.body.requestPointerLock();
            return;
        }

        this.raycaster.setFromCamera(this.center, this.camera);
        this.raycaster.far = 10; 

        const interactables = [...this.maze.tokens, ...this.maze.doors];
        const intersects = this.raycaster.intersectObjects(interactables);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            console.log("DEBUG: Click Detected on Object", object.userData);
            this.handleInteraction(object);
        }
    }

    handleInteraction(object) {
        // --- THIS WAS THE BROKEN PART ---
        // I have removed 'this.ui.addScore(10)'
        // I have changed 'level' to 'id'
        
        if (object.userData.type === 'token') {
            console.log("DEBUG: Handling Click on Token. Sending ID:", object.userData.id);
            
            // CORRECT CALL: Pass ID, let UI handle scoring
            this.ui.showQuestion(object.userData.id, () => {
                console.log("DEBUG: Question Solved (Click). Removing Token.");
                this.maze.removeToken(object);
            });
        } 
        else if (object.userData.type === 'door') {
            console.log("DEBUG: Handling Click on Door. Sending ID:", object.userData.id);
            
            this.ui.showQuestion(object.userData.id, () => {
                console.log("DEBUG: Question Solved (Click). Opening Door.");
                this.maze.openDoor(object);
            });
        }
    }
}
