import * as THREE from 'three';
// We assume PointerLockControls is imported or available globally via Three examples
// If you are using standard Three.js examples:
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'; 

export class Player {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || document.body;
        
        // Physics
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 15.0; // Movement speed
        this.gravity = 30.0;
        
        // Flags
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        // Detect Mobile
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (this.isMobile) {
            this.setupMobileControls();
        } else {
            this.setupDesktopControls();
        }
    }

    getObject() {
        // If mobile, we don't use PointerLock object wrapping, we just return camera
        // But for consistency with your Main.js, if you use PointerLockControls, return that object
        return this.controls ? this.controls.getObject() : this.camera;
    }

    // --- DESKTOP LOGIC ---
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
                    if (this.canJump === true) this.velocity.y += 15; // Jump force
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
        
        // Click to lock cursor
        document.addEventListener('click', () => {
            this.controls.lock();
        });
    }

    // --- MOBILE LOGIC ---
    setupMobileControls() {
        console.log("Player: Mobile Controls Active");
        
        // 1. Show Joystick Zone
        const zone = document.getElementById('zone_joystick');
        const instructions = document.getElementById('mobile-instructions');
        if (zone) zone.style.display = 'block';
        if (instructions) instructions.style.display = 'block';

        // 2. Initialize Nipple.js (Joystick)
        // We create a "static" joystick on the bottom-left
        if (window.nipplejs) {
            this.joystickManager = nipplejs.create({
                zone: zone,
                mode: 'static',
                position: { left: '50%', top: '50%' },
                color: 'white'
            });

            this.joystickData = { x: 0, y: 0 };

            this.joystickManager.on('move', (evt, data) => {
                if (data.vector) {
                    // Normalize vector (max speed 1)
                    this.joystickData.x = data.vector.x; 
                    this.joystickData.y = data.vector.y; 
                }
            });

            this.joystickManager.on('end', () => {
                this.joystickData.x = 0;
                this.joystickData.y = 0;
            });
        }

        // 3. Touch Look Logic (Right side of screen)
        // We handle rotation manually since PointerLock doesn't work on mobile
        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this.camera.rotation.copy(this.euler);
        
        let touchStartX = 0;
        let touchStartY = 0;
        const lookSpeed = 0.005;

        document.addEventListener('touchstart', (e) => {
            // Only care about touches on the RIGHT half of screen
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                if (t.clientX > window.innerWidth / 2) {
                    touchStartX = t.clientX;
                    touchStartY = t.clientY;
                }
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            // Prevent scrolling
            e.preventDefault(); 
            
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                // Check if this touch is on the right side
                if (t.clientX > window.innerWidth / 2) {
                    const deltaX = t.clientX - touchStartX;
                    const deltaY = t.clientY - touchStartY;

                    // Update rotation (Yaw and Pitch)
                    this.euler.y -= deltaX * lookSpeed;
                    this.euler.x -= deltaY * lookSpeed;

                    // Clamp Look Up/Down (Pitch) to 90 degrees
                    this.euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.euler.x));

                    this.camera.quaternion.setFromEuler(this.euler);

                    // Reset start for continuous drag
                    touchStartX = t.clientX;
                    touchStartY = t.clientY;
                }
            }
        }, { passive: false });
    }

    update(delta, colliders) {
        // -- 1. DETERMINE INPUT --
        // Desktop uses booleans, Mobile uses joystick vector
        
        if (this.isMobile) {
            // Mobile Input (Joystick maps Y to Forward/Back, X to Left/Right)
            // NippleJS up is Y+, Down is Y-. 
            this.direction.z = -this.joystickData.y; // Forward is negative Z in Three.js
            this.direction.x = this.joystickData.x;
        } else {
            // Desktop Input
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.normalize(); // Ensure diagonal isn't faster
        }

        // -- 2. PHYSICS & VELOCITY --
        
        // Deceleration (Friction)
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= this.gravity * delta; // Gravity

        // Acceleration
        if (this.isMobile) {
            // Joystick gives analog input (0.0 to 1.0), so we use that for smooth walking
            if (this.joystickData.y !== 0 || this.joystickData.x !== 0) {
                this.velocity.z -= this.direction.z * this.speed * delta * 50; // Invert Z for logic
                this.velocity.x += this.direction.x * this.speed * delta * 50;
            }
        } else {
            // Keyboard is binary (moving or not)
            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;
        }

        // -- 3. APPLY MOVEMENT (Collision Detection) --
        
        // Copy current position to test against
        const originalPos = this.camera.position.clone();

        // Move X (Strafe)
        this.camera.translateX(-this.velocity.x * delta);
        if (this.checkCollision(colliders)) {
            this.camera.position.x = originalPos.x;
            this.velocity.x = 0;
        }

        // Move Z (Forward/Back)
        this.camera.translateZ(this.velocity.z * delta); 
        // Note: translateZ moves relative to where camera is facing
        
        if (this.checkCollision(colliders)) {
            this.camera.position.z = originalPos.z;
            this.velocity.z = 0;
        }

        // Move Y (Jump/Gravity)
        this.camera.position.y += this.velocity.y * delta;
        
        // Simple Floor Collision
        if (this.camera.position.y < 1.6) {
            this.velocity.y = 0;
            this.camera.position.y = 1.6;
            this.canJump = true;
        }
    }

    checkCollision(colliders) {
        // Create a small bounding box around player
        const playerBox = new THREE.Box3();
        const size = 0.5; // Player width
        playerBox.setFromCenterAndSize(this.camera.position, new THREE.Vector3(size, 2, size));

        for (const collider of colliders) {
            if (playerBox.intersectsBox(collider)) {
                return true;
            }
        }
        return false;
    }
}
