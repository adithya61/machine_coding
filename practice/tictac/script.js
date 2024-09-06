let gameComplete = false,
  player = "x",
  filledBoxes = 0;

let gameGrid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let reset = () => {
  gameGrid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameComplete = false;
  filledBoxes = 0;

  document
    .querySelectorAll(".grid-item")
    .forEach((tag) => (tag.innerHTML = ""));
};

let checkWinner = (row, col) => {
  if (
    gameGrid[row][0] != "" &&
    gameGrid[row][0] == gameGrid[row][1] &&
    gameGrid[row][1] == gameGrid[row][2]
  )
    return true;
  if (
    gameGrid[0][col] != "" &&
    gameGrid[0][col] == gameGrid[1][col] &&
    gameGrid[1][col] == gameGrid[2][col]
  )
    return true;

  if (
    gameGrid[0][0] != "" &&
    gameGrid[0][0] == gameGrid[1][1] &&
    gameGrid[1][1] == gameGrid[2][2]
  )
    return true;
  if (
    gameGrid[0][2] != "" &&
    gameGrid[0][2] == gameGrid[1][1] &&
    gameGrid[1][1] == gameGrid[2][0]
  )
    return true;

  return false;
};

let switchPlayer = () => (player = player == "x" ? "o" : "x");

let markBox = (e) => {
  let box = e.target;

  if (box.innerHTML == "" && !gameComplete) {
    box.innerHTML = player;
    let index = parseInt(box.id) - 1;
    let row = Math.floor(index / 3);
    let col = index % 3;

    console.log(`row ${row} col ${col}`);

    gameGrid[row][col] = player;
    filledBoxes++;
    if (checkWinner(row, col)) {
      gameComplete = true;
      document.getElementById(
        "win-msg"
      ).innerHTML = `Player ${player} won the match`;
      return;
    }
    if (filledBoxes == 9) {
      document.getElementById("win-msg").innerHTML = `The game ended in a draw`;
    }
    switchPlayer();
  }
};

document
  .getElementById("container")
  .addEventListener("click", (e) => markBox(e));

document.getElementById("reset").addEventListener("click", reset);

