// RGB Colour Guessing Game

var score = 0;
var lives = 3;
var targetColor = "";
var correctIndex = 0;
var gameOver = false;

// Get elements
var targetDiv = document.getElementById("targetColour");
var rgbText = document.getElementById("rgbValue");
var livesText = document.getElementById("livesCount");
var scoreText = document.getElementById("scoreCount");
var optionsDiv = document.getElementById("optionsContainer");
var msg = document.getElementById("message");
var replayBtn = document.getElementById("replayBtn");

// Generate random RGB color
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Create color boxes
function createBoxes() {
    optionsDiv.innerHTML = "";
    correctIndex = Math.floor(Math.random() * 3);

    for (var i = 0; i < 3; i++) {
        var box = document.createElement("div");
        box.className = "color-box";

        if (i === correctIndex) {
            box.style.backgroundColor = targetColor;
        } else {
            box.style.backgroundColor = getRandomColor();
        }

        box.setAttribute("data-index", i);
        box.onclick = handleClick;
        optionsDiv.appendChild(box);
    }
}

// Start new round
function startRound() {
    targetColor = getRandomColor();
    targetDiv.style.backgroundColor = targetColor;
    rgbText.textContent = targetColor;
    createBoxes();
    msg.textContent = "";
    msg.className = "message";
}

// Handle box click
function handleClick(e) {
    if (gameOver) return;

    var boxes = document.getElementsByClassName("color-box");
    var picked = parseInt(e.target.getAttribute("data-index"));

    // Disable all boxes
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("disabled");
    }

    if (picked === correctIndex) {
        // Correct
        e.target.classList.add("correct");
        msg.textContent = "Correct!";
        msg.className = "message correct";
        score = score + 10;
        scoreText.textContent = score;

        setTimeout(function() {
            if (!gameOver) startRound();
        }, 1200);
    } else {
        // Wrong
        e.target.classList.add("wrong");
        boxes[correctIndex].classList.add("correct");
        msg.textContent = "Wrong!";
        msg.className = "message wrong";
        lives = lives - 1;
        livesText.textContent = lives;

        if (lives <= 0) {
            gameOver = true;
            msg.textContent = "Game Over! Final Score: " + score;
            msg.className = "message gameover";
            replayBtn.style.display = "inline-block";
        } else {
            setTimeout(function() {
                startRound();
            }, 1500);
        }
    }
}

// Restart game
function restart() {
    score = 0;
    lives = 3;
    gameOver = false;
    scoreText.textContent = score;
    livesText.textContent = lives;
    replayBtn.style.display = "none";
    startRound();
}

replayBtn.onclick = restart;
replayBtn.style.display = "none";
startRound();