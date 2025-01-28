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
    const [arraySize, setArraySize] = useState(10);
    const [sortDuration, setSortDuration] = useState(null); // Timer for sorting duration

    useEffect(() => {
        generateRandomArray(arraySize);
    }, []);

    const generateRandomArray = () => {
        if (isSorting) return; // Prevent new array generation while sorting
        const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1); // Fixed size of array
        setArray(newArray);
        setIsSorted(false); // Reset sorted flag when generating a new array
        setSortDuration(null); // Reset sort duration when generating a new array
    };

    const handleSortMethodChange = (event) => {
        setSortMethod(event.target.value);
    };

    const sortArray = async () => {
        if (isSorting) return; // Prevent sorting if already in progress
        const startTime = new Date(); // Start timer
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
        const endTime = new Date(); // End timer
        setSortDuration((endTime - startTime) / 1000); // Calculate duration in seconds
    };

    const handleDelayChange = (e) => {
        setDelay(Number(e.target.value));
    };

    const handleArraySizeChange = (e) => {
        const size = Number(e.target.value);
        setArraySize(size);
        generateRandomArray(size); // Generate a new random array of the updated size
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
 
    const selectionSort = async () => { 
        setIsSorting(true);
        let arr = array.slice();
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
                setActiveIndex(j);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const bubbleSort = async () => {
        setIsSorting(true);
        let arr = array.slice();
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
                setActiveIndex(j);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const mergeSort = async () => { 
        const merge = async (arr, l, m, r) => {
            let n1 = m - l + 1;
            let n2 = r - m;
            let L = new Array(n1);
            let R = new Array(n2);
            for (let i = 0; i < n1; i++) {
                L[i] = arr[l + i];
            }
            for (let j = 0; j < n2; j++) {
                R[j] = arr[m + 1 + j];
            }
            let i = 0;
            let j = 0;
            let k = l;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                setActiveIndex(k);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
                k++;
            }
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        };
        const mergeSortHelper = async (arr, l, r) => {
            if (l >= r) {
                return;
            }
            let m = l + Math.floor((r - l) / 2);
            await mergeSortHelper(arr, l, m);
            await mergeSortHelper(arr, m + 1, r);
            await merge(arr, l, m, r);
        };
        setIsSorting(true);
        let arr = array.slice();
        await mergeSortHelper(arr, 0, arr.length - 1);
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const shellSort = async () => { 
        setIsSorting(true);
        let arr = array.slice();
        let n = arr.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
                setActiveIndex(j);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const quickSort = async () => {
        const partition = async (arr, low, high) => {
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
                setActiveIndex(j);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
            let temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            setActiveIndex(i + 1);
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return i + 1;
        };
        const quickSortHelper = async (arr, low, high) => {
            if (low < high) {
                let pi = await partition(arr, low, high);
                await quickSortHelper(arr, low, pi - 1);
                await quickSortHelper(arr, pi + 1, high);
            }
        };
        setIsSorting(true);
        let arr = array.slice();
        await quickSortHelper(arr, 0, arr.length - 1);
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
    };

    const heapSort = async () => {
        const heapify = async (arr, n, i) => {
            let largest = i;
            let l = 2 * i + 1;
            let r = 2 * i + 2;
            if (l < n && arr[l] > arr[largest]) {
                largest = l;
            }
            if (r < n && arr[r] > arr[largest]) {
                largest = r;
            }
            if (largest !== i) {
                let temp = arr[i];
                arr[i] = arr[largest];
                arr[largest] = temp;
                setActiveIndex(largest);
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, delay));
                await heapify(arr, n, largest);
            }
        };
        setIsSorting(true);
        let arr = array.slice();
        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            setActiveIndex(i);
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, delay));
            await heapify(arr, i, 0);
        }
        setIsSorting(false);
        setIsSorted(true);
        setActiveIndex(null);
        setNotification("Sorting Complete!");
        setTimeout(() => setNotification(""), 3000);
     };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black w-full">
            <Sidebar />
            {/* Top Menu Placeholder */}
            <div className="flex flex-col items-center mb-8 p-6 border rounded-lg shadow-lg bg-white w-full max-w-3xl">
                {/* Sorting Finished Notification */}
                {notification && (
                    <motion.div className="fixed top-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
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
                                onClick={() => generateRandomArray(arraySize)} 
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
                    <div className="mb-4">
                        <label className="text-sm font-medium mr-2">
                         Array Size: {arraySize}
                        </label>
                            <input
                            type="range"
                            min="10"
                            max="30"
                            step="1"
                            value={arraySize}
                            onChange={handleArraySizeChange}
                            className="w-64"
                            />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium mr-2">Delay: {delay} ms</label>
                            <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={delay}
                            onChange={handleDelayChange}
                            className="w-64"
                            />
                    </div>
                    {/* Timer Display */}
                    {sortDuration && (
                    <div className="text-lg font-semibold text-green-600">
                        Sort Duration: {sortDuration} seconds
                    </div>
                )}
                <div className="mb-4"></div>
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
