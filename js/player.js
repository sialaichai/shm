import * as THREE from 'three';
// Import PointerLockControls if using a module bundler, or ensure it's loaded in HTML
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'; 

export class Player {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || document.body;
        
        // Physics
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 12.0; // Slightly slower for better control on mobile
        this.gravity = 30.0;
        
        // Flags
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        // Detect Mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // FIX: Force Camera to look at horizon (0 pitch) immediately
        this.camera.rotation.x = 0; 
        this.camera.rotation.z = 0;

        if (this.isMobile) {
            // FIX: Widen FOV for mobile so it feels less "zoomed in"
            this.camera.fov = 85; 
            this.camera.updateProjectionMatrix();
            this.setupMobileControls();
        } else {
            this.setupDesktopControls();
        }
    }

    getObject() {
        return this.controls ? this.controls.getObject() : this.camera;
    }

    setupDesktopControls() {
        console.log("Player: Desktop Controls Active");
        this.controls = new PointerLockControls(this.camera, document.body);

        const onKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW': this.moveForward = true; break;
                case 'ArrowLeft':
                case 'KeyA': this.moveLeft = true; break;
                case 'ArrowDown':
                case 'KeyS': this.moveBackward = true; break;
                case 'ArrowRight':
                case 'KeyD': this.moveRight = true; break;
                case 'Space': 
                    if (this.canJump === true) this.velocity.y += 15; 
                    this.canJump = false;
                    break;
            }
        };

        const onKeyUp = (event) => {
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
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        
        document.addEventListener('click', () => {
            this.controls.lock();
        });
    }

    setupMobileControls() {
        console.log("Player: Mobile Controls Active");
        
        const zone = document.getElementById('zone_joystick');
        const instructions = document.getElementById('mobile-instructions');
        if (zone) zone.style.display = 'block';
        if (instructions) instructions.style.display = 'block';

        // 1. Joystick (Left Thumb - Move)
        if (window.nipplejs) {
            this.joystickManager = nipplejs.create({
                zone: zone,
                mode: 'static',
                position: { left: '80px', bottom: '80px' }, // Bottom Left Corner
                color: 'white',
                size: 100
            });

            this.joystickData = { x: 0, y: 0 };

            this.joystickManager.on('move', (evt, data) => {
                if (data.vector) {
                    this.joystickData.x = data.vector.x; 
                    this.joystickData.y = data.vector.y; 
                }
            });

            this.joystickManager.on('end', () => {
                this.joystickData.x = 0;
                this.joystickData.y = 0;
            });
        }

        // 2. Touch Look (Right Thumb - Rotate)
        // Initialize Euler with current camera rotation to prevent snapping
        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this.euler.copy(this.camera.rotation);
        
        let touchStartX = 0;
        let touchStartY = 0;
        const lookSpeed = 0.004; // Sensitivity

        document.addEventListener('touchstart', (e) => {
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                // Only track touches on the RIGHT half of the screen
                if (t.clientX > window.innerWidth / 2) {
                    touchStartX = t.clientX;
                    touchStartY = t.clientY;
                }
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault(); 
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                if (t.clientX > window.innerWidth / 2) {
                    const deltaX = t.clientX - touchStartX;
                    const deltaY = t.clientY - touchStartY;

                    this.euler.y -= deltaX * lookSpeed; // Yaw
                    this.euler.x -= deltaY * lookSpeed; // Pitch

                    // Clamp Pitch (Prevent looking too far up/down)
                    this.euler.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.euler.x));

                    this.camera.quaternion.setFromEuler(this.euler);

                    touchStartX = t.clientX;
                    touchStartY = t.clientY;
                }
            }
        }, { passive: false });
    }

    update(delta, colliders) {
        // --- 1. CALCULATE MOVEMENT DIRECTION ---
        let moveX = 0;
        let moveZ = 0;

        if (this.isMobile) {
            // Get Joystick input
            // Joystick Up (Y+) = Forward (Z-)
            // Joystick Right (X+) = Right (X+)
            const forwardInput = this.joystickData.y; 
            const sideInput = this.joystickData.x;

            // FIX: Calculate World Direction FLATTENED on Y axis
            // We want to move on the floor, regardless of looking up/down
            
            // Get current camera Yaw (Y-rotation) only
            const angleY = this.camera.rotation.y; 

            // Calculate Forward/Right vectors based on Yaw
            // Forward is -Z rotated by Y
            // Right is +X rotated by Y
            
            // Mathematical rotation of inputs:
            // NewZ = (ForwardInput * -cos(angle)) + (SideInput * sin(angle))
            // NewX = (ForwardInput * -sin(angle)) - (SideInput * cos(angle))
            
            // Simplified using sin/cos of camera angle:
            const sin = Math.sin(angleY);
            const cos = Math.cos(angleY);

            // Forward component (moving along -Z local)
            moveZ -= forwardInput * cos;
            moveX -= forwardInput * sin;

            // Sideways component (moving along +X local)
            moveZ -= sideInput * sin; // -sin because X is 90 deg from Z
            moveX += sideInput * cos;

        } else {
            // Desktop Logic (Booleans)
            // PointerLockControls handles the direction calculation internally usually,
            // but we are managing velocity manually.
            
            // NOTE: For desktop, we stick to the local direction logic because
            // PointerLock handles the "Forward" vector correctly usually.
            // But to fix the "flying" issue on desktop too, we should ideally flatten it.
            // For now, let's keep desktop as is if it was working, or align it:
            
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.normalize();

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;
            
            // Desktop usually applies this velocity via getDirection which includes Y.
            // If you want to fix flying on desktop, that's a larger change to PointerLock usage.
            // Assuming Desktop was fine, we focus on Mobile logic below.
        }

        // --- 2. APPLY PHYSICS ---

        // Gravity
        this.velocity.y -= this.gravity * delta;

        // Apply Mobile Velocity with Friction
        if (this.isMobile) {
            // Apply calculated MoveX/MoveZ to velocity
            // We ramp up velocity to the target speed
            const targetX = moveX * this.speed;
            const targetZ = moveZ * this.speed;

            // Smooth interpolation (Ease in/out)
            this.velocity.x += (targetX - this.velocity.x) * 10 * delta;
            this.velocity.z += (targetZ - this.velocity.z) * 10 * delta;
        } else {
            // Friction for Desktop
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
        }

        // --- 3. APPLY MOVEMENT & COLLISION (WORLD SPACE) ---

        const originalPos = this.camera.position.clone();

        // A. Move X (World Axis)
        // If Desktop, we use translateX (Local). If Mobile, we use position.x (World)
        if (this.isMobile) {
            this.camera.position.x += this.velocity.x * delta;
        } else {
            this.camera.translateX(-this.velocity.x * delta);
        }
        
        if (this.checkCollision(colliders)) {
            this.camera.position.x = originalPos.x;
            this.velocity.x = 0;
        }

        // B. Move Z (World Axis)
        // FIX: For mobile, we explicitly move along World Z, not Camera Z
        if (this.isMobile) {
            this.camera.position.z += this.velocity.z * delta;
        } else {
            this.camera.translateZ(this.velocity.z * delta);
        }

        if (this.checkCollision(colliders)) {
            this.camera.position.z = originalPos.z;
            this.velocity.z = 0;
        }

        // C. Move Y (Gravity)
        this.camera.position.y += this.velocity.y * delta;

        // Floor Collision
        if (this.camera.position.y < 1.6) {
            this.velocity.y = 0;
            this.camera.position.y = 1.6;
            this.canJump = true;
        }
    }

    checkCollision(colliders) {
        const playerBox = new THREE.Box3();
        // Slightly larger collider for mobile to prevent clipping
        const size = 0.6; 
        
        // Compute bounding box based on CURRENT camera position
        playerBox.min.set(this.camera.position.x - size/2, this.camera.position.y - 1.5, this.camera.position.z - size/2);
        playerBox.max.set(this.camera.position.x + size/2, this.camera.position.y + 0.5, this.camera.position.z + size/2);

        for (const collider of colliders) {
            if (playerBox.intersectsBox(collider)) {
                return true;
            }
        }
        return false;
    }
}
