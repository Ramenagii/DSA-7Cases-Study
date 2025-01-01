import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleEnqueue = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }

    if (queue.includes(input)) {
      setError("Plate number must be unique.");
      return;
    }

    if (queue.length >= 10) {
      setError("Queue is full. Cannot add more cars.");
      return;
    }

    setQueue([...queue, input]);
    setInput("");
    setError("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setError("Queue is empty. Cannot remove cars.");
      return;
    }

    setQueue((prevQueue) => prevQueue.slice(1));
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Queue Simulation</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
          placeholder="Enter car plate number"
        />
        <motion.button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-green-600 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEnqueue}
        >
          Enqueue
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-800 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDequeue}
        >
          Dequeue
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {queue.map((item) => (
            <motion.div
              key={item}
              className="w-40 h-10 flex items-center justify-center border-2 border-gray-800 bg-white text-gray-800 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <FaCar className="mr-2" /> {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Queue;
