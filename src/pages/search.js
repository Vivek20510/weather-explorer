import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Search Weather</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {weather && (
        <div>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
