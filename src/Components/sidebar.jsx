import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // For menu icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Drawer state

  // Toggle drawer visibility
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Animation variants for the sidebar
  const sidebarVariants = {
    open: { x: 0, opacity: 1, scale: 1 },
    closed: { x: "-100%", opacity: 0, scale: 0.95 },
  };

  // Animation variants for links
  const linkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-64 h-full bg-white text-black p-5 z-40 shadow-lg rounded-r-3xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
            <ul className="list-none p-0 space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Tic Tac Toe", path: "/tic-tac-toe" },
                { name: "Stacks", path: "/stacks" },
                { name: "Queue", path: "/queue" },
                { name: "Binary Tree", path: "/binary-tree" },
                { name: "BST", path: "/bst" },
                { name: "Towers of Hanoi", path: "/towers-of-hanoi" },
                { name: "Sorting", path: "/sorting" },
                { name: "About", path: "/about" },
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    className="block text-lg text-black transition-transform hover:scale-105 hover:text-blue-500 rounded-md mx-auto pl-2"
                    onClick={toggleDrawer}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
