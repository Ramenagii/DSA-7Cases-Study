import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const caseStudies = [
    { name: "TicTacToe", path: "/tic-tac-toe", description: "A simple Tic-Tac-Toe game", icon: "❌⭕" },
    { name: "Stacks", path: "/stacks", description: "Learn how stacks work in data structures", icon: "📚" },
    { name: "Queue", path: "/queue", description: "Explore the queue data structure", icon: "🔄" },
    { name: "BinaryTree", path: "/binary-tree", description: "Understand the basics of binary trees", icon: "🌳" },
    { name: "BST", path: "/bst", description: "Learn how Binary Search Trees operate", icon: "🔍" },
    { name: "TowersOfHanoi", path: "/towers-of-hanoi", description: "A classic Towers of Hanoi puzzle", icon: "🗼" },
    { name: "Sorting", path: "/sorting", description: "Understand different sorting algorithms", icon: "🔢" },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <motion.h1
        className="text-4xl font-semibold mb-8 text-center text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: "'Architects Daughter', cursive" }}
      >
        Data Structure Visualization Project
      </motion.h1>

      {/* Case Studies Grid */}
      <div className="w-full max-w-screen-xl px-4">
        {/* First row (3 items) */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {caseStudies.slice(0, 3).map((study, index) => (
            <motion.div
              key={index}
              className="bg-transparent p-4 rounded-2xl shadow-none border-2 border-dotted border-black flex flex-col items-center transition relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={() => navigate(study.path)}
              style={{ borderStyle: "dotted" }}
            >
              <div className="text-5xl mb-4" style={{ color: "black" }}>
                {study.icon}
              </div>
              <h2 className="text-xl font-semibold text-black mt-4">{study.name}</h2>
              <div className="rounded-2xl absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center">
                <p>{study.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row (4 items) */}
        <div className="grid grid-cols-4 gap-6">
          {caseStudies.slice(3).map((study, index) => (
            <motion.div
              key={index}
              className="bg-transparent p-4 rounded-2xl shadow-none border-2 border-dotted border-black flex flex-col items-center transition relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onClick={() => navigate(study.path)}
              style={{ borderStyle: "dotted" }}
            >
              <div className="text-5xl mb-4" style={{ color: "black" }}>
                {study.icon}
              </div>
              <h2 className="text-xl font-semibold text-black mt-4">{study.name}</h2>
              <div className="rounded-2xl absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center">
                <p>{study.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-12 text-black text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        © 2025 Team Project. All Rights Reserved.
      </motion.footer>
    </div>
  );
};

export default Home;
