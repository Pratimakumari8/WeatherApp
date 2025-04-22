import React , {useState} from 'react';
import './WeatherApp.css'
const WeatherApp = () =>{
    const [city, setCity] = useState('');
    const [weather , setWeather] = useState(null);
    const fetchWeather = async() =>{
        const apiKey = "decaf143b99259bf46e1776cef4beaaa" ;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try{
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
    }catch(error){
        console.error("Error fetching weather:" , error);
    }
}
return (
    <div className='weather-container'>
        <h2>Weather App</h2>
        <input type = "text"
        placeholder='Enter city name'
        value = {city}
        onChange={(e) => setCity(e.target.value)} />
        <button onClick = {fetchWeather}>Search</button>
        {weather && (
            <div className='weather-result'>
                <h3>{weather.name}</h3>
                <p>{weather.weather[0].main}</p>
                <p>{weather.main.temp}°C</p>
                </div>
        )}
    </div>
);
};
export default WeatherApp;