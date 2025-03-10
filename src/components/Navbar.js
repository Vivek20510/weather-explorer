import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "#fff" }}>Home</Link>
      <Link to="/search" style={{ margin: "10px", color: "#fff" }}>Search</Link>
      <Link to="/about" style={{ margin: "10px", color: "#fff" }}>About</Link>
    </nav>
  );
};

export default Navbar;
