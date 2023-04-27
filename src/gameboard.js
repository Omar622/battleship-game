import { player2Attacks } from './player2.js';
import Ship from './ship.js';

export const Player = {
  ONE: 0,
  TWO: 1
};

function Cell() {
  let isAttacked = [0, 0];
  let isThereShip = 0;
  let whichPlayer = 0;
  let whichShipIndex = 0;
  return {
    isAttacked, isThereShip, whichPlayer, whichShipIndex
  };
}

const GameBoard = (function () { // by default 10x10
  const DIMENSION = 10;

  let toSetShipIndex = [];
  const ships = [];
  const board = [];

  const init = () => {
    toSetShipIndex[Player.ONE] = 0;
    toSetShipIndex[Player.TWO] = 0;
    ships[Player.ONE] = [new Ship(5), new Ship(4), new Ship(3)
      , new Ship(3), new Ship(2)];
    ships[Player.TWO] = [new Ship(5), new Ship(4), new Ship(3)
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
      if (isValidCord(j + len) && board[i][j + len].isThereShip
        && board[i][j + len].whichPlayer == player)
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
      if (isValidCord(i + len) && board[i + len][j].isThereShip
        && board[i + len][j].whichPlayer == player)
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
        board[i][k].whichShipIndex = toSetShipIndex[player];
      }
    } else {
      for (let k = i; k < i + length; ++k) {
        board[k][j].isThereShip = 1;
        board[k][j].whichPlayer = player;
        board[k][j].whichShipIndex = toSetShipIndex[player];
      }
    }
    ++toSetShipIndex[player];
    return true;
  }

  const receiveAttack = (i, j, player) => {
    if (board[i][j].isAttacked[player])
      return false;

    board[i][j].isAttacked[player] = 1;
    if (board[i][j].isThereShip && board[i][j].whichPlayer !== player) {
      ships[1 - player][board[i][j].whichShipIndex].hit();
      return true;
    }
    return false;
  }

  const gameStatus = () => {
    let isWinner = [true, true];
    for (let i = 0; i < 5; ++i) {
      if (!ships[Player.ONE][i].isSunk()) {
        isWinner[Player.TWO] = false;
        break;
      }
    }
    for (let i = 0; i < 5; ++i) {
      if (!ships[Player.TWO][i].isSunk()) {
        isWinner[Player.ONE] = false;
        break;
      }
    }
    if (!isWinner[Player.ONE] && !isWinner[Player.TWO])
      return 0;
    if (isWinner[Player.ONE])
      return 1;
    if (isWinner[Player.TWO])
      return 2;
  }

  const isAttackedBy = (i, j, player) => {
    if (!isValidCord(i) || !isValidCord(j)) return false;
    return board[i][j].isAttacked[player];
  }

  const isThereShip = (i, j, player) => {
    return board[i][j].isThereShip && board[i][j].whichPlayer == player;
  }

  const isSunk = (i, j, player) => {
    return ships[player][board[i][j].whichShipIndex].isSunk();
  }

  return {
    init, setShip, isValidShipPlace, nextShipLengthToSet
    , receiveAttack, isAttackedBy, isThereShip, isSunk, gameStatus
  }
})();

export default GameBoard;