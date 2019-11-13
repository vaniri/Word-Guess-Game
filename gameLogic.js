let curRound = null;
const roundInfo = [
  { word: "kenny", pic: "kenny.png" },
  { word: "towelie", pic: "towelie.jpg" },
  { word: "mackey", pic: "mkay.jpg" },
  { word: "fingerbang", pic: "fingerbang.jpg" },
  { word: "wendy", pic: "wendy.jpeg" },
  { word: "butters", pic: "butters.jpg" },
  { word: "stan", pic: "stan.png" },
  { word: "kyle", pic: "kyle.jpg" }
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
   
    if (isGood == false) {
      if (!this.wrongLetters.includes(userGuess)) {
        this.attempts--;
        this.wrongLetters.push(userGuess);
      }
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
  document.querySelector(".game_section").style.background = `url("image/SPBack.jpg")`;
  let randomObj = roundInfo[Math.floor(Math.random() * roundInfo.length)];
  curRound = new Round(randomObj.word, randomObj.pic);
  renderGameState();
}

function insEventHandler() {
  let checkAlpha = /^[a-z]$/i;
  document.addEventListener("keyup", event => {
    if (curRound.attempts == 0) {
      return;
    }
    let userGuess = event.key.toLowerCase();
    if (!checkAlpha.test(userGuess)) {
      return;
    }
    curRound.gameLogic(userGuess);
    renderGameState();
    if (curRound.checkWin()) {
      showWin();
    } else if (curRound.attempts == 0) {
      showLose();
    }
  });
}

//render function

function showWin() {
  document.getElementById("wrong_letters").innerHTML = "";
  document.getElementById("right_letters").innerHTML = "You Get It!";
  document.querySelector(".game_section").style.background = `url("image/${curRound.pic}")`;
  setTimeout(startGame, 3000);
}

function showLose() {
  document.getElementById("wrong_letters").innerHTML = "";
  document.getElementById("right_letters").innerHTML = "Nice try! Game over";
  setTimeout(startGame, 3000);
}

function renderGameState() {
  document.getElementById("right_letters").innerHTML = curRound.rightLetters.join("");
  document.getElementById("wrong_letters").innerHTML = curRound.wrongLetters.join(", ");
  document.getElementById("attempts").innerHTML = curRound.attempts;
}
