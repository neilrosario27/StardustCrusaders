import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-gray-800 p-4">
      <Link
        to="/flowchart"
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        Flowchart
      </Link>
      <Link
        to="/resume"
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        Resume
      </Link>

      <button
        className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
        href="http://localhost:5173/mcqquiz"
      >
        3
      </button>
      <a href="http://localhost:5173/mcqquiz" >Quiz</a>
      <a href="http://localhost:3001" >Calendar</a>
      <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
        4
      </button>
    </nav>
  );
};

export default Navbar;
