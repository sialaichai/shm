import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // Flag to remember if we should be playing
        this.shouldPlayBGM = false; 

        this.sounds = {
            bgm: new THREE.Audio(this.listener),
            success: new THREE.Audio(this.listener),
            fail: new THREE.Audio(this.listener)
        };
    }

    load() {
        const loadSound = (path, soundObj, volume = 0.5, loop = false, isBGM = false) => {
            this.audioLoader.load(path, (buffer) => {
                soundObj.setBuffer(buffer);
                soundObj.setLoop(loop);
                soundObj.setVolume(volume);

                // FIX 4: If BGM finishes loading AND we already clicked start, play immediately
                if (isBGM && this.shouldPlayBGM && !soundObj.isPlaying) {
                    soundObj.play();
                }
            });
        };

        // Mark the first one as BGM
        loadSound('./assets/bgm.mp3', this.sounds.bgm, 0.3, true, true);
        loadSound('./assets/success.mp3', this.sounds.success, 0.6, false);
        loadSound('./assets/fail.mp3', this.sounds.fail, 0.5, false);
    }

    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }

    playBGM() {
        this.shouldPlayBGM = true; // Remember that user wants music
        
        // Only play if buffer is ready
        if (this.sounds.bgm.buffer && !this.sounds.bgm.isPlaying) {
            this.sounds.bgm.play();
        }
    }

    pauseBGM() {
        this.shouldPlayBGM = false; // Stop auto-playing
        if (this.sounds.bgm.isPlaying) {
            this.sounds.bgm.pause();
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
