import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/tictactoe.css";

const XSymbol = ({ initialAnimation = true }) => (
  <motion.svg
    className="h-1/2"
    viewBox="0 0 260 296"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={initialAnimation ? { opacity: 1, strokeDashoffset: 0 } : { opacity: 1 }}
    animate={{ opacity: 1, strokeDashoffset: 0 }}
    exit={{ opacity: 1, strokeDashoffset: 300 }}
    transition={{ duration: 0.5 }}
  >
    <path
      id="secondStroke"
      d="M210.563 55C204.552 77.5414 176.905 95.1374 162.755 112.067C147.7 130.079 135.103 149.963 119.955 167.905C107.7 182.421 93.7333 195.383 81.3126 209.76C74.0979 218.111 68.1716 227.164 61.6605 236.026C59.1502 239.443 55.5708 242.19 54.102 246.23C53.0157 249.217 50.1975 248.181 49 250.576"
      stroke="black"
      strokeWidth="30"
      strokeLinecap="round"
      className="path"
      strokeDasharray="300"
      strokeDashoffset="0"
    />
    <path
      id="firstStroke"
      d="M49.3853 55.4278C55.3963 77.9692 83.043 95.5652 97.1928 112.494C112.248 130.507 124.845 150.391 139.993 168.333C152.248 182.849 166.215 195.811 178.636 210.188C185.85 218.539 191.776 227.591 198.288 236.454C200.798 239.87 204.377 242.618 205.846 246.658C206.932 249.645 209.751 248.609 210.948 251.004"
      stroke="black"
      strokeWidth="30"
      strokeLinecap="round"
      className="path path-second"
      strokeDasharray="300"
      strokeDashoffset="0"
    />
  </motion.svg>
);

const OSymbol = ({ initialAnimation = true }) => (
  <motion.svg
    className="h-1/2 w-1/2"
    viewBox="0 0 260 296"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={initialAnimation ? { opacity: 1, strokeDashoffset: 0 } : { opacity: 1 }}
    animate={{ opacity: 1, strokeDashoffset: 0 }}
    exit={{ opacity: 1, strokeDashoffset: 300 }}
    transition={{ duration: 0.5 }}
  >
    <path
      id="O"
      d="M224.331 166.333C236.089 133.349 240.458 95.0015 207.234 77.933C176.04 61.9069 137.83 44.5462 102.339 48.5951C37.1301 56.0344 29.8195 147.685 53.0081 199.145C71.7667 240.774 114.67 244.128 152.382 242.766C221.402 240.272 227.537 160.625 227.537 103.797"
      stroke="black"
      strokeWidth="30"
      strokeLinecap="round"
      className="path"
      strokeDasharray="300"
      strokeDashoffset="0"
    />
  </motion.svg>
);

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);
  const [resetting, setResetting] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
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
        setWinningCombination(combination);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setResetting(true);

    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
      setWinningCombination(null);
      setResetting(false);
    }, 500);
  };

  const renderSquare = (index) => (
    <motion.button
      className="w-20 h-20 border-4 border-black flex items-center justify-center cursor-pointer"
      style={{
        background: winningCombination && winningCombination.includes(index)
          ? "green"
          : "linear-gradient(135deg, #ffe4e1 25%, #fffaf0 100%)",
        boxShadow: "4px 4px 0px #000",
        borderRadius: "8px",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleClick(index)}
    >
      {board[index] === "X" && !resetting && <XSymbol />}
      {board[index] === "O" && !resetting && <OSymbol />}
      {resetting && (
        <motion.div
          key={index}
          initial={{ opacity: 1, strokeDashoffset: 0 }}
          animate={{ opacity: 0, strokeDashoffset: 300 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {board[index] === "X" && <XSymbol initialAnimation={false} />}
          {board[index] === "O" && <OSymbol initialAnimation={false} />}
        </motion.div>
      )}
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <p className="mb-4">
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
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetGame}
      >
        Reset Game
      </motion.button>
    </div>
  );
};

export default TicTacToe;
