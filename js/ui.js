import { getQuestion } from './questions.js';

export class UI {
    constructor(game, audioManager) {
        this.game = game;
        this.audioManager = audioManager;
        this.score = 0;
        this.isGameActive = false;

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

        // SAFETY: Make crosshair click-through permanently in case JS toggling fails
        if (this.elements.crosshair) {
            this.elements.crosshair.style.pointerEvents = 'none';
        }

        this.elements.startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isGameActive = true;
        this.elements.startScreen.classList.add('hidden');

        // AUDIO: Wake up and set to GAME mode
        if (this.audioManager) {
            this.audioManager.resumeContext(); 
            this.audioManager.setMode('GAME');
        }

        document.body.requestPointerLock();
    }

    addScore(points) {
        this.score += points;
        this.elements.score.textContent = this.score;
    }

    showQuestion(level, onSuccess) {
        this.isGameActive = false;
        
        // 1. RELEASE MOUSE
        document.exitPointerLock();

        // 2. HIDE CROSSHAIR (Crucial: prevents blocking clicks)
        if (this.elements.crosshair) this.elements.crosshair.style.display = 'none';

        // 3. SILENCE BGM
        if (this.audioManager) this.audioManager.setMode('QUIET');

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
            
            // Mouse Enter/Leave for better feedback
            btn.onmouseenter = () => btn.style.transform = "scale(1.05)";
            btn.onmouseleave = () => btn.style.transform = "scale(1)";

            btn.onclick = (e) => {
                // Stop click propagation
                e.stopPropagation();

                if (opt.correct) {
                    if (this.audioManager) this.audioManager.playSuccess();

                    btn.classList.add('correct-anim');
                    this.elements.feedback.textContent = q.feedback;
                    this.elements.feedback.style.color = '#00ff66';
                    
                    if (window.MathJax && window.MathJax.typesetPromise) {
                        window.MathJax.typesetPromise([this.elements.feedback]);
                    }

                    setTimeout(() => {
                        this.elements.questionModal.classList.add('hidden');
                        
                        // RESTORE CROSSHAIR
                        if (this.elements.crosshair) this.elements.crosshair.style.display = 'block';

                        this.isGameActive = true;
                        document.body.requestPointerLock();
                        
                        // RESUME BGM
                        if (this.audioManager) this.audioManager.setMode('GAME');
                        
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

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([this.elements.text, this.elements.options]);
        }
    }

    showWinScreen(finalScore) {
        if (this.audioManager) this.audioManager.playSuccess();
        
        this.isGameActive = false;
        document.exitPointerLock();
        
        const winScreen = document.getElementById('win-screen');
        const scoreDisplay = document.getElementById('final-score');
        const restartBtn = document.getElementById('restart-btn');
        
        if (scoreDisplay) scoreDisplay.textContent = `Final Score: ${finalScore}`;
        if (winScreen) winScreen.classList.remove('hidden');
        
        if (restartBtn) restartBtn.onclick = () => location.reload();
    }
}
