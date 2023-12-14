import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import the CSS file

import { FaTrophy } from 'react-icons/fa';

// Navbar component
function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <p>
            <FaTrophy size={24} /> WorldCUP
          </p>
        </Link>
      </div>
      <div>
        <Link to="/teams" className="navbar-link">
          Teams
        </Link>
        <Link to="/addteam" className="navbar-link">
          Add team
        </Link>
        <Link to="/pointstable" className="navbar-link">
          Pointstable
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
