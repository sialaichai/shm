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

        this.elements.startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isGameActive = true;
        this.elements.startScreen.classList.add('hidden');

        // 1. WAKE UP AUDIO & PLAY BGM
        if (this.audioManager) {
            this.audioManager.resumeContext(); 
            this.audioManager.playBGM();
        }

        // 2. Lock the mouse
        document.body.requestPointerLock();
    }

    addScore(points) {
        this.score += points;
        this.elements.score.textContent = this.score;
    }

    showQuestion(level, onSuccess) {
        this.isGameActive = false;
        document.exitPointerLock();

        // --- THIS IS THE FIX: PAUSE MUSIC HERE ---
        if (this.audioManager) this.audioManager.pauseBGM();
        // -----------------------------------------

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
                    // SUCCESS: Play success sound (BGM is still paused)
                    if (this.audioManager) this.audioManager.playSuccess();

                    btn.classList.add('correct-anim');
                    this.elements.feedback.textContent = q.feedback;
                    this.elements.feedback.style.color = '#00ff66';
                    
                    if (window.MathJax && window.MathJax.typesetPromise) {
                        window.MathJax.typesetPromise([this.elements.feedback]);
                    }

                    setTimeout(() => {
                        this.elements.questionModal.classList.add('hidden');
                        this.isGameActive = true;
                        document.body.requestPointerLock();
                        
                        // RESUME BGM: Only when back in the maze
                        if (this.audioManager) this.audioManager.playBGM();
                        
                        onSuccess();
                    }, 2500); 
                } else {
                    // FAIL: Play fail sound (BGM stays paused)
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
