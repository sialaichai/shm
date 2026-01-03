import { getQuestion } from './questions.js';

export class UI {
    constructor(game, audioManager) {
        this.game = game;
        this.score = 0;
        this.isGameActive = false;
		this.audioManager = audioManager; // Save it
        this.elements = {
            hud: document.getElementById('hud'),
            score: document.getElementById('score'),
            questionModal: document.getElementById('question-modal'),
            category: document.getElementById('q-category'),
            text: document.getElementById('q-text'),
            options: document.getElementById('q-options'),
            feedback: document.getElementById('q-feedback'),
            startScreen: document.getElementById('start-screen'),
            startBtn: document.getElementById('start-btn'),
            crosshair: document.getElementById('crosshair')
        };

        this.elements.startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isGameActive = true;
        this.elements.startScreen.classList.add('hidden');

        // FIX 1: Wake up Audio FIRST, then lock the mouse.
        // Swapping this order ensures the browser accepts the "click" as an audio trigger.
        if (this.audioManager) {
            this.audioManager.resumeContext();
            this.audioManager.playBGM();
        }

        // Lock mouse second
        document.body.requestPointerLock();
    }

    addScore(points) {
        this.score += points;
        this.elements.score.textContent = this.score;
    }

    updateDebug(x, z) {
        const debugEl = document.getElementById('debug-coords');
        if (!debugEl) {
            const d = document.createElement('div');
            d.id = 'debug-coords';
            d.style.position = 'absolute';
            d.style.bottom = '10px';
            d.style.left = '10px';
            d.style.color = 'white';
            d.style.fontFamily = 'monospace';
            this.elements.hud.appendChild(d);
            return;
        }
        debugEl.textContent = `Pos: ${x.toFixed(1)}, ${z.toFixed(1)}`;
    }

    showQuestion(level, onSuccess) {
        this.isGameActive = false;
        document.exitPointerLock();
		// 1. PAUSE MUSIC (Quiet for concentration)
        if (this.audioManager) this.audioManager.pauseBGM();
        
		const q = getQuestion(level);
        
        this.elements.category.textContent = q.category;
        
        // 1. Set the text content (MathJax will look for $ signs here)
        this.elements.text.textContent = q.question;
        
        this.elements.options.innerHTML = '';
        this.elements.feedback.textContent = '';
        this.elements.questionModal.classList.remove('hidden');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            // 2. Set option text
            btn.textContent = opt.text;
            
            btn.onclick = () => {
                if (opt.correct) {
				                    // SAFETY CHECK
				    if (this.audioManager) {
				        this.audioManager.playSuccess();
				    }
					
					btn.classList.add('correct-anim');
                    
                    // 3. Render feedback math
                    this.elements.feedback.textContent = q.feedback;
					this.elements.feedback.style.color = '#00ff66';
                    
					// Trigger MathJax to render the feedback immediately
                    if (window.MathJax) {
                        window.MathJax.typesetPromise([this.elements.feedback]);
                    }

                    
                    setTimeout(() => {
                        this.elements.questionModal.classList.add('hidden');
                        this.isGameActive = true;
                        document.body.requestPointerLock();

						// 3. RESUME MUSIC (Game loop returns)
                        if (this.audioManager) this.audioManager.playBGM();
						
                        onSuccess();
                    }, 2500); // Increased time to read feedback
                } else {
                    // 4. PLAY FAILURE SOUND
                    // SAFETY CHECK
				    if (this.audioManager) {
				        this.audioManager.playFail();
				    }
					btn.classList.add('wrong-anim');
					
                    this.elements.feedback.textContent = "Try again!";
                    this.elements.feedback.style.color = '#ff3333';
            showQuestion(level, onSuccess) {
        this.isGameActive = false;
        document.exitPointerLock();

        // FIX 2: This line was missing! You must pause BGM here.
        if (this.audioManager) this.audioManager.pauseBGM();

        const q = getQuestion(level);
        this.elements.category.textContent = q.category;
        this.elements.text.textContent = q.question;
        this.elements.options.innerHTML = '';
        this.elements.feedback.textContent = '';
        this.elements.questionModal.classList.remove('hidden');

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            
            btn.onclick = () => {
                if (opt.correct) {
                    if (this.audioManager) this.audioManager.playSuccess();

                    btn.classList.add('correct-anim');
                    this.elements.feedback.textContent = q.feedback;
                    this.elements.feedback.style.color = '#00ff66';

                    if (window.MathJax) window.MathJax.typesetPromise([this.elements.feedback]);

                    setTimeout(() => {
                        this.elements.questionModal.classList.add('hidden');
                        this.isGameActive = true;
                        document.body.requestPointerLock();
                        
                        // FIX 3: Resume BGM when they return to the game
                        if (this.audioManager) this.audioManager.playBGM();
                        
                        onSuccess();
                    }, 2500);
                } else {
                    if (this.audioManager) this.audioManager.playFail();

                    btn.classList.add('wrong-anim');
                    this.elements.feedback.textContent = "Try again!";
                    this.elements.feedback.style.color = '#ff3333';
                }
            };
            this.elements.options.appendChild(btn);
        });

        if (window.MathJax) {
            window.MathJax.typesetPromise([this.elements.text, this.elements.options]);
        }
    }
		
		// Optional: Add a victory sound in showWinScreen()
		
        // 4. TRIGGER MATHJAX RE-RENDER
        // This tells MathJax to find all $...$ in the modal and turn them into math
        if (window.MathJax) {
            window.MathJax.typesetPromise([
                this.elements.text, 
				this.elements.options,
				this.elements.feedback
            ]);
        }
	}	
	showWinScreen(finalScore) {
		// SAFETY CHECK
	    if (this.audioManager) {
	        this.audioManager.playSuccess(); 
	    }
		
    }
}
