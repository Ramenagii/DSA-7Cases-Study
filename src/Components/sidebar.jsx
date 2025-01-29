import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // For menu icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Drawer state

  // Toggle drawer visibility
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  return (
    <div>
      {/* Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg"
        onClick={toggleDrawer}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white text-white p-5 z-40 shadow-lg"
          >
            <h2 className="text-black text-2xl font-bold mb-6 text-center">Menu</h2>
            <ul className="list-none p-0 space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tic-tac-toe"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Tic Tac Toe
                </Link>
              </li>
              <li>
                <Link
                  to="/stacks"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Stacks
                </Link>
              </li>
              <li>
                <Link
                  to="/queue"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Queue
                </Link>
              </li>
              <li>
                <Link
                  to="/binary-tree"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Binary Tree
                </Link>
              </li>
              <li>
                <Link
                  to="/bst"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  BST
                </Link>
              </li>
              <li>
                <Link
                  to="/towers-of-hanoi"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Towers of Hanoi
                </Link>
              </li>
              <li>
                <Link
                  to="/sorting"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  Sorting
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-lg text-black transition-shadow hover:shadow-lg hover:text-black rounded-md mx-auto h-auto pl-2"
                  onClick={toggleDrawer}
                >
                  About
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
