import * as THREE from 'three';

export class Maze {
    constructor(scene) {
        this.scene = scene;
        this.width = 10;
        this.depth = 10;
        this.cellSize = 4;
        this.colliders = []; // Walls for collision
        this.tokens = [];
        this.doors = [];

        // Compact Grid (11x11) to reduce walking distance
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 1, 0, 0, 0, 2, 0, 1], // Start Room (Left)
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
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 512, 512);

        // Grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 2;
        for (let i = 0; i <= 512; i += 128) { // 4x4 grid
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
        }

        const graphs = ['spring', 'pendulum', 'energy_time', 'energy_disp', 'acc_disp', 'vel_disp'];
        const equations = ['a = -ω²x', 'x = x₀sin(ωt)', 'v = ±ω√(x₀²-x²)', 'T = 2π√(m/k)', 'E = ½mω²x₀²'];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (Math.random() > 0.4) continue; // 40% chance of empty tile

                const cx = col * 128 + 64; // Center of tile
                const cy = row * 128 + 64;

                ctx.save();

                // Random Rotation (0, 90, 180, 270)
                const angle = Math.floor(Math.random() * 4) * (Math.PI / 2);
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.translate(-cx, -cy);

                const x0 = cx - 54; // Top-left of drawing area (108x108)
                const y0 = cy - 54;
                const w = 108;
                const h = 108;

                if (Math.random() > 0.5) {
                    // Draw Graph
                    const type = graphs[Math.floor(Math.random() * graphs.length)];
                    ctx.beginPath();
                    ctx.rect(x0, y0, w, h);
                    ctx.clip();

                    // Darker Patch background for contrast
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                    ctx.strokeRect(x0, y0, w, h);
                    ctx.lineWidth = 4; // Thicker lines

                    // Helper to set neon style
                    const setNeon = (color) => {
                        ctx.strokeStyle = color;
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 15; // Intense glow
                    };

                    if (type === 'spring') {
                        setNeon('#00ff00'); ctx.beginPath();
                        ctx.moveTo(cx - 20, y0 + 10); ctx.lineTo(cx + 20, y0 + 10);
                        let sy = y0 + 10;
                        for (let i = 0; i < 10; i++) ctx.lineTo(cx + (i % 2 === 0 ? 10 : -10), sy += 5);
                        ctx.stroke();
                        ctx.fillStyle = '#00ff00'; ctx.shadowColor = '#00ff00'; ctx.shadowBlur = 15;
                        ctx.fillRect(cx - 10, sy, 20, 20);
                    }
                    else if (type === 'pendulum') {
                        setNeon('#ff00ff'); ctx.beginPath();
                        ctx.moveTo(cx, y0 + 10); ctx.lineTo(cx + 30, y0 + 80); ctx.stroke();
                        ctx.beginPath(); ctx.arc(cx + 30, y0 + 80, 10, 0, Math.PI * 2);
                        ctx.fillStyle = '#ff00ff'; ctx.fill();
                    }
                    else if (type === 'energy_time') {
                        setNeon('#ff3333'); ctx.beginPath();
                        for (let i = 0; i < w; i++) {
                            let val = Math.sin(i * 0.1) ** 2;
                            let py = y0 + h - (val * h * 0.8) - 10;
                            if (i === 0) ctx.moveTo(x0 + i, py); else ctx.lineTo(x0 + i, py);
                        }
                        ctx.stroke();
                        setNeon('#3333ff'); ctx.beginPath();
                        for (let i = 0; i < w; i++) {
                            let val = Math.cos(i * 0.1) ** 2;
                            let py = y0 + h - (val * h * 0.8) - 10;
                            if (i === 0) ctx.moveTo(x0 + i, py); else ctx.lineTo(x0 + i, py);
                        }
                        ctx.stroke();
                    }
                    else if (type === 'energy_disp') {
                        setNeon('#ffff00'); ctx.beginPath();
                        for (let i = -w / 2; i < w / 2; i++) {
                            let x_norm = i / (w / 2);
                            let py = cy + 20 - (x_norm * x_norm * h * 0.6);
                            if (i === -w / 2) ctx.moveTo(cx + i, py); else ctx.lineTo(cx + i, py);
                        }
                        ctx.stroke();
                    }
                    else if (type === 'acc_disp') {
                        setNeon('#00ecff'); ctx.beginPath();
                        ctx.moveTo(x0 + 10, y0 + 10); ctx.lineTo(x0 + w - 10, y0 + h - 10); ctx.stroke();
                    }
                    else if (type === 'vel_disp') {
                        setNeon('#ffa500'); ctx.beginPath();
                        ctx.ellipse(cx, cy, w * 0.4, h * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
                    }
                } else {
                    // Draw Equation
                    const eq = equations[Math.floor(Math.random() * equations.length)];
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#00ecff';
                    ctx.shadowBlur = 10;
                    const fontSize = 24; // Larger font
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(eq, cx, cy);
                    ctx.shadowBlur = 0;
                }
                ctx.restore();
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(15, 15);
        return texture;
    }

    generate() {
        // Walls - Simple Sine Wave (Uncluttered)
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
        const wallMat = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            map: wallTex
        });

        // GENERATE FLOOR
        const floorTex = this.createSurfaceTexture('#ccccdd', '#888899'); // Extremely bright base
        const floorGeo = new THREE.PlaneGeometry(this.grid[0].length * this.cellSize, this.grid.length * this.cellSize);
        const floorMat = new THREE.MeshLambertMaterial({
            color: 0xffffff, // Max white reflection
            emissive: 0x666666, // Strong emissive glow
            map: floorTex,
            side: THREE.DoubleSide
        });

        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(
            (this.grid[0].length * this.cellSize) / 2 - this.cellSize / 2,
            -2,
            (this.grid.length * this.cellSize) / 2 - this.cellSize / 2
        );
        this.scene.add(floor);

        // GENERATE CEILING
        const ceilTex = this.createSurfaceTexture('#222233', '#444455'); // Darker for contrast
        const ceilMat = new THREE.MeshLambertMaterial({
            color: 0xcccccc,
            emissive: 0x333333,
            map: ceilTex,
            side: THREE.DoubleSide
        });
        const ceil = new THREE.Mesh(floorGeo, ceilMat); // Reuse geo
        ceil.rotation.x = Math.PI / 2;
        ceil.position.set(
            floor.position.x,
            2,
            floor.position.z
        );
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
                    this.colliders.push(new THREE.Box3().setFromObject(wall));
                } else if (type === 2) { // Token
                    this.createToken(x, z);
                } else if (type === 3) { // Door
                    this.createDoor(x, z);
                } else if (type === 0 && Math.random() < 0.25) { // 25% chance of random token
                    this.createToken(x, z);
                }
            }
        }
    }

    // maze.js

    createToken(x, z) {
        // 1. Random Geometry Selector
        const shapes = [
            new THREE.BoxGeometry(0.4, 0.4, 0.4),          // Cube
            new THREE.OctahedronGeometry(0.35),            // Diamond shape
            new THREE.TorusGeometry(0.25, 0.1, 8, 16),     // Donut ring
            new THREE.IcosahedronGeometry(0.35),           // 20-sided gem
            new THREE.ConeGeometry(0.3, 0.6, 16)           // Pyramid/Crystal
        ];
        
        // Pick a random shape
        const geo = shapes[Math.floor(Math.random() * shapes.length)];

        // 2. Random Neon Color Generator
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1.0, 0.5); // Random Hue, Full Saturation, 50% Lightness

        const mat = new THREE.MeshStandardMaterial({ 
            color: color, 
            emissive: color,
            emissiveIntensity: 0.5,
            metalness: 0.7,
            roughness: 0.2
        });

        const token = new THREE.Mesh(geo, mat);
        token.position.set(x, 1, z);

        // Animation: Add random rotation speed to userData so we can spin them differently in main.js
        token.userData = { 
            type: 'token', 
            level: Math.random() < 0.6 ? 1 : 2, // 60% Recall, 40% Understanding
            rotSpeed: {
                x: Math.random() * 2,
                y: Math.random() * 2
            } 
        };

        this.scene.add(token);
        this.tokens.push(token);
    }

    createDoor(x, z) {
        const geo = new THREE.BoxGeometry(this.cellSize, 4, 0.5);
        const mat = new THREE.MeshStandardMaterial({ color: 0xff00de, transparent: true, opacity: 0.8 });
        const door = new THREE.Mesh(geo, mat);
        door.position.set(x, 0, z);
        door.userData = { type: 'door', level: 3 }; // Harder question
        this.scene.add(door);
        this.doors.push(door);
        this.colliders.push(new THREE.Box3().setFromObject(door));
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
