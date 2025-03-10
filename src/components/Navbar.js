import React from "react";
import { Link } from "react-router-dom";
import "../index.css";  // Importing styles from index.css

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Weather Explorer</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
