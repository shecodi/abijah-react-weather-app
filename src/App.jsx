import { useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherIcon from "../WeatherIcon";
import { searchWeather } from "../weatherService";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

function handleSearch() {
  searchWeather(city).then((data) => {
    if (data.cod !== 200) {
      alert("City not found ❌");
      return;
    }

   setWeather({
     temperature: data.main.temp,
     condition: data.weather[0].description,
     city: data.name,
     humidity: data.main.humidity,
     wind: data.wind.speed,
     feelsLike: data.main.feels_like,
     time: data.dt,
     icon: data.weather[0].icon, // 👈 ADD THIS
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
      <h1>
        Weather App{" "}
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="weather icon"
          style={{ width: "100px" }}
        />
      </h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search Weather</button>

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>
            {Math.round(weather.temperature)}°C /{" "}
            {toFahrenheit(weather.temperature)}°F
          </p>
          <p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              style={{ width: "100px" }}
            />
            {weather.condition}
          </p>
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