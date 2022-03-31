import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const resultText = document.getElementById('resultText');

const crypto = window.crypto || window.msCrypto;
var crArray = new Uint8Array(1);

const allGameIcons  = document.querySelectorAll('.far');

const choices = {
  Rock: { name: 'Rock', defeats: ['Scissors', 'Lizard'] },
  Paper: { name: 'Paper', defeats: ['Rock', 'Spock'] },
  Scissors: { name: 'Scissors', defeats: ['Paper', 'Lizard'] },
  Lizard: { name: 'Lizard', defeats: ['Paper', 'Spock'] },
  Spock: { name: 'Spock', defeats: ['Scissors', 'Rock'] },
};

let currPlayerChoice = null;
let computerChoice = null;

let playersWin  = 0;
let computerWin = 0;

// Random computer choice
function computerRandomChoice() {
  
  crypto.getRandomValues(crArray);

  const computerNumberChoice = crArray[0] / 255;
  if (computerNumberChoice < 0.2) {
    computerChoice = "Rock";
  }
  else if (computerNumberChoice <= 0.4) {
    computerChoice = "Paper";
  }
  else if (computerNumberChoice <= 0.6) {
    computerChoice = "Scissors";
  }
  else if (computerNumberChoice <= 0.8) {
    computerChoice = "Lizard";
  }
  else {
    computerChoice = "Spock";
  }

}

function resetSelection() {

  stopConfetti();
  removeConfetti();

  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });

}

function resetAll() {
  
  resetSelection();
  
  playersWin = 0;
  computerWin = 0;
  
  resultText.textContent = "";
  
  playerScoreEl.textContent = playersWin;
  computerScoreEl.textContent = computerWin;

  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";

}

function displayComputerChoice() {

  let element = document.getElementById('computer' + computerChoice);
  element.classList.add('selected');
  computerChoiceEl.textContent = " --- " + computerChoice;

}

// Passing selection
function select(playerChoice) {

  resetSelection();

  let element = document.getElementById('player' + playerChoice);
  playerChoiceEl.textContent = ' --- ' + playerChoice;
  element.classList.add('selected');
  currPlayerChoice  = playerChoice;

  checkResult();

}

function updateScore() {

  if (currPlayerChoice === computerChoice) {
    resultText.textContent = 'It\'s a tie.';
  } else if (choices[currPlayerChoice].defeats.indexOf(computerChoice) == -1) {
    resultText.textContent = 'You lose.';
    computerWin++;
  } else {
    startConfetti();
    resultText.textContent = 'You win!.';
    playersWin++;
  };

  playerScoreEl.textContent = playersWin;
  computerScoreEl.textContent = computerWin;

}

function checkResult() {

  computerRandomChoice();
  displayComputerChoice();
  updateScore();

}

window.select = select;

resetAll();
