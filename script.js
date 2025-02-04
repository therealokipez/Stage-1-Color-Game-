const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const scoreElement = document.getElementById("score");
const newGuessButton = document.getElementById("newGuessButton");
const difficultySelect = document.getElementById("difficulty"); // Hidden dropdown

let targetColor;
let score = 0;
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
    let variation = difficultySelect.value === "hard" ? 20 : 50; // Hard = subtle changes, Medium = more noticeable

    return Array.from({ length: 6 }, () => getSimilarColor(baseColor, variation));
}

function startGame() {
    gameStatus.textContent = "";
    optionsContainer.innerHTML = "";
    correct = false;
    correctButton = null;

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
    if (correct) return; // Prevent multiple correct clicks

    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreElement.textContent = score;
        correct = true;
        correctButton = button;
        correctButton.disabled = true; // Disable correct button
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
    }
}

// Event listeners
newGuessButton.addEventListener("click", startGame);
difficultySelect.addEventListener("change", startGame); // Restart on difficulty change

startGame();
