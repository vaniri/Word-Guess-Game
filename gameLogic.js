let curRound = null;
const roundInfo = [
  { word: "kenny", pic: "kenny.jpg" },
  { word: "towelie", pic: "towelie.jpg" },
  { word: "mackey", pic: "mkay.jpg" },
  { word: "fingerbang", pic: "fingerbang.jpg" },
  { word: "wendy", pic: "wendy.jpeg" },
  { word: "butters", pic: "butters.jpg" },
  { word: "stan", pic: "stan.png" }
];

// Object-constructor for one round

class Round {
  constructor(word, pic) {
    this.wordToGuess = word;
    this.rightLetters = Array(word.length).fill("■");
    this.wrongLetters = [];
    this.attempts = 10;
    this.pic = pic;
  }

  gameLogic(userGuess) {
    let isGood = false;
    for (let i = 0; i <= this.wordToGuess.length; i++) {
      if (this.wordToGuess[i] === userGuess) {
        this.rightLetters[i] = this.wordToGuess[i];
        isGood = true;
      }
    }
    console.log("User guess: " + userGuess + ": " + isGood);
    if (isGood == false) {
      this.attempts--;
      this.wrongLetters.push(userGuess);
    }
  }

  checkWin() {
    return this.rightLetters.join("") === this.wordToGuess;
  }
}

//Game starter

window.onload = () => {
  insEventHandler();
  setTimeout(startGame, 1000);
};

function startGame() {
  document.querySelector("body").style.background = `url("image/Hk9nelN.jpg") no-repeat right`;
  let randomObj = roundInfo[Math.floor(Math.random() * roundInfo.length)];
  let randomWord = randomObj.word;
  let randomPic = randomObj.pic;
  curRound = new Round(randomWord, randomPic);
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
  document.querySelector("body").style.background = `url("image/${curRound.pic}")`;
  setTimeout(startGame, 3000);
}

function showLose() {
  document.getElementById("game_lose").innerHTML = "Nice try! Game over";
  setTimeout(startGame, 3000);
}

function renderGameState() {
  document.getElementById("right_letters").innerHTML = curRound.rightLetters.join("");
  document.getElementById("wrong_letters").innerHTML = curRound.wrongLetters.join(", ");
  document.getElementById("attempts").innerHTML = curRound.attempts;
}
