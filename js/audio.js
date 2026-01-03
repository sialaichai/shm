import * as THREE from 'three';

export class AudioManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        
        // Flag: Does the user want music right now?
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

                // Auto-start BGM if it finished loading AFTER we clicked start
                if (isBGM && this.shouldPlayBGM && !soundObj.isPlaying) {
                    soundObj.play();
                }
            });
        };

        // Load files
        loadSound('./assets/bgm.mp3', this.sounds.bgm, 0.3, true, true);
        loadSound('./assets/success.mp3', this.sounds.success, 0.6, false);
        loadSound('./assets/fail.mp3', this.sounds.fail, 0.5, false);
    }

    // Wake up the browser audio engine
    resumeContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume();
        }
    }

    playBGM() {
        this.shouldPlayBGM = true;
        // Only play if the file is actually ready
        if (this.sounds.bgm.buffer && !this.sounds.bgm.isPlaying) {
            this.sounds.bgm.play();
        }
    }

    pauseBGM() {
        this.shouldPlayBGM = false;
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
