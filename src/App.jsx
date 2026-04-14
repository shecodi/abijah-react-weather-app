import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

 function searchWeather() {
   const apiKey = "efa9d0bfea1a536aaa9c77e4bedcbb45";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

   fetch(url)
     .then((response) => response.json())
     .then((data) => {
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].description,
        city: data.name,
      });
     });
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
          <p>{weather.temperature}°C</p>
          <p>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;