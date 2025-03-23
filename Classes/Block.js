export class Block {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    // function draw permet d'afficher queleque chose à l'écran
    draw(ctx){
        // dessine un rectangle sur l'écrn
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
}