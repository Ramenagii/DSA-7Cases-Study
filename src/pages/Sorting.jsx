import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/sidebar';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [delay, setDelay] = useState(300);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isSorting, setIsSorting] = useState(false);
    const [notification, setNotification] = useState(""); // Notification message
    const [isSorted, setIsSorted] = useState(false); // Flag to track if the array is sorted
    const [sortMethod, setSortMethod] = useState("insertion");

    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        if (isSorting) return; // Prevent new array generation while sorting
        const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 30) + 3); // Fixed size of array
        setArray(newArray);
        setIsSorted(false); // Reset sorted flag when generating a new array
    };

    const handleSortMethodChange = (event) => {
        setSortMethod(event.target.value);
    };

    const sortArray = async () => {
        if (isSorting) return; // Prevent sorting if already in progress
        switch (sortMethod) {
            case "insertion":
                await insertionSort();
                break;
            case "selection":
                await selectionSort();
                break;
            case "bubble":
                await bubbleSort();
                break;
            case "merge":
                await mergeSort();
                break;
            case "quick":
                await quickSort();
                break;
            case "heap":
                await heapSort();
                break;
            default:
                break;
        }
    };

    const insertionSort = async () => {
        setIsSorting(true);
        let arr = array.slice();
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                setActiveIndex(j);
                setArray([...arr]);
                await new Promise(r => setTimeout(r, delay));
                j = j - 1;
            }
            arr[j + 1] = key;
            setArray([...arr]);
            await new Promise(r => setTimeout(r, delay));
        }
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const selectionSort = async () => { /* Placeholder for selection sort */ };
    const bubbleSort = async () => { /* Placeholder for bubble sort */ };
    const mergeSort = async () => { /* Placeholder for merge sort */ };
    const quickSort = async () => { /* Placeholder for quick sort */ };
    const heapSort = async () => { /* Placeholder for heap sort */ };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black w-full">
            <Sidebar />
            {/* Top Menu Placeholder */}
            <div className="flex flex-col items-center mb-8 p-6 border rounded-lg shadow-lg bg-white w-full max-w-3xl">
                {/* Sorting Finished Notification */}
                {notification && (
                    <motion.div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }}>
                        {notification}
                    </motion.div>
                )}
                {/* Buttons and Selection Dropdown */}
                <div className="flex flex-col gap-4 mt-4 w-full">
                    <div className="flex gap-4 justify-between">
                        <button className="flex-1 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out" 
                                onClick={generateRandomArray} 
                                disabled={isSorting}>Generate Random Array</button>
                        <button className="flex-1 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out" 
                                onClick={sortArray} 
                                disabled={isSorting || isSorted}>Sort</button>
                        <button className="flex-1 px-6 py-3 text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out" 
                                onClick={() => setArray([...array].reverse())} 
                                disabled={isSorting}>Reverse Array</button>
                    </div>
                    <div className="mt-4">
                        <select className="w-full px-6 py-3 text-black bg-white border rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500" 
                                value={sortMethod} 
                                onChange={handleSortMethodChange} 
                                disabled={isSorting}>
                            <option value="insertion">Insertion Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="bubble">Bubble Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="quick">Quick Sort</option>
                            <option value="heap">Heap Sort</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Block Container */}
            <div className="relative flex gap-2 items-end w-full justify-center rounded-lg p-4 border bg-white shadow-lg" style={{ height: '70vh' }}>
                {array.map((value, index) => (
                    <motion.div key={index} className="relative flex flex-col items-center"
                                initial={{ height: 0 }}
                                animate={{ height: `${value * 10}px`, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
                        <div className={`w-10 border-2 rounded-lg shadow-lg ${activeIndex === index ? 'bg-yellow-500 ring-4 ring-yellow-600' : 'bg-cream'} ${isSorting && activeIndex === index ? 'bg-yellow-300 ring-4 ring-yellow-500' : ''}`}
                             style={{ height: `${value * 10}px`, backgroundColor: '#f5f5dc', borderColor: 'black', boxShadow: activeIndex === index ? '0px 0px 10px 5px rgba(255, 255, 0, 0.6)' : '4px 4px 10px rgba(0, 0, 0, 0.3)', borderRadius: '8px' }}></div>
                        <motion.span className="absolute bottom-0 mt-2 text-sm"
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: 1 }}
                                     transition={{ duration: 0.3 }}
                                     style={{ position: 'absolute', bottom: '-20px' }}>
                            {value}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SortingVisualizer;
