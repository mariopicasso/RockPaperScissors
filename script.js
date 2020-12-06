//VARIABLES

let computerPoints = 0;
let playerPoints = 0;

//RANDOM SELECTION FROM THE COMPUTER
function computerPlay() {
  let options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

//EVENTS AND INITIALIZE PROGRAM
function init(){
  const options = document.querySelectorAll('#options>div');
  options.forEach(option => option.addEventListener('click', (e) => playSingleRound(e.target.className)));
}

//---------------------------------------------------------------------------------------------------------//
//PLAY ROUND. ALL THE PROGRAM IS HERE
//|||||||||||||||||||||||||||||||||||

function playSingleRound(playerSelection) {
  
  //SET VALUES
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerPlay();

  //DISPLAY SELECTIONS
  document.getElementById('human-selection').setAttribute('class', playerSelection);
  document.getElementById('computer-selection').setAttribute('class', computerSelection);
  
  
  //COMPARE AND DISPLAY
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "rock")
  ) 
  {
    document.getElementById('text').textContent = "You WIN!";
    playerPoints++;
  } 
  else if (
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "scissors" && playerSelection === "paper") ||
    (computerSelection === "paper" && playerSelection === "rock")
  ) 
  {
    document.getElementById('text').textContent = "You LOSE!";
    computerPoints++;
  } 
  else if (computerSelection === playerSelection) {
    document.getElementById('text').textContent = "It's a TIE!";
  }

  //CONTROL FLOW: IF WIN ANYONE ENDS THE GAME, ELSE UPDATE THE SCORE

  if (computerPoints === 5 || playerPoints === 5){
    document.querySelector('#score-text').textContent = playerPoints + "  -  " + computerPoints;
    setTimeout( () =>  finishGame() , 50); 
  }
  else{
    document.querySelector('#score-text').textContent = playerPoints + "  -  " + computerPoints;
  }
}

//---------------------------------------------------------------------------------------------------//

//FINAL UPGRADES

//DISPLAY FINAL SCREEN

function finishGame(){
  document.getElementById("container").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  
  if (computerPoints === 5){
    //PUT THE ANIMATION LETTER BY LETTER 
    putAnimation("THE MACHINES WILL RULE THE WORLD", "red");
  }
  else if (playerPoints === 5){
    //PUT THE ANIMATION LETTER BY LETTER
    putAnimation("FLAWLESS VICTORY", "green"); 
  }
  document.getElementById("score-text-final").textContent = playerPoints + " - " + computerPoints;
  
  document.getElementById("restart").addEventListener('click', () => restartGame());
}

//RESTART

function restartGame(){
  computerPoints = 0;
  playerPoints = 0;
  document.getElementById("container").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
  document.querySelector('#score-text').textContent = playerPoints + "  -  " + computerPoints;
  document.getElementById("text").textContent = "";
  
  document.getElementById("human-selection").classList.remove("rock");
  document.getElementById("human-selection").classList.remove("scissors");
  document.getElementById("human-selection").classList.remove("paper");

  document.getElementById("computer-selection").classList.remove("rock");
  document.getElementById("computer-selection").classList.remove("paper");
  document.getElementById("computer-selection").classList.remove("scissors");
}

//PUT ANIMATION

function putAnimation(strText, color){
  const text = document.getElementById("win-message");
  text.style.color = color;
  text.textContent = "";

  const splitText = strText.split("");
  for (let i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
  }
  let i = 0;
  let timer = setInterval(onTick, 50);

  function onTick() {
    const span = text.querySelectorAll('span')[i];
    span.classList.add('fade');
    i++;

    if (i === splitText.length){
      clearInterval(timer);
      timer = null;
      return;
    } 
  }
}


init();




 


