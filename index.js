const symbolBoxes = document.querySelectorAll(".symbolBox");
const symbols = ["🍓", "🩷", "🩷", "✨", "✨", "✨", "🍪", "🍪", "🍪", "🍪"];
const scoreDisplay = document.getElementById("score");
const plusDisplay = document.getElementById("plus");
const minusDisplay = document.getElementById("minus");
const totalDisplay = document.getElementById("total");
const gameOverDisplay = document.getElementById("gameOver");
const startBtn = document.getElementById("startBtn");

let interval;
let score = 10;
let minus = -1;
let plus = 1;

function reset() {
  score = 10;
  minus = -1;
  plus = 1;
  scoreDisplay.textContent = "Coins: " + score;
  plusDisplay.innerHTML = "";
  minusDisplay.innerHTML = `${minus} Coins`;
  totalDisplay.innerHTML = `Total Win: ${minus + plus} Coins`;
  gameOverDisplay.style.display = "none";
  startBtn.disabled = false;
}

function startChanging() {
  if (score <= 0) {
    gameOverDisplay.style.display = "block";
  } else {
    startBtn.disabled = true;
    score--;
    symbolBoxes.forEach((box) => box.classList.remove("win", "lose"));

    minusDisplay.innerHTML = `${minus--} Coins`;

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
          score += points;
          scoreDisplay.textContent = "Coins: " + score;
          plusDisplay.innerHTML += `+${points} Coins` + "<br>";
          plus = plus + points;
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
    }, Math.floor(Math.random() * 1500) + 1000);
  }
}
