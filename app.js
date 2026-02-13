let userScore = 0;
let compScore = 0;
let currentMode = "computer";

let playerTurn = 1;
let player1Choice = "";
let player2Choice = "";

const choices = document.querySelectorAll(".choice");
const container = document.querySelector("#container");
const msg = document.querySelector("#msg");
const user_score = document.querySelector("#user-score");
const comp_score = document.querySelector("#comp-score");
const player1Name = document.querySelector("#player1-name");
const player2Name = document.querySelector("#player2-name");

// chage position(3)
function shufflePositions() {
    const array = Array.from(choices);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(array[j]);
    }
}

// hide img
function setVisibility(hide) {
    choices.forEach(choice => {
        const img = choice.querySelector("img");
        const text = choice.querySelector(".choice-text");

        if (hide) {
            img.style.opacity = "0";
            if (text) text.style.display = "block";
        } else {
            img.style.opacity = "1"; // Show image
            if (text) text.style.display = "none";

        }
    });

}


// st game
function startGame(mode) {
    currentMode = mode;
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    if ("mode" == 'computer') {
        player1Name.textContent = "You";
        player2Name.textContent = "Computer";
        setVisibility(false); //show images for com mode
        resetGame();
    }
    else {
        player1Name.textContent = "Player 1";
        player2Name.textContent = "Player 2";
        setVisibility(true);//hide img for 2 player
        shufflePositions();
        resetGame();
    }
}

// reset game(0)
function resetGame() {
    userScore = 0;
    compScore = 0;
    user_score.textContent = userScore;
    comp_score.textContent = compScore;
    msg.textContent = "Select your move to start the game.";
    msg.style.background = "#081b31";
    msg.style.color = "white";
    playerTurn = 1;

    choices.forEach(choice => choice.style.pointerEvents = "auto");

    if (currentMode === "2") {
        setVisibility(true);
        shufflePositions();
    } else {
        setVisibility(false);
    }
}

function backToMenu() {
    document.getElementById("game").style.display = "none";
    document.getElementById("menu").style.display = "block";
    resetGame();
}

function genCompChoice() {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

function checkMatchWinner() {
    if (userScore === 5) {
        msg.innerHTML = currentMode === "computer"
            ? "🎉 Congratulations! You Won the match! Please reset or start a new game"
            : "🎉 Congratulations! You Won the match! Please reset or start a new game";
        msg.style.background = "gold";
        msg.style.color = "black";
        disableChoices();
    }
    else if (compScore === 5) {
        msg.innerHTML = currentMode === "computer"
            ? "😢 Computer Won the Match! Please reset or start a new game"
            : "🎉 Computer Won the Match! Please reset or start a new game";
        msg.style.background = "black";
        msg.style.color = "white";
        disableChoices();
    }
}

function disableChoices() {
    choices.forEach(choice => choice.style.pointerEvents = "none");
}

function playGame(userChoice) {
    const comChoice = genCompChoice();
    if (userChoice === comChoice) {
        msg.textContent = "It's a Draw!";
    } else {
        let userWin = (userChoice === "rock" && comChoice === "scissors") ||
            (userChoice === "paper" && comChoice === "rock") ||
            (userChoice === "scissors" && comChoice === "paper");

        if (userWin) {
            userScore++;
            user_score.textContent = userScore;
            msg.textContent = `You Win! ${userChoice} beats ${comChoice}`;
            msg.style.background = "green";
        } else {
            compScore++;
            comp_score.textContent = compScore;
            msg.textContent = `You Lose! ${comChoice} beats ${userChoice}`;
            msg.style.background = "red";
        }
    }
    checkMatchWinner();
}

function playTwoPlayer(choice) {
    if (playerTurn === 1) {
        player1Choice = choice;
        msg.textContent = "Player 1 Locked! Player 2, your turn.";
        playerTurn = 2;
        shufflePositions();
    } else {
        player2Choice = choice;
        setVisibility(false);
        checkWinnerTwoPlayer(player1Choice, player2Choice);
        playerTurn = 1;
        setTimeout(() => {
            if (userScore < 5 && compScore < 5) {
                setVisibility(true);
                shufflePositions();
                msg.textContent = "Next Round! Player 1, choose.";
                msg.style.background = "#081b31";
            }
        }, 500);
    }
}

function checkWinnerTwoPlayer(p1, p2) {
    if (p1 === p2) {
        msg.textContent = "It's a draw!";
        msg.style.background = "#4e6987";
    } else if (
        (p1 === "rock" && p2 === "scissors") ||
        (p1 === "paper" && p2 === "rock") ||
        (p1 === "scissors" && p2 === "paper")
    ) {
        userScore++;
        user_score.textContent = userScore;
        msg.textContent = `Player 1 wins! ${p1} beats ${p2}`;
        msg.style.background = "green";
    } else {
        compScore++;
        comp_score.textContent = compScore;
        msg.textContent = `Player 2 wins! ${p2} beats ${p1}`;
        msg.style.background = "red";
    }
    checkMatchWinner();
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const selected = choice.id;
        if (currentMode === "computer") {
            playGame(selected);
        } else if (currentMode === "2") {
            playTwoPlayer(selected);
        }
    });
});
