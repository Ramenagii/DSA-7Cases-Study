import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowBack } from "react-icons/io"; // Only import back arrow
import Sidebar from "../components/sidebar";

const QueueGarage = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRandomColor = () => {
    const colors = [
      "bg-red-500", "bg-green-500", "bg-blue-500",
      "bg-yellow-500", "bg-pink-500", "bg-purple-500",
      "bg-indigo-500", "bg-teal-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddCar = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }

    if (queue.find((car) => car.plate === input)) {
      setError("Plate number must be unique.");
      return;
    }

    if (queue.length >= 10) {
      setError("Garage is full. Cannot add more cars.");
      return;
    }

    setCounts((prev) => ({
      ...prev,
      [input]: { arrival: (prev[input]?.arrival || 0) + 1, departure: prev[input]?.departure || 0 }
    }));

    setQueue([...queue, { plate: input, color: getRandomColor() }]);
    setInput("");
    setError("");
  };

  const handleRemoveCar = () => {
    if (!input) {
      setError("Enter a plate number to remove.");
      return;
    }

    if (queue.length === 0) {
      setError("Garage is empty. Cannot remove cars.");
      return;
    }

    const index = queue.findIndex((car) => car.plate === input);

    if (index === -1) {
      setError("Plate number not found in the garage.");
      return;
    }

    const carsToRemove = queue.slice(0, index + 1); // Remove all cars up front as well
    const remainingCars = queue.slice(index + 1);

    // Update departure counts for all cars in the front
    carsToRemove.forEach((car) => {
      setCounts((prev) => ({
        ...prev,
        [car.plate]: {
          arrival: prev[car.plate]?.arrival || 0,
          departure: (prev[car.plate]?.departure || 0) + 1
        }
      }));
    });

    setQueue(remainingCars);
    setInput("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <Sidebar />
      <h1 className="text-3xl font-bold mb-4">Queue Garage (FIFO)</h1>
      <p className="text-gray-700 mb-6 text-center">
        A queue garage follows the FIFO (First In, First Out) principle. Cars can
        only be added to the back and removed from the front of the queue.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-500 text-black"
          placeholder="Enter Plate Number"
        />
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddCar}
        >
          Add Car
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemoveCar}
        >
          Remove Car
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="relative w-auto">
        <div className="grid grid-cols-10 gap-2 p-4 border-dashed border-t-2 border-b-2 border-gray-800 rounded-lg bg-gray-200">
          {/* Entrance Indicator */}
          <motion.div className="absolute left-0 top-2">
            <IoMdArrowBack className="text-blue-500 text-3xl" />
          </motion.div>

          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="w-20 h-10 border border-gray-400 rounded-md flex items-center justify-center"
            >
              <AnimatePresence>
                {queue[i] && (
                  <motion.div
                    key={queue[i].plate}
                    initial={{ x: 50, opacity: 0 }} // Start from right
                    animate={{ x: 0, opacity: 1 }} // Animate to the position
                    exit={{ x: -50, opacity: 0 }} // Exit to the left
                    transition={{ duration: 0.5 }}
                    className={`relative w-full h-full flex items-center justify-center rounded-md text-white font-bold ${queue[i].color}`}
                  >
                    <FaCar className="mr-2" /> {queue[i].plate}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 p-4 border border-gray-800 rounded-lg shadow-lg bg-white text-black">
        <button
          className="text-lg font-bold mb-2 flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <GiHamburgerMenu className="mr-2" /> CCTV Log
        </button>
        {isMenuOpen && (
          <ul className="text-sm">
            {Object.entries(counts).map(([plate, count]) => (
              <li key={plate}>
                {plate}: Arrivals {count.arrival}, Departures {count.departure}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QueueGarage;
