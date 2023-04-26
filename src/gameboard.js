import Ship from './ship.js';

function Cell() {
  let isAttacked = [0, 0];
  let isThereShip = 0;
  let whichPlayer = 0;
  let whichIndex = 0;
  return {
    isAttacked, isThereShip, whichPlayer, whichIndex
  };
}

const GameBoard = (function () { // by default 10x10
  const DIMENSION = 10;
  const PLAYER1 = 0;
  const PLAYER2 = 1;

  let toSetShipIndex = [];
  const ships = [];
  const board = [];

  const init = () => {
    toSetShipIndex[PLAYER1] = 0;
    toSetShipIndex[PLAYER2] = 0;
    ships[PLAYER1] = [new Ship(5), new Ship(4), new Ship(3)
      , new Ship(3), new Ship(2)];
    ships[PLAYER2] = [new Ship(5), new Ship(4), new Ship(3)
      , new Ship(3), new Ship(2)];

    for (let i = 0; i < DIMENSION; ++i) {
      board[i] = [];
      for (let j = 0; j < DIMENSION; ++j) {
        board[i][j] = new Cell();
      }
    }
  }

  const isValidCord = (x) => x >= 0 && x < DIMENSION;

  const isValidShipPlace = (i, j, len, isRow, player) => {
    if (isRow) {
      if (!isValidCord(i) || !isValidCord(j) || !isValidCord(j + len - 1))
        return false;

      for (let k = j; k < j + len; ++k) {
        if (board[i][k].isThereShip)
          return false;
      }

      if (isValidCord(j - 1) && board[i][j - 1].isThereShip
        && board[i][j - 1].whichPlayer == player)
        return false;
      if (isValidCord(j + len - 1) && board[i][j + len - 1].isThereShip
        && board[i][j + len - 1].whichPlayer == player)
        return false;

      if (isValidCord(i - 1)) {
        for (let k = j; k < j + len; ++k) {
          if (board[i - 1][k].isThereShip
            && board[i - 1][k].whichPlayer == player)
            return false;
        }
      }
      if (isValidCord(i + 1)) {
        for (let k = j; k < j + len; ++k) {
          if (board[i + 1][k].isThereShip
            && board[i + 1][k].whichPlayer == player)
            return false;
        }
      }
    } else {
      if (!isValidCord(i) || !isValidCord(j) || !isValidCord(i + len - 1))
        return false;

      for (let k = i; k < i + len; ++k) {
        if (board[k][j].isThereShip)
          return false;
      }

      if (isValidCord(i - 1) && board[i - 1][j].isThereShip
        && board[i - 1][j].whichPlayer == player)
        return false;
      if (isValidCord(i + len - 1) && board[i + len - 1][j].isThereShip
        && board[i + len - 1][j].whichPlayer == player)
        return false;

      if (isValidCord(j - 1)) {
        for (let k = i; k < i + len; ++k) {
          if (board[k][j - 1].isThereShip
            && board[k][j - 1].whichPlayer == player)
            return false;
        }
      }
      if (isValidCord(j + 1)) {
        for (let k = i; k < i + len; ++k) {
          if (board[k][j + 1].isThereShip
            && board[k][j + 1].whichPlayer == player)
            return false;
        }
      }
    }
    return true;
  }

  const nextShipLengthToSet = (player) => {
    if (toSetShipIndex[player] > 4)
      return -1;
    return ships[player][toSetShipIndex[player]].length;
  }

  const setShip = (i, j, isRow, player) => {
    if (toSetShipIndex[player] > 4)
      return false;

    const length = nextShipLengthToSet(player);
    if (!isValidShipPlace(i, j, length, isRow, player))
      return false;

    if (isRow) {
      for (let k = j; k < j + length; ++k) {
        board[i][k].isThereShip = 1;
        board[i][k].whichPlayer = player;
        board[i][k].whichIndex = toSetShipIndex[player];
      }
    } else {
      for (let k = i; k < i + length; ++k) {
        board[k][j].isThereShip = 1;
        board[k][j].whichPlayer = player;
        board[k][j].whichIndex = toSetShipIndex[player];
      }
    }
    ++toSetShipIndex[player];
    return true;
  }

  const receiveAttack = (i, j, player) => {
    board[i][j].isAttacked[player] = 1;
    return board[i][j].isThereShip && board[i][j].whichPlayer !== player;
  }

  return {
    init, setShip, nextShipLengthToSet, receiveAttack
  }
})();

export default GameBoard;