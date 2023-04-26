import Ship from '../src/ship.js';

test('not sunk at the beginning', () => { 
  let ship = new Ship(1);
  expect(ship.isSunk()).toBe(false);
});

test('sunk', () => { 
  let ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
