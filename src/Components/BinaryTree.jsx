import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BinaryTree = () => {
  const [level, setLevel] = useState(1);
  const [traversal, setTraversal] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [traversalOutput, setTraversalOutput] = useState([]);

  const generateTree = (level) => {
    const nodes = [];
    const totalNodes = Math.pow(2, level) - 1;
    for (let i = 0; i < totalNodes; i++) {
      nodes.push(i + 1);
    }
    return nodes;
  };

  const tree = generateTree(level);

  const inOrderTraversal = (node, nodes) => {
    if (node >= nodes.length) return [];
    const left = inOrderTraversal(2 * node + 1, nodes);
    const right = inOrderTraversal(2 * node + 2, nodes);
    return [...left, nodes[node], ...right];
  };

  const preOrderTraversal = (node, nodes) => {
    if (node >= nodes.length) return [];
    const left = preOrderTraversal(2 * node + 1, nodes);
    const right = preOrderTraversal(2 * node + 2, nodes);
    return [nodes[node], ...left, ...right];
  };

  const postOrderTraversal = (node, nodes) => {
    if (node >= nodes.length) return [];
    const left = postOrderTraversal(2 * node + 1, nodes);
    const right = postOrderTraversal(2 * node + 2, nodes);
    return [...left, ...right, nodes[node]];
  };

  const startTraversal = (type) => {
    let order = [];
    switch (type) {
      case "inOrder":
        order = inOrderTraversal(0, tree);
        break;
      case "preOrder":
        order = preOrderTraversal(0, tree);
        break;
      case "postOrder":
        order = postOrderTraversal(0, tree);
        break;
      default:
        break;
    }
    setTraversal(order);
    setTraversalOutput(order);
    setCurrentNode(null);
  };

  useEffect(() => {
    if (traversal.length > 0) {
      const interval = setInterval(() => {
        setCurrentNode((prev) => {
          const nextIndex = traversal.indexOf(prev) + 1;
          if (nextIndex < traversal.length) {
            return traversal[nextIndex];
          } else {
            clearInterval(interval);
            return null;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [traversal]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Binary Tree Simulation</h1>
      <div className="mb-4">
        <label className="mr-2">Select Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white"
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Level ${i + 1}`}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => startTraversal("inOrder")}
          className="px-4 py-2 m-2 rounded-md border border-gray-600 bg-gray-800 text-white"
        >
          In-Order
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => startTraversal("preOrder")}
          className="px-4 py-2 m-2 rounded-md border border-gray-600 bg-gray-800 text-white"
        >
          Pre-Order
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => startTraversal("postOrder")}
          className="px-4 py-2 m-2 rounded-md border border-gray-600 bg-gray-800 text-white"
        >
          Post-Order
        </motion.button>
      </div>
      <div className="flex flex-col items-center">
        {Array.from({ length: level }).map((_, lvl) => (
          <div key={lvl} className="flex justify-center items-center mb-6 relative">
            {tree.slice(Math.pow(2, lvl) - 1, Math.pow(2, lvl + 1) - 1).map((node, index) => (
              <div key={node} className="relative mx-4">
                {lvl > 0 && (
                  <>
                    <motion.div
                      className="absolute border-t-2 border-gray-400"
                      style={{
                        width: "50%",
                        top: -20,
                        left: index % 2 === 0 ? "50%" : "-50%",
                        transform: index % 2 === 0 ? "translateX(-100%)" : "translateX(0)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute border-l-2 border-gray-400"
                      style={{
                        height: 20,
                        top: -20,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center border-2 ${
                    currentNode === node ? "bg-yellow-500" : "bg-white"
                  } text-gray-800 rounded-full shadow-lg`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {node}
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {traversalOutput.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Traversal Output:</h2>
          <p>{traversalOutput.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default BinaryTree;
