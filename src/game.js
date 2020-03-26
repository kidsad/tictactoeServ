let plaingField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let currentPlayer = 1;
let winnerPlayer = 0;

function getWinnerPlayer() {
  return winnerPlayer;
}

function setCurrentPlayer(numberPlayer) {
  currentPlayer = numberPlayer;
}
function getCurrentPlayer() {
  return currentPlayer;
}

function resetPlayer() {
  currentPlayer = 1;
}

function checkFreeCell(field) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}
function chechValidAddrCell(indexLine, indexColumn, lengthPlaingField) {
  if (indexLine >= 0 &&
      indexColumn >= 0 &&
      indexLine <= lengthPlaingField - 1 &&
      indexColumn <= lengthPlaingField - 1) {
    return true;
  }
  return false;
}

function changeCurrentPlayer(currPlayer) {
  let numberPlayer = 1;
  if (currPlayer == 1) {
    numberPlayer = 2;
  } else {
    numberPlayer = 1;
  }
  return numberPlayer;
}

function checkCell(indexLine, indexColumn, plaingField) {
  if (plaingField[indexLine][indexColumn] == 0) {
    return true;
  } else {
    return false;
  }
}

function selectionCell(indexLine, indexColumn, playerNumber, plaingField) {
  plaingField[indexLine][indexColumn] = playerNumber;
}

function clearPlaingField() {
  for (let i = 0; i < plaingField.length; i++) {
    for (let j = 0; j < plaingField[i].length; j++) {
      plaingField[i][j] = 0;
    }
  }
}

function checkWinPlayaer(plaingField) {
  let result = -1;
  let i = 0;
  let j = 0;
  // проверка выигрыша по горизонтали
  for (i = 0; i < plaingField.length; i++) {
    for (j = 0; j < plaingField[i].length - 1; j++) {
      if ((plaingField[i][j] != plaingField[i][j + 1]) || (plaingField[i][j] == 0)) {
        break;
      }
    }
    if (j == plaingField[i].length - 1) {
      result = plaingField[i][j];
      return result;
    }
  }
  
  // проверка выигрыша по вертикали
  for (j = 0; j < plaingField[0].length; j++) {
    for (i = 0; i < plaingField.length - 1; i++) {
      if ((plaingField[i][j] != plaingField[i+1][j]) || (plaingField[i][j] == 0)) {
        break;
      }
    }
    if (i == plaingField.length - 1) {
      result = plaingField[i][j];
      return result;
    }
  }

  // проверка выигрыша по диагонали слева направа и сверху вниз
  for (i = 0; i < plaingField.length - 1; i++) {
    if ((plaingField[i][i] != plaingField[i + 1][i + 1]) || (plaingField[i][i] == 0)) {
      break;
    }
  }
  if (i == plaingField.length - 1) {
    result = plaingField[i][i];
    return result;
  }
  
  // проверка выигрыша по диагонали справа налево и сверху вниз
  for (i = 0; i < plaingField.length - 1; i++) {
    j = plaingField.length - 1 - i;
    if ((plaingField[i][j] != plaingField[i + 1][j - 1]) || (plaingField[i][j] == 0)) {
      break;
    }
  }
  if (i == plaingField.length - 1) {
    result = plaingField[i][0];
    return result;
  }
  
  // проверка на ничью
  if (!checkFreeCell(plaingField)) {
    result = 0;
    return result;
  }
  return result;
}

function presetPlaingField(newPlaingField) {
  plaingField = newPlaingField;
}

function getField () {
  return plaingField;
}

function makeMove (x, y) {
  const indexLine = y - 1;
  const indexColumn = x - 1;
  if (chechValidAddrCell(indexLine, indexColumn, plaingField.length)) {
    if (checkCell(indexLine, indexColumn, plaingField)) {
      selectionCell(indexLine, indexColumn, currentPlayer, plaingField);
      winnerPlayer = checkWinPlayaer(plaingField);
      if (winnerPlayer >= 0) {
        resetPlayer();
        clearPlaingField();
      } else {
        currentPlayer = changeCurrentPlayer(currentPlayer);
      }
    }
  }
}

module.exports = {
  clearPlaingField,
  setCurrentPlayer,
  getField,
  makeMove,
  presetPlaingField,
  getWinnerPlayer,
};