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
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 2048, 2048);

        // --- GRID LOGIC ---
        const tileCount = 11; 
        const tileSize = 2048 / tileCount; // ~186px

        // Grid Lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 3;
        for (let i = 0; i <= tileCount; i++) {
            const pos = i * tileSize;
            ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(2048, pos); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, 2048); ctx.stroke();
        }

        const graphs = ['spring', 'pendulum', 'energy_time', 'energy_disp', 'acc_disp', 'vel_disp'];
        const equations = ['a = -ω²x', 'x = x₀sin(ωt)', 'v = ±ω√(x₀²-x²)', 'T = 2π√(m/k)', 'E = ½mω²x₀²'];

        // --- UNIQUE GENERATION ---
        for (let row = 0; row < tileCount; row++) {
            for (let col = 0; col < tileCount; col++) {
                
                // 40% chance to have a drawing
                if (Math.random() > 0.4) continue; 

                const cx = col * tileSize + (tileSize / 2); 
                const cy = row * tileSize + (tileSize / 2);

                ctx.save();
                
                // Random rotation
                const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.translate(-cx, -cy);

                const w = tileSize * 0.6; // 60% of room width
                const h = tileSize * 0.6;
                const x0 = cx - w/2; 
                const y0 = cy - h/2;

                if (Math.random() > 0.5) {
                    // --- DRAW GRAPH ---
                    const type = graphs[Math.floor(Math.random() * graphs.length)];
                    
                    ctx.fillStyle = 'rgba(0,0,0,0.6)'; 
                    ctx.fillRect(x0 - 10, y0 - 10, w + 20, h + 20);
                    
                    ctx.strokeStyle = '#ffffff'; 
                    ctx.lineWidth = 4; 
                    ctx.strokeRect(x0, y0, w, h);

                    const setNeon = (color) => {
                        ctx.strokeStyle = color;
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 20; 
                        ctx.lineWidth = 6;  
                        ctx.lineCap = 'round';
                    };

                    if (type === 'spring') {
                        setNeon('#00ff66'); ctx.beginPath();
                        let sy = y0 + (h*0.2);
                        ctx.moveTo(cx, y0);
                        for (let i = 0; i < 8; i++) ctx.lineTo(cx + (i % 2 === 0 ? 15 : -15), sy += (h*0.08));
                        ctx.stroke();
                        ctx.fillStyle = '#00ff66'; ctx.fillRect(cx - 15, sy, 30, 30);
                    }
                    else if (type === 'pendulum') {
                        setNeon('#ff00ff'); ctx.beginPath();
                        ctx.moveTo(cx, y0); ctx.lineTo(cx + 40, y0 + h*0.8); ctx.stroke();
                        ctx.beginPath(); ctx.arc(cx + 40, y0 + h*0.8, 15, 0, Math.PI * 2);
                        ctx.fillStyle = '#ff00ff'; ctx.fill();
                    }
                    else {
                        setNeon('#00ecff'); ctx.beginPath();
                        ctx.ellipse(cx, cy, w * 0.4, h * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
                    }
                } else {
                    // --- DRAW EQUATION (FIXED SIZE) ---
                    const eq = equations[Math.floor(Math.random() * equations.length)];
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#00ecff';
                    ctx.shadowBlur = 15;
                    
                    // Reduced font size (15% of room width instead of 25%)
                    ctx.font = `bold ${Math.floor(tileSize * 0.15)}px "Courier New", monospace`; 
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // CLAMP WIDTH: Text cannot be wider than 80% of the room
                    ctx.fillText(eq, cx, cy, tileSize * 0.8);
                }
                ctx.restore();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        
        // UNIQUE MAPPING (Do not repeat)
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.repeat.set(1, 1); 
        
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

        // Floor
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
        let isHorizontal = false;
        if (col > 0 && col < this.grid[0].length - 1) {
            if (this.grid[row][col-1] !== 1 && this.grid[row][col+1] !== 1) {
                isHorizontal = true;
            }
        }

        const width = isHorizontal ? 0.5 : this.cellSize;
        const depth = isHorizontal ? this.cellSize : 0.5;

        const geo = new THREE.BoxGeometry(width, 4, depth);
        const mat = new THREE.MeshStandardMaterial({ color: 0xff00de, transparent: true, opacity: 0.8 });
        const door = new THREE.Mesh(geo, mat);
        door.position.set(x, 0, z);

        this.scene.add(door);
        this.doors.push(door);
        this.colliders.push(new THREE.Box3().setFromObject(door));

        const qID = this.questionCounter++; 
        const level = 3; 
        
        door.userData = { type: 'door', id: qID, level: level };

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
