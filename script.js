import {Snake} from './Classes/Snake.js';

// taille du jeu
const GameSize = 600;
// taille des carrées
const SquareSize = 20;
// on récupére canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Inialise le Snake
const snake = new Snake(SquareSize);


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
    snake.moveHead()
    snake.updateSnake(ctx);
    setTimeout(update, 150);
}
function startGame() {
    detetecKeyPressed()
    update();
}

startGame();