import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Sidebar from '../components/sidebar.jsx';

const BinaryTree = () => {
  const svgRef = useRef();
  const [levels, setLevels] = useState(3);

  useEffect(() => {
    const generateData = (level, value = 1) => {
      if (level > levels || level > 5) return null;
      return {
        name: value.toString(),
        children: [
          generateData(level + 1, value * 2),
          generateData(level + 1, value * 2 + 1),
        ].filter(child => child !== null),
      };
    };

    const data = generateData(1);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous drawings

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const treeLayout = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    const linkGenerator = d3.linkVertical()
      .x(d => d.x)
      .y(d => d.y);

    const link = g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke', '#000000')
      .attr('fill', 'none')
      .attr('stroke-dasharray', '0, 1') // Start with invisible lines
      .style('opacity', 0) // Start with hidden links
      .transition() // Animate link appearance
      .duration(500) // Faster animation
      .style('opacity', 1)
      .attr('stroke-dasharray', '4, 4'); // Animate link drawing effect

    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 20)
      .attr('fill', '#FFFFFF')
      .attr('stroke', '#000000')
      .style('filter', 'drop-shadow(5px 5px 8px rgba(0, 0, 0, 0.7))') // Darker shadow
      .style('opacity', 0) // Start with hidden nodes
      .transition() // Animate node appearance
      .duration(500) // Faster animation
      .delay(d => d.depth * 500) // Delay per level for level-by-level animation
      .style('opacity', 1);

    g.selectAll('.label')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => d.x)
      .attr('y', d => d.y + 5) // Adjust the Y position for better alignment
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#000')
      .style('opacity', 0) // Start with hidden text
      .transition() // Animate text appearance
      .duration(500) // Faster animation
      .delay(d => d.depth * 500) // Delay per level for level-by-level animation
      .style('opacity', 1)
      .text(d => d.data.name); // Display the value inside the node
  }, [levels]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Sidebar />
      <svg ref={svgRef} className="absolute top-0 left-0" />
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white p-2 shadow-lg rounded">
        <label htmlFor="levels" className="text-black">Levels:</label>
        <input
          id="levels"
          type="number"
          value={levels}
          onChange={(e) => setLevels(Math.min(5, Math.max(1, Number(e.target.value))))}
          className="border rounded px-2 py-1 text-black"
          min="0"
          max="4"
        />
      </div>
    </div>
  );
};

export default BinaryTree;
