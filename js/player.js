import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'; 

export class Player {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || document.body;
        
        this.velocity = new THREE.Vector3();
        this.speed = 12.0; 
        this.gravity = 30.0;
        
        // Flags
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        // Force Upright
        this.camera.up.set(0, 1, 0); 
        this.camera.rotation.set(0, 0, 0);

        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (this.isMobile) {
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

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
        this.velocity.set(0, 0, 0);
    }

    setupDesktopControls() {
        this.controls = new PointerLockControls(this.camera, document.body);
        const onKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowUp': case 'KeyW': this.moveForward = true; break;
                case 'ArrowLeft': case 'KeyA': this.moveLeft = true; break;
                case 'ArrowDown': case 'KeyS': this.moveBackward = true; break;
                case 'ArrowRight': case 'KeyD': this.moveRight = true; break;
                case 'Space': if (this.canJump) { this.velocity.y += 15; this.canJump = false; } break;
            }
        };
        const onKeyUp = (event) => {
            switch (event.code) {
                case 'ArrowUp': case 'KeyW': this.moveForward = false; break;
                case 'ArrowLeft': case 'KeyA': this.moveLeft = false; break;
                case 'ArrowDown': case 'KeyS': this.moveBackward = false; break;
                case 'ArrowRight': case 'KeyD': this.moveRight = false; break;
            }
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('click', () => { this.controls.lock(); });
    }

    setupMobileControls() {
        const zone = document.getElementById('zone_joystick');
        const instructions = document.getElementById('mobile-instructions');
        if (zone) zone.style.display = 'block';
        if (instructions) instructions.style.display = 'block';

        if (window.nipplejs) {
            this.joystickManager = nipplejs.create({
                zone: zone, mode: 'static', position: { left: '80px', bottom: '80px' }, color: 'white', size: 100
            });
            this.joystickData = { x: 0, y: 0 };
            this.joystickManager.on('move', (evt, data) => { if (data.vector) { this.joystickData.x = data.vector.x; this.joystickData.y = data.vector.y; } });
            this.joystickManager.on('end', () => { this.joystickData.x = 0; this.joystickData.y = 0; });
        }

        this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
        this.euler.copy(this.camera.rotation);
        let touchStartX = 0; let touchStartY = 0; const lookSpeed = 0.004; 

        document.addEventListener('touchstart', (e) => {
            for (let i = 0; i < e.touches.length; i++) {
                if (e.touches[i].clientX > window.innerWidth / 2) { touchStartX = e.touches[i].clientX; touchStartY = e.touches[i].clientY; }
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault(); 
            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                if (t.clientX > window.innerWidth / 2) {
                    const deltaX = t.clientX - touchStartX;
                    const deltaY = t.clientY - touchStartY;
                    this.euler.y -= deltaX * lookSpeed;
                    this.euler.x -= deltaY * lookSpeed;
                    this.euler.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.euler.x));
                    this.camera.quaternion.setFromEuler(this.euler);
                    touchStartX = t.clientX; touchStartY = t.clientY;
                }
            }
        }, { passive: false });
    }

    update(delta, colliders) {
        let inputZ = 0; let inputX = 0;
        if (this.isMobile) {
            inputZ = this.joystickData.y; 
            inputX = this.joystickData.x; 
        } else {
            inputZ = Number(this.moveForward) - Number(this.moveBackward);
            inputX = Number(this.moveRight) - Number(this.moveLeft);
        }

        const camDir = new THREE.Vector3();
        this.camera.getWorldDirection(camDir);
        camDir.y = 0; camDir.normalize();

        const sideDir = new THREE.Vector3();
        sideDir.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize(); 

        const moveVec = new THREE.Vector3();
        moveVec.addScaledVector(camDir, inputZ);
        moveVec.addScaledVector(sideDir, inputX); 
        
        // --- CRITICAL FIX: PREVENT NAN (BLACK SCREEN) ---
        // If length is 0 (no input), normalize() divides by zero -> NaN -> Crash
        if (moveVec.lengthSq() > 0.001) {
            moveVec.normalize();
            this.velocity.x += (moveVec.x * this.speed * 5 * delta); 
            this.velocity.z += (moveVec.z * this.speed * 5 * delta);
        }
        // ------------------------------------------------

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= this.gravity * delta; 

        const originalPos = this.camera.position.clone();

        // X Movement
        this.camera.position.x += this.velocity.x * delta;
        if (this.checkCollision(colliders)) {
            this.camera.position.x = originalPos.x;
            this.velocity.x = 0;
        }

        // Z Movement
        this.camera.position.z += this.velocity.z * delta;
        if (this.checkCollision(colliders)) {
            this.camera.position.z = originalPos.z;
            this.velocity.z = 0;
        }

        // Y Movement
        this.camera.position.y += this.velocity.y * delta;
        if (this.camera.position.y < 1.6) {
            this.velocity.y = 0;
            this.camera.position.y = 1.6;
            this.canJump = true;
        }
    }

    checkCollision(colliders) {
        const playerBox = new THREE.Box3();
        const size = 0.5; 
        playerBox.min.set(this.camera.position.x - size/2, this.camera.position.y - 1.5, this.camera.position.z - size/2);
        playerBox.max.set(this.camera.position.x + size/2, this.camera.position.y + 0.5, this.camera.position.z + size/2);

        for (const collider of colliders) {
            if (playerBox.intersectsBox(collider)) return true;
        }
        return false;
    }
}
