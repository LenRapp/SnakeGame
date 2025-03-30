import {GameSize, SquareSize, ctx} from '../script.js';
export class Food{
    constructor(){
        this.size = SquareSize;
        this.setRandomPsoition()
    }
    setRandomPsoition(){
        const maxSize = ((GameSize / this.size) - 1);
        this.x = Math.round(Math.random() * GameSize % maxSize);
        this.y = Math.round(Math.random() * GameSize % maxSize);
        console.log(this.x, this.y);
    }
    draw(){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}