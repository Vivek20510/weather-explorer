import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Importing modern CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to <span>Weather Explorer</span></h1>
        <p>Get real-time weather updates for any city around the world.</p>
        <Link to="/search" className="cta-button">Check Weather</Link>
      </div>
    </div>
  );
};

export default Home;
