export const Themes = {
    classic: {
        name: "Classique",
        background: "linear-gradient(45deg, #1a1a1a, #2c3e50)",
        canvasBackground: "rgba(0, 0, 0, 0.2)",
        grid: "#2E7D32",
        snakeHead: "#2196F3",
        snakeBody: "#1976D2",
        snakeShine: "rgba(255, 255, 255, 0.2)",
        food: "#e74c3c",
        foodStem: "#2ecc71",
        textColor: "#ffffff",
        buttonBackground: "#2E7D32",
        buttonText: "#ffffff",
        isRetro: false
    },
    retro: {
        name: "GameBoy",
        background: "#0f380f", // Très foncé pour le fond de page
        canvasBackground: "#9bbc0f", // Très clair pour l'écran
        grid: "#306230", // Vert moyen pour la grille
        snakeHead: "#0f380f",
        snakeBody: "#306230",
        snakeShine: "transparent",
        food: "#0f380f",
        foodStem: "#0f380f",
        textColor: "#0f380f",
        buttonBackground: "#306230",
        buttonText: "#9bbc0f",
        isRetro: true
    },
    neon: {
        name: "Neon",
        background: "linear-gradient(45deg, #000000, #1a0b2e)",
        canvasBackground: "rgba(20, 0, 40, 0.8)",
        grid: "#ff00ff",
        snakeHead: "#00ff00",
        snakeBody: "#00cc00",
        snakeShine: "#ffffff",
        food: "#ff00ff",
        foodStem: "#ffff00",
        textColor: "#00ff00",
        buttonBackground: "#ff00ff",
        buttonText: "#000000",
        isRetro: false
    }
};
