import React, { useState } from "react";
import { motion } from "framer-motion";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BST = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [traversalStarted, setTraversalStarted] = useState(false);

  // Insert a new node into the BST
  const insertNode = (value) => {
    const newNode = new TreeNode(value);
    if (!root) {
      setRoot(newNode); // If no root, set the new node as root
    } else {
      insert(root, newNode); // Otherwise, insert the node into the tree
    }
    setNumbers([...numbers, value]); // Add the number to the list
    setInputValue(""); // Clear input field after inserting
  };

  // Recursive function to insert the node in the right place
  const insert = (node, newNode) => {
    if (newNode.value < node.value) {
      // If new value is smaller, insert in the left subtree
      if (node.left) {
        insert(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else if (newNode.value > node.value) {
      // If new value is greater, insert in the right subtree
      if (node.right) {
        insert(node.right, newNode);
      } else {
        node.right = newNode;
      }
    }
  };

  // Pre-order Traversal
  const preOrderTraversal = (node) => {
    if (node === null) return [];
    return [node.value, ...preOrderTraversal(node.left), ...preOrderTraversal(node.right)];
  };

  // In-order Traversal
  const inOrderTraversal = (node) => {
    if (node === null) return [];
    return [...inOrderTraversal(node.left), node.value, ...inOrderTraversal(node.right)];
  };

  // Post-order Traversal
  const postOrderTraversal = (node) => {
    if (node === null) return [];
    return [...postOrderTraversal(node.left), ...postOrderTraversal(node.right), node.value];
  };

  // Start Traversal based on the selected option
  const startTraversal = (orderType) => {
    let order;
    if (orderType === "preorder") {
      order = preOrderTraversal(root);
    } else if (orderType === "inorder") {
      order = inOrderTraversal(root);
    } else if (orderType === "postorder") {
      order = postOrderTraversal(root);
    }
    setTraversalOrder(order);
    setTraversalStarted(true);
  };

  // Function to handle resetting the traversal
  const resetTraversal = () => {
    setTraversalOrder([]);
    setTraversalStarted(false);
  };

  // Function to reset the input numbers and tree
  const resetInput = () => {
    setRoot(null); // Reset tree root
    setNumbers([]); // Clear inputted numbers
    setTraversalOrder([]); // Clear traversal order
    setTraversalStarted(false); // Reset traversal state
    setInputValue(""); // Clear input field
  };

  // Input handling
  const handleAddNode = () => {
    if (inputValue !== "") {
      insertNode(parseInt(inputValue));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Binary Search Tree</h1>

      {/* Input Field and Add Node Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="p-2 text-gray-900 rounded-lg"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <motion.button
          className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-pink-400 hover:text-black transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddNode}
        >
          Add Value
        </motion.button>
      </div>

      {/* Display Input Numbers */}
      {numbers.length > 0 && !traversalStarted && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">Inputted Numbers:</h2>
          <div className="text-gray-400">
            {numbers.join(", ")}
          </div>
        </div>
      )}

      {/* Traversal Controls */}
      {!traversalStarted && numbers.length > 0 && (
        <div className="mb-4">
          <motion.button
            className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-400 hover:text-black transition mx-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => startTraversal("preorder")}
          >
            Pre-order
          </motion.button>
          <motion.button
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-400 hover:text-black transition mx-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => startTraversal("inorder")}
          >
            In-order
          </motion.button>
          <motion.button
            className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-400 hover:text-black transition mx-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => startTraversal("postorder")}
          >
            Post-order
          </motion.button>
        </div>
      )}

      {/* Display Traversal Order */}
      {traversalStarted && (
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-2">Traversal Order:</h2>
          <div className="text-gray-400">
            {traversalOrder.join(", ")}
          </div>
        </div>
      )}

      {/* Reset Traversal Button */}
      {traversalStarted && (
        <motion.button
          className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTraversal}
        >
          Reset Traversal
        </motion.button>
      )}

      {/* Reset Input Numbers Button */}
      <motion.button
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetInput}
      >
        Reset Input Numbers
      </motion.button>
    </div>
  );
};

export default BST;
