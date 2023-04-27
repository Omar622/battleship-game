import GameBoard from './gameboard.js';
import { Player } from './gameboard.js';

const getRandomCord = () => Math.floor(Math.random() * 10);

export const player2SetShips = () => {
  for (let k = 0; k < 5;) {
    let i = getRandomCord();
    let j = getRandomCord();
    let isRow = Math.floor(Math.random() * 2);
    if (GameBoard.setShip(i, j, !!isRow, Player.TWO)) {
      ++k;
    }
  }
}

export const player2Attacks = () => {
  let i = getRandomCord();
  let j = getRandomCord();
  while (GameBoard.isAttackedBy(i, j, Player.TWO)) {
    i = getRandomCord();
    j = getRandomCord();
  }
  GameBoard.receiveAttack(i, j, Player.TWO);
}