import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // DEFAULT MODE: QUIET (No music until game explicitly starts)
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
            this.sounds.bgm.setVolume(0.3);
            
            // CRITICAL CHECK: Only play if we are in GAME mode right now
            if (this.currentMode === 'GAME' && !this.sounds.bgm.isPlaying) {
                 this.sounds.bgm.play();
            }
        });

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

    // --- MODE SYSTEM (Fixes the non-stop music) ---
    
    setMode(mode) {
        this.currentMode = mode;

        if (mode === 'GAME') {
            // Unmute and Play
            if (this.sounds.bgm.buffer) {
                this.sounds.bgm.setVolume(0.3);
                if (!this.sounds.bgm.isPlaying) this.sounds.bgm.play();
            }
        } 
        else if (mode === 'QUIET') {
            // Mute Immediately
            if (this.sounds.bgm.isPlaying) {
                this.sounds.bgm.setVolume(0); 
            }
        }
    }

    playSuccess() {
        this.setMode('QUIET'); // Enforce silence
        if (this.sounds.success.buffer) {
            if (this.sounds.success.isPlaying) this.sounds.success.stop();
            this.sounds.success.play();
        }
    }

    playFail() {
        this.setMode('QUIET'); // Enforce silence
        if (this.sounds.fail.buffer) {
            if (this.sounds.fail.isPlaying) this.sounds.fail.stop();
            this.sounds.fail.play();
        }
    }
}
