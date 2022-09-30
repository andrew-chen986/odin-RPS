
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) return "Rock"
    else if (choice === 1) return "Paper"
    else return "Scissors"
}

function playRound(playerSelection, computerSelection) {
    // Ignorecase
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return ["It's a Tie!", 1];
    }
    
    switch(playerSelection) {
        case "rock":
            switch (computerSelection) {
                case "scissors":
                    return ["You Win! Rock beats Scissors", 2];
                case "paper":
                    return ["You Lose! Paper beats Rock", 0];
            }
        case "paper":
            switch (computerSelection) {
                case "rock":
                    return ["You Win! Paper beats Rock", 2];
                case "scissors":
                    return ["You Lose! Scissors beats Paper", 0];
            }
        case "scissors":
            switch (computerSelection) {
                case "paper":
                    return ["You Win! Scissors beats Paper", 2];
                case "rock":
                    return ["You Lose! Rock beats Scissors", 0];
            }
    }
}

function incrementScore(winCode) {
    if (winCode == 0) {
        computerScore += 1;
    }
    else if (winCode == 2) {
        playerScore += 1;
    }
    else {
        computerScore += 1;
        playerScore += 1;
    }
}

function checkVictor() {
    if (playerScore === 5 && computerScore === 5) {
        return 3;
    }
    else if (computerScore === 5) {
        return 2;
    }
    else if (playerScore === 5) {
        return 1;
    }
    return 0;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // playRound returns an array [message, winCode]
        const result = playRound(button.textContent, getComputerChoice());
        const message = result[0];
        const winCode = result[1];

        // adjust score and add to resultsBoard
        incrementScore(winCode);
        const resultBoard = document.querySelector('.results');
        const newResult = document.createElement('p');
        newResult.innerHTML = `${message}<br>Score: You ${playerScore} - ${computerScore} Computer`;
        resultBoard.appendChild(newResult);

        // check for a winner
        winner = checkVictor();
        if (winner !== 0) {
            const victor = document.createElement('p');
            switch(winner) {
                case 1:
                    victor.textContent = "You Win!";
                    break;
                case 2:
                    victor.textContent = "The Computer Wins!";
                    break;
                case 3:
                    victor.textContent = "It's a Tie!";
                    break;
            }
            resultBoard.appendChild(victor);
        }
    });
});

let playerScore = 0
let computerScore = 0