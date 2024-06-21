// Questions.js

import React, { useRef } from 'react';

const Questions = () => {
  const iframeRef = useRef(null); // Create a ref for the iframe element

  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Roman to Integer', difficulty: 'Easy' },
    { id: 3, title: 'Longest Common Prefix', difficulty: 'Easy' },
    { id: 4, title: 'Valid Parentheses', difficulty: 'Easy' },
    { id: 5, title: 'Merge Two Sorted Lists', difficulty: 'Medium' },
    { id: 6, title: 'Search Insert Position', difficulty: 'Medium' },
    { id: 7, title: 'Climbing Stairs', difficulty: 'Hard' },
    { id: 8, title: 'Binary Tree Inorder Traversal', difficulty: 'Hard' },
    { id: 9, title: 'Symmetric Tree', difficulty: 'Easy' },
    { id: 10, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy' },
    { id: 11, title: "Pascal's Triangle", difficulty: 'Medium' },
    { id: 12, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy' },
    { id: 13, title: 'Intersection of Two Linked Lists', difficulty: 'Medium' }
  ];

  // Function to handle compile button click
  const handleCompileClick = (problemTitle) => {
    console.log(`Compiling ${problemTitle}`);
    // Scroll to the iframe
    iframeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">LeetCode Problems</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">Difficulty</th>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">Compile</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id} className="bg-white">
                <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">{problem.title}</td>
                <td className={`border border-gray-300 px-6 py-4 text-sm font-medium ${getColorClass(problem.difficulty)}`}>{problem.difficulty}</td>
                <td className="border border-gray-300 px-6 py-4">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => handleCompileClick(problem.title)}>
                    Compile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8" ref={iframeRef}>
        <iframe
          title="Compiler"
          className="w-full h-screen border-none"
          src="https://onecompiler.com/embed/"
        />
      </div>
    </div>
  );
};

// Function to get Tailwind color class based on difficulty
const getColorClass = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600';
    case 'Medium':
      return 'text-yellow-600';
    case 'Hard':
      return 'text-red-600';
    default:
      return 'text-gray-700';
  }
};

export default Questions;
