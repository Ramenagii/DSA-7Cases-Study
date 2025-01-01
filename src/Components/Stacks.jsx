import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handlePush = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }

    if (stack.includes(input)) {
      setError("Plate number must be unique.");
      return;
    }

    if (stack.length >= 10) {
      setError("Stack is full. Cannot add more cars.");
      return;
    }

    setStack([...stack, input]);
    setInput("");
    setError("");
  };

  const handlePop = () => {
    if (!input) {
      setError("Enter a plate number to pop.");
      return;
    }

    if (stack.length === 0) {
      setError("Stack is empty. Cannot remove cars.");
      return;
    }

    if (stack[stack.length - 1] !== input) {
      setError("Can only remove the car at the top of the stack.");
      return;
    }

    setStack((prevStack) => prevStack.slice(0, -1));
    setInput("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Stack Simulation</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-md border border-black text-black"
          placeholder="Enter car plate number"
        />
        <motion.button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-green-400 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePush}
        >
          Push
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePop}
        >
          Pop
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col-reverse gap-2">
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={item}
              className="w-40 h-10 flex items-center justify-center border-2 border-gray-800 bg-white text-gray-800 rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
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

export default Stacks;
