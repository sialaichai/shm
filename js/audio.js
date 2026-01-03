import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        console.log("AUDIO: VERSION 6.0 LOADED (Low Volume)"); 
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // Start QUIET
        this.currentMode = 'QUIET'; 

        this.sounds = {
            bgm: new THREE.Audio(this.listener),
            success: new THREE.Audio(this.listener),
            fail: new THREE.Audio(this.listener)
        };
    }

    load() {
        // Load BGM
        this.audioLoader.load('./assets/bgm.mp3', (buffer) => {
            this.sounds.bgm.setBuffer(buffer);
            this.sounds.bgm.setLoop(true);
            this.sounds.bgm.setVolume(0); // Start Muted
            
            // Only play if GAME mode is active
            if (this.currentMode === 'GAME') {
                 // LOWER VOLUME TO 0.1 (Very Soft)
                 this.sounds.bgm.setVolume(0.1);
                 if (!this.sounds.bgm.isPlaying) this.sounds.bgm.play();
            }
        });

        this.audioLoader.load('./assets/success.mp3', (buffer) => {
            this.sounds.success.setBuffer(buffer);
            this.sounds.success.setVolume(0.5); // Slightly softer success
        });

        this.audioLoader.load('./assets/fail.mp3', (buffer) => {
            this.sounds.fail.setBuffer(buffer);
            this.sounds.fail.setVolume(0.4); // Slightly softer fail
        });
    }

    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }

    // --- MODE SYSTEM ---
    setMode(mode) {
        this.currentMode = mode;
        console.log("Audio Mode Set To:", mode);

        if (mode === 'GAME') {
            if (this.sounds.bgm.buffer) {
                // Set to 0.1 (Soft Ambience)
                this.sounds.bgm.setVolume(0.1);
                if (!this.sounds.bgm.isPlaying) this.sounds.bgm.play();
            }
        } 
        else if (mode === 'QUIET') {
            // FORCE MUTE (Volume 0)
            if (this.sounds.bgm.buffer) {
                this.sounds.bgm.setVolume(0); 
            }
        }
    }

    // --- TRANSLATOR FUNCTIONS (Fixes mismatched files) ---
    // If ui.js calls the old "playBGM", we force it to use the new "GAME" mode
    playBGM() {
        this.setMode('GAME');
    }

    // If ui.js calls the old "pauseBGM", we force it to use the new "QUIET" mode
    pauseBGM() {
        this.setMode('QUIET');
    }
    
    stopBGM() {
        this.setMode('QUIET');
    }
    // -----------------------------------------------------

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
