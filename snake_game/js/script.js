// Initialize canvas
var canvas = document.getElementById("snake-game");
var ctx = canvas.getContext("2d");

// Initialize snake
var snake = [{x: 150, y: 150}];

// Initialize food
var food = {x: 300, y: 300};

// Initialize score
var score = 0;

// Initialize direction
var direction = "right";

// Draw snake on canvas
function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}

// Draw food on canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Move snake
function moveSnake() {
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  // Move snake in different direction based on user input
  if (direction == "right") { snakeX += 10; }
  else if (direction == "left") { snakeX -= 10; }
  else if (direction == "up") { snakeY -= 10; }
  else if (direction == "down") { snakeY += 10; }

  // Check if snake hit the wall or itself
  if (snakeX < 0 || snakeX > canvas.width || snakeY < 0 || snakeY > canvas.height || checkCollision(snakeX, snakeY, snake)) {
    // Stop game if snake hit the wall or itself
    gameOver();
    updateScore();
    return;
  }

  // Check if snake hit the food
  if (snakeX == food.x && snakeY == food.y) {
    // Increase score
    score++;
    updateScore();

    // Generate new food
    food = {
      x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
      y: Math.floor(Math.random() * (canvas.height / 10)) * 10
    };
  } else {
    // Remove last element of snake
    snake.pop();
  }

  // Add new element to snake
  snake.unshift({x: snakeX, y: snakeY});
  updateScore();
}

// Check collision between snake and wall or itself
function checkCollision(x, y, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].x == x && array[i].y == y) {
      return true;
    }
  }
  return false;
}

// Game over
function gameOver() {
  clearInterval(gameLoop);
  alert("Game over! Your score: " + score);
}

// Handle user input
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      if (direction != "right") { direction = "left"; }
      break;
      case 38:
        if (direction != "down") { direction = "up"; }
        break;
      case 39:
        if (direction != "left") { direction = "right"; }
        break;
      case 40:
        if (direction != "up") { direction = "down"; }
        break;
    }
  }
  
  // Initialize game loop
  var gameLoop = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    updateScore();
  }, 100);

  // Update score
function updateScore() {
    scoreElement.innerHTML = "Score : " + score;
}

// Initialize score element
var scoreElement = document.getElementById("score");

// Increase score
score++;
updateScore();

// Check if snake hit the food
if (snakeX == food.x && snakeY == food.y) {;

// Increase score
score++;
updateScore();


// Generate new food
food = {
x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
y: Math.floor(Math.random() * (canvas.height / 10)) * 10

};
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    // Save score to localStorage
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({score: score, date: new Date()});
    localStorage.setItem("scores", JSON.stringify(scores));
    alert("Game over! Your score: " + score);
  }

//Retrieve scores from localStorage
var scores = JSON.parse(localStorage.getItem("scores")) || [];

// Display scoreboard
function displayScoreboard() {
  var scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = "";
  for (var i = 0; i < scores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.innerHTML = scores[i].score + " - " + scores[i].date;
    scoreboard.appendChild(scoreItem);
  }
}

displayScoreboard();

// Get the input element and button
var usernameInput = document.getElementById("username-input");
var submitUsernameBtn = document.getElementById("submit-username-btn");

// Handle the button click
submitUsernameBtn.onclick = function() {
  var username = usernameInput.value;
  // Save username to localStorage
  localStorage.setItem("username", username);
  // Hide the form
  document.getElementById("username-form").style.display = "none";
  // Start the game
  // ...
}

// Get the retry button
var retryBtn = document.getElementById("retry-btn");

// Handle retry button click
retryBtn.onclick = function() {
  location.reload();
};

// Game over
function gameOver() {
    clearInterval(gameLoop);
    var username = localStorage.getItem("username") || "";
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({username: username, score: score, date: new Date()});
    localStorage.setItem("scores", JSON.stringify(scores));
    alert("Game over! Your score: " + score);
    retryBtn.style.display = "block";
    }

// SQ LITE ===========================================================================================================================

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('snake.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the snake database.');
});

// create the user table
db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            score INTEGER NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('User table created successfully');
  });

