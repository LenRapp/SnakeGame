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
        isRetro: false
    },
    retro: {
        name: "GameBoy",
        background: "#306230", // Vert foncé pour l'extérieur
        canvasBackground: "#9bbc0f", // Vert clair "LCD"
        grid: "#8bac0f",
        snakeHead: "#0f380f", // Vert le plus foncé pour le serpent
        snakeBody: "#306230",
        snakeShine: "transparent",
        food: "#0f380f",
        foodStem: "#0f380f",
        textColor: "#0f380f",
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
        isRetro: false
    }
};
