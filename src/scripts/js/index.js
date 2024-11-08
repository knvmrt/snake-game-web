const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const box = 20; 

canvas.width = 40 * box;
canvas.height = 40 * box;

let snake;
let direction;
let food;
let score;
let game;

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function isGameOver(head, snakeArray) {
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        return true;
    }
    for (let i = 0; i < snakeArray.length; i++) {
        if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    let foodX = Math.floor(Math.random() * (canvas.width / box)) * box;
    let foodY = Math.floor(Math.random() * (canvas.height / box)) * box;

    while (isFoodOnSnake(foodX, foodY)) {
        foodX = Math.floor(Math.random() * (canvas.width / box)) * box;
        foodY = Math.floor(Math.random() * (canvas.height / box)) * box;
    }
    return { x: foodX, y: foodY };
}

function isFoodOnSnake(foodX, foodY) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#1db100" : "#25ce03";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2); 
    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = generateFood();
        score++;
    } else {
        snake.pop();
    }

    const newBody = { x: snakeX, y: snakeY };

    if (isGameOver(newBody, snake)) {
        clearInterval(game);
        alert(`Game over! Score: ${score}`);
        resetGame();
    }
    snake.unshift(newBody);
}

function startGame() {
    snake = [{ x: 14 * box, y: 15 * box }]; 
    direction = "RIGHT"; 
    food = generateFood(); 
    score = 0;

    game = setInterval(draw, 100);
}

function resetGame() {
    canvas.width = 40 * box;
    canvas.height = 40 * box;
    startButton.disabled = false;
}

startButton.addEventListener("click", function () {
    startButton.disabled = true;
    startGame();
});
