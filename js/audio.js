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
        const loadSound = (path, soundObj, volume = 0.5, loop = false) => {
            this.audioLoader.load(path, (buffer) => {
                soundObj.setBuffer(buffer);
                soundObj.setLoop(loop);
                soundObj.setVolume(volume);
            });
        };

        loadSound('./assets/bgm.mp3', this.sounds.bgm, 0.3, true);
        loadSound('./assets/success.mp3', this.sounds.success, 0.6, false); // Lower volume slightly
        loadSound('./assets/fail.mp3', this.sounds.fail, 0.5, false);
    }


    // Add this method inside your AudioManager class
    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }
    
    resumeAudioContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume().then(() => {
                console.log("Audio Context Resumed!");
            });
        }
    }
    // --- NEW LOGIC START ---
    
    playBGM() {
        // Checks if loaded AND not already playing
        if (this.sounds.bgm.buffer && !this.sounds.bgm.isPlaying) {
            this.sounds.bgm.play(); 
        }
    }

    pauseBGM() {
        if (this.sounds.bgm.isPlaying) {
            this.sounds.bgm.pause();
        }
    }
    
    // --- NEW LOGIC END ---

    playSuccess() {
        if (this.sounds.success.buffer) {
            if (this.sounds.success.isPlaying) this.sounds.success.stop();
            this.sounds.success.play();
        }
    }

    playFail() {
        if (this.sounds.fail.buffer) {
            if (this.sounds.fail.isPlaying) this.sounds.fail.stop();
            this.sounds.fail.play();
        }
    }
}
