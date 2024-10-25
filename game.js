const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
let snake = new Snake();
let food = createVector(Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && snake.direction.y !== 1) snake.changeDirection(0, -1);
    if (event.key === 'ArrowDown' && snake.direction.y !== -1) snake.changeDirection(0, 1);
    if (event.key === 'ArrowLeft' && snake.direction.x !== 1) snake.changeDirection(-1, 0);
    if (event.key === 'ArrowRight' && snake.direction.x !== -1) snake.changeDirection(1, 0);
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.move(gridSize);
    if (snake.eat(food)) {
        food = createVector(Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    }
    snake.show(ctx, gridSize);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    if (snake.checkCollision(canvas.width, canvas.height)) {
        clearInterval(gameLoop);
        alert("Game Over!");
        document.getElementById('restartButton').style.display = 'block';
    }
}

function resetGame() {
    snake = new Snake();
    food = createVector(Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    document.getElementById('restartButton').style.display = 'none';
    gameLoop = setInterval(draw, 100);
}

let gameLoop = setInterval(draw, 100);
