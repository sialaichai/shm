import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
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
        });

        // Load Success
        this.audioLoader.load('./assets/success.mp3', (buffer) => {
            this.sounds.success.setBuffer(buffer);
            this.sounds.success.setVolume(0.6);
            this.sounds.success.setLoop(false);
        });

        // Load Fail
        this.audioLoader.load('./assets/fail.mp3', (buffer) => {
            this.sounds.fail.setBuffer(buffer);
            this.sounds.fail.setVolume(0.5);
            this.sounds.fail.setLoop(false);
        });
    }

    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }

    // --- NEW ROBUST LOGIC ---

    playBGM() {
        console.log("Audio: Attempting to play BGM...");
        if (this.sounds.bgm.buffer) {
            // 1. Force Volume Up
            this.sounds.bgm.setVolume(0.3);
            
            // 2. Play if not playing
            if (!this.sounds.bgm.isPlaying) {
                this.sounds.bgm.play();
                console.log("Audio: BGM Started.");
            }
        }
    }

    stopBGM() {
        console.log("Audio: Attempting to STOP BGM...");
        if (this.sounds.bgm.isPlaying) {
            // 1. Force Volume to 0 (The Nuclear Option)
            this.sounds.bgm.setVolume(0);
            
            // 2. Stop the track
            this.sounds.bgm.stop();
            console.log("Audio: BGM Stopped.");
        } else {
            console.log("Audio: BGM was already stopped (or engine thinks so).");
        }
    }
    
    // ------------------------

    playSuccess() {
        // Ensure BGM is killed before playing success
        this.stopBGM(); 
        
        if (this.sounds.success.buffer) {
            if (this.sounds.success.isPlaying) this.sounds.success.stop();
            this.sounds.success.play();
        }
    }

    playFail() {
        // Ensure BGM is killed before playing fail
        this.stopBGM(); 
        
        if (this.sounds.fail.buffer) {
            if (this.sounds.fail.isPlaying) this.sounds.fail.stop();
            this.sounds.fail.play();
        }
    }
}
