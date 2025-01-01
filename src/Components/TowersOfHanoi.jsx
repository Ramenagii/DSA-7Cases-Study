import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TowerOfHanoi = () => {
  const [disks, setDisks] = useState(3);
  const [towers, setTowers] = useState([
    Array.from({ length: 3 }, (_, i) => 3 - i),
    [],
    [],
  ]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [exceededMoves, setExceededMoves] = useState(false);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [timer, setTimer] = useState(0); // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer running state

  const minMoves = Math.pow(2, disks) - 1;

  useEffect(() => {
    const isComplete = towers[2].length === disks;
    setIsSolved(isComplete);
    setExceededMoves(moves > minMoves);
  }, [towers, moves, disks]);

  // Timer effect
  useEffect(() => {
    let interval = null;

    if (isTimerRunning && !isSolved) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // Update timer every second
    } else {
      clearInterval(interval); // Stop the timer when it's solved or paused
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [isTimerRunning, timer, isSolved]);

  const resetGame = () => {
    setTowers([Array.from({ length: disks }, (_, i) => disks - i), [], []]);
    setMoves(0);
    setIsSolved(false);
    setExceededMoves(false);
    setTimer(0); // Reset the timer when the game is reset
    setIsTimerRunning(false); // Pause the timer when reset
  };

  const handleDragStart = (disk) => {
    setDraggedDisk(disk);
    if (!isTimerRunning && !isSolved) {
      setIsTimerRunning(true); // Start the timer when dragging starts
    }
  };

  const handleDrop = (to) => {
    if (draggedDisk === null || isSolved) return;

    const from = towers.findIndex((tower) => tower.includes(draggedDisk));

    if (
      from !== -1 &&
      (towers[to].length === 0 || towers[to][towers[to].length - 1] > draggedDisk)
    ) {
      const newTowers = towers.map((tower, index) => {
        if (index === from) {
          return tower.slice(0, -1);
        }
        if (index === to) {
          return [...tower, draggedDisk];
        }
        return tower;
      });
      setTowers(newTowers);
      setMoves(moves + 1);
    }
    setDraggedDisk(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Tower of Hanoi</h1>
      <div className="mb-4">
        <label className="mr-2">Number of Disks:</label>
        <input
          type="number"
          value={disks}
          min={3}
          max={5}
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setDisks(num);
            setTowers([Array.from({ length: num }, (_, i) => num - i), [], []]);
            setMoves(0);
            setIsSolved(false);
            setExceededMoves(false);
            setTimer(0); // Reset timer when number of disks is changed
            setIsTimerRunning(false); // Pause the timer when number of disks is changed
          }}
          className="px-4 py-2 rounded-md border border-black bg-white text-black"
        />
      </div>
      <div className="flex justify-center gap-60">
        {towers.map((tower, i) => (
          <div
            key={i}
            className="flex flex-col items-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
          >
            <div className="h-80 w-5 bg-amber-950 relative rounded-t-lg">
              <div className="w-5 h-5 bg-black absolute top-[300px]"></div>
              <AnimatePresence>
                {tower.map((disk, index) => (
                  <motion.div
                    key={disk}
                    className={`absolute rounded-lg border-2 border-black cursor-grab font-comic shadow-doodle transform rotate-[-2deg] ${draggedDisk === disk ? 'bg-transparent' : 'bg-white'}`}
                    draggable={index === tower.length - 1}
                    onDragStart={() => handleDragStart(disk)}
                    style={{
                      width: `${30 + disk * 15}px`,
                      height: "20px",
                      bottom: `${index * 22}px`,
                      left: `calc(50% - ${(30 + disk * 15) / 2}px)`,
                    }}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-700"
        >
          Reset
        </button>
      </div>
      <div className="flex items-center gap-6 mt-6">
        <p className={`text-black font-bold ${exceededMoves ? 'text-red-500' : ''}`}>
          Moves: {moves}
        </p>
        <p className="text-black font-bold">Time: {timer}s</p>
      </div>
      <AnimatePresence>
        {isSolved && (
          <motion.p
            className="mt-4 text-green-500 font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Congratulations! You solved it!
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {exceededMoves && !isSolved && (
          <motion.p
            className="mt-4 text-black font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Exceeded optimal moves!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TowerOfHanoi;
