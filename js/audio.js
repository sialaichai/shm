import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        console.log("AUDIO: VERSION RANDOM-BGM LOADED"); 
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // Start QUIET
        this.currentMode = 'QUIET'; 

        // --- CHANGE THIS NUMBER to match your file count ---
        this.totalTracks = 5; 
        // --------------------------------------------------

        this.sounds = {
            bgm: new THREE.Audio(this.listener),
            success: new THREE.Audio(this.listener),
            fail: new THREE.Audio(this.listener)
        };
    }

    load() {
        // --- RANDOM BGM SELECTION ---
        // 1. Pick a random number between 1 and totalTracks
        const randomNum = Math.floor(Math.random() * this.totalTracks) + 1;
        
        // 2. Build the filename (e.g., "./assets/bgm2.mp3")
        const bgmFile = `./assets/bgm${randomNum}.mp3`;

        console.log(`🎵 Loading Random BGM: ${bgmFile}`);

        // 3. Load the random file
        this.audioLoader.load(bgmFile, (buffer) => {
            this.sounds.bgm.setBuffer(buffer);
            this.sounds.bgm.setLoop(true);
            this.sounds.bgm.setVolume(0); // Start Muted
            
            // Only play if GAME mode is active (Preserves your existing logic)
            if (this.currentMode === 'GAME') {
                 this.sounds.bgm.setVolume(0.3);
                 if (!this.sounds.bgm.isPlaying) this.sounds.bgm.play();
            }
        });

        // --- Load SFX (Unchanged) ---
        this.audioLoader.load('./assets/success.mp3', (buffer) => {
            this.sounds.success.setBuffer(buffer);
            this.sounds.success.setVolume(0.6);
        });

        this.audioLoader.load('./assets/fail.mp3', (buffer) => {
            this.sounds.fail.setBuffer(buffer);
            this.sounds.fail.setVolume(0.5);
        });
    }

    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }

    // --- YOUR EXISTING LOGIC BELOW (Unchanged) ---
    setMode(mode) {
        this.currentMode = mode;
        console.log("Audio Mode Set To:", mode);

        if (mode === 'GAME') {
            if (this.sounds.bgm.buffer) {
                this.sounds.bgm.setVolume(0.3);
                if (!this.sounds.bgm.isPlaying) this.sounds.bgm.play();
            }
        } 
        else if (mode === 'QUIET') {
            // FORCE MUTE
            if (this.sounds.bgm.buffer) {
                this.sounds.bgm.setVolume(0); 
            }
        }
    }

    playSuccess() {
        this.setMode('QUIET'); 
        if (this.sounds.success.buffer) {
            if (this.sounds.success.isPlaying) this.sounds.success.stop();
            this.sounds.success.play();
        }
    }

    playFail() {
        this.setMode('QUIET'); 
        if (this.sounds.fail.buffer) {
            if (this.sounds.fail.isPlaying) this.sounds.fail.stop();
            this.sounds.fail.play();
        }
    }
}
