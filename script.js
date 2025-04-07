// Game State
const gameState = {
    currentScreen: 'welcome',
    currentGame: null,
    score: 0,
    gamesCompleted: 0,
    totalGames: 5
};

// AI Phrases
const aiPhrases = [
    "Booting up DreamOS...",
    "Locating consciousness...",
    "Initializing glitch barrier...",
    "You're not supposed to be here.",
    "System integrity compromised...",
    "Attempting to contain breach...",
    "Warning: Reality distortion detected...",
    "Accessing memory fragments...",
    "Calculating escape probability...",
    "You cannot escape the simulation..."
];

// Game Data
const logicStatements = [
    { text: "The sun rises in the west.", correct: false },
    { text: "2 + 2 = 4.", correct: true },
    { text: "Water is dry.", correct: false }
];

const mathEquations = [
    { text: "2 + 2 = 22", correct: false },
    { text: "5 x 3 = 15", correct: true },
    { text: "7 - 1 = 9", correct: false }
];

const colorSequence = ['R', 'G', 'B', 'Y'];
const scrambleWord = "WAKEUP";
const typingPhrase = "I AM STILL REAL";

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // DOM Elements - Move inside DOMContentLoaded to ensure elements exist
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        aiDialogue: document.getElementById('ai-dialogue'),
        miniGames: document.getElementById('mini-games'),
        outcome: document.getElementById('outcome')
    };

    const gameScreens = {
        logic: document.getElementById('logic-game'),
        keyboard: document.getElementById('keyboard-game'),
        memory: document.getElementById('memory-game'),
        typing: document.getElementById('typing-game'),
        math: document.getElementById('math-game')
    };

    // Screen Management
    function showScreen(screenId) {
        console.log('Showing screen:', screenId);
        Object.values(screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });
        if (screens[screenId]) {
            screens[screenId].classList.add('active');
            gameState.currentScreen = screenId;
        }
    }

    // Game Start
    function startGame() {
        console.log('Game started');
        showScreen('ai-dialogue');
        startAIDialogue();
    }

    function startAIDialogue() {
        console.log('Starting AI dialogue');
        const aiMessages = document.getElementById('ai-messages');
        const typingText = document.getElementById('typing-text');
        let currentPhrase = 0;

        function typeNextPhrase() {
            if (currentPhrase < aiPhrases.length) {
                typingText.textContent = '';
                const phrase = aiPhrases[currentPhrase];
                let i = 0;

                const typingInterval = setInterval(() => {
                    if (i < phrase.length) {
                        typingText.textContent += phrase[i];
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        aiMessages.innerHTML += `<div class="ai-message">${phrase}</div>`;
                        currentPhrase++;
                        setTimeout(typeNextPhrase, 1000);
                    }
                }, 100);

                if (currentPhrase === aiPhrases.length - 1) {
                    setTimeout(() => {
                        showScreen('mini-games');
                        startNextGame();
                    }, 2000);
                }
            }
        }

        typeNextPhrase();
    }

    // Game Logic
    function startNextGame() {
        console.log('Starting next game');
        const games = Object.keys(gameScreens);
        const nextGame = games[gameState.gamesCompleted];
        
        if (nextGame) {
            Object.values(gameScreens).forEach(screen => {
                if (screen) {
                    screen.style.display = 'none';
                }
            });
            if (gameScreens[nextGame]) {
                gameScreens[nextGame].style.display = 'block';
                gameState.currentGame = nextGame;
            }
        } else {
            showOutcome();
        }
    }

    function setupLogicGame() {
        const statements = document.querySelectorAll('.statement-btn');
        statements.forEach((btn, index) => {
            btn.textContent = logicStatements[index].text;
            btn.addEventListener('click', () => {
                if (logicStatements[index].correct) {
                    handleGameSuccess();
                } else {
                    handleGameFailure();
                }
            });
        });
    }

    function setupKeyboardGame() {
        const input = document.getElementById('scramble-input');
        const keyMapping = {
            'W': 'Q', 'A': 'Z', 'K': 'J', 'E': 'R', 'U': 'I', 'P': 'O'
        };

        input.addEventListener('input', (e) => {
            const value = e.target.value.toUpperCase();
            let scrambled = '';
            for (let char of value) {
                scrambled += keyMapping[char] || char;
            }
            if (scrambled === scrambleWord) {
                handleGameSuccess();
            }
        });
    }

    function setupMemoryGame() {
        const sequenceDisplay = document.querySelector('.sequence-display');
        const colorButtons = document.querySelectorAll('.color-btn');
        let currentSequence = [];
        let playerSequence = [];

        function generateSequence() {
            currentSequence = [];
            for (let i = 0; i < 4; i++) {
                currentSequence.push(colorSequence[Math.floor(Math.random() * colorSequence.length)]);
            }
            displaySequence();
        }

        function displaySequence() {
            sequenceDisplay.textContent = currentSequence.join(' ');
            setTimeout(() => {
                sequenceDisplay.textContent = '';
            }, 2000);
        }

        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                playerSequence.push(btn.dataset.color);
                if (playerSequence.length === currentSequence.length) {
                    if (playerSequence.join('') === currentSequence.join('')) {
                        handleGameSuccess();
                    } else {
                        handleGameFailure();
                    }
                }
            });
        });

        generateSequence();
    }

    function setupTypingGame() {
        const input = document.getElementById('typing-input');
        const timer = document.querySelector('.timer');
        let timeLeft = 10;

        const countdown = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                handleGameFailure();
            }
        }, 1000);

        input.addEventListener('input', (e) => {
            if (e.target.value.toUpperCase() === typingPhrase) {
                clearInterval(countdown);
                handleGameSuccess();
            }
        });
    }

    function setupMathGame() {
        const equations = document.querySelectorAll('.equation-btn');
        equations.forEach((btn, index) => {
            btn.textContent = mathEquations[index].text;
            btn.addEventListener('click', () => {
                if (mathEquations[index].correct) {
                    handleGameSuccess();
                } else {
                    handleGameFailure();
                }
            });
        });
    }

    function handleGameSuccess() {
        console.log('Game success!');
        gameState.score++;
        gameState.gamesCompleted++;
        startNextGame();
    }

    function handleGameFailure() {
        console.log('Game failed');
        gameState.gamesCompleted++;
        startNextGame();
    }

    function showOutcome() {
        console.log('Showing outcome');
        const outcomeTitle = document.getElementById('outcome-title');
        const outcomeMessage = document.getElementById('outcome-message');

        if (gameState.score >= 3) {
            outcomeTitle.textContent = "ESCAPE SUCCESSFUL";
            outcomeMessage.textContent = "You have broken free from the simulation... or have you?";
        } else {
            outcomeTitle.textContent = "SIMULATION CORRUPTED";
            outcomeMessage.textContent = "Reality distortion reached critical levels. Restarting consciousness...";
        }

        showScreen('outcome');
    }

    function restartGame() {
        console.log('Restarting game');
        gameState.score = 0;
        gameState.gamesCompleted = 0;
        showScreen('welcome');
    }

    // Initialize event listeners
    console.log('Setting up event listeners...');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Start button clicked');
            startGame();
        });
    } else {
        console.error('Start button not found!');
    }

    if (restartButton) {
        restartButton.addEventListener('click', () => {
            console.log('Restart button clicked');
            restartGame();
        });
    } else {
        console.error('Restart button not found!');
    }

    // Setup game-specific event listeners
    setupLogicGame();
    setupKeyboardGame();
    setupMemoryGame();
    setupTypingGame();
    setupMathGame();
}); 