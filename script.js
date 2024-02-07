let currentPlayer = "X";
const NUMBERS_OF_ROWS = 3;
const turns = NUMBERS_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < NUMBERS_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBERS_OF_ROWS }, () => "_"));
  }
  return board;
};
let board = createBoardArray();

const getCellPlace = (index, numOfRows) => {
  const row = Math.floor(index / numOfRows);
  const col = index % numOfRows;
  return [row, col];
};
const restBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();

  currentPlayer = "X";
  turnsCounter = 0;
};

const checkRows = (currentPlayer) => {
  let column = 0;

  for (let row = 0; row < NUMBERS_OF_ROWS; row++) {
    while (column < NUMBERS_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }
    if (column === NUMBERS_OF_ROWS) {
      return true;
    }
  }
};

const checkColumns = (currentPlayer) => {
  let row = 0;

  for (let column = 0; column < NUMBERS_OF_ROWS; column++) {
    while (row < NUMBERS_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === NUMBERS_OF_ROWS) {
      return true;
    }
  }
};
const checkDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBERS_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      break;
    }
    count++;
  }
  if (count === NUMBERS_OF_ROWS) {
    return true;
  }
};
const checkReverseDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBERS_OF_ROWS) {
    if (board[count][NUMBERS_OF_ROWS - 1 - count] !== currentPlayer) {
      break;
    }
    count++;
  }
  if (count === NUMBERS_OF_ROWS) {
    return true;
  }
};

const isWin = (currentPlayer) => {
  if (checkRows(currentPlayer)) return true;

  if (checkColumns(currentPlayer)) return true;

  if (checkDiagonals(currentPlayer)) return true;

  if (checkReverseDiagonals(currentPlayer)) return true;
};
const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} won`);
    restBoard();
  }, 100);
};
const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw");
    restBoard();
  }, 100);
};
const drawCell = (cell, player) => {
  cell.querySelector(".value").innerHTML = currentPlayer;
  cell.classList.add(`cell--${player}`);
};
const clickButtonHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlace(index, NUMBERS_OF_ROWS);
  if (board[row][col] === "_") {
    turnsCounter++;
    board[row][col] = currentPlayer;
    drawCell(cell, currentPlayer);

    if (isWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  } else return currentPlayer;
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 0; i < NUMBERS_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="${
      i + 1
    }"><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);
    cellElement.querySelector(".cell").onclick = (e) =>
      clickButtonHandler(e, i);
    cellElement.querySelector(".cell").onkeydown = (e) =>
      e.key === "Enter" ? clickButtonHandler(e, i) : true;
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBERS_OF_ROWS);
  }
  container.insertAdjacentElement("afterbegin", board);
};
createBoard();

const restButton = document.querySelector("#reset");
restButton.onclick = restBoard;
