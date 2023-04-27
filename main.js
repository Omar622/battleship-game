/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player2.js */ \"./src/player2.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\n\n\nconst Player = {\n  ONE: 0,\n  TWO: 1\n};\n\nfunction Cell() {\n  let isAttacked = [0, 0];\n  let isThereShip = 0;\n  let whichPlayer = 0;\n  let whichShipIndex = 0;\n  return {\n    isAttacked, isThereShip, whichPlayer, whichShipIndex\n  };\n}\n\nconst GameBoard = (function () { // by default 10x10\n  const DIMENSION = 10;\n\n  let toSetShipIndex = [];\n  const ships = [];\n  const board = [];\n\n  const init = () => {\n    toSetShipIndex[Player.ONE] = 0;\n    toSetShipIndex[Player.TWO] = 0;\n    ships[Player.ONE] = [new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](5), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3)\n      , new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2)];\n    ships[Player.TWO] = [new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](5), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3)\n      , new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3), new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2)];\n\n    for (let i = 0; i < DIMENSION; ++i) {\n      board[i] = [];\n      for (let j = 0; j < DIMENSION; ++j) {\n        board[i][j] = new Cell();\n      }\n    }\n  }\n\n  const isValidCord = (x) => x >= 0 && x < DIMENSION;\n\n  const isValidShipPlace = (i, j, len, isRow, player) => {\n    if (isRow) {\n      if (!isValidCord(i) || !isValidCord(j) || !isValidCord(j + len - 1))\n        return false;\n\n      for (let k = j; k < j + len; ++k) {\n        if (board[i][k].isThereShip)\n          return false;\n      }\n\n      if (isValidCord(j - 1) && board[i][j - 1].isThereShip\n        && board[i][j - 1].whichPlayer == player)\n        return false;\n      if (isValidCord(j + len) && board[i][j + len].isThereShip\n        && board[i][j + len].whichPlayer == player)\n        return false;\n\n      if (isValidCord(i - 1)) {\n        for (let k = j; k < j + len; ++k) {\n          if (board[i - 1][k].isThereShip\n            && board[i - 1][k].whichPlayer == player)\n            return false;\n        }\n      }\n      if (isValidCord(i + 1)) {\n        for (let k = j; k < j + len; ++k) {\n          if (board[i + 1][k].isThereShip\n            && board[i + 1][k].whichPlayer == player)\n            return false;\n        }\n      }\n    } else {\n      if (!isValidCord(i) || !isValidCord(j) || !isValidCord(i + len - 1))\n        return false;\n\n      for (let k = i; k < i + len; ++k) {\n        if (board[k][j].isThereShip)\n          return false;\n      }\n\n      if (isValidCord(i - 1) && board[i - 1][j].isThereShip\n        && board[i - 1][j].whichPlayer == player)\n        return false;\n      if (isValidCord(i + len) && board[i + len][j].isThereShip\n        && board[i + len][j].whichPlayer == player)\n        return false;\n\n      if (isValidCord(j - 1)) {\n        for (let k = i; k < i + len; ++k) {\n          if (board[k][j - 1].isThereShip\n            && board[k][j - 1].whichPlayer == player)\n            return false;\n        }\n      }\n      if (isValidCord(j + 1)) {\n        for (let k = i; k < i + len; ++k) {\n          if (board[k][j + 1].isThereShip\n            && board[k][j + 1].whichPlayer == player)\n            return false;\n        }\n      }\n    }\n    return true;\n  }\n\n  const nextShipLengthToSet = (player) => {\n    if (toSetShipIndex[player] > 4)\n      return -1;\n    return ships[player][toSetShipIndex[player]].length;\n  }\n\n  const setShip = (i, j, isRow, player) => {\n    if (toSetShipIndex[player] > 4)\n      return false;\n\n    const length = nextShipLengthToSet(player);\n    if (!isValidShipPlace(i, j, length, isRow, player))\n      return false;\n\n    if (isRow) {\n      for (let k = j; k < j + length; ++k) {\n        board[i][k].isThereShip = 1;\n        board[i][k].whichPlayer = player;\n        board[i][k].whichShipIndex = toSetShipIndex[player];\n      }\n    } else {\n      for (let k = i; k < i + length; ++k) {\n        board[k][j].isThereShip = 1;\n        board[k][j].whichPlayer = player;\n        board[k][j].whichShipIndex = toSetShipIndex[player];\n      }\n    }\n    ++toSetShipIndex[player];\n    return true;\n  }\n\n  const receiveAttack = (i, j, player) => {\n    if (board[i][j].isAttacked[player])\n      return false;\n\n    board[i][j].isAttacked[player] = 1;\n    if (board[i][j].isThereShip && board[i][j].whichPlayer !== player) {\n      ships[1 - player][board[i][j].whichShipIndex].hit();\n      return true;\n    }\n    return false;\n  }\n\n  const gameStatus = () => {\n    let isWinner = [true, true];\n    for (let i = 0; i < 5; ++i) {\n      if (!ships[Player.ONE][i].isSunk()) {\n        isWinner[Player.TWO] = false;\n        break;\n      }\n    }\n    for (let i = 0; i < 5; ++i) {\n      if (!ships[Player.TWO][i].isSunk()) {\n        isWinner[Player.ONE] = false;\n        break;\n      }\n    }\n    if (!isWinner[Player.ONE] && !isWinner[Player.TWO])\n      return 0;\n    if (isWinner[Player.ONE])\n      return 1;\n    if (isWinner[Player.TWO])\n      return 2;\n  }\n\n  const isAttackedBy = (i, j, player) => {\n    if (!isValidCord(i) || !isValidCord(j)) return false;\n    return board[i][j].isAttacked[player];\n  }\n\n  const isThereShip = (i, j, player) => {\n    return board[i][j].isThereShip && board[i][j].whichPlayer == player;\n  }\n\n  const isSunk = (i, j, player) => {\n    return ships[player][board[i][j].whichShipIndex].isSunk();\n  }\n\n  return {\n    init, setShip, isValidShipPlace, nextShipLengthToSet\n    , receiveAttack, isAttackedBy, isThereShip, isSunk, gameStatus\n  }\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship-game/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.js */ \"./src/interface.js\");\n\n\n(0,_interface_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack://battleship-game/./src/index.js?");

/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _player2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player2.js */ \"./src/player2.js\");\n\n\n\n\nconst putWinner = (player) => {\n  const header = document.createElement('h1');\n  header.innerHTML = (player === _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)\n    ? 'You\\'re WINNER' : 'Computer is WINNER';\n  document.querySelector('#page').appendChild(header);\n}\n\nconst addHoverEffect = (i, j) => {\n  const grid = document.querySelector('.player1.grid-container');\n  const btn = grid.children[(i * 10) + j];\n  btn.addEventListener('mouseover', () => {\n    let length = _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nextShipLengthToSet(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE);\n    if (length !== -1) {\n      let isRow = document.querySelector('#is-row').checked;\n      if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidShipPlace(i, j, length, isRow, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)) {\n        if (isRow) {\n          for (let k = j; k < j + length; ++k) {\n            const btnToHover = grid.children[(i * 10) + k];\n            btnToHover.classList.add('hover');\n          }\n        } else {\n          for (let k = i; k < i + length; ++k) {\n            const btnToHover = grid.children[(k * 10) + j];\n            btnToHover.classList.add('hover');\n          }\n        }\n      }\n    }\n  });\n  btn.addEventListener('mouseout', () => {\n\n    let length = _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nextShipLengthToSet(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE);\n    if (length !== -1) {\n      let isRow = document.querySelector('#is-row').checked;\n      if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isValidShipPlace(i, j, length, isRow, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)) {\n        if (isRow) {\n          for (let k = j; k < j + length; ++k) {\n            const btnToHover = grid.children[(i * 10) + k];\n            btnToHover.classList.remove('hover');\n          }\n        } else {\n          for (let k = i; k < i + length; ++k) {\n            const btnToHover = grid.children[(k * 10) + j];\n            btnToHover.classList.remove('hover');\n          }\n        }\n      }\n    }\n  });\n}\n\nconst createPlayer1Grid = () => {\n  const gridContainer = document.createElement('div');\n  gridContainer.classList.add('player1');\n  gridContainer.classList.add('grid-container');\n  document.querySelector('.player1-container').appendChild(gridContainer);\n\n  for (let i = 0; i < 10; ++i) {\n    for (let j = 0; j < 10; ++j) {\n      const btn = document.createElement('button');\n      btn.classList.add('cell');\n      btn.addEventListener('click', () => {\n        const isRow = document.querySelector('#is-row').checked;\n        _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setShip(i, j, isRow, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE);\n      });\n      gridContainer.appendChild(btn);\n    }\n  }\n  for (let i = 0; i < 10; ++i) {\n    for (let j = 0; j < 10; ++j) {\n      addHoverEffect(i, j);\n    }\n  }\n}\n\nconst createPlayer1Container = () => {\n  const player1Container = document.createElement('div');\n  player1Container.classList.add('player1-container');\n  document.querySelector('.game-container')\n    .appendChild(player1Container);\n\n  const checkBox = document.createElement('input');\n  checkBox.setAttribute('type', 'checkbox');\n  checkBox.setAttribute('name', 'checkbox');\n  checkBox.setAttribute('id', 'is-row');\n  player1Container.appendChild(checkBox);\n\n  const checkBoxLabel = document.createElement('label');\n  checkBoxLabel.classList.add('check-box-label');\n  checkBoxLabel.setAttribute('for', 'is-row');\n  checkBoxLabel.innerHTML = 'Row';\n  player1Container.appendChild(checkBoxLabel);\n\n  createPlayer1Grid();\n}\n\nconst createPlayer2Grid = () => {\n  const gridContainer = document.createElement('div');\n  gridContainer.classList.add('player2');\n  gridContainer.classList.add('grid-container');\n\n  for (let i = 0; i < 10; ++i) {\n    for (let j = 0; j < 10; ++j) {\n      const btn = document.createElement('button');\n      btn.classList.add('cell');\n      btn.addEventListener('click', () => {\n        if (!_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameStatus()) { // no winner yet\n          _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE);\n          if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameStatus() === 1) {\n            updateBoard();\n            putWinner(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE);\n          } else {\n            (0,_player2_js__WEBPACK_IMPORTED_MODULE_1__.player2Attacks)();\n            updateBoard();\n            if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameStatus() === 2) {\n              putWinner(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO);\n            }\n          }\n        }\n      });\n      gridContainer.appendChild(btn);\n    }\n  }\n  document.querySelector('.player2-container').appendChild(gridContainer);\n}\n\nconst createPlayer2Container = () => {\n  const player1Container = document.createElement('div');\n  player1Container.classList.add('player2-container');\n  document.querySelector('.game-container')\n    .appendChild(player1Container);\n\n  createPlayer2Grid();\n}\n\nconst createGameContainer = () => {\n  const gameContainer = document.createElement('div');\n  gameContainer.classList.add('game-container');\n  document.querySelector('#page').appendChild(gameContainer);\n  createPlayer1Container();\n}\n\nconst createPlayButton = () => {\n  const button = document.createElement('button');\n  button.innerHTML = 'PLAY';\n  button.classList.add('play-btn');\n  button.addEventListener('click', () => {\n    if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nextShipLengthToSet(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE) === -1) {\n      (0,_player2_js__WEBPACK_IMPORTED_MODULE_1__.player2SetShips)();\n      const checkBox = document.querySelector('#is-row');\n      const checkBoxLabel = document.querySelector('.check-box-label');\n      checkBox.classList.add('hide');\n      checkBoxLabel.classList.add('hide');\n      button.classList.add('hide');\n      createPlayer2Container();\n    }\n  })\n  document.querySelector('#page').appendChild(button);\n}\n\nconst createGameHeader = () => {\n  const header = document.createElement('h1');\n  header.innerHTML = 'BATTLESHIPS';\n  document.querySelector('#page').appendChild(header);\n}\n\nconst inti = () => {\n  _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n  createGameHeader();\n  createGameContainer();\n  createPlayButton();\n}\n\nconst updateBoard = () => {\n  const grid1 = document.querySelector('.player1.grid-container');\n  for (let i = 0, k = 0; i < 10; ++i) {\n    for (let j = 0; j < 10; ++j) {\n      if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isAttackedBy(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO)) {\n        if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isThereShip(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)) {\n          grid1.children[k].classList.add('good-attack');\n          if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isSunk(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)) {\n            grid1.children[k].innerHTML = 'Sunk';\n          } else {\n            grid1.children[k].innerHTML = 'on fire';\n          }\n        } else {\n          grid1.children[k].innerHTML = 'on fire';\n        }\n      }\n      ++k;\n    }\n  }\n  const grid2 = document.querySelector('.player2.grid-container');\n  for (let i = 0, k = 0; i < 10; ++i) {\n    for (let j = 0; j < 10; ++j) {\n      if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isAttackedBy(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.ONE)) {\n        if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isThereShip(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO)) {\n          grid2.children[k].classList.add('good-attack');\n          if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isSunk(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO)) {\n            grid2.children[k].innerHTML = 'Sunk';\n          } else {\n            grid2.children[k].innerHTML = 'on fire';\n          }\n        } else {\n          grid2.children[k].innerHTML = 'on fire';\n        }\n      }\n      ++k;\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inti);\n\n//# sourceURL=webpack://battleship-game/./src/interface.js?");

/***/ }),

/***/ "./src/player2.js":
/*!************************!*\
  !*** ./src/player2.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"player2Attacks\": () => (/* binding */ player2Attacks),\n/* harmony export */   \"player2SetShips\": () => (/* binding */ player2SetShips)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\n\n\nconst getRandomCord = () => Math.floor(Math.random() * 10);\n\nconst player2SetShips = () => {\n  for (let k = 0; k < 5;) {\n    let i = getRandomCord();\n    let j = getRandomCord();\n    let isRow = Math.floor(Math.random() * 2);\n    if (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setShip(i, j, !!isRow, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO)) {\n      ++k;\n    }\n  }\n}\n\nconst player2Attacks = () => {\n  let i = getRandomCord();\n  let j = getRandomCord();\n  while (_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isAttackedBy(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO)) {\n    i = getRandomCord();\n    j = getRandomCord();\n  }\n  _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].receiveAttack(i, j, _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Player.TWO);\n}\n\n//# sourceURL=webpack://battleship-game/./src/player2.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(len) {\n  let length = len;\n  let numberOfHit = 0;\n\n  const hit = () => numberOfHit++;\n  const isSunk = () => numberOfHit >= length;\n\n  return {\n    length,\n    hit,\n    isSunk\n  };\n}\n\n//# sourceURL=webpack://battleship-game/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;