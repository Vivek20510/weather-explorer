import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css"; // Importing modern CSS

const API_KEY = "729365e8ad8919d3f851f71ca16d0296"; // Your API Key

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Fetch weather based on user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
          } catch (err) {
            setError("Unable to fetch weather for your location.");
          }
        },
        (err) => {
          setError("Location access denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to <span>Weather Explorer</span></h1>
        <p>Get real-time weather updates for any city around the world.</p>
        <Link to="/search" className="cta-button">Check Weather</Link>
      </div>

      {/* Display weather if available */}
      {weather && (
        <div className="location-weather">
          <h3>📍 {weather.name}, {weather.sys.country}</h3>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌥️ {weather.weather[0].description}</p>
        </div>
      )}

      {/* Show error message if any */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Home;
