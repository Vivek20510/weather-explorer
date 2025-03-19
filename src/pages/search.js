import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "react-icons-weather"; // Import Weather Icons
import "../index.css"; // Importing modern CSS

const API_KEY = "729365e8ad8919d3f851f71ca16d0296"; // Your API Key

const Search = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Fetch auto-suggestions from OpenWeather Geocoding API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      setSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  // Fetch weather data when a city is selected
  const fetchWeather = async (selectedCity) => {
    if (!selectedCity) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
      setSuggestions([]);
      setCity(selectedCity);
    } catch (err) {
      setError("City not found! Please try again.");
      setWeather(null);
    }
  };

  // Fetch weather using user's current location
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setWeather(response.data);
          setCity(response.data.name); // Update city input with detected city
          setError("");
        } catch (err) {
          setError("Unable to fetch weather for your location.");
        }
      },
      (err) => {
        setError("Location access denied. Please enable location services.");
      }
    );
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search Weather</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className="search-input"
        />

        {/* Display Auto-Suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => fetchWeather(suggestion.name)}>
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}

        <div className="button-group">
          <button onClick={() => fetchWeather(city)} className="search-button">
            Get Weather
          </button>
          <button onClick={fetchWeatherByLocation} className="location-button">
            📍 Use My Location
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Display Weather Information */}
        {weather && (
          <div className="weather-info">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌥️ Weather: {weather.weather[0].description}</p>

            {/* Display Weather Icon */}
            <div className="weather-icon">
              <WeatherIcon
                name="owm" // OpenWeatherMap style
                iconId={weather.weather[0].id.toString()} // Weather condition ID
                flip="horizontal"
                rotate="90"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
