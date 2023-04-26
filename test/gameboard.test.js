import GameBoard from '../src/gameboard.js';

test('nextShipLengthToSet - simple', () => {
  GameBoard.init();
  expect(GameBoard.nextShipLengthToSet(0)).toBe(5);
  expect(GameBoard.nextShipLengthToSet(1)).toBe(5);
});

test('setShip - simple player1', () => {
  GameBoard.init();
  expect(GameBoard.setShip(0, 8, 1, 0)).toBe(false);
  expect(GameBoard.setShip(0, 0, 1, 0)).toBe(true);
  expect(GameBoard.setShip(0, 5, 1, 0)).toBe(false);
  expect(GameBoard.setShip(1, 4, 1, 0)).toBe(false);
  expect(GameBoard.nextShipLengthToSet(0)).toBe(4);
  expect(GameBoard.setShip(1, 4, 1, 0)).toBe(false);
  expect(GameBoard.setShip(1, 5, 1, 0)).toBe(true);
});

test('setShip - simple player2', () => {
  GameBoard.init();
  expect(GameBoard.setShip(8, 0, 0, 1)).toBe(false);
  expect(GameBoard.setShip(0, 0, 0, 1)).toBe(true);
  expect(GameBoard.setShip(5, 0, 0, 1)).toBe(false);
  expect(GameBoard.setShip(4, 0, 0, 1)).toBe(false);
  expect(GameBoard.nextShipLengthToSet(1)).toBe(4);
  expect(GameBoard.setShip(4, 1, 0, 1)).toBe(false);
  expect(GameBoard.setShip(5, 1, 0, 1)).toBe(true);
});

test('setShip - intersection', () => {
  GameBoard.init();
  expect(GameBoard.setShip(0, 0, 1, 0)).toBe(true);
  expect(GameBoard.setShip(0, 4, 1, 0)).toBe(false);
  expect(GameBoard.setShip(1, 0, 1, 1)).toBe(true);
  expect(GameBoard.setShip(1, 4, 1, 1)).toBe(false);
});