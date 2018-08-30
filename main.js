//window.addEventListener("load", init);
//let diffi = document.getElementById("difficulty");
//diffi.addEventListener("change", difficulty);

//document.getElementById("start").addEventListener("click", init);

//document.getElementById("restart").addEventListener("click", restart);

/*function difficulty(event) {
  if (diffi.value == "easy") {
    currentLevel = levels.easy;
  } else if (diffi.value == "medium") {
    currentLevel = levels.medium;
  } else {
    currentLevel = levels.hard;
  }
} */
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};
let currentLevel = levels.easy;
//global
let time;
let score = 0;
let isPlaying;
let stopped;
let cd;
let hScore = 0;

const wordInput = document.querySelector("#input-word");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const start = document.querySelector("#start");
const chooseLevel = document.querySelector("#chooseLevel");
const highScore = document.querySelector("#hscore");
const reset = document.querySelector("#restart");
//const chooseLevel = document.querySelector("#chooseLevel");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];
chooseLevel.addEventListener("change", changeLevel);
start.addEventListener("click", init);
restart.addEventListener("click", reload);
seconds.innerHTML = currentLevel;
//chooseLevel.value = levels.easy;

//function restart() {}
function changeLevel() {
  currentLevel = levels[chooseLevel.value];
  seconds.innerHTML = currentLevel;
  time = currentLevel;
}
function reload() {
  location.reload();
}
function init() {
  //difficulty();
  document.getElementById("input-word").focus();
  document.getElementById("input-word").select();
  message.innerHTML = "";
  time = currentLevel;
  timeDisplay.innerHTML = time;
  seconds.innerHTML = currentLevel;
  stopped = false;
  showWords(words);
  wordInput.addEventListener("input", startMatch);
  cd = setInterval(countDown, 1000);
  setInterval(checkStatus, 50);
  document.getElementById("input-word").style.border = "";
  scoreDisplay.innerHTML = 0;
}

function startMatch() {
  if (!stopped) {
    if (sameWord()) {
      isPlaying = true;
      time = currentLevel + 1;
      showWords(words);
      wordInput.value = "";
      score++;
    }
    if (score === -1) {
      scoreDisplay.innerHTML = 0;
    } else {
      scoreDisplay.innerHTML = score;
    }
  }
}

function sameWord() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!";
    message.style.color = "green";

    return true;
  } else {
    message.innerHTML = " ";
    return false;
  }
}

function showWords(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function countDown() {
  if (!stopped) {
    if (time > 0) {
      time--;
    } else if (time === 0) {
      //message.innerHTML = "";
      isPlaying = false;
      clearInterval(cd);
    }
    timeDisplay.innerHTML = time;
  }
}

function checkStatus() {
  if (!stopped) {
    if (!isPlaying && time === 0) {
      message.innerHTML = "Game Over!! :(";
      message.style.color = "red";
      document.getElementById("input-word").style.border = "4px outset red";
      wordInput.value = "";
      //clearInterval(cd);
      if (score > hScore) {
        hScore = score;
        highScore.innerHTML = hScore;
      }
      score = 0;
    }
  }
}
