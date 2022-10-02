
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 5);
    if (choice === 0) return "rock";
    else if (choice === 1) return "paper";
    else if (choice === 2) return "scissors";
    else if (choice === 3) return "lizard";
    else return "spock";
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
                    return ["You Win! Rock crushes Scissors!", 2];
                case "paper":
                    return ["You Lose! Paper covers Rock!", 0];
                case "lizard":
                    return ["You Win! Rock crushes Lizard!", 2];
                case "spock":
                    return ["You Lose! Spock vaporizes Rock!", 0];
            }
        case "paper":
            switch (computerSelection) {
                case "rock":
                    return ["You Win! Paper covers Rock!", 2];
                case "scissors":
                    return ["You Lose! Scissors cuts Paper!", 0];
                case "lizard":
                    return ["You Lose! Lizard eats Paper!", 0];
                case "spock":
                    return ["You Win! Paper disproves Spock!", 2];
            }
        case "scissors":
            switch (computerSelection) {
                case "paper":
                    return ["You Win! Scissors cuts Paper!", 2];
                case "rock":
                    return ["You Lose! Rock crushes Scissors!", 0];
                case "lizard":
                    return ["You Win! Scissors decapitates Lizard!", 2];
                case "spock":
                    return ["You Lose! Spock smashes Scissors!", 0];
            }
        case "lizard":
            switch (computerSelection) {
                case "scissors":
                    return ["You Lose! Scissors decapitates Lizard!", 0];
                case "paper":
                    return ["You Win! Lizard eats Paper!", 2];
                case "rock":
                    return ["You Lose! Rock crushes Lizard!", 0];
                case "spock":
                    return ["You Win! Lizard poisons Spock!", 2];
            }
        case "spock":
            switch (computerSelection) {
                case "scissors":
                    return ["You Win! Spock smashes Scissors!", 2];
                case "paper":
                    return ["You Lose! Paper disproves Spock!", 0];
                case "lizard":
                    return ["You Lose! Lizard poisons Spock!", 0];
                case "rock":
                    return ["You Win! Spock vaporizes Rock!", 2];
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

function resetGame() {
    document.getElementById('results').innerHTML = '';
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
}

function getImage(choice) {
    switch(choice) {
        case 'rock':
            return 1;
        case 'paper':
            return 2;
        case 'scissors':
            return 3;
    }
}

function game() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const resultBoard = document.querySelector('#results');
            
            // if the game is over, disable button event listeners
            if (!gameOver) {
                // playRound returns an array [message, winCode]
                const playerChoice = button.getAttribute('id');
                const computerChoice = getComputerChoice();
                const result = playRound(playerChoice, computerChoice);
                const message = result[0];
                const winCode = result[1];

                // adjust score and add to resultsBoard
                incrementScore(winCode);
                const newResult = document.createElement('p');
                newResult.setAttribute('id', 'result');
                newResult.textContent = `${message}`;
                
                // create image of results
                const playerChoiceImage = document.createElement('div');
                const computerChoiceImage = document.createElement('div');
                switch(playerChoice) {
                    case 'rock':
                        playerChoiceImage.innerHTML = '<img src="Rock.png">';
                        break;
                    case 'paper':
                        playerChoiceImage.innerHTML = '<img src="Paper.png">';
                        break;
                    case 'scissors':
                        playerChoiceImage.innerHTML = '<img src="Scissors.png">';
                        break;
                    case 'lizard':
                        playerChoiceImage.innerHTML = '<img src="Lizard2.png">';
                        break;
                    case 'spock':
                        playerChoiceImage.innerHTML = '<img src="Spock.png">';
                        break;
                }
                switch(computerChoice) {
                    case 'rock':
                        computerChoiceImage.innerHTML = '<img src="Rock.png">';
                        break;
                    case 'paper':
                        computerChoiceImage.innerHTML = '<img src="Paper.png">';
                        break;
                    case 'scissors':
                        computerChoiceImage.innerHTML = '<img src="Scissors.png">';
                        break;
                    case 'lizard':
                        computerChoiceImage.innerHTML = '<img src="Lizard2.png">';
                        break;
                    case 'spock':
                        computerChoiceImage.innerHTML = '<img src="Spock.png">';
                        break;

                }
                const imageContainer = document.createElement('div')
                const playerImageContainer = document.createElement('div');
                const computerImageContainer = document.createElement('div');

                imageContainer.setAttribute('id', 'round-images');
                playerImageContainer.setAttribute('id', 'player-image');
                computerImageContainer.setAttribute('id', 'computer-image');
                playerChoiceImage.setAttribute('class', 'round');
                computerChoiceImage.setAttribute('class', 'round');

                imageContainer.appendChild(playerImageContainer);
                imageContainer.appendChild(computerImageContainer);


                // get and remove previous round result before adding new result
                const prevImageContainer = resultBoard.querySelector('#round-images')
                const prevResult = resultBoard.querySelector('#result');
                if (prevImageContainer !== null) {
                    resultBoard.removeChild(prevImageContainer);
                }
                if (prevResult !== null) {
                    resultBoard.removeChild(prevResult);
                }
                
                // append choice images to container
                playerImageContainer.appendChild(playerChoiceImage);
                computerImageContainer.appendChild(computerChoiceImage);

                // add score <p> to player/computer image containers
                const playerScoreText = document.createElement('p');
                const computerScoreText = document.createElement('p');
                playerScoreText.textContent = `You: ${playerScore}`;
                computerScoreText.textContent = `Computer: ${computerScore}`;
                playerImageContainer.appendChild(playerScoreText);
                computerImageContainer.appendChild(computerScoreText);

                // add round images to div for styling
                imageContainer.appendChild(playerImageContainer);
                imageContainer.appendChild(computerImageContainer);
                resultBoard.appendChild(imageContainer);
                resultBoard.appendChild(newResult);
                // check for a winner
                winner = checkVictor();
                if (winner !== 0) {
                    gameOver = true;
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
                    playAgain = document.createElement("button");
                    playAgain.textContent = "Play Again?";
                    playAgain.addEventListener('click', () => {
                        resetGame();
                    });
                    resultBoard.append(playAgain);
                }
            }   
        });
    });
}

let gameOver = false;
let playerScore = 0
let computerScore = 0

game();