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

    draw(theme, isHead = false) {
        // Déterminer le style (arrondi ou carré)
        const radius = theme.isRetro ? 0 : 4;

        ctx.fillStyle = isHead ? theme.snakeHead : theme.snakeBody;
        
        // Dessin du bloc
        const x = this.x * this.size;
        const y = this.y * this.size;
        
        ctx.beginPath();
        if (radius > 0) {
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + this.size - radius, y);
            ctx.quadraticCurveTo(x + this.size, y, x + this.size, y + radius);
            ctx.lineTo(x + this.size, y + this.size - radius);
            ctx.quadraticCurveTo(x + this.size, y + this.size, x + this.size - radius, y + this.size);
            ctx.lineTo(x + radius, y + this.size);
            ctx.quadraticCurveTo(x, y + this.size, x, y + this.size - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        } else {
            // Style rétro (pixel LCD avec bordure interne)
            const padding = 1;
            ctx.fillStyle = theme.snakeHead; // On utilise la couleur foncée
            ctx.fillRect(x + padding, y + padding, this.size - padding*2, this.size - padding*2);
            
            // Bordure interne pour l'effet pixel
            ctx.strokeStyle = theme.canvasBackground;
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 3, y + 3, this.size - 6, this.size - 6);
            
            // Petit point au centre
            ctx.fillRect(x + 7, y + 7, this.size - 14, this.size - 14);
        }
        ctx.closePath();
        ctx.fill();

        // Ajout d'un effet de brillance pour la tête (seulement si défini dans le thème)
        if (isHead && theme.snakeShine !== 'transparent') {
            ctx.fillStyle = theme.snakeShine;
            ctx.beginPath();
            if (radius > 0) {
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + this.size - radius, y);
                ctx.quadraticCurveTo(x + this.size, y, x + this.size, y + radius);
                ctx.lineTo(x + this.size, y + this.size / 2);
                ctx.lineTo(x + radius, y + this.size / 2);
            } else {
                ctx.rect(x + 2, y + 2, this.size - 4, this.size / 3);
            }
            ctx.closePath();
            ctx.fill();
        }
    }
}