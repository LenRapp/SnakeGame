import {Block} from './Block.js';
import {GameSize} from '../script.js';

export class Snake {
    constructor(size) {
        this.size = size;
        this.blocks = [new Block(10, 10, size)];
        this.direction = "right";
        this.nextDirection = "right";
        this.isDead = false;
    }

    move() {
        if (this.isDead) return;

        // Mise à jour de la direction
        this.direction = this.nextDirection;

        // Calcul de la nouvelle position de la tête
        const head = this.blocks[0];
        const newHead = new Block(head.x, head.y, this.size);

        switch (this.direction) {
            case "up":
                newHead.y--;
                break;
            case "down":
                newHead.y++;
                break;
            case "left":
                newHead.x--;
                break;
            case "right":
                newHead.x++;
                break;
        }

        // Vérification des collisions avec les murs
        newHead.teleportIfOutMap();

        // Vérification des collisions avec le corps
        if (this.checkCollision(newHead)) {
            this.isDead = true;
            return;
        }

        // Ajout de la nouvelle tête
        this.blocks.unshift(newHead);
        this.blocks.pop();
    }

    grow() {
        const tail = this.blocks[this.blocks.length - 1];
        const newBlock = new Block(tail.x, tail.y, this.size);
        this.blocks.push(newBlock);
    }

    checkCollision(block) {
        return this.blocks.some(b => b.x === block.x && b.y === block.y);
    }

    draw() {
        this.blocks.forEach((block, index) => {
            block.draw(index === 0);
        });
    }

    setDirection(newDirection) {
        // Empêcher les virages à 180 degrés
        const opposites = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        };

        if (opposites[newDirection] !== this.direction) {
            this.nextDirection = newDirection;
        }
    }

    reset() {
        this.blocks = [new Block(10, 10, this.size)];
        this.direction = "right";
        this.nextDirection = "right";
        this.isDead = false;
    }
}