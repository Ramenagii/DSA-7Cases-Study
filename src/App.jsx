import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/stacks" element={<Stacks />} />
      <Route path="/queue" element={<Queue />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/binary-tree" element={<BinaryTree />} />
      <Route path="/bst" element={<BST />} />
      <Route path="/towers-of-hanoi" element={<TowersOfHanoi />} />
      <Route path="/sorting" element={<Sorting />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;