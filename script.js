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

const playGame = () => {
  const playerOne = PlayerFactory("X");
  const playerTwo = PlayerFactory("O");
  let currentPlayer = playerOne;

  GameBoard.init();
  GameBoard.gameBlocks.forEach((block) =>
    block.addEventListener("click", (e) => {
      const targettedBlock = e.target.id;
      GameBoard.placeMarker(currentPlayer.marker, targettedBlock);
      // toggle player turns
      currentPlayer === playerOne
        ? (currentPlayer = playerTwo)
        : (currentPlayer = playerOne);
    })
  );
};

playGame();
