// Global Variables
let userScore = 0;
let compScore = 0;
let currentMode = "computer";
let playerTurn = 1;
let player1Choice = "";
let player2Choice = "";

const choicesElements = document.querySelectorAll(".choice");
const container = document.querySelector("#container");
const msg = document.querySelector("#msg");
const user_score = document.querySelector("#user-score");
const comp_score = document.querySelector("#comp-score");
const player1Name = document.querySelector("#player1-name");
const player2Name = document.querySelector("#player2-name");

function startGame(mode) {
    currentMode = mode;
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    resetGame();

    if (mode === "computer") {
        player1Name.textContent = "You";
        player2Name.textContent = "Computer";
        showImages(true);
    } else {
        player1Name.textContent = "Player 1";
        player2Name.textContent = "Player 2";
        prepareHiddenTurn();
    }
}


function shuffleChoices() {
    const elementsArray = Array.from(choicesElements);
    for (let i = elementsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(elementsArray[j]);
    }
}


function showImages(show) {
    choicesElements.forEach(choice => {
        const img = choice.querySelector("img");
        const text = choice.querySelector(".choice-text");
        if (show) {
            img.style.display = "block";
            text.style.display = "none";
            choice.style.background = "";
        } else {
            img.style.display = "none";
            text.style.display = "block";
            choice.style.background = "#eab308";
        }
    });
}

function prepareHiddenTurn() {
    showImages(false);
    shuffleChoices();
    msg.textContent = `Please You  choose your hidden move!`;
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    user_score.textContent = userScore;
    comp_score.textContent = compScore;
    msg.textContent = "Select your move to start the game.";
    msg.style.background = "#081b31";
    msg.style.color = "white";
    playerTurn = 1;
    enableChoices();
    if (currentMode === "2") prepareHiddenTurn();
    else showImages(true);
}

function backToMenu() {
    document.getElementById("game").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function genCompChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * 3)];
}

function playTwoPlayer(choiceId) {
    if (playerTurn === 1) {
        player1Choice = choiceId;
        playerTurn = 2;
        prepareHiddenTurn(); // Shuffle again for Player 2
        msg.textContent = "Player 1 selected! Now Player 2's turn.";
    } else {
        player2Choice = choiceId;
        showImages(true); // Reveal everything
        checkWinnerTwoPlayer(player1Choice, player2Choice);
        playerTurn = 1;
    }
}

function checkWinnerTwoPlayer(p1, p2) {
    if (p1 === p2) {
        msg.textContent = `Draw! Both chose ${p1}`;
        msg.style.background = "#081b31";
    } else if (
        (p1 === "rock" && p2 === "scissors") ||
        (p1 === "paper" && p2 === "rock") ||
        (p1 === "scissors" && p2 === "paper")
    ) {
        userScore++;
        user_score.textContent = userScore;
        msg.textContent = `Player 1 Wins! ${p1} beats ${p2}`;
        msg.style.background = "green";
    } else {
        compScore++;
        comp_score.textContent = compScore;
        msg.textContent = `Player 2 Wins! ${p2} beats ${p1}`;
        msg.style.background = "red";
    }

    // Briefly wait before hiding again for the next round
    setTimeout(() => {
        if (userScore < 5 && compScore < 5) prepareHiddenTurn();
        checkMatchWinner();
    }, 2000);
}



choicesElements.forEach(choice => {
    choice.addEventListener("click", () => {
        const selected = choice.id;
        if (currentMode === "computer") {
            playGame(selected);
        } else {
            playTwoPlayer(selected);
        }
    });
});

function enableChoices() {
    choicesElements.forEach(choice => choice.style.pointerEvents = "auto");
}
