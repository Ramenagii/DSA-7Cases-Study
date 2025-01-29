import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../Components/sidebar";
import "../Styles/GarageStack.css";

const GarageStack = () => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [cctvLog, setCctvLog] = useState({});
  const [logIndex, setLogIndex] = useState(1);

  const carTypes = {
    helicopter: "/src/assets/images/flying-vehicles/helicopter1.png",  // Replace with the correct car image URL
    jet: "/src/assets/images/flying-vehicles/jet1.png",    // Replace with the correct car image URL
    ufo: "/src/assets/images/flying-vehicles/ufo1.png",  // Replace with the correct car image URL
  };

  const getRandomCarType = () => {
    const types = Object.keys(carTypes);
    return types[Math.floor(Math.random() * types.length)];
  };
  
  const carType = getRandomCarType();

  const handleAddCar = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }
    if (stack.some((car) => car.plate === input)) {
      setError("Vehicle already exists in the garage.");
      return;
    }
    if (stack.length >= 10) {
      setError("Garage is full.");
      return;
    }
    setStack([...stack, { plate: input, type: carType, image: carTypes[carType] }]);
    setCctvLog((prev) => ({
      ...prev,
      [input]: {
        arrival: (prev[input]?.arrival || 0) + 1,
        departure: prev[input]?.departure || 0,
      },
    }));
    setLogIndex(logIndex + 1);
    setInput("");
    setError("");
  };

  const handleRemoveCar = () => {
    if (!input) {
      setError("Enter a plate number to remove.");
      return;
    }
    const carIndex = stack.findIndex(car => car.plate === input);
    if (carIndex === -1) {
      setError("Car not found in the garage.");
      return;
    }
    setRemoving(true);
    removeCarsWithDelay(carIndex);
  };

  const removeCarsWithDelay = (index) => {
    let tempStack = [...stack];
    let removedCars = tempStack.splice(index + 1); // Get cars that are removed temporarily
    const removedCar = tempStack.pop(); // Remove the last car from the stack (which is the car to be removed)

    // Update departure count for all displaced cars
    setCctvLog((prev) => {
      let updatedLog = { ...prev };

      // Increment departure count for all cars temporarily displaced (above the removed car)
      for (let i = index + 1; i < stack.length; i++) {
        const displacedCar = stack[i];
        updatedLog[displacedCar.plate] = {
          ...updatedLog[displacedCar.plate],
          departure: (updatedLog[displacedCar.plate]?.departure || 0) + 1,
        };
      }

      // Increment departure for the removed car
      updatedLog[removedCar.plate] = {
        ...updatedLog[removedCar.plate],
        departure: (updatedLog[removedCar.plate]?.departure || 0) + 1,
      };

      return updatedLog;
    });

    // Update the stack after removing the car
    setStack([...tempStack]);
    setLogIndex(logIndex + 1);

    setTimeout(() => {
      restoreCars(removedCars); // Restore removed cars after delay
      setRemoving(false);
    }, 1000);
  };

  const restoreCars = (removedCars) => {
    if (removedCars.length === 0) return;
    const carToReturn = removedCars.shift();
    setStack(prev => [...prev, carToReturn]);

    setCctvLog((prev) => {
      let updatedLog = { ...prev };
      updatedLog[carToReturn.plate] = {
        arrival: (updatedLog[carToReturn.plate]?.arrival || 0) + 1,
        departure: updatedLog[carToReturn.plate]?.departure || 0,
      };
      return updatedLog;
    });

    setLogIndex(logIndex + 1);

    setTimeout(() => restoreCars(removedCars), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black pt-10">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-4">Vertical Stack Garage</h1>
      <p className="text-gray-600 mb-6 text-center">
        A garage where cars are stacked vertically following LIFO (Last In, First Out).
      </p>
      
      <div className="flex gap-2 mb-6 p-4 rounded-md bg-white shadow-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 text-black"
          placeholder="Enter Plate Number"
        />
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddCar}
        >
          Add Car
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRemoveCar}
          disabled={removing}
        >
          Remove Car
        </motion.button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="garage-container">
        <div className="garage-column">
          <AnimatePresence>
            {stack.map((car, i) => (
              <motion.div
                key={car.plate}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="garage-slot"
              >
                <div className="car">
                <img src={car.image} alt="Car" className="car-image" />
                  <p>{car.plate}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 p-4 border border-gray-200 rounded-lg shadow-md bg-white text-black">
        <button
          className="text-lg font-semibold mb-2 flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <GiHamburgerMenu className="mr-2" /> CCTV Log
        </button>
        {isMenuOpen && (
          <ul className="text-sm">
            {Object.entries(cctvLog).map(([plate, log], index) => (
              <li key={index}>{plate} - Arrival: {log.arrival} Departure: {log.departure}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GarageStack;