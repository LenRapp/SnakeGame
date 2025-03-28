import {Block} from './Block.js';
export class Snake{
    constructor(size){
        this.x = 0;
        this.y = 0;
        this.blockSize = size;
        this.blocks =[];
        this.addBlock(this.x, this.y);
        this.currentDirection = "down"
    }

    // aoute un block au snake
    addBlock(x, y){
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }
    moveHead(){
        const head = this.blocks[0];
        switch (this.currentDirection){
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
        }
        head.teleportIfOutMap();
    }
    updateSnake(ctx){
        // on boucle sur tous les blocks du snake
        for (const block of this.blocks){
            block.draw(ctx);
        }
    }
}