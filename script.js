import {Snake} from './Classes/Snake.js';
//import {Block} from 'Classes/Block.js';

// taille du jeu
const GameSize = 600;
// taille des carrées
const SquareSize = 20;
// on récupére canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Inialise le Snake
const snake = new Snake(SquareSize);
console.log(snake);

// fonction pour raffraichir l'image du jeu
function update(){
    snake.updateSnake(ctx);
    setTimeout(update, 1000);
}
function startGame() {
    update();
}

startGame();