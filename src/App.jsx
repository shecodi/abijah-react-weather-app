import { useState } from "react";
import "./App.css";

import { searchWeather } from "../weatherService";
import WeatherCard from "../WeatherCard";


function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  function getDay(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

function handleSearch() {
  searchWeather(city).then((data) => {
  
    if (data.cod !== 200 && data.cod !== "200") {
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
      icon: data.weather[0].icon,
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
        Weather App  
      </h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Search Weather</button>

      {weather && (
        <WeatherCard
          weather={weather}
          toFahrenheit={toFahrenheit}
          formatTime={formatTime}
          getDay={getDay}
        />
      )}
    </div>
  );
}

export default App;