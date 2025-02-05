document.addEventListener("DOMContentLoaded", () => {
    const fruitBorderContainer = document.createElement("div");
    fruitBorderContainer.classList.add("fruit-border");
    document.body.appendChild(fruitBorderContainer);
    fruitBorderContainer.style.display = "none"; // Hide initially

    const fruitOptions = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];
    const fruitSize = 40;

    function createFruit(x, y) {
        const fruitItem = document.createElement("div");
        fruitItem.classList.add("fruit-item");
        fruitItem.textContent = fruitOptions[Math.floor(Math.random() * fruitOptions.length)];
        fruitItem.style.position = "absolute";
        fruitItem.style.left = `${x}px`;
        fruitItem.style.top = `${y}px`;

        const animations = ["rotateDance", "bounceDance", "wiggleDance"];
        fruitItem.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} 3s infinite`;

        fruitBorderContainer.appendChild(fruitItem);
    }

    function generateFruitBorder() {
        fruitBorderContainer.innerHTML = "";

        const gameContainer = document.querySelector(".game-container");
        const rect = gameContainer.getBoundingClientRect(); // Get dynamic size

        fruitBorderContainer.style.position = "absolute";
        fruitBorderContainer.style.left = `${rect.left}px`;
        fruitBorderContainer.style.top = `${rect.top}px`;
        fruitBorderContainer.style.width = `${rect.width}px`;
        fruitBorderContainer.style.height = `${rect.height}px`;
        fruitBorderContainer.style.display = "block"; // Show border when game starts

        const borderPadding = fruitSize * 0.8;

        // Generate top and bottom fruit rows
        for (let x = 0; x < rect.width; x += fruitSize) {
            createFruit(x, 0); // Top
            createFruit(x, rect.height - borderPadding); // Bottom
        }

        // Generate left and right fruit columns
        for (let y = 0; y < rect.height; y += fruitSize) {
            createFruit(0, y); // Left
            createFruit(rect.width - borderPadding, y); // Right
        }
    }

    window.addEventListener("resize", () => {
        if (fruitBorderContainer.style.display === "block") {
            generateFruitBorder();
        }
    });

    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        generateFruitBorder(); // Show the border when game starts
        fruitBorderContainer.style.display = "block";
    });

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", generateFruitBorder);
});
