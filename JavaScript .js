const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const scoreElement = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor;
let score = 0;

// Generate random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Initialize game
function startGame() {
    gameStatus.textContent = "";
    optionsContainer.innerHTML = "";

    // Generate six random colors
    let colors = Array.from({ length: 6 }, getRandomColor);
    
    // Choose one color as the target
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    // Create buttons for options
    colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-option");
        button.style.backgroundColor = color;
        button.dataset.testid = "colorOption";
        button.addEventListener("click", () => checkAnswer(color));
        optionsContainer.appendChild(button);
    });
}

// Check if selected color is correct
function checkAnswer(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreElement.textContent = score;
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
    }
}

// New game button
newGameButton.addEventListener("click", startGame);

// Start the game initially
startGame();