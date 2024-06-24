import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSitemap,
  FaFileAlt,
  FaCentercode,
  FaCalendarAlt,
  FaQuora,
  FaHome,
  FaYoutube,
  FaMicrophone,
  FaTextWidth,
  FaPlus,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-list">
          <li>
            <NavLink
              to=""
              className="sidebar-button-close"
              activeClassName="active"
              onClick={closeSidebar}
            >
              X
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/index"
              className="sidebar-button"
              activeClassName="active"
              onClick={closeSidebar}
            >
              <FaHome className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/flowchart"
              className="sidebar-button"
              activeClassName="active"
              onClick={closeSidebar}
            >
              <FaSitemap className="icon" />
              Roadmap
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resume"
              className="sidebar-button"
              activeClassName="active"
              onClick={closeSidebar}
            >
              <FaFileAlt className="icon" />
              Resume
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/questions"
              className="sidebar-button"
              activeClassName="active"
              onClick={closeSidebar}
            >
              <FaCentercode className="icon" />
              DSA
            </NavLink>
          </li>
          <li>
            <a
              href="http://localhost:5100/mcqquiz"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaQuora className="icon" />
              Quiz
            </a>
          </li>
          <li>
            <a
              href="http://localhost:3001"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaCalendarAlt className="icon" />
              Calendar
            </a>
          </li>
          <li>
            <a
              href="/tutorials"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaYoutube className="icon" />
              Tutorials
            </a>
          </li>
          <li>
            <a
              href="http://localhost:3002/text"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaTextWidth className="icon" />
              Text Interview
            </a>
          </li>
          <li>
            <a
              href="http://localhost:3002/audio2"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaMicrophone className="icon" />
              Audio Interview
            </a>
          </li>
          <li>
            <a
              href="http://localhost:5173"
              className="sidebar-button"
              onClick={closeSidebar}
            >
              <FaPlus className="icon" />
              Connect+
            </a>
          </li>
        </ul>
      </nav>
      <div className="navbar">
        <button className="hamburger" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <h1 className="app-title">CareerCraft</h1>
      </div>
    </div>
  );
};

export default Navbar;
