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
        // Load Background Music
        this.audioLoader.load('./assets/bgm.mp3', (buffer) => {
            this.sounds.bgm.setBuffer(buffer);
            this.sounds.bgm.setLoop(true); // Loop it!
            this.sounds.bgm.setVolume(0.3); // Keep it subtle (30% volume)
        });

        // Load Success Sound
        this.audioLoader.load('./assets/success.mp3', (buffer) => {
            this.sounds.success.setBuffer(buffer);
            this.sounds.success.setVolume(0.8);
            this.sounds.success.setLoop(false);
        });

        // Load Fail Sound
        this.audioLoader.load('./assets/fail.mp3', (buffer) => {
            this.sounds.fail.setBuffer(buffer);
            this.sounds.fail.setVolume(0.6);
            this.sounds.fail.setLoop(false);
        });
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