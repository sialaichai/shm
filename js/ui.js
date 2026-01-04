import { getQuestion } from './questions.js';

export class UI {
    constructor(game, audioManager) {
        console.log("UI: Robust Scoring Loaded");
        this.game = game;
        this.audioManager = audioManager;
        
        // --- SCORING MEMORY ---
        this.score = 0;
        this.maxScore = 0;
        this.totalQuestions = 0;
        this.questionsCompleted = 0;
        
        // Map: ID -> { level, isFailed, isSolved }
        this.questionMemory = new Map(); 

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

        if (this.elements.crosshair) {
            this.elements.crosshair.style.pointerEvents = 'none';
        }

        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.updateHUD(); 
    }

    // Called by Maze to set up the scoreboard
    registerQuestion(id, level) {
        if (!this.questionMemory.has(id)) {
            console.log(`UI: Registered Question ${id} (Level ${level})`);
            this.questionMemory.set(id, { 
                level: level, 
                isFailed: false, 
                isSolved: false 
            });

            this.maxScore += level;
            this.totalQuestions++;
            this.updateHUD();
        }
    }

    startGame() {
        this.isGameActive = true;
        this.elements.startScreen.classList.add('hidden');

        if (this.audioManager) {
            this.audioManager.resumeContext(); 
            this.audioManager.setMode('GAME');
        }

        document.body.requestPointerLock();
    }

    updateHUD() {
        this.elements.score.innerHTML = `
            Score: <span style="color:#00ff66">${this.score}</span> / ${this.maxScore} <br>
            <span style="font-size: 0.8em; color:#ccc;">Progress: ${this.questionsCompleted} / ${this.totalQuestions}</span>
        `;
    }

    showQuestion(id, onSuccess) {
        this.isGameActive = false;
        document.exitPointerLock();

        if (this.elements.crosshair) this.elements.crosshair.style.display = 'none';
        if (this.audioManager) this.audioManager.setMode('QUIET');

        // --- SAFETY FIX: Ensure Memory Exists ---
        let memory = this.questionMemory.get(id);
        
        if (!memory) {
            console.warn(`UI: Warning - ID ${id} was not registered! creating memory now.`);
            // Create a default memory entry so we can still track failures
            memory = { level: 1, isFailed: false, isSolved: false }; 
            this.questionMemory.set(id, memory);
        }
        // ----------------------------------------

        const level = memory.level;
        const isAlreadyFailed = memory.isFailed;

        const q = getQuestion(level);
        
        this.elements.category.textContent = q.category;
        
        // Visual Warning
        if (isAlreadyFailed) {
            this.elements.text.textContent = `[0 Points Possible] ${q.question}`;
            this.elements.text.style.color = '#ff9999';
        } else {
            this.elements.text.textContent = q.question;
            this.elements.text.style.color = '#ffffff';
        }

        this.elements.options.innerHTML = '';
        this.elements.feedback.textContent = '';
        this.elements.questionModal.classList.remove('hidden');
        this.elements.questionModal.style.zIndex = "1000";

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            btn.style.pointerEvents = "all";
            btn.style.cursor = "pointer";

            btn.onclick = (e) => {
                e.stopPropagation();

                if (opt.correct) {
                    // --- CORRECT ANSWER ---
                    
                    // CHECK MEMORY AGAIN
                    const currentMemory = this.questionMemory.get(id);
                    const points = (currentMemory && currentMemory.isFailed) ? 0 : level;
                    
                    if (points > 0) {
                        this.score += points;
                        if (currentMemory) currentMemory.isSolved = true; 
                    } else {
                        console.log("UI: Correct answer, but 0 points awarded due to previous failure.");
                    }
                    
                    this.questionsCompleted++; 
                    this.updateHUD();

                    if (this.audioManager) this.audioManager.playSuccess();

                    btn.classList.add('correct-anim');
                    this.elements.feedback.textContent = `${q.feedback} (+${points} pts)`;
                    this.elements.feedback.style.color = points > 0 ? '#00ff66' : '#ffff00';
                    
                    if (window.MathJax && window.MathJax.typesetPromise) {
                        window.MathJax.typesetPromise([this.elements.feedback]);
                    }

                    setTimeout(() => {
                        this.elements.questionModal.classList.add('hidden');
                        if (this.elements.crosshair) this.elements.crosshair.style.display = 'block';
                        this.isGameActive = true;
                        document.body.requestPointerLock();
                        if (this.audioManager) this.audioManager.setMode('GAME');
                        
                        onSuccess();
                    }, 2500); 

                } else {
                    // --- WRONG ANSWER ---
                    
                    // SAVE FAILURE TO MEMORY
                    const currentMemory = this.questionMemory.get(id);
                    if (currentMemory) {
                        currentMemory.isFailed = true;
                        console.log(`UI: Question ${id} marked as FAILED.`);
                    }

                    if (this.audioManager) this.audioManager.playFail();

                    btn.classList.add('wrong-anim');
                    this.elements.feedback.textContent = "Try again! (Points lost for this question)";
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
        if (scoreDisplay) scoreDisplay.innerHTML = `Final Score: ${this.score} / ${this.maxScore}`;
        if (winScreen) winScreen.classList.remove('hidden');
        if (restartBtn) restartBtn.onclick = () => location.reload();
    }
}
