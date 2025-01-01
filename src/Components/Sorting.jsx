import React, { useState } from "react";
import { motion } from "framer-motion";

const Sorting = () => {
  const [inputValue, setInputValue] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [sortingOrder, setSortingOrder] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger rerender

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNumber = () => {
    const numArray = inputValue.split(",").map((num) => parseInt(num.trim()));
    setNumbers(numArray);
    setInputValue("");
    setSortingOrder([]);
  };

  // Handle reset functionality
  const handleReset = () => {
    setNumbers([]);
    setSortingOrder([]);
    setInputValue("");
    setSelectedAlgorithm("");
    setAnimationKey((prev) => prev + 1); // Trigger rerender
  };

  // Sorting Algorithms
  const bubbleSort = async (arr) => {
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length - 1 - i; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]]; // Swap
          setSortingOrder([...sortedArray]);
          setAnimationKey(prev => prev + 1); // Trigger animation
          await sleep(100);
        }
      }
    }
    return sortedArray;
  };

  const selectionSort = async (arr) => {
    let sortedArray = [...arr];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]]; // Swap
        setSortingOrder([...sortedArray]);
        setAnimationKey(prev => prev + 1); // Trigger animation
        await sleep(100);
      }
    }
    return sortedArray;
  };

  const insertionSort = async (arr) => {
    let sortedArray = [...arr];
    for (let i = 1; i < sortedArray.length; i++) {
      let key = sortedArray[i];
      let j = i - 1;
      while (j >= 0 && sortedArray[j] > key) {
        sortedArray[j + 1] = sortedArray[j];
        j--;
        setSortingOrder([...sortedArray]);
        setAnimationKey(prev => prev + 1); // Trigger animation
        await sleep(100);
      }
      sortedArray[j + 1] = key;
      setSortingOrder([...sortedArray]);
    }
    return sortedArray;
  };

  const mergeSort = async (arr) => {
    const merge = (left, right) => {
      let result = [], leftIndex = 0, rightIndex = 0;
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
      return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    };

    const sort = async (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
      const sortedLeft = await sort(left);
      const sortedRight = await sort(right);
      const merged = merge(sortedLeft, sortedRight);
      setSortingOrder([...merged]);
      setAnimationKey(prev => prev + 1); // Trigger animation
      await sleep(100);
      return merged;
    };

    return await sort(arr);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = async () => {
    setIsSorting(true);
    let sortedNumbers;
    if (selectedAlgorithm === "bubble") {
      sortedNumbers = await bubbleSort(numbers);
    } else if (selectedAlgorithm === "selection") {
      sortedNumbers = await selectionSort(numbers);
    } else if (selectedAlgorithm === "insertion") {
      sortedNumbers = await insertionSort(numbers);
    } else if (selectedAlgorithm === "merge") {
      sortedNumbers = await mergeSort(numbers);
    }
    setNumbers(sortedNumbers);
    setIsSorting(false);
  };

  // Render Numbers with Animations
  const renderSortedNumbers = () => {
    return sortingOrder.map((num, index) => (
      <motion.div
        key={index}
        className="text-xl font-semibold text-white p-2 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {num}
      </motion.div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Sorting Algorithms</h1>

      {/* Top Horizontal Menu for Sorting Algorithms */}
      <div className="w-full bg-gray-800 p-2 flex justify-center gap-4 mb-6 rounded-lg">
        <motion.button
          className={`px-6 py-2 rounded-lg ${selectedAlgorithm === 'bubble' ? 'bg-purple-600' : 'bg-gray-700'} text-white hover:bg-purple-500`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedAlgorithm("bubble")}
        >
          Bubble Sort
        </motion.button>
        <motion.button
          className={`px-6 py-2 rounded-lg ${selectedAlgorithm === 'selection' ? 'bg-green-600' : 'bg-gray-700'} text-white hover:bg-green-500`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedAlgorithm("selection")}
        >
          Selection Sort
        </motion.button>
        <motion.button
          className={`px-6 py-2 rounded-lg ${selectedAlgorithm === 'insertion' ? 'bg-red-600' : 'bg-gray-700'} text-white hover:bg-red-500`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedAlgorithm("insertion")}
        >
          Insertion Sort
        </motion.button>
        <motion.button
          className={`px-6 py-2 rounded-lg ${selectedAlgorithm === 'merge' ? 'bg-yellow-600' : 'bg-gray-700'} text-white hover:bg-yellow-500`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedAlgorithm("merge")}
        >
          Merge Sort
        </motion.button>
      </div>

      {/* Number Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="p-2 text-gray-900 rounded-lg"
          placeholder="Enter numbers (comma separated)"
          value={inputValue}
          onChange={handleInputChange}
        />
        <motion.button
          className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-pink-400 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddNumber}
        >
          Add Numbers
        </motion.button>

        {/* Reset Button */}
        <motion.button
          className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
        >
          Reset
        </motion.button>
      </div>

      {/* Display Input Numbers */}
      {numbers.length > 0 && !isSorting && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Inputted Numbers:</h2>
          <div className="text-gray-400">{numbers.join(", ")}</div>
        </div>
      )}

      {/* Start Sorting Button */}
      {!isSorting && numbers.length > 0 && selectedAlgorithm && (
        <motion.button
          className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-pink-400 hover:text-black transition mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSort}
        >
          Start Sorting
        </motion.button>
      )}

      {/* Sorting Order with Animation */}
      {isSorting && (
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">Sorting in Progress...</h2>
        </div>
      )}

      {/* Render the sorted numbers with animation */}
      {sortingOrder.length > 0 && !isSorting && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          {renderSortedNumbers()}
        </div>
      )}
    </div>
  );
};

export default Sorting;
