"use strict";
const btnNewGame = document.querySelector("#btn-new-game");
const PlayerFactory = (marker) => {
  return { marker };
};

const GameBoard = (function () {
  const gameState = ["", "", "", "", "", "", "", "", ""];
  const gameBlocks = document.querySelectorAll(".game-container div");
  const playerOne = PlayerFactory("X");
  const playerTwo = PlayerFactory("O");
  let currentPlayer = playerOne;
  let isPlaying = false;

  const endGame = function (winningCombo) {
    isPlaying = false;
    winningCombo.forEach((block) =>
      gameBlocks[block].classList.add("winning-combo")
    );
  };

  const updateBoardDisplay = function () {
    gameBlocks.forEach((block, i) => (block.textContent = `${gameState[i]}`));
  };

  const checkWinner = function () {
    const winningCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];
    // check winning combination (in an array of indexes) relative to the gameState array and compare values to check for 3 in a row
    for (const combo of winningCombinations) {
      if (
        gameState[combo[0]] !== "" &&
        gameState[combo[0]] === gameState[combo[1]] &&
        gameState[combo[0]] === gameState[combo[2]]
      ) {
        // end game
        endGame(combo);
        return;
      }
      console.log(false);
    }
  };

  const placeMarker = function (marker, blockId) {
    if (gameState[blockId] !== "") return;
    gameState[blockId] = marker;
    updateBoardDisplay();
    checkWinner();
  };

  const init = function () {
    gameState.forEach((val, i) => (gameState[i] = "")); //
    updateBoardDisplay();
    isPlaying = true;

    gameBlocks.forEach((block) => block.classList.remove("winning-combo"));
    gameBlocks.forEach((block) =>
      block.addEventListener("click", (e) => {
        if (!isPlaying) return;
        const targettedBlock = e.target;
        // exit the function if a marker has already been placed
        if (targettedBlock.textContent !== "") return;

        placeMarker(currentPlayer.marker, targettedBlock.id);
        // toggle player turns
        currentPlayer === playerOne
          ? (currentPlayer = playerTwo)
          : (currentPlayer = playerOne);
      })
    );
  };
  init();
  return { init };
})();

btnNewGame.addEventListener("click", GameBoard.init);
// functions need to be in the same place
