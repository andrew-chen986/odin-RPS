
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

function validateInput(str) {
    if (typeof str === 'string') {
        str = str.toLowerCase();
        if (str === 'rock' || str === 'paper' || str === 'scissors') {
            return true
        }
    }
    return false;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    
    let numRounds = parseInt(prompt("How many rounds would you like to play? "));
    for (let i = 1; i <= numRounds; i++) {
        console.log(`Round ${i}:\n`)
        let playerInput = prompt("Rock, Paper, or Scissors? ");
        while (!validateInput(playerInput)) {
            playerInput = prompt("Invalid input. Rock, Paper, or Scissors? ");
        }
        computerInput = getComputerChoice();
        result = playRound(playerInput, computerInput)
        console.log(result[0]);
        if (result[1] === 0) {
            computerScore++;
        }
        else if (result[1] === 2) {
            playerScore++;
        }
        else {
            playerScore++;
            computerScore++;
        }
        console.log(`You: ${playerScore}`);
        console.log(`Computer: ${computerScore}\n`);
    }

    if (playerScore > computerScore) {
        console.log("Congratulations! You win!");
    }
    else if (playerScore < computerScore) {
        console.log("Better luck next time!");
    }
    else {
        console.log("It was a tie in the end!");
    }
    
}

game();