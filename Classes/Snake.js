import {Block} from './Block.js';
export class Snake{
    constructor(size){
        this.x = 0;
        this.y = 0;
        this.blockSize = size;
        this.blocks =[];
        this.addBlock(this.x, this.y);
    }

    // aoute un block au snake
    addBlock(x, y){
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }

    updateSnake(ctx){
        // on boucle sur tous les blocks du snake
        for (const block of this.blocks){
            block.draw(ctx);
        }
    }
}