let curRound = null;

// Object-constructor for one round

class Round {
  constructor(word) {
    this.wordToGuess = word;
    this.rightLetters = Array(word.length).fill("_");
    this.wrongLetters = [];
    this.attempts = 10;
  }

  gameLogic(userGuess) {
    let isGood = false;
    this.attempts--;
    for (let i = 0; i <= this.wordToGuess.length; i++) {
      if (this.wordToGuess[i] === userGuess) {
        this.rightLetters[i] = this.wordToGuess[i];
        isGood = true;
      }
    }
    console.log("User guess: " + userGuess + ": " + isGood);
    if (isGood == false) {
      this.wrongLetters.push(userGuess);
    }
  }

  checkWin() {
    return this.rightLetters.join("") === this.wordToGuess;
  }
}

//Game starter

function startGame() {
  curRound = new Round("blanket");
  renderGameState();
  document.getElementById("game_win").innerHTML = "";
  document.getElementById("game_lose").innerHTML = "";
}

function insEventHandler() {
  document.addEventListener("keyup", event => {
    if (curRound.attempts == 0) {
      return;
    }
    let userGuess = event.key;
    curRound.gameLogic(userGuess);
    renderGameState();
    if (curRound.checkWin()) {
      showMeTheWinner();
    } else if (curRound.attempts == 0) {
      showLose();
    }
  });
}

//render function

function showMeTheWinner() {
  document.getElementById("game_win").innerHTML = "You Get It!";
}

function showLose() {
  document.getElementById("game_lose").innerHTML = "Nice try! Game over";
}

window.onload = () => {
  insEventHandler();
  setTimeout(startGame, 1000);
};

function renderGameState() {
  document.getElementById("right_letters").innerHTML = curRound.rightLetters.join("");
  document.getElementById("wrong_letters").innerHTML = curRound.wrongLetters.join(", ");
  document.getElementById("attempts").innerHTML = curRound.attempts;
}
