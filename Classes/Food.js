import { GameSize, ctx } from '../script.js';
import { Block } from './Block.js';

/**
 * Classe représentant la nourriture dans le jeu Snake
 */
export class Food extends Block {
    constructor(size) {
        super(0, 0, size);
        this.setRandomPosition();
    }

    /**
     * Définit une position aléatoire pour la nourriture sur la grille
     */
    setRandomPosition() {
        const maxSize = GameSize / this.size;
        this.x = Math.floor(Math.random() * maxSize);
        this.y = Math.floor(Math.random() * maxSize);
    }

    /**
     * Dessine la nourriture sur le canvas
     */
    draw(theme) {
        const x = this.x * this.size;
        const y = this.y * this.size;
        
        if (theme.isRetro) {
            // Style rétro : Carré simple
            ctx.fillStyle = theme.food;
            const padding = 2;
            ctx.fillRect(x + padding, y + padding, this.size - padding*2, this.size - padding*2);
        } else {
            // Style moderne : Pomme
            ctx.fillStyle = theme.food;
            ctx.beginPath();
            ctx.arc(x + this.size/2, y + this.size/2, this.size/2 - 2, 0, Math.PI * 2);
            ctx.fill();

            // Tige de la pomme
            ctx.fillStyle = theme.foodStem;
            ctx.beginPath();
            ctx.moveTo(x + this.size/2, y + 2);
            ctx.quadraticCurveTo(x + this.size/2 + 5, y - 5, x + this.size/2 + 10, y + 2);
            ctx.lineTo(x + this.size/2, y + 2);
            ctx.fill();

            // Effet de brillance
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.beginPath();
            ctx.arc(x + this.size/3, y + this.size/3, this.size/6, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}