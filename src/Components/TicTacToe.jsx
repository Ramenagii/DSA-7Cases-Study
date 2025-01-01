import React, { useState } from "react";
import { motion } from "framer-motion";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [winningCombination, setWinningCombination] = useState(null);

  // Audio files
  const clickSound = new Audio('sounds/drawing.mp3');
  const resetSound = new Audio('sounds/erasure.mp3');
  const winSound = new Audio('sounds/win.mp3');
  const drawSound = new Audio('sounds/draw.mp3');

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);

    // Play click sound
    clickSound.play();
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setWinningCombination(combination); // Set the winning combination
        winSound.play(); // Play win sound
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("Tie");
      drawSound.play(); // Play draw sound if it's a tie
    }
  };

  const resetGame = () => {
    setResetting(true); // Start reset animation
    resetSound.play();

    // Wait for the animation to finish before resetting the board
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
      setWinningCombination(null); // Clear the winning combination
      setResetting(false); // End reset animation
    }, 500); // Match the duration of the animation (0.5s)
  };

  const renderSquare = (index) => (
    <motion.button
      className="w-20 h-20 border-4 border-black text-2xl font-bold flex items-center justify-center cursor-pointer"
      style={{
        fontFamily: 'Puppet Snowman, cursive',
        background: winningCombination && winningCombination.includes(index)
          ? 'green' // Green background for winning squares
          : 'linear-gradient(135deg, #ffe4e1 25%, #fffaf0 100%)', // Default background
        boxShadow: "4px 4px 0px #000",
        borderRadius: "8px",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClick(index)}
    >
      {/* Animate the drawing of X and O */}
      {board[index] && !resetting && (
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {board[index]}
        </motion.span>
      )}
      {/* Animate erasure of X and O during reset */}
      {resetting && board[index] && (
        <motion.span
          initial={{ width: "100%" }}
          animate={{ width: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {board[index]}
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-white text-black"
      style={{ fontFamily: 'Puppet Snowman, cursive', position: 'relative' }} // Make sure the board has relative positioning
    >
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <p className="mb-4" style={{ textShadow: "0px 0px 1px #000" }}>
        {winner
          ? winner === "Tie"
            ? "It's a tie!"
            : `Winner: ${winner}`
          : `Next player: ${isXNext ? "X" : "O"}`}
      </p>
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, row) => (
          <div key={row} className="flex gap-2">
            {[...Array(3)].map((_, col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <motion.button
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetGame}
        style={{
          fontFamily: 'Puppet Snowman, cursive',
          boxShadow: "4px 4px 0px #000",
        }}
      >
        Reset Game
      </motion.button>
    </div>
  );
};

export default TicTacToe;
