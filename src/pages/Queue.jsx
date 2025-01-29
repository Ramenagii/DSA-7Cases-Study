import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../Components/sidebar";
import "../Styles/GarageQueue.css";

const GarageQueue = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counts, setCounts] = useState({}); // Added counts state
  const [logIndex, setLogIndex] = useState(1);

  const carTypes = {
    sedan: "/src/assets/images/cars/car1.png",
    truck: "/src/assets/images/cars/car2.png",
    van: "/src/assets/images/cars/car3.png",
    broom: "/src/assets/images/cars/car4.png",
    vroom: "/src/assets/images/cars/car5.png",
    zoom: "/src/assets/images/cars/car6.png",
    taxi: "/src/assets/images/cars/car7.png",
    bus: "/src/assets/images/cars/car8.png",
    jeep: "/src/assets/images/cars/car9.png",
    bike: "/src/assets/images/cars/car10.png",  
    ambulance: "/src/assets/images/cars/car11.png",
  };

  const getRandomCarType = () => {
    const types = Object.keys(carTypes);
    return types[Math.floor(Math.random() * types.length)];
  };

  const handleAddCar = () => {
    if (!input) {
      setError("Plate number cannot be empty.");
      return;
    }
    if (queue.some((car) => car.plate === input)) {
      setError("Vehicle already exists in the garage.");
      return;
    }
    if (queue.length >= 10) {
      setError("Garage is full.");
      return;
    }
    const carType = getRandomCarType();
    setQueue([...queue, { plate: input, type: carType, image: carTypes[carType] }]);
    setCounts((prev) => ({
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

    if (queue.length === 0) {
      setError("Garage is empty. Cannot remove cars.");
      return;
    }

    const index = queue.findIndex((car) => car.plate === input);

    if (index === -1) {
      setError("Plate number not found in the garage.");
      return;
    }

    const carsToRemove = queue.slice(0, index + 1);
    const remainingCars = queue.slice(index + 1);
    const carsToReadd = carsToRemove.slice(0, -1); // Exclude the target car

    // Update departure counts for all carsToRemove
    carsToRemove.forEach((car) => {
      setCounts((prev) => ({
        ...prev,
        [car.plate]: {
          arrival: prev[car.plate]?.arrival || 0,
          departure: (prev[car.plate]?.departure || 0) + 1
        }
      }));
    });

    // Update arrival counts for carsToReadd
    carsToReadd.forEach((car) => {
      setCounts((prev) => ({
        ...prev,
        [car.plate]: {
          arrival: (prev[car.plate]?.arrival || 0) + 1,
          departure: prev[car.plate]?.departure || 0
        }
      }));
    });

    // Set the new queue to remaining cars plus re-added cars at the end
    setQueue([...remainingCars, ...carsToReadd]);
    setInput("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black pt-10">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-4">Horizontal Queue Garage</h1>
      <p className="text-gray-600 mb-6 text-center">
        A garage where cars are arranged horizontally following FIFO (First In, First Out).
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
        >
          Remove Car
        </motion.button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="garage-container flex flex-row items-center">
        <div className="garage-row flex flex-row gap-4">
          <AnimatePresence>
            {queue.map((car) => (
              <motion.div
                key={car.plate}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
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
        <button className="text-lg font-semibold mb-2 flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <GiHamburgerMenu className="mr-2" /> CCTV Log
        </button>
        {isMenuOpen && <ul className="text-sm">{Object.entries(counts).map(([plate, log]) => (<li key={plate}>{plate} - Arrival: {log.arrival} Departure: {log.departure}</li>))}</ul>}
      </div>
    </div>
  );
};

export default GarageQueue;
