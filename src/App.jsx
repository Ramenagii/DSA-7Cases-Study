import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import Home from "./Components/Home";
import Sidebar from "./Components/sidebar";
import TicTacToe from "./Components/TicTacToe";
import Stacks from "./Components/Stacks";
import Queue from "./Components/Queue";
import BinaryTree from "./Components/BinaryTree";
import BST from "./Components/BST";
import TowersOfHanoi from "./Components/TowersOfHanoi";
import Sorting from "./Components/Sorting";
import About from "./Components/About";

const App = () => {
  const location = useLocation(); // Get the current route location

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content with animated route transitions */}
      <div className="flex-grow flex items-center justify-center p-8">
        <Routes location={location}>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <motion.div
                key={location.pathname} // This will trigger a reanimation on route change
                initial={{ opacity: 0 }} // Start with 0 opacity
                animate={{ opacity: 1 }} // Fade in to full opacity
                exit={{ opacity: 0 }} // Fade out on exit
                transition={{ duration: 0.5 }} // Animation duration
              >
                <Home />
              </motion.div>
            }
          />

          {/* Functional Pages with animation */}
          <Route
            path="/tic-tac-toe"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TicTacToe />
              </motion.div>
            }
          />
          <Route
            path="/stacks"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Stacks />
              </motion.div>
            }
          />
          <Route
            path="/queue"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Queue />
              </motion.div>
            }
          />
          <Route
            path="/binary-tree"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BinaryTree />
              </motion.div>
            }
          />
          <Route
            path="/bst"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BST />
              </motion.div>
            }
          />
          <Route
            path="/towers-of-hanoi"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TowersOfHanoi />
              </motion.div>
            }
          />
          <Route
            path="/sorting"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sorting />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-lg text-gray-400">Page not found.</p>
                </div>
              </motion.div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
