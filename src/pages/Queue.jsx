import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowBack } from "react-icons/io";
import Sidebar from "../components/sidebar";

// Car image paths and types
const carTypes = {
  sedan: "/src/assets/images/Cars/car1.png",  // Replace with the correct car image URL
  suv: "/src/assets/images/Cars/car2.png",    // Replace with the correct car image URL
  truck: "/src/assets/images/Cars/car3.png",  // Replace with the correct car image URL
};

const QueueGarage = () => {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [counts, setCounts] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to get a random car type
  const getRandomCarType = () => {
    const types = Object.keys(carTypes); // ['sedan', 'suv', 'truck']
    return types[Math.floor(Math.random() * types.length)];
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

    // Assign a random car type and image
    const carType = getRandomCarType();

    setCounts((prev) => ({
      ...prev,
      [input]: { arrival: (prev[input]?.arrival || 0) + 1, departure: prev[input]?.departure || 0 }
    }));

    setQueue([...queue, { plate: input, type: carType, image: carTypes[carType] }]);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-white to-gray-100 text-black">
      <Sidebar />
      <h1 className="text-3xl font-bold mb-6">Queue Garage (FIFO)</h1>
      <p className="text-gray-600 mb-6 text-center">
        A queue garage follows the FIFO (First In, First Out) principle. Cars can
        only be added to the back and removed from the front of the queue.
      </p>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-400"
          placeholder="Enter Plate Number"
        />
        <motion.button
          className="px-6 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddCar}
        >
          Add Car
        </motion.button>
        <motion.button
          className="px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-400 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRemoveCar}
        >
          Remove Car
        </motion.button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="relative w-auto">
        <div className="grid grid-cols-10 gap-2 p-4 border-dashed border-t-2 border-b-2 border-gray-300 rounded-lg bg-white">
          {/* Entrance Indicator */}
          <motion.div className="absolute left-0 top-2">
            <IoMdArrowBack className="text-blue-500 text-3xl" />
          </motion.div>

          {Array.from({ length: 10 }, (_, i) => (
            <motion.div
              key={i}
              className="w-20 h-10 border border-gray-300 rounded-md flex items-center justify-center"
            >
              <AnimatePresence>
                {queue[i] && (
                  <motion.div
                    key={queue[i].plate}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full flex items-center justify-center rounded-md text-white font-semibold car-vibrate"
                  >
                    {/* Smoke Animation */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1.5 }}
                      style={{
                        width: "50px",
                        height: "10px",
                        backgroundColor: "gray",
                        borderRadius: "50%",
                      }}
                    />
                    {/* Car Image */}
                    <img 
                      src={queue[i].image} 
                      alt={queue[i].type} 
                      className="car-image"  /* Apply the new CSS class here */
                    />
                    {/* Plate Number - Only visible on hover */}
                    <div className="car-plate">{queue[i].plate}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white text-black">
        <button
          className="text-lg font-semibold mb-2 flex items-center"
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
