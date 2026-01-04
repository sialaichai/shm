import * as THREE from 'three';

export class Maze {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
        this.width = 10;
        this.depth = 10;
        this.cellSize = 4;
        this.colliders = []; 
        this.tokens = [];
        this.doors = [];
        this.questionCounter = 0; 
        
        // Grid (11x11)
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 1, 0, 0, 0, 2, 0, 1], // Row 1 is the first valid room
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 
            [1, 0, 3, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1], 
            [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 3, 0, 2, 0, 0, 0, 1], 
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    // --- FIX 1: FIND SAFE SPAWN POINT ---
    getSpawnPosition() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                // If it's a floor (0) or token (2), it's safe
                if (this.grid[row][col] === 0 || this.grid[row][col] === 2) {
                    return new THREE.Vector3(
                        col * this.cellSize, 
                        2, // Eye Height
                        row * this.cellSize
                    );
                }
            }
        }
        return new THREE.Vector3(4, 2, 4); // Fallback
    }

createSurfaceTexture(bgColor, gridColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');

        // 1. Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 2048, 2048);

        const tileCount = 22; 
        const tileSize = 2048 / tileCount; 

        // 2. Grid Lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 2; 
        for (let i = 0; i <= tileCount; i++) {
            const pos = i * tileSize;
            ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(2048, pos); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, 2048); ctx.stroke();
        }

        // --- UPDATED LIST OF GRAPHS ---
        const graphs = ['spring', 'pendulum', 'damped', 'energy', 'resonance', 'shm_acc', 'waves'];
        
        // Updated Equations List
        const equations = [
            'a = -ω²x', 
            'x = A e^(-bt/2m)', 
            'E = K + U', 
            'U = ½kx²', 
            'ω = √(k/m)',
            'T = 2π√(L/g)'
        ];

        for (let row = 0; row < tileCount; row++) {
            for (let col = 0; col < tileCount; col++) {
                if (Math.random() > 0.3) continue; 

                const cx = col * tileSize + (tileSize / 2); 
                const cy = row * tileSize + (tileSize / 2);

                ctx.save();
                const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.translate(-cx, -cy);

                const w = tileSize * 0.7; 
                const h = tileSize * 0.7;
                const x0 = cx - w/2; 
                const y0 = cy - h/2;

                if (Math.random() > 0.5) {
                    const type = graphs[Math.floor(Math.random() * graphs.length)];
                    
                    // Graph Background
                    ctx.fillStyle = 'rgba(0,0,0,0.6)'; 
                    ctx.fillRect(x0 - 5, y0 - 5, w + 10, h + 10); 
                    
                    // Axes
                    ctx.strokeStyle = '#ffffff'; 
                    ctx.lineWidth = 3; 
                    ctx.strokeRect(x0, y0, w, h); // Draw Box Frame
                    
                    // Helper to make lines glow
                    const setNeon = (color) => { 
                        ctx.strokeStyle = color; 
                        ctx.shadowColor = color; 
                        ctx.shadowBlur = 10; 
                        ctx.lineWidth = 4; 
                        ctx.lineCap = 'round'; 
                    };

                    // --- DRAWING LOGIC ---

                    if (type === 'spring') {
                        setNeon('#00ff66'); ctx.beginPath(); 
                        let sy = y0 + (h*0.2); 
                        ctx.moveTo(cx, y0); 
                        for (let i = 0; i < 8; i++) ctx.lineTo(cx + (i % 2 === 0 ? 10 : -10), sy += (h*0.08)); 
                        ctx.stroke(); ctx.fillStyle = '#00ff66'; ctx.fillRect(cx - 10, sy, 20, 20);
                    } 
                    else if (type === 'pendulum') {
                        setNeon('#ff00ff'); ctx.beginPath(); 
                        ctx.moveTo(cx, y0); ctx.lineTo(cx + 20, y0 + h*0.8); ctx.stroke(); 
                        ctx.beginPath(); ctx.arc(cx + 20, y0 + h*0.8, 10, 0, Math.PI * 2); ctx.fillStyle = '#ff00ff'; ctx.fill(); 
                    } 
                    else if (type === 'damped') {
                        // Decaying Sine Wave
                        setNeon('#ff3333'); ctx.beginPath();
                        ctx.moveTo(x0, cy);
                        for (let i = 0; i <= w; i+=2) {
                            // Math: e^(-x) * sin(x)
                            const decay = Math.exp(-3 * (i/w));
                            const osc = Math.sin(i * 0.1);
                            const plotY = cy - (decay * osc * (h/2));
                            ctx.lineTo(x0 + i, plotY);
                        }
                        ctx.stroke();
                    }
                    else if (type === 'energy') {
                        // PE and KE vs Displacement
                        // 1. PE (Parabola Up) - Cyan
                        setNeon('#00ecff'); ctx.beginPath();
                        for(let i = 0; i <= w; i+=2) {
                            let xNorm = (i - w/2) / (w/2); // -1 to 1
                            let yVal = xNorm * xNorm; // x^2
                            ctx.lineTo(x0 + i, (y0 + h) - (yVal * h * 0.9));
                        }
                        ctx.stroke();

                        // 2. KE (Parabola Down) - Yellow
                        setNeon('#ffff00'); ctx.beginPath();
                        for(let i = 0; i <= w; i+=2) {
                            let xNorm = (i - w/2) / (w/2); 
                            let yVal = 1 - (xNorm * xNorm); // 1 - x^2
                            ctx.lineTo(x0 + i, (y0 + h) - (yVal * h * 0.9));
                        }
                        ctx.stroke();
                    }
                    else if (type === 'resonance') {
                        // Amplitude vs Frequency (Bell Curve)
                        setNeon('#ff9900'); ctx.beginPath();
                        for(let i = 0; i <= w; i+=2) {
                            let xNorm = (i - w/2) / (w/6); 
                            // Lorentzian-like function: 1 / (1 + x^2)
                            let yVal = 1 / (1 + xNorm*xNorm); 
                            ctx.lineTo(x0 + i, (y0 + h) - (yVal * h * 0.9));
                        }
                        ctx.stroke();
                    }
                    else if (type === 'shm_acc') {
                        // Acceleration vs Displacement (a = -x)
                        // Simple diagonal line with negative slope
                        setNeon('#ff0055'); ctx.beginPath();
                        ctx.moveTo(x0, y0);       // Top Left
                        ctx.lineTo(x0 + w, y0 + h); // Bottom Right
                        ctx.stroke();
                    }
                    else if (type === 'waves') {
                        // Sine (Green) and Cosine (Blue)
                        setNeon('#00ff00'); ctx.beginPath();
                        for(let i = 0; i <= w; i+=2) ctx.lineTo(x0 + i, cy - Math.sin(i*0.05)*(h*0.3));
                        ctx.stroke();

                        setNeon('#0088ff'); ctx.beginPath();
                        for(let i = 0; i <= w; i+=2) ctx.lineTo(x0 + i, cy - Math.cos(i*0.05)*(h*0.3));
                        ctx.stroke();
                    }

                } else {
                    // Equations
                    const eq = equations[Math.floor(Math.random() * equations.length)];
                    ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#00ecff'; ctx.shadowBlur = 10;
                    ctx.font = `bold ${Math.floor(tileSize * 0.18)}px "Courier New", monospace`; 
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(eq, cx, cy, tileSize * 0.9);
                }
                ctx.restore();
            }
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.ClampToEdgeWrapping; texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(1, 1); texture.anisotropy = 16; 
        return texture;
    }

    generate() {
        this.questionCounter = 0;
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 512, 512);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
        for (let i = 0; i < 512; i += 64) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke(); }
        ctx.strokeStyle = '#00ecff'; ctx.lineWidth = 8; ctx.beginPath();
        for (let x = 0; x < 512; x++) { const y = 256 + Math.sin(x * 0.05) * 100; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        ctx.stroke();

        const wallTex = new THREE.CanvasTexture(canvas);
        const wallGeo = new THREE.BoxGeometry(this.cellSize, 4, this.cellSize);
        const wallMat = new THREE.MeshLambertMaterial({ color: 0xffffff, map: wallTex });

        const floorTex = this.createSurfaceTexture('#1a1a24', '#333344');
        const floorGeo = new THREE.PlaneGeometry(this.grid[0].length * this.cellSize, this.grid.length * this.cellSize);
        const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.2, metalness: 0.5 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set((this.grid[0].length * this.cellSize) / 2 - this.cellSize / 2, -2, (this.grid.length * this.cellSize) / 2 - this.cellSize / 2);
        this.scene.add(floor);

        const ceilTex = this.createSurfaceTexture('#111111', '#222222');
        const ceilMat = new THREE.MeshLambertMaterial({ map: ceilTex, side: THREE.DoubleSide });
        const ceil = new THREE.Mesh(floorGeo, ceilMat);
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(floor.position.x, 2, floor.position.z);
        this.scene.add(ceil);

        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                const type = this.grid[row][col];
                const x = col * this.cellSize;
                const z = row * this.cellSize;

                if (type === 1) { // Wall
                    const wall = new THREE.Mesh(wallGeo, wallMat);
                    wall.position.set(x, 0, z);
                    this.scene.add(wall);
                    
                    // --- FIX 2: FORCE PHYSICS UPDATE ---
                    wall.updateMatrixWorld(); 
                    // -----------------------------------
                    this.colliders.push(new THREE.Box3().setFromObject(wall));
                } 
                else if (type === 2) this.createToken(x, z);
                else if (type === 3) this.createDoor(x, z, row, col);
                else if (type === 0 && Math.random() < 0.25) this.createToken(x, z);
            }
        }
    }

    createToken(x, z) {
        const shapes = [ new THREE.BoxGeometry(0.4, 0.4, 0.4), new THREE.OctahedronGeometry(0.35), new THREE.TorusGeometry(0.25, 0.1, 8, 16), new THREE.IcosahedronGeometry(0.35), new THREE.ConeGeometry(0.3, 0.6, 16) ];
        const geo = shapes[Math.floor(Math.random() * shapes.length)];
        const color = new THREE.Color().setHSL(Math.random(), 1.0, 0.5);
        const mat = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.2 });
        const token = new THREE.Mesh(geo, mat);
        token.position.set(x, 1, z);
        
        const qID = this.questionCounter++;
        const level = Math.random() < 0.6 ? 1 : 2; 
        token.userData = { type: 'token', id: qID, level: level, rotSpeed: { x: Math.random() * 2, y: Math.random() * 2 } };
        if (this.ui) this.ui.registerQuestion(qID, level);
        this.scene.add(token);
        this.tokens.push(token);
    }

    createDoor(x, z, row, col) {
        let isHorizontal = false;
        if (col > 0 && col < this.grid[0].length - 1) {
            if (this.grid[row][col-1] !== 1 && this.grid[row][col+1] !== 1) isHorizontal = true;
        }
        const width = isHorizontal ? 0.5 : this.cellSize;
        const depth = isHorizontal ? this.cellSize : 0.5;
        const geo = new THREE.BoxGeometry(width, 4, depth);
        const mat = new THREE.MeshStandardMaterial({ color: 0xff00de, transparent: true, opacity: 0.8 });
        const door = new THREE.Mesh(geo, mat);
        door.position.set(x, 0, z);
        this.scene.add(door);
        this.doors.push(door);
        
        // --- FIX 2: FORCE PHYSICS UPDATE ---
        door.updateMatrixWorld();
        // -----------------------------------
        this.colliders.push(new THREE.Box3().setFromObject(door));

        const qID = this.questionCounter++; 
        const level = 3; 
        door.userData = { type: 'door', id: qID, level: level };
        if (this.ui && typeof this.ui.registerQuestion === 'function') {
            try { this.ui.registerQuestion(qID, level); } catch (e) { console.warn("UI Registration Failed for Door:", e); }
        }
    }

    removeToken(token) {
        this.scene.remove(token);
        const index = this.tokens.indexOf(token);
        if (index > -1) this.tokens.splice(index, 1);
    }

    openDoor(door) {
        this.scene.remove(door);
        const dIndex = this.doors.indexOf(door);
        if (dIndex > -1) this.doors.splice(dIndex, 1);
        this.rebuildColliders();
    }

    rebuildColliders() {
        this.colliders = [];
        this.scene.traverse(obj => {
            if (obj.geometry && obj.geometry.type === 'BoxGeometry') {
                obj.updateMatrixWorld(); 
                const box = new THREE.Box3().setFromObject(obj);
                this.colliders.push(box);
            }
        });
    }
}
