import { GameSize, ctx } from '../script.js';

export class Block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    teleportIfOutMap() {
        const maxSize = GameSize / this.size;
        if (this.x < 0) {
            this.x = maxSize - 1;
        } else if (this.x >= maxSize) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = maxSize - 1;
        } else if (this.y >= maxSize) {
            this.y = 0;
        }
    }

    draw(isHead = false) {
        // Style moderne avec coins arrondis
        ctx.fillStyle = isHead ? "#2196F3" : "#1976D2"; // Bleu clair pour la tête, bleu foncé pour le corps
        
        // Dessin du bloc avec coins arrondis
        const x = this.x * this.size;
        const y = this.y * this.size;
        const radius = 4;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + this.size - radius, y);
        ctx.quadraticCurveTo(x + this.size, y, x + this.size, y + radius);
        ctx.lineTo(x + this.size, y + this.size - radius);
        ctx.quadraticCurveTo(x + this.size, y + this.size, x + this.size - radius, y + this.size);
        ctx.lineTo(x + radius, y + this.size);
        ctx.quadraticCurveTo(x, y + this.size, x, y + this.size - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();

        // Ajout d'un effet de brillance pour la tête
        if (isHead) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + this.size - radius, y);
            ctx.quadraticCurveTo(x + this.size, y, x + this.size, y + radius);
            ctx.lineTo(x + this.size, y + this.size / 2);
            ctx.lineTo(x + radius, y + this.size / 2);
            ctx.closePath();
            ctx.fill();
        }
    }
}