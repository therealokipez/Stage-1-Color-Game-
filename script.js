const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const scoreElement = document.getElementById("score");
const newGuessButton = document.getElementById("newGuessButton");
const difficultySelect = document.getElementById("difficulty");
const livesElement = document.getElementById("lives");

let targetColor;
let score = 0;
let lives = 4;
let correct = false;
let correctButton = null;

function getRandomBaseColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    };
}

function getSimilarColor(base, variation) {
    return `rgb(${base.r + Math.floor(Math.random() * variation - variation / 2)}, 
                 ${base.g + Math.floor(Math.random() * variation - variation / 2)}, 
                 ${base.b + Math.floor(Math.random() * variation - variation / 2)})`;
}

function generateColors() {
    let baseColor = getRandomBaseColor();
    let variation = difficultySelect.value === "hard" ? 20 : 50;

    return Array.from({ length: 6 }, () => getSimilarColor(baseColor, variation));
}

function updateLives() {
    livesElement.textContent = "❤️".repeat(lives);
    if (lives === 0) {
        gameStatus.textContent = "Game Over!";
        gameStatus.style.color = "red";
        optionsContainer.innerHTML = ""; // Disable buttons
        newGuessButton.disabled = true; // Disable "New Guess" button on game over
    }
}

function startGame() {
    if (lives === 0) return; // Prevents playing after Game Over

    gameStatus.textContent = "";
    optionsContainer.innerHTML = "";
    correct = false;
    correctButton = null;
    newGuessButton.disabled = false; // Enable "New Guess" button

    let colors = generateColors();
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-option");
        button.style.backgroundColor = color;
        button.dataset.testid = "colorOption";
        button.disabled = false;
        button.addEventListener("click", () => handleGuess(button, color));
        optionsContainer.appendChild(button);
    });
}

function handleGuess(button, selectedColor) {
    if (correct) return;

    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreElement.textContent = score;
        correct = true;
        correctButton = button;
        correctButton.disabled = true;

        // Auto-increase difficulty after correct guess
        difficultySelect.value = "hard";
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        lives--;
        updateLives();
    }
}

// **Fix: Reset lives & difficulty on New Guess**
newGuessButton.addEventListener("click", () => {
    if (lives === 0) {
        score = 0;
        lives = 3;
        difficultySelect.value = "medium"; // Reset difficulty
        scoreElement.textContent = score;
        updateLives();
    }
    startGame();
});

// Start the game on page load
startGame();
