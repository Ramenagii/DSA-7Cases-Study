import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [delay, setDelay] = useState(300);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [notification, setNotification] = useState(""); // Notification message
  const [isSorted, setIsSorted] = useState(false); // Flag to track if the array is sorted

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    if (isSorting) return; // Prevent new array generation while sorting

    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 3);
    setArray(newArray);
    setIsSorted(false); // Reset sorted flag when generating a new array
  };

  const insertionSort = async () => {
    if (isSorting) return; // Prevent sorting if already in progress
    if (isSorted) {
      setNotification("Array is already sorted!");
      setTimeout(() => setNotification(""), 3000); // Notification disappears after 3 seconds
      return;
    }

    setIsSorting(true); // Mark sorting as in progress
    setNotification(""); // Clear any previous notifications
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setActiveIndex(i); // Update active index
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    setActiveIndex(null);
    setIsSorting(false); // Mark sorting as complete

    setIsSorted(true); // Set the array as sorted
    setNotification("Sorting Finished!");
    setTimeout(() => setNotification(""), 3000); // Notification disappears after 3 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center mb-8 p-4 border rounded-lg shadow-lg bg-white">
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 text-white bg-black rounded-lg shadow hover:bg-blue-500 transition-all duration-300 ease-in-out"
            onClick={generateRandomArray}
            disabled={isSorting} // Disable the button when sorting
          >
            Generate Random Array
          </button>
          <button
            className="px-4 py-2 text-white bg-black rounded-lg shadow hover:bg-green-500 transition-all duration-300 ease-in-out"
            onClick={insertionSort}
            disabled={isSorting || isSorted} // Disable sorting if already sorted
          >
            Sort
          </button>
          <button
            className="px-4 py-2 text-white bg-black rounded-lg shadow hover:bg-red-500 transition-all duration-300 ease-in-out"
            onClick={() => setArray([...array].reverse())}
            disabled={isSorting} // Disable the button when sorting
          >
            Reverse Array
          </button>
        </div>
        <select
          className="px-4 py-2 text-white bg-black rounded-lg shadow hover:bg-gray-500 transition-all duration-300 ease-in-out"
          disabled={isSorting} // Disable the dropdown when sorting
        >
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="bubble">Bubble Sort</option>
        </select>
      </div>

      {/* Sorting Finished Notification */}
      {notification && (
        <motion.div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
          initial={{ opacity: 0, y: 50 }}  // Start position: invisible and below
          animate={{ opacity: 1, y: 0 }}    // End position: visible and at original position
          exit={{ opacity: 0, y: 50 }}      // Exit position: invisible and below
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            duration: 0.5
          }}
        >
          {notification}
        </motion.div>
      )}

      {/* Block Container */}
      <div className="relative flex gap-2 items-end w-full justify-center rounded-lg p-4 border bg-white shadow-lg" style={{ height: '300px' }}>
        {array.map((value, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            initial={{ height: 0 }}
            animate={{ height: `${value * 10}px`, scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }} // Higher spring for more bounce
          >
            <div
              className={`w-10 h-10 border-2 rounded-lg shadow-lg ${activeIndex === index ? 'bg-yellow-500 ring-4 ring-yellow-600' : 'bg-cream'} ${isSorting && activeIndex === index ? 'bg-yellow-300 ring-4 ring-yellow-500' : ''}`}
              style={{
                height: `${value * 10}px`,
                backgroundColor: '#f5f5dc',
                borderColor: 'black',
                boxShadow: activeIndex === index ? '0px 0px 10px 5px rgba(255, 255, 0, 0.6)' : '4px 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            ></div>
            <motion.span
              className="absolute bottom-0 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '-20px', // Keep the number at the bottom of the block
              }}
            >
              {value}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
