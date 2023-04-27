import GameBoard from './gameboard.js';
import { Player } from './gameboard.js';
import { player2SetShips, player2Attacks } from './player2.js';

const putWinner = (player) => {
  const header = document.createElement('h1');
  header.innerHTML = (player === Player.ONE)
    ? 'You\'re WINNER' : 'Computer is WINNER';
  document.querySelector('#page').appendChild(header);
}

const addHoverEffect = (i, j) => {
  const grid = document.querySelector('.player1.grid-container');
  const btn = grid.children[(i * 10) + j];
  btn.addEventListener('mouseover', () => {
    let length = GameBoard.nextShipLengthToSet(Player.ONE);
    if (length !== -1) {
      let isRow = document.querySelector('#is-row').checked;
      if (GameBoard.isValidShipPlace(i, j, length, isRow, Player.ONE)) {
        if (isRow) {
          for (let k = j; k < j + length; ++k) {
            const btnToHover = grid.children[(i * 10) + k];
            btnToHover.classList.add('hover');
          }
        } else {
          for (let k = i; k < i + length; ++k) {
            const btnToHover = grid.children[(k * 10) + j];
            btnToHover.classList.add('hover');
          }
        }
      }
    }
  });
  btn.addEventListener('mouseout', () => {

    let length = GameBoard.nextShipLengthToSet(Player.ONE);
    if (length !== -1) {
      let isRow = document.querySelector('#is-row').checked;
      if (GameBoard.isValidShipPlace(i, j, length, isRow, Player.ONE)) {
        if (isRow) {
          for (let k = j; k < j + length; ++k) {
            const btnToHover = grid.children[(i * 10) + k];
            btnToHover.classList.remove('hover');
          }
        } else {
          for (let k = i; k < i + length; ++k) {
            const btnToHover = grid.children[(k * 10) + j];
            btnToHover.classList.remove('hover');
          }
        }
      }
    }
  });
}

const createPlayer1Grid = () => {
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('player1');
  gridContainer.classList.add('grid-container');
  document.querySelector('.player1-container').appendChild(gridContainer);

  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      const btn = document.createElement('button');
      btn.classList.add('cell');
      btn.addEventListener('click', () => {
        const isRow = document.querySelector('#is-row').checked;
        GameBoard.setShip(i, j, isRow, Player.ONE);
      });
      gridContainer.appendChild(btn);
    }
  }
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      addHoverEffect(i, j);
    }
  }
}

const createPlayer1Container = () => {
  const player1Container = document.createElement('div');
  player1Container.classList.add('player1-container');
  document.querySelector('.game-container')
    .appendChild(player1Container);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('name', 'checkbox');
  checkBox.setAttribute('id', 'is-row');
  player1Container.appendChild(checkBox);

  const checkBoxLabel = document.createElement('label');
  checkBoxLabel.classList.add('check-box-label');
  checkBoxLabel.setAttribute('for', 'is-row');
  checkBoxLabel.innerHTML = 'Row';
  player1Container.appendChild(checkBoxLabel);

  createPlayer1Grid();
}

const createPlayer2Grid = () => {
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('player2');
  gridContainer.classList.add('grid-container');

  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      const btn = document.createElement('button');
      btn.classList.add('cell');
      btn.addEventListener('click', () => {
        if (!GameBoard.gameStatus()) { // no winner yet
          GameBoard.receiveAttack(i, j, Player.ONE);
          if (GameBoard.gameStatus() === 1) {
            updateBoard();
            putWinner(Player.ONE);
          } else {
            player2Attacks();
            updateBoard();
            if (GameBoard.gameStatus() === 2) {
              putWinner(Player.TWO);
            }
          }
        }
      });
      gridContainer.appendChild(btn);
    }
  }
  document.querySelector('.player2-container').appendChild(gridContainer);
}

const createPlayer2Container = () => {
  const player1Container = document.createElement('div');
  player1Container.classList.add('player2-container');
  document.querySelector('.game-container')
    .appendChild(player1Container);

  createPlayer2Grid();
}

const createGameContainer = () => {
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  document.querySelector('#page').appendChild(gameContainer);
  createPlayer1Container();
}

const createPlayButton = () => {
  const button = document.createElement('button');
  button.innerHTML = 'PLAY';
  button.classList.add('play-btn');
  button.addEventListener('click', () => {
    if (GameBoard.nextShipLengthToSet(Player.ONE) === -1) {
      player2SetShips();
      const checkBox = document.querySelector('#is-row');
      const checkBoxLabel = document.querySelector('.check-box-label');
      checkBox.classList.add('hide');
      checkBoxLabel.classList.add('hide');
      button.classList.add('hide');
      createPlayer2Container();
    }
  })
  document.querySelector('#page').appendChild(button);
}

const createGameHeader = () => {
  const header = document.createElement('h1');
  header.innerHTML = 'BATTLESHIPS';
  document.querySelector('#page').appendChild(header);
}

const inti = () => {
  GameBoard.init();
  createGameHeader();
  createGameContainer();
  createPlayButton();
}

const updateBoard = () => {
  const grid1 = document.querySelector('.player1.grid-container');
  for (let i = 0, k = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      if (GameBoard.isAttackedBy(i, j, Player.TWO)) {
        if (GameBoard.isThereShip(i, j, Player.ONE)) {
          grid1.children[k].classList.add('good-attack');
          if (GameBoard.isSunk(i, j, Player.ONE)) {
            grid1.children[k].innerHTML = 'Sunk';
          } else {
            grid1.children[k].innerHTML = 'on fire';
          }
        } else {
          grid1.children[k].innerHTML = 'on fire';
        }
      }
      ++k;
    }
  }
  const grid2 = document.querySelector('.player2.grid-container');
  for (let i = 0, k = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      if (GameBoard.isAttackedBy(i, j, Player.ONE)) {
        if (GameBoard.isThereShip(i, j, Player.TWO)) {
          grid2.children[k].classList.add('good-attack');
          if (GameBoard.isSunk(i, j, Player.TWO)) {
            grid2.children[k].innerHTML = 'Sunk';
          } else {
            grid2.children[k].innerHTML = 'on fire';
          }
        } else {
          grid2.children[k].innerHTML = 'on fire';
        }
      }
      ++k;
    }
  }
}

export default inti;