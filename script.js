"use strict";
const GameBoard = (function () {
  const gameState = ["", "", "", "", "", "", "", "", ""];
  const gameBlocks = document.querySelectorAll(".game-container div");

  const updateBoardDisplay = function () {
    gameBlocks.forEach((block, i) => (block.textContent = `${gameState[i]}`));
  };
  const placeMarker = function (marker, blockId) {
    gameState[blockId] = marker;
    updateBoardDisplay();
  };

  const init = function () {
    gameState.forEach((val, i) => (gameState[i] = "")); //
    updateBoardDisplay();
  };

  return { gameBlocks, placeMarker, updateBoardDisplay, init };
})();

const PlayerFactory = (marker) => {
  return { marker };
};
