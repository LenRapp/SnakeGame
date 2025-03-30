import {Snake} from './Classes/Snake.js';
import { Food } from './Classes/Food.js';

// taille du jeu
export const GameSize = 600;
// taille des carrées
export const SquareSize = 20;
// on récupére canvas
const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

//Inialise le Snake
const snake = new Snake(SquareSize);

const food = new Food();


function detetecKeyPressed(){
    document.addEventListener("keydown", function(event){
        console.log(event.key);
        switch(event.key){
            case "ArrowLeft":
                snake.currentDirection = 'left';
                break;
            case "ArrowRight":
                snake.currentDirection = 'right';
                break;
            case "ArrowUp":
                snake.currentDirection = 'up';
                break;
            case "ArrowDown":
                snake.currentDirection = 'down';
                break;
        }

    });
}
function clearScreen(){
    ctx.clearRect(0, 0, GameSize, GameSize);
}
// fonction pour raffraichir l'image du jeu
function update(){
    clearScreen();
    food.draw();
    snake.moveHead()
    snake.updateSnake(ctx);
    setTimeout(update, 150);
}
function startGame() {
    detetecKeyPressed()
    update();
}

startGame();