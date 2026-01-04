import * as THREE from 'three';
import { Maze } from './maze.js';
import { Player } from './player.js';
import { Interaction } from './interaction.js';
import { UI } from './ui.js';
import { AudioManager } from './audio.js';

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x050510, 0.15); 

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.audioManager = new AudioManager(this.camera);
        this.audioManager.load();

        this.ui = new UI(this, this.audioManager);
		
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); 
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        this.player = new Player(this.camera);
        this.maze = new Maze(this.scene, this.ui); 
        this.interaction = new Interaction(this.scene, this.camera, this.ui, this.maze);

        this.clock = new THREE.Clock();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start State
        this.scene.add(this.player.getObject());
        
        // 1. GENERATE MAZE
        this.maze.generate(); 

        // 2. --- FIX: MOVE PLAYER TO SAFE START POSITION ---
        // This stops you from being "Upside Down" or stuck inside a wall
        const spawn = this.maze.getSpawnPosition();
        this.player.setPosition(spawn.x, spawn.y, spawn.z);

        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.ui.isGameActive) {
            const delta = this.clock.getDelta();
            this.player.update(delta, this.maze.colliders);
            this.interaction.check();
        }
        this.renderer.render(this.scene, this.camera);
    }
}

try {
    window.game = new Game();
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');

    if (startBtn && startScreen) {
        startBtn.textContent = "Enter Simulation (System Ready)";
        startBtn.style.border = "2px solid #00ff66";
        startScreen.style.pointerEvents = "auto";
        startBtn.style.pointerEvents = "auto";
        startBtn.addEventListener('click', () => {
            console.log("Start button clicked");
        });
    }
} catch (e) {
    console.error(e);
    alert("Game Init Error: " + e.message);
}
