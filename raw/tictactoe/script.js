let player = "x",
  gameComplete = false,
  r = 3,
  c = 3,
  boxesFilled = 0;
let game = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let swtichPlayer = () => (player = player == "x" ? "o" : "x");

let checkWinner = (row, col) => {
  let rowWinner = true,
    colWinner = true,
    diagWinner = row == col || row + col == c - 1 ? true : false;

  for (let i = 0; i < c - 1; ++i) {
    let val = game[row][i];
    if (val != "" && val == game[row][i + 1]) rowWinner = rowWinner && true;
    else rowWinner = rowWinner && false;
  }

  for (let i = 0; i < r - 1; ++i) {
    let val = game[i][col];
    if (val != "" && val == game[i + 1][col]) colWinner = colWinner && true;
    else colWinner = colWinner && false;
  }

  if (row == col) {
    for (let i = 0; i < Math.min(r, c) - 1; ++i) {
      if (game[i][i] != "" && game[i][i] == game[i + 1][i + 1])
        diagWinner = diagWinner && true;
      else diagWinner = diagWinner && false;
    }
  }

  if (row + col == c - 1) {
    let dr = 0,
      dc = c - 1;
    for (let i = 0; i < c - 1; ++i) {
      let currentVal = game[dr][dc];
      if (currentVal != "" && game[dr + 1][dc - 1] == currentVal) {
        dr += 1;
        dc -= 1;
        diagWinner = diagWinner && true;
      } else diagWinner = diagWinner && false;
    }
  }

  return rowWinner || colWinner || diagWinner;
};

let markBox = (e) => {
  let content = e.target;
  if (content.innerHTML == "" && !gameComplete) {
    content.innerHTML = player;
    let index = parseInt(content.id);

    let row = Math.floor((index - 1) / 3);
    let col = (index - 1) % 3;

    game[row][col] = player;
    boxesFilled++;
    let msg = document.getElementById("win-msg");
    if (checkWinner(row, col)) {
      msg.innerHTML = `Player ${player} wins. `;
      gameComplete = true;
      return;
    }
    if (boxesFilled == 9) {
      gameComplete = true;
      msg.innerHTML = "Game ended in draw! ";
    }
    swtichPlayer();
  }
};

let reset = () => {
  game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameComplete = false;
  player = "x";

  let divs = document.getElementById("container");
  let elements = divs.children;
  for (let i = 0; i < elements.length; ++i) {
    elements[i].innerHTML = "";
  }
};

document
  .getElementById("container")
  .addEventListener("click", (e) => markBox(e));

document.getElementById("reset").addEventListener("click", reset);
