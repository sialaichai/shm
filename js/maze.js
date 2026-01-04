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
        
        // Compact Grid (11x11)
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 1, 0, 0, 0, 2, 0, 1], // Start Room
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], // Main Hall
            [1, 0, 3, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 2, 0, 0, 1, 0, 1], // Side Room
            [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 3, 0, 2, 0, 0, 0, 1], // Crossing
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1], // End Room
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    createSurfaceTexture(bgColor, gridColor) {
        const canvas = document.createElement('canvas');
        // High Res for crisp text
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 1024, 1024);

        // Grid (Thicker)
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 4;
        for (let i = 0; i <= 1024; i += 256) { 
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
        }

        const graphs = ['spring', 'pendulum', 'energy_time', 'energy_disp', 'acc_disp', 'vel_disp'];
        const equations = ['a = -ω²x', 'x = x₀sin(ωt)', 'v = ±ω√(x₀²-x²)', 'T = 2π√(m/k)', 'E = ½mω²x₀²'];

        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
                if (Math.random() > 0.5) continue; 

                const cx = col * 512 + 256; 
                const cy = row * 512 + 256;

                ctx.save();
                const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.translate(-cx, -cy);

                const w = 300;
                const h = 300;
                const x0 = cx - w/2; 
                const y0 = cy - h/2;

                if (Math.random() > 0.5) {
                    // Draw Graph
                    const type = graphs[Math.floor(Math.random() * graphs.length)];
                    
                    // Box Background
                    ctx.fillStyle = 'rgba(0,0,0,0.8)'; 
                    ctx.fillRect(x0 - 20, y0 - 20, w + 40, h + 40);
                    
                    ctx.strokeStyle = '#ffffff'; 
                    ctx.lineWidth = 6; 
                    ctx.strokeRect(x0, y0, w, h);

                    const setNeon = (color) => {
                        ctx.strokeStyle = color;
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 40; 
                        ctx.lineWidth = 12;  
                        ctx.lineCap = 'round';
                    };

                    if (type === 'spring') {
                        setNeon('#00ff66'); ctx.beginPath();
                        let sy = y0 + 50;
                        ctx.moveTo(cx, y0);
                        for (let i = 0; i < 12; i++) ctx.lineTo(cx + (i % 2 === 0 ? 40 : -40), sy += 20);
                        ctx.stroke();
                        ctx.fillStyle = '#00ff66'; ctx.fillRect(cx - 30, sy, 60, 60);
                    }
                    else if (type === 'pendulum') {
                        setNeon('#ff00ff'); ctx.beginPath();
                        ctx.moveTo(cx, y0); ctx.lineTo(cx + 80, y0 + 200); ctx.stroke();
                        ctx.beginPath(); ctx.arc(cx + 80, y0 + 200, 30, 0, Math.PI * 2);
                        ctx.fillStyle = '#ff00ff'; ctx.fill();
                    }
                    else {
                        setNeon('#00ecff'); ctx.beginPath();
                        ctx.ellipse(cx, cy, w * 0.4, h * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
                    }
                } else {
                    // Draw Equation (Giant Font)
                    const eq = equations[Math.floor(Math.random() * equations.length)];
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#00ecff';
                    ctx.shadowBlur = 30;
                    ctx.font = `bold 80px "Courier New", monospace`; 
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(eq, cx, cy);
                }
                ctx.restore();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4); 
        texture.anisotropy = 16; 
        return texture;
    }

    generate() {
        this.questionCounter = 0;

        // Walls
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        for (let i = 0; i < 512; i += 64) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        }

        ctx.strokeStyle = '#00ecff';
        ctx.lineWidth = 8;
        ctx.beginPath();
        for (let x = 0; x < 512; x++) {
            const y = 256 + Math.sin(x * 0.05) * 100;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const wallTex = new THREE.CanvasTexture(canvas);
        const wallGeo = new THREE.BoxGeometry(this.cellSize, 4, this.cellSize);
        const wallMat = new THREE.MeshLambertMaterial({ color: 0xffffff, map: wallTex });

        // Floor (Dark + Neon Ready)
        const floorTex = this.createSurfaceTexture('#1a1a24', '#333344');
        const floorGeo = new THREE.PlaneGeometry(this.grid[0].length * this.cellSize, this.grid.length * this.cellSize);
        const floorMat = new THREE.MeshStandardMaterial({ 
            map: floorTex, 
            roughness: 0.2, 
            metalness: 0.5 
        });

        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(
            (this.grid[0].length * this.cellSize) / 2 - this.cellSize / 2, -2,
            (this.grid.length * this.cellSize) / 2 - this.cellSize / 2
        );
        this.scene.add(floor);

        // Ceiling
        const ceilTex = this.createSurfaceTexture('#111111', '#222222');
        const ceilMat = new THREE.MeshLambertMaterial({ map: ceilTex, side: THREE.DoubleSide });
        const ceil = new THREE.Mesh(floorGeo, ceilMat);
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(floor.position.x, 2, floor.position.z);
        this.scene.add(ceil);

        // Grid Generation
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                const type = this.grid[row][col];
                const x = col * this.cellSize;
                const z = row * this.cellSize;

                if (type === 1) { // Wall
                    const wall = new THREE.Mesh(wallGeo, wallMat);
                    wall.position.set(x, 0, z);
                    this.scene.add(wall);
                    this.colliders.push(new THREE.Box3().setFromObject(wall));
                } 
                else if (type === 2) { // Token
                    this.createToken(x, z);
                } 
                else if (type === 3) { // Door
                    // PASS ROW/COL FOR ROTATION CHECK
                    this.createDoor(x, z, row, col);
                } 
                else if (type === 0 && Math.random() < 0.25) { 
                    this.createToken(x, z);
                }
            }
        }
    }

    createToken(x, z) {
        const shapes = [
            new THREE.BoxGeometry(0.4, 0.4, 0.4),
            new THREE.OctahedronGeometry(0.35),
            new THREE.TorusGeometry(0.25, 0.1, 8, 16),
            new THREE.IcosahedronGeometry(0.35),
            new THREE.ConeGeometry(0.3, 0.6, 16)
        ];
        
        const geo = shapes[Math.floor(Math.random() * shapes.length)];
        const color = new THREE.Color().setHSL(Math.random(), 1.0, 0.5);

        const mat = new THREE.MeshStandardMaterial({ 
            color: color, emissive: color, emissiveIntensity: 0.5, metalness: 0.7, roughness: 0.2
        });

        const token = new THREE.Mesh(geo, mat);
        token.position.set(x, 1, z);

        const qID = this.questionCounter++;
        const level = Math.random() < 0.6 ? 1 : 2; 
        
        token.userData = { 
            type: 'token', 
            id: qID, 
            level: level, 
            rotSpeed: { x: Math.random() * 2, y: Math.random() * 2 } 
        };

        if (this.ui) this.ui.registerQuestion(qID, level);

        this.scene.add(token);
        this.tokens.push(token);
    }

    createDoor(x, z, row, col) {
        // --- ROTATION FIX ---
        // Check neighbors: If Left (col-1) and Right (col+1) are NOT walls,
        // it implies a horizontal hallway. We must rotate the door.
        let isHorizontal = false;
        if (col > 0 && col < this.grid[0].length - 1) {
            if (this.grid[row][col-1] !== 1 && this.grid[row][col+1] !== 1) {
                isHorizontal = true;
            }
        }

        // Standard: Wide (cellSize), Thin (0.5)
        // Horizontal: Thin (0.5), Wide (cellSize)
        const width = isHorizontal ? 0.5 : this.cellSize;
        const depth = isHorizontal ? this.cellSize : 0.5;

        const geo = new THREE.BoxGeometry(width, 4, depth);
        // ---------------------

        const mat = new THREE.MeshStandardMaterial({ color: 0xff00de, transparent: true, opacity: 0.8 });
        const door = new THREE.Mesh(geo, mat);
        door.position.set(x, 0, z);

        // 1. ADD TO SCENE FIRST (Safety)
        this.scene.add(door);
        this.doors.push(door);
        this.colliders.push(new THREE.Box3().setFromObject(door));

        // 2. REGISTER
        const qID = this.questionCounter++; 
        const level = 3; 
        
        door.userData = { type: 'door', id: qID, level: level };

        // 3. SAFE UI CALL
        if (this.ui && typeof this.ui.registerQuestion === 'function') {
            try {
                this.ui.registerQuestion(qID, level);
            } catch (e) {
                console.warn("UI Registration Failed for Door:", e);
            }
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
                const box = new THREE.Box3().setFromObject(obj);
                this.colliders.push(box);
            }
        });
    }
}
