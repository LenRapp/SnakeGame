import {Snake} from './Classes/Snake.js';
import { Food } from './Classes/Food.js';
import { Themes } from './Classes/Themes.js';

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
const themeSelect = document.getElementById('themeSelect');
const gameOverThemeSelect = document.getElementById('gameOverThemeSelect');
const backToMenuButton = document.getElementById('backToMenuButton');

// Initialisation du jeu
let snake = new Snake(SquareSize);
let food = new Food(SquareSize);
let score = 0;
let gameLoop;
let isPaused = false;
let isGameRunning = false;
let currentTheme = Themes.classic;

// Configuration du canvas
canvas.width = GameSize;
canvas.height = GameSize;

// Gestion des thèmes
function applyTheme(themeName) {
    currentTheme = Themes[themeName];
    document.body.style.background = currentTheme.background;
    canvas.style.backgroundColor = currentTheme.canvasBackground;
    canvas.style.borderColor = currentTheme.grid;
    
    const scoreDisplayContainer = document.querySelector('.score-display');
    if (currentTheme.isRetro) {
        scoreDisplayContainer.style.color = currentTheme.canvasBackground; // Le jaune/vert clair de l'écran
        scoreDisplayContainer.style.textShadow = "none";
    } else {
        scoreDisplayContainer.style.color = "white";
        scoreDisplayContainer.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
    }
    
    // Appliquer la police Pixel si c'est le mode rétro
    const gameContainer = document.querySelector('.game-container');
    const infoPanel = document.querySelector('.info-panel');
    const mainLayout = document.querySelector('.main-layout');

    if (currentTheme.isRetro) {
        mainLayout.style.fontFamily = "'Press Start 2P', cursive";
        mainLayout.style.fontSize = "12px";
    } else {
        mainLayout.style.fontFamily = "Arial, sans-serif";
        mainLayout.style.fontSize = "inherit";
    }

    // Synchroniser les sélecteurs
    themeSelect.value = themeName;
    gameOverThemeSelect.value = themeName;

    // Style du panneau d'infos
    infoPanel.style.borderColor = currentTheme.grid;
    infoPanel.style.boxShadow = `0 0 15px ${currentTheme.grid}40`;
    infoPanel.querySelector('h3').style.borderColor = currentTheme.grid;
    infoPanel.querySelector('h3').style.color = currentTheme.grid;
    
    const controlKeys = infoPanel.querySelectorAll('.controls-list span');
    controlKeys.forEach(span => span.style.color = currentTheme.grid);

    // Mettre à jour l'interface des menus (Principal et Game Over)
    const menus = [mainMenuScreen, gameOverScreen];
    
    menus.forEach(menu => {
        const title = menu.querySelector('h1, h2');
        if (title) {
            title.style.color = currentTheme.grid; // Utiliser la couleur de la grille comme couleur principale
            title.style.textShadow = `0 0 10px ${currentTheme.grid}80`; 
        }
        
        // Mise à jour des textes d'information
        const infos = menu.querySelectorAll('p, label');
        infos.forEach(info => info.style.color = currentTheme.textColor);
    });
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.style.background = currentTheme.buttonBackground;
        btn.style.color = currentTheme.buttonText;
        btn.style.boxShadow = `0 0 20px ${currentTheme.buttonBackground}40`;
        
        if (currentTheme.isRetro) {
            btn.style.border = `4px solid ${currentTheme.textColor}`;
            btn.style.borderRadius = "0px"; // Style bien carré pour GameBoy
        } else {
            btn.style.border = "none";
            btn.style.borderRadius = btn.id === 'backToMenuButton' ? "5px" : "50px";
        }
    });
    
    // Style spécifique pour les inputs select
    const selects = document.querySelectorAll('select');
    selects.forEach(sel => {
        sel.style.borderColor = currentTheme.grid;
    });

    if (!isGameRunning) {
        // Redessiner pour voir l'aperçu si le jeu ne tourne pas
        ctx.clearRect(0, 0, GameSize, GameSize);
        drawGrid();
        if (snake && !snake.isDead) snake.draw(currentTheme); // Redessiner le serpent si vivant (menu principal)
    }
}

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

gameOverThemeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

// Appliquer le thème par défaut au démarrage
applyTheme('classic');

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
    // Si le jeu n'est pas lancé, on ignore les touches de direction
    if (!isGameRunning) return;

    const direction = keyDirections[event.key.toLowerCase()];
    if (direction) {
        event.preventDefault(); // Empêche le scrolling de la page
        snake.setDirection(direction);
    } else if (event.key === ' ') {
        event.preventDefault(); // Empêche le scroll avec espace
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

function stopGame() {
    clearInterval(gameLoop);
    isGameRunning = false;
    isPaused = false;
    snake.reset();
    score = 0;
    scoreDisplay.textContent = score;
    
    // Cacher l'écran de game over s'il est là
    gameOverScreen.classList.add('hidden');
    // Afficher le menu principal
    mainMenuScreen.classList.remove('hidden');
    
    // Redessiner une grille vide propre
    ctx.clearRect(0, 0, GameSize, GameSize);
    drawGrid();
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
        // Afficher "PAUSE" sur le canvas (optionnel mais sympa)
        ctx.fillStyle = currentTheme.textColor;
        ctx.font = currentTheme.isRetro ? "30px 'Press Start 2P'" : "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSE", GameSize/2, GameSize/2);
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
    snake.draw(currentTheme);

    // Vérifier les collisions avec la nourriture
    const head = snake.blocks[0];
    if (head.x === food.x && head.y === food.y) {
        snake.grow();
        food.setRandomPosition();
        score += 1;
        scoreDisplay.textContent = score;
    }

    // Dessiner la nourriture
    food.draw(currentTheme);

    // Vérifier si le jeu est terminé
    if (snake.isDead) {
        gameOver();
    }
}

function drawGrid() {
    ctx.strokeStyle = currentTheme.grid;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3; // Transparence de la grille

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
    ctx.globalAlpha = 1.0; // Reset alpha
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
// Démarrer le jeu
restartButton.addEventListener('click', restart);
backToMenuButton.addEventListener('click', stopGame);
// startGame(); // Supprimé pour ne pas lancer le jeu automatiquement