import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        // 1. Create the listener and attach it to the camera
        // This is like the "ears" of the player
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);

        this.audioLoader = new THREE.AudioLoader();
        
        // Storage for our sounds
        this.sounds = {
            bgm: new THREE.Audio(this.listener),
            success: new THREE.Audio(this.listener),
            fail: new THREE.Audio(this.listener)
        };
    }

    load() {
        // Helper to load sound with error logging
        const loadSound = (path, soundObj, volume = 0.5, loop = false) => {
            this.audioLoader.load(
                path,
                (buffer) => {
                    console.log(`Loaded audio: ${path}`); // Success Log
                    soundObj.setBuffer(buffer);
                    soundObj.setLoop(loop);
                    soundObj.setVolume(volume);
                },
                null, // Progress callback (not needed)
                (err) => {
                    console.error(`FAILED to load audio at: ${path}`, err); // Error Log
                }
            );
        };

        // Load all 3 sounds
        loadSound('./assets/bgm.mp3', this.sounds.bgm, 0.3, true);
        loadSound('./assets/success.mp3', this.sounds.success, 0.8, false);
        loadSound('./assets/fail.mp3', this.sounds.fail, 0.6, false);
    }

    playBGM() {
        // Browser Policy: Audio can only start after a user interacts
        if (this.sounds.bgm.buffer && !this.sounds.bgm.isPlaying) {
            this.sounds.bgm.play();
        }
    }

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
