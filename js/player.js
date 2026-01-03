import * as THREE from 'three';

export class Player {
    constructor(camera) {
        this.camera = camera;
        this.speed = 5.0;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        // Pointer Lock Controls logic manually implemented for flexibility
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(camera);

        this.yawObject = new THREE.Object3D();
        this.yawObject.position.set(4, 1.6, 4); // Start at grid[1][1] (Empty)
        this.yawObject.add(this.pitchObject);

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    getObject() {
        return this.yawObject;
    }

    onMouseMove(event) {
        if (document.pointerLockElement !== document.body) return;

        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.yawObject.rotation.y -= movementX * 0.002;
        this.pitchObject.rotation.x -= movementY * 0.002;

        // Limit pitch to avoid flipping
        this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = true; break;
            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = true; break;
            case 'ArrowDown':
            case 'KeyS': this.moveBackward = true; break;
            case 'ArrowRight':
            case 'KeyD': this.moveRight = true; break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = false; break;
            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = false; break;
            case 'ArrowDown':
            case 'KeyS': this.moveBackward = false; break;
            case 'ArrowRight':
            case 'KeyD': this.moveRight = false; break;
        }
    }

    update(delta, colliders) {
        // Deceleration
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;

        // Input direction
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize();

        // Rotate move direction to match camera yaw
        if (this.moveForward || this.moveBackward || this.moveLeft || this.moveRight) {
            const moveVector = new THREE.Vector3(this.direction.x, 0, this.direction.z);
            moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yawObject.rotation.y); // Rotate by yaw

            this.velocity.x -= moveVector.x * 40.0 * delta; // Note: subtracting because of how Three.js coords works sometimes, or just add. 
            // Actually, let's verify standard Three.js movement. 
            // Forward is usually -Z. Right is +X.

            // My implementation:
            // direction.z: 1=Forward(W), -1=Back(S)

            // Let's assume standard PointerLockControls behavior:
            // getDirection() vector.

            // Simpler approach:
            const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.yawObject.quaternion);
            const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.yawObject.quaternion);

            // We only care about XZ plane for movement
            forward.y = 0; forward.normalize();
            right.y = 0; right.normalize();

            if (this.moveForward) {
                this.velocity.x += forward.x * 400 * delta * delta; // Using Force (accel) -> Vel
                this.velocity.z += forward.z * 400 * delta * delta;
            }
            if (this.moveBackward) {
                this.velocity.x -= forward.x * 400 * delta * delta;
                this.velocity.z -= forward.z * 400 * delta * delta;
            }
            if (this.moveRight) {
                this.velocity.x += right.x * 400 * delta * delta;
                this.velocity.z += right.z * 400 * delta * delta;
            }
            if (this.moveLeft) {
                this.velocity.x -= right.x * 400 * delta * delta;
                this.velocity.z -= right.z * 400 * delta * delta;
            }
        }

        // Apply Velocity
        // Note: The previous logic was subtracting velocity. Let's stick to adding.
        // Wait, the previous code was: nextX = pos - vel * delta. 
        // If I change to standard physics (pos + vel), I need to invert inputs above or here.

        // Let's restart the velocity logic to be cleaner.
        // Standard FPS:

        const inputVector = new THREE.Vector3();
        if (this.moveForward) inputVector.z -= 1;
        if (this.moveBackward) inputVector.z += 1;
        if (this.moveLeft) inputVector.x -= 1;
        if (this.moveRight) inputVector.x += 1;
        inputVector.normalize();

        // Key fix: Rotate input vector by Y rotation
        inputVector.applyEuler(new THREE.Euler(0, this.yawObject.rotation.y, 0));

        if (this.moveForward || this.moveBackward || this.moveLeft || this.moveRight) {
            this.velocity.x += inputVector.x * 40.0 * delta;
            this.velocity.z += inputVector.z * 40.0 * delta;
        }

        // Apply
        const nextX = this.yawObject.position.x + this.velocity.x * delta;
        const nextZ = this.yawObject.position.z + this.velocity.z * delta;

        // Collision X
        let canMoveX = true;
        const playerBox = new THREE.Box3();
        playerBox.setFromCenterAndSize(new THREE.Vector3(nextX, 1, this.yawObject.position.z), new THREE.Vector3(1, 2, 1));
        for (const c of colliders) {
            if (playerBox.intersectsBox(c)) { canMoveX = false; this.velocity.x = 0; break; }
        }
        if (canMoveX) this.yawObject.position.x = nextX;

        // Collision Z
        let canMoveZ = true;
        playerBox.setFromCenterAndSize(new THREE.Vector3(this.yawObject.position.x, 1, nextZ), new THREE.Vector3(1, 2, 1));
        for (const c of colliders) {
            if (playerBox.intersectsBox(c)) { canMoveZ = false; this.velocity.z = 0; break; }
        }
        if (canMoveZ) this.yawObject.position.z = nextZ;
    }
}
