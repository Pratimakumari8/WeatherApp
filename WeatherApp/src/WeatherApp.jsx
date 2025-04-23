import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);


  
  const renderWeatherIcon = (condition) => {
    if (condition === 'Clear') return <WiDaySunny size={60} />;
    if (condition === 'Clouds') return <WiCloudy size={60} />;
    if (condition === 'Rain') return <WiRain size={60} />;
    return null;
  };

  const fetchWeather = async () => {
    const apiKey = "decaf143b99259bf46e1776cef4beaaa";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }finally {
        setLoading(false); 
      }
  };

  return (
    <div className='weather-container'>
      <h2>Weather App</h2>
      <div className='input-group'>
        <input
          type="text"
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {loading && (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Fetching Weather...</p>
  </div>
)}

      {weather && (
        <div className='weather-result'>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].main}</p>
          <p>{weather.main.temp}°C</p>
          {renderWeatherIcon(weather.weather[0].main)}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
