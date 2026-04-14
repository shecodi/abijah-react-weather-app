import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {



  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

 function searchWeather() {
   const apiKey = "efa9d0bfea1a536aaa9c77e4bedcbb45";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}&units=metric`;

   fetch(url)
     .then((response) => response.json())
     .then((data) => {
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].description,
        city: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        feelsLike: data.main.feels_like,
        time: data.dt,
      });
     });
 }

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString();
}

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}


  return (
    <div>
      <h1>Weather App 🌤️</h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={searchWeather}>Search Weather</button>

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>
            {Math.round(weather.temperature)}°C /{" "}
            {toFahrenheit(weather.temperature)}°F
          </p>
          <p>{weather.condition}</p>

          <p>
            Feels like: {Math.round(weather.feelsLike)}°C /{" "}
            {toFahrenheit(weather.feelsLike)}°F
          </p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind} m/s</p>
          <p>Time: {formatTime(weather.time)}</p>
        </div>
      )}
    </div>
  );
}

export default App;