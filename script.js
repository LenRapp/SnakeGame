import {Snake} from './Classes/Snake.js';
import { Food } from './Classes/Food.js';

// Configuration du jeu
export const GameSize = 600;
export const SquareSize = 20;
export const GameSpeed = 100;

// Éléments du DOM
const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const mainMenuScreen = document.getElementById('mainMenu');
const finalScoreDisplay = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');

// Initialisation du jeu
let snake = new Snake(SquareSize);
let food = new Food(SquareSize);
let score = 0;
let gameLoop;
let isPaused = false;
let isGameRunning = false;

// Configuration du canvas
canvas.width = GameSize;
canvas.height = GameSize;

// Gestion des touches
const keyDirections = {
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'z': 'up',
    's': 'down',
    'q': 'left',
    'd': 'right'
};

document.addEventListener('keydown', (event) => {
    if (!isGameRunning) return;

    const direction = keyDirections[event.key.toLowerCase()];
    if (direction) {
        event.preventDefault();
        snake.setDirection(direction);
    } else if (event.key === ' ') {
        togglePause();
    }
});

// Gestion du jeu
function gameOver() {
    clearInterval(gameLoop);
    isGameRunning = false;
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

function restart() {
    snake.reset();
    food.setRandomPosition();
    score = 0;
    scoreDisplay.textContent = score;
    gameOverScreen.classList.add('hidden');
    startGame();
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameLoop);
    } else {
        startGame();
    }
}

function update() {
    if (isPaused) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, GameSize, GameSize);

    // Dessiner la grille
    drawGrid();

    // Mettre à jour et dessiner le serpent
    snake.move();
    snake.draw();

    // Vérifier les collisions avec la nourriture
    const head = snake.blocks[0];
    if (head.x === food.x && head.y === food.y) {
        snake.grow();
        food.setRandomPosition();
        score += 1;
        scoreDisplay.textContent = score;
    }

    // Dessiner la nourriture
    food.draw();

    // Vérifier si le jeu est terminé
    if (snake.isDead) {
        gameOver();
    }
}

function drawGrid() {
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= GameSize; i += SquareSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, GameSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(GameSize, i);
        ctx.stroke();
    }
}

function startGame() {
    if (gameLoop) clearInterval(gameLoop);
    isGameRunning = true;
    mainMenuScreen.classList.add('hidden'); // Cacher le menu
    gameLoop = setInterval(update, GameSpeed);
}

// Initial display (render grid once so it's not empty)
drawGrid();

// Event Listeners
startButton.addEventListener('click', () => {
    // Réinitialiser l'état si besoin
    snake.reset();
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
});
restartButton.addEventListener('click', restart);
// startGame(); // Supprimé pour ne pas lancer le jeu automatiquement