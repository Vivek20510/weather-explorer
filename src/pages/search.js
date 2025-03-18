import React, { useState } from "react";
import axios from "axios";
import "../index.css"; // Importing modern CSS

const API_KEY = "729365e8ad8919d3f851f71ca16d0296"; // Your API Key

const Search = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search Weather</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">Get Weather</button>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌥️ Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
