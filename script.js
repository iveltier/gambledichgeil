const symbolBoxes = document.querySelectorAll(".symbolBox");
const symbols = ["🍓", "🩷", "🩷", "✨", "✨", "✨", "🍪", "🍪", "🍪", "🍪"];
const scoreDisplay = document.getElementById("score");
const plusDisplay = document.getElementById("plus");
const triesDisplay = document.getElementById("tries");
const totalDisplay = document.getElementById("total");
const gameOverDisplay = document.getElementById("gameOver");
const startBtn = document.getElementById("startBtn");
const multiplierDisplay = document.getElementById("multiplier");
const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const winSound = new Audio("sounds/win.mp3");
const columStopSound = new Audio("sounds/columStop.mp3");
const btnClickSound = new Audio("sounds/btnClick.mp3");
const allInBtn = document.getElementById("allIn");

let multiplier = 1;
let intervals = [];
let score = 10;
let minus = 0;
let plus = 0;
let tries = 0;
let total = minus - plus;

function reset() {
  score = 10;
  minus = total;
  plus = 0; // Setze plus auf 0
  tries = 0; // Setze tries auf 0

  // Behalte den Wert von total bei
  scoreDisplay.textContent = "Coins: " + score;
  plusDisplay.innerHTML = "";
  triesDisplay.innerHTML = `0 Tries`; // Setze die Anzeige zurück
  totalDisplay.innerHTML = `Total Win: ${total} Coins`; // Zeige den aktuellen Wert von total an
  gameOverDisplay.style.display = "none";
  startBtn.disabled = false;
  addBtn.disabled = false;
  subtractBtn.disabled = false;
  allInBtn.disabled = false;
  symbolBoxes.forEach((box) => box.classList.remove("lose"));
  multiplier = 1;
  multiplierDisplay.textContent = multiplier;
}

function startChanging() {
  if (score <= 0) {
    gameOverDisplay.style.display = "block";
  } else if (multiplier > score) {
    window.alert("You don't have enough coins to play with this multiplier!");
    multiplier = score;
    multiplierDisplay.textContent = multiplier;
  } else {
    minus -= multiplier;
    btnClickSound.play();
    startBtn.disabled = true;
    addBtn.disabled = true;
    subtractBtn.disabled = true;
    allInBtn.disabled = true;
    score -= multiplier;
    symbolBoxes.forEach((box) => box.classList.remove("win", "lose"));

    tries++;
    triesDisplay.innerHTML = `${tries} ${tries === 1 ? "Try" : "Tries"}`;

    total = minus + plus;
    totalDisplay.innerHTML = `Total Win: ${total} Coins`;
    scoreDisplay.textContent = "Coins: " + score;

    clearIntervals();

    const columns = [
      [symbolBoxes[0], symbolBoxes[3], symbolBoxes[6]],
      [symbolBoxes[1], symbolBoxes[4], symbolBoxes[7]],
      [symbolBoxes[2], symbolBoxes[5], symbolBoxes[8]],
    ];

    columns.forEach((column, index) => {
      intervals[index] = setInterval(() => {
        column.forEach((box) => {
          box.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });
      }, 30);
    });

    const stopTimes = [
      Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000,
      Math.floor(Math.random() * (2500 - 1600 + 1)) + 1600,
      Math.floor(Math.random() * (3500 - 2600 + 1)) + 2600,
    ];

    stopTimes.forEach((time, index) => {
      setTimeout(() => {
        clearInterval(intervals[index]);
        columStopSound.play();
        if (index === columns.length - 1) {
          const values = Array.from(symbolBoxes).map((box) => box.textContent);

          function checkWin(condition, points) {
            if (condition) {
              symbolBoxes.forEach((box) => box.classList.add("win"));
              score += points * multiplier;
              plus += points * multiplier;
              scoreDisplay.textContent = "Coins: " + score;
              plusDisplay.innerHTML += `+${points * multiplier} Coins` + "<br>";
              winSound.play();
            } else {
              symbolBoxes.forEach((box) => box.classList.add("lose"));
            }
          }

          checkWin(
            values[3] === symbols[0] &&
              values[4] === symbols[0] &&
              values[5] === symbols[0],
            25
          );

          checkWin(
            values[3] === symbols[0] &&
              values[4] === symbols[1] &&
              values[5] === symbols[0],
            20
          );
          checkWin(
            values[3] === symbols[3] &&
              values[4] === symbols[3] &&
              values[5] === symbols[3],
            15
          );
          checkWin(
            values[3] === symbols[1] &&
              values[4] === symbols[1] &&
              values[5] === symbols[1],
            10
          );
          checkWin(
            values[3] === symbols[6] &&
              values[4] === symbols[0] &&
              values[5] === symbols[6],
            8
          );
          checkWin(
            values[3] === symbols[3] &&
              values[4] === symbols[2] &&
              values[5] === symbols[3],
            7
          );
          checkWin(
            values[3] === symbols[6] &&
              values[4] === symbols[5] &&
              values[5] === symbols[6],
            5
          );

          checkWin(
            values[3] === symbols[6] &&
              values[4] === symbols[6] &&
              values[5] === symbols[6],
            3
          );
          total = minus + plus;
          totalDisplay.innerHTML = `Total Win: ${total} Coins`;
          startBtn.disabled = false;
          addBtn.disabled = false;
          subtractBtn.disabled = false;
          allInBtn.disabled = false;
          if (score <= 0) {
            gameOverDisplay.style.display = "block";
          }
        }
      }, time);
    });
  }
}

function clearIntervals() {
  intervals.forEach((interval) => clearInterval(interval));
  intervals = [];
}

function add() {
  if (multiplier < score) {
    multiplier++;
    multiplierDisplay.textContent = multiplier;
  }
}

function subtract() {
  if (multiplier > 1) {
    multiplier--;
    multiplierDisplay.textContent = multiplier;
  }
}

function allIn() {
  multiplier = score;
  multiplierDisplay.textContent = multiplier;
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      if (!startBtn.disabled) {
        startChanging();
      }
      break;
    case "+":
      if (!addBtn.disabled) {
        add();
      }
      break;
    case "-":
      if (!subtractBtn.disabled) {
        subtract();
      }
      break;
  }
});
