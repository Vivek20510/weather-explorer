import React from "react";
import "../index.css"; // Importing modern CSS

const About = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h2>About <span>Weather Explorer</span></h2>
        <p>
          Weather Explorer is a simple yet powerful application that provides real-time weather updates for any city worldwide. 
          Stay informed about the latest weather conditions with just a few clicks!
        </p>
        <p>Powered by OpenWeather API.</p>
      </div>
    </div>
  );
};

export default About;
