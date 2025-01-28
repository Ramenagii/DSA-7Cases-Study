import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Sidebar from '../components/sidebar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const BinarySearchTree = () => {
  const svgRef = useRef();
  const [values, setValues] = useState('');
  const [traversalType, setTraversalType] = useState('inorder');
  const [traversalResult, setTraversalResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createBinarySearchTree = (values) => {
    class TreeNode {
      constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
    }

    const insert = (node, value) => {
      if (!node) return new TreeNode(value);
      if (value < node.value) node.left = insert(node.left, value);
      else if (value > node.value) node.right = insert(node.right, value);
      return node;
    };

    let root = null;
    values.forEach((value) => {
      root = insert(root, value);
    });

    return root;
  };

  useEffect(() => {
    if (!values) return;

    const valueList = values
      .split(',')
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v));

    if (valueList.length > 30) {
      alert('Please enter 30 or fewer integers.');
      return;
    }

    const tree = createBinarySearchTree(valueList);

    const dataToD3Format = (node) => {
      if (!node) return null;
      return {
        name: node.value.toString(),
        children: [
          dataToD3Format(node.left),
          dataToD3Format(node.right),
        ].filter(Boolean),
      };
    };

    const data = dataToD3Format(tree);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    const linkGenerator = d3.linkVertical()
      .x((d) => d.x)
      .y((d) => d.y);

    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke', '#000000')
      .attr('fill', 'none');

    g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 20)
      .attr('fill', '#FFFFFF')
      .attr('stroke', '#000000');

    g.selectAll('.label')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y + 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#000')
      .text((d) => d.data.name);

    const traverse = () => {
      let nodes = [];

      const inorder = (node) => {
        if (!node) return;
        inorder(node.children?.[0]);
        nodes.push(node);
        inorder(node.children?.[1]);
      };

      const preorder = (node) => {
        if (!node) return;
        nodes.push(node);
        preorder(node.children?.[0]);
        preorder(node.children?.[1]);
      };

      const postorder = (node) => {
        if (!node) return;
        postorder(node.children?.[0]);
        postorder(node.children?.[1]);
        nodes.push(node);
      };

      if (traversalType === 'inorder') inorder(root);
      else if (traversalType === 'preorder') preorder(root);
      else if (traversalType === 'postorder') postorder(root);

      const delay = 500;
      nodes.forEach((node, index) => {
        setTimeout(() => {
          d3.select(svgRef.current)
            .selectAll('.node')
            .attr('fill', (d) => (d === node ? '#FFA500' : '#FFFFFF'));
        }, index * delay);
      });

      setTimeout(() => {
        d3.select(svgRef.current)
          .selectAll('.node')
          .attr('fill', '#FFFFFF');
        setTraversalResult(nodes.map((node) => node.data.name).join(', '));
        setIsModalOpen(true);
      }, nodes.length * delay);
    };

    d3.select('#traverse-btn').on('click', traverse);
  }, [values, traversalType]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Sidebar />
      <svg ref={svgRef} className="absolute top-0 left-0" />
      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white p-4 shadow-lg rounded">
        <div className="flex items-center gap-2">
          <label htmlFor="values" className="text-black">Values:</label>
          <input
            id="values"
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            placeholder="Enter integers, e.g., 15, 10, 20"
            className="border rounded px-2 py-1 text-black w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="traversal" className="text-black">Traversal:</label>
          <select
            id="traversal"
            value={traversalType}
            onChange={(e) => setTraversalType(e.target.value)}
            className="border rounded px-2 py-1 text-black"
          >
            <option value="inorder">Inorder</option>
            <option value="preorder">Preorder</option>
            <option value="postorder">Postorder</option>
          </select>
        </div>
        <button
          id="traverse-btn"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Traverse
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg h-52 w-56 flex flex-col justify-center items-center relative">
            <h3 className="text-black font-bold">Traversal Result:</h3>
            <p className="text-black mb-4">{traversalResult}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-500 text-white h-10 w-10 rounded-full shadow absolute top-0 right-0 mt-2 mr-2"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinarySearchTree;