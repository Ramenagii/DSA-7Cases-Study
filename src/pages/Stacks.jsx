import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/sidebar";
import "../Styles/GarageStack.css"; // Import futuristic styles

const GarageStack = () => {
  const [stack, setStack] = useState([]); // Stack of cars
  const [input, setInput] = useState(""); // Combined input for add/remove
  const [error, setError] = useState(""); // Error messages
  const [counts, setCounts] = useState({}); // Arrival/Departure counts
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle for CCTV Log

  // Generate random color for cars
  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle Add or Remove car
  const handleAddOrRemoveCar = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }

    const carIndex = stack.findIndex((car) => car.plate === input);

    if (carIndex === -1) {
      // Add car if it does not exist
      if (stack.length >= 10) {
        setError("Garage is full. Cannot add more cars.");
        return;
      }

      setCounts((prev) => ({
        ...prev,
        [input]: { arrival: (prev[input]?.arrival || 0) + 1, departure: prev[input]?.departure || 0 },
      }));

      setStack([...stack, { plate: input, color: getRandomColor(), image: "/src/assets/images/ufo/ufo1.png" }]);
      setError("");
    } else {
      // Remove car if it exists
      const removedCar = stack[carIndex];
      const carsToRepark = stack.slice(carIndex + 1); // Cars above the removed car
      const newStack = stack.slice(0, carIndex); // Cars below the removed car

      // Update departure count for the removed car
      setCounts((prev) => ({
        ...prev,
        [removedCar.plate]: {
          arrival: prev[removedCar.plate]?.arrival || 0,
          departure: (prev[removedCar.plate]?.departure || 0) + 1,
        },
      }));

      // Update departure and arrival counts for cars above
      carsToRepark.forEach((car) => {
        setCounts((prev) => ({
          ...prev,
          [car.plate]: {
            arrival: (prev[car.plate]?.arrival || 0) + 1, // Re-park (arrival)
            departure: (prev[car.plate]?.departure || 0) + 1, // Departure
          },
        }));
      });

      // Add the cars that were on top back to the stack
      setStack([...newStack, ...carsToRepark]);
      setError("");
    }

    setInput(""); // Clear input
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white pt-10">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-4 neon-text">🚗 Vertical Stack Garage</h1>
      <p className="text-gray-300 mb-6 text-center">
        A futuristic garage where cars stack vertically following strict LIFO (Last In, First Out).
      </p>

      {/* Combined Input and Button */}
      <div className="flex gap-2 mb-4 glassmorphism p-4 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-500 text-black"
          placeholder="Enter Plate Number to Add/Remove"
        />
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddOrRemoveCar}
        >
          Add/Remove Car
        </motion.button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Vertical Garage */}
      <div className="garage-container">
        <div className="garage-column">
          {stack.map((car, i) => (
            <motion.div key={i} className="garage-slot">
              <AnimatePresence>
                {car && (
                  <motion.div
                    key={car.plate}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`car ${car.color}`}
                  >
                    <img src={car.image} alt="Car" className="car-image" />
                    <p>{car.plate}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CCTV Log */}
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

export default GarageStack;
