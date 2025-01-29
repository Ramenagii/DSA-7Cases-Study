import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import Landing from "./pages/Landing.jsx";
import Stacks from "./pages/Stacks.jsx";
import Queue from "./pages/Queue.jsx";
import TicTacToe from "./pages/TicTacToe.jsx";
import BinaryTree from "./pages/BinaryTree.jsx";
import BST from "./pages/BST.jsx";
import TowersOfHanoi from "./pages/TowersOfHanoi.jsx";
import Sorting from "./pages/Sorting.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={
          <motion.div
            key="landing"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <Landing />
          </motion.div>
        } />
        <Route path="/stacks" element={
          <motion.div
            key="stacks"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <Stacks />
          </motion.div>
        } />
        <Route path="/queue" element={
          <motion.div
            key="queue"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <Queue />
          </motion.div>
        } />
        <Route path="/tic-tac-toe" element={
          <motion.div
            key="tic-tac-toe"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <TicTacToe />
          </motion.div>
        } />
        <Route path="/binary-tree" element={
          <motion.div
            key="binary-tree"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <BinaryTree />
          </motion.div>
        } />
        <Route path="/bst" element={
          <motion.div
            key="bst"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <BST />
          </motion.div>
        } />
        <Route path="/towers-of-hanoi" element={
          <motion.div
            key="towers-of-hanoi"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <TowersOfHanoi />
          </motion.div>
        } />
        <Route path="/sorting" element={
          <motion.div
            key="sorting"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <Sorting />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            key="about"
            initial={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            animate={{ opacity: 1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5 }}
          >
            <About />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
