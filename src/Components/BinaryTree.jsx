import React, { useState, useEffect, useRef } from "react";

const BinaryTreeWithCanvas = () => {
  const [level, setLevel] = useState(3); // Default level is 3
  const [traversal, setTraversal] = useState([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);

  const canvasRef = useRef(null);
  const animationRef = useRef(null); // To hold the animation frame request ID

  // Generate tree nodes based on the selected level
  const generateTree = (level) => {
    const nodes = [];
    const totalNodes = Math.pow(2, level) - 1;
    for (let i = 0; i < totalNodes; i++) {
      nodes.push(i + 1);
    }
    return nodes;
  };

  const tree = generateTree(level);

  // Traversal functions
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
    setCurrentNodeIndex(0);
  };

  const drawTree = (ctx, currentNodeIndex) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas before drawing

    const nodes = generateTree(level);

    const drawNode = (x, y, nodeValue) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = currentNodeIndex === nodeValue ? "yellow" : "skyblue";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(nodeValue, x - 8, y + 5);
    };

    const drawNodeRecursively = (nodeIndex, x, y, offset) => {
      if (nodeIndex >= nodes.length) return;

      const nodeValue = nodes[nodeIndex];

      // Draw the current node
      drawNode(x, y, nodeValue);

      // Recursively draw left and right children with branches
      const leftChildIndex = 2 * nodeIndex + 1;
      const rightChildIndex = 2 * nodeIndex + 2;
      const newOffset = offset / 2;

      // Left branch
      if (leftChildIndex < nodes.length) {
        ctx.beginPath();
        ctx.moveTo(x, y);  // Move from the current node
        ctx.lineTo(x - newOffset, y + 50); // Line to the left child
        ctx.stroke();
        drawNodeRecursively(leftChildIndex, x - newOffset, y + 50, newOffset);
      }

      // Right branch
      if (rightChildIndex < nodes.length) {
        ctx.beginPath();
        ctx.moveTo(x, y);  // Move from the current node
        ctx.lineTo(x + newOffset, y + 50); // Line to the right child
        ctx.stroke();
        drawNodeRecursively(rightChildIndex, x + newOffset, y + 50, newOffset);
      }
    };

    // Initial drawing of the tree
    drawNodeRecursively(0, ctx.canvas.width / 2, 50, 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw tree on initial load
    drawTree(ctx, currentNodeIndex);

    const animateTraversal = () => {
      if (currentNodeIndex < traversal.length) {
        setCurrentNodeIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < traversal.length) {
            return nextIndex;
          } else {
            cancelAnimationFrame(animationRef.current); // Stop the animation when done
            return prevIndex;
          }
        });
        drawTree(ctx, currentNodeIndex); // Redraw tree with updated node highlight
        animationRef.current = requestAnimationFrame(animateTraversal); // Continue animation
      }
    };

    if (traversal.length > 0) {
      animationRef.current = requestAnimationFrame(animateTraversal); // Start animation
    }

    return () => cancelAnimationFrame(animationRef.current); // Cleanup animation on unmount
  }, [traversal, currentNodeIndex]);

  return (
    <div>
      <div>
        <label htmlFor="level-select">Select Tree Level:</label>
        <select
          id="level-select"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Level ${i + 1}`}</option>
          ))}
        </select>
      </div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <div>
        <button onClick={() => startTraversal("inOrder")}>In-Order</button>
        <button onClick={() => startTraversal("preOrder")}>Pre-Order</button>
        <button onClick={() => startTraversal("postOrder")}>Post-Order</button>
      </div>
    </div>
  );
};

export default BinaryTreeWithCanvas;
