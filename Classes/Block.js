import { GameSize, ctx } from '../script.js';
export class Block {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    teleportIfOutMap(){
        const maxSize = GameSize / this.size;
        if (this.x < 0){
            this.x = maxSize;
        }
        else if (this.x > maxSize ){
            this.x = 0;
        }
        if (this.y < 0){
            this.y = maxSize;
        }
        else if (this.y > maxSize){
            this.y = 0;
        }

    }



    // function draw permet d'afficher queleque chose à l'écran
    draw(){
        // dessine un rectangle sur l'écrn
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}