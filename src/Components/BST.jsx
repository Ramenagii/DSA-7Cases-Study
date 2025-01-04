import React, { useState } from 'react';
import * as d3 from 'd3';

const BST = () => {
  const [treeData, setTreeData] = useState(null);
  const [value, setValue] = useState('');

  const insertNode = (root, value) => {
    if (!root) {
      return { value, left: null, right: null };
    }
    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }
    return root;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue)) {
      setTreeData(insertNode(treeData, newValue));
      setValue('');
    }
  };

  const renderTree = (data) => {
    d3.select('#tree').selectAll('*').remove();

    const width = 600;
    const height = 400;

    const svg = d3.select('#tree')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', 'translate(50, 50)');

    const tree = d3.tree().size([width - 100, height - 100]);

    const root = d3.hierarchy(data);

    tree(root);

    const nodes = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
      .attr('class', 'fill-lightblue stroke-steelblue stroke-[3px]')
      .attr('r', 20);

    nodes.append('text')
      .attr('class', 'text-center')
      .attr('dy', 4)
      .text(d => d.data.value);

    const links = g.selectAll('.link')
      .data(root.links())
      .enter().append('line')
      .attr('class', 'link stroke-[#ccc] stroke-[2px]')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  };

  React.useEffect(() => {
    if (treeData) {
      renderTree(treeData);
    }
  }, [treeData]);

  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Insert</button>
      </form>
      <svg id="tree"></svg>
    </div>
  );
};

export default BST;
