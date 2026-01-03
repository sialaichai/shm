import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // SAFETY LOCK: This determines if music is legally allowed to play
        this.canPlayBGM = false; 

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
            
            // If we tried to play before it loaded, play now (only if allowed!)
            if (this.canPlayBGM && !this.sounds.bgm.isPlaying) {
                 this.sounds.bgm.play();
            }
        });

        // Load Success
        this.audioLoader.load('./assets/success.mp3', (buffer) => {
            this.sounds.success.setBuffer(buffer);
            this.sounds.success.setVolume(0.6);
        });

        // Load Fail
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

    // --- NEW BULLETPROOF LOGIC ---

    playBGM() {
        // 1. Grant Permission
        this.canPlayBGM = true;
        
        console.log("Audio: playBGM called. Permission granted.");

        if (this.sounds.bgm.buffer) {
            // 2. Force Volume Up (in case it was muted)
            this.sounds.bgm.setVolume(0.3);
            
            // 3. Play only if not already playing
            if (!this.sounds.bgm.isPlaying) {
                this.sounds.bgm.play();
            }
        }
    }

    stopBGM() {
        // 1. Revoke Permission IMMEDIATELY
        this.canPlayBGM = false;
        
        console.log("Audio: stopBGM called. Permission revoked.");

        // 2. Force Mute (The "Nuclear" Option)
        // Even if the audio engine glitches and keeps playing, it will be silent.
        this.sounds.bgm.setVolume(0);
        
        // 3. Stop if running
        if (this.sounds.bgm.isPlaying) {
            this.sounds.bgm.stop();
        }
    }
    
    // -----------------------------

    playSuccess() {
        // Safety: Ensure BGM is stopped/muted
        this.stopBGM(); 
        
        if (this.sounds.success.buffer) {
            if (this.sounds.success.isPlaying) this.sounds.success.stop();
            this.sounds.success.play();
        }
    }

    playFail() {
        // Safety: Ensure BGM is stopped/muted
        this.stopBGM(); 
        
        if (this.sounds.fail.buffer) {
            if (this.sounds.fail.isPlaying) this.sounds.fail.stop();
            this.sounds.fail.play();
        }
    }
}
