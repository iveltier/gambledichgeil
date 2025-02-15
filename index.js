const symbolBoxes = document.querySelectorAll(".symbolBox");
const symbols = ["🍓", "🩷", "🩷", "✨", "✨", "✨", "🍪", "🍪", "🍪", "🍪"];
const scoreDisplay = document.getElementById("score");
const plusDisplay = document.getElementById("plus");
const minusDisplay = document.getElementById("minus");
const totalDisplay = document.getElementById("total");
const gameOverDisplay = document.getElementById("gameOver");
const startBtn = document.getElementById("startBtn");
const multiplierDisplay = document.getElementById("multiplier");

let multiplier = 1;
let interval;
let score = 10;
let minus = 0;
let plus = 0;

function reset() {
  score = 10;
  minus = 0;
  plus = 1;
  scoreDisplay.textContent = "Coins: " + score;
  plusDisplay.innerHTML = "";
  minusDisplay.innerHTML = ``;
  totalDisplay.innerHTML = `Total Win: ${minus + plus} Coins`;
  gameOverDisplay.style.display = "none";
  startBtn.disabled = false;
  symbolBoxes.forEach((box) => box.classList.remove("lose"));
}

function startChanging() {
  if (score <= 0) {
    gameOverDisplay.style.display = "block";
  } else if (multiplier > score) {
    window.alert("You don't have enough coins to play with this multiplier!");
  } else {
    startBtn.disabled = true;
    score -= multiplier;
    symbolBoxes.forEach((box) => box.classList.remove("win", "lose"));

    minusDisplay.innerHTML = `${(minus -= multiplier)} Coins`;

    totalDisplay.innerHTML = `Total Win: ${minus + plus} Coins`;
    scoreDisplay.textContent = "Coins: " + score;

    clearInterval(interval);

    interval = setInterval(() => {
      symbolBoxes.forEach((box) => {
        box.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      });
    }, 30);

    setTimeout(() => {
      clearInterval(interval);

      const values = Array.from(symbolBoxes).map((box) => box.textContent); // convertieren von nodelist (querySlecetorAll) zu Array dabei macht .map() für jedes Element im Array textContent rausfiltern

      function checkWin(condition, points) {
        if (condition) {
          symbolBoxes.forEach((box) => box.classList.add("win"));
          score += points * multiplier;
          scoreDisplay.textContent = "Coins: " + score;
          plusDisplay.innerHTML += `+${points * multiplier} Coins` + "<br>";
          plus = plus + points * multiplier;
        } else {
          symbolBoxes.forEach((box) => box.classList.add("lose"));
        }
      }

      checkWin(
        // 🍓🍓🍓
        values[3] === symbols[0] &&
          values[4] === symbols[0] &&
          values[5] === symbols[0],
        25
      );

      checkWin(
        // 🍓🩷🍓
        values[3] === symbols[0] &&
          values[4] === symbols[1] &&
          values[5] === symbols[0],
        20
      );
      checkWin(
        // ✨✨✨
        values[3] === symbols[3] &&
          values[4] === symbols[3] &&
          values[5] === symbols[3],
        15
      );
      checkWin(
        // 🩷🩷🩷
        values[3] === symbols[1] &&
          values[4] === symbols[1] &&
          values[5] === symbols[1],
        10
      );
      checkWin(
        // 🍪🍓🍪
        values[3] === symbols[6] &&
          values[4] === symbols[1] &&
          values[5] === symbols[6],
        8
      );
      checkWin(
        // ✨🩷✨
        values[3] === symbols[3] &&
          values[4] === symbols[2] &&
          values[5] === symbols[3],
        7
      );
      checkWin(
        // 🍪✨🍪
        values[3] === symbols[6] &&
          values[4] === symbols[5] &&
          values[5] === symbols[6],
        5
      );

      checkWin(
        // 🍪🍪🍪
        values[3] === symbols[6] &&
          values[4] === symbols[6] &&
          values[5] === symbols[6],
        3
      );
      totalDisplay.innerHTML = `Total Win: ${minus + plus} Coins`;
      startBtn.disabled = false;
      if (score <= 0) {
        gameOverDisplay.style.display = "block";
      }
    }, Math.floor(Math.random() * 1500) + 1000);
  }
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
