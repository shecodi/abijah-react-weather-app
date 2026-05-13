import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "../WeatherCard";
import Forecast from "../Forecast";
import { searchWeather, getForecast } from "../weatherService";




function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);

  function getDay(timestamp) {
    const date = new Date(timestamp * 1000);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  function handleSearch(searchCity = city) {
    setLoading(true);

    searchWeather(searchCity).then((data) => {
      if (data.cod !== 200 && data.cod !== "200") {
        alert("City not found ❌");
        setLoading(false);
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
        lat: data.coord.lat,
        lon: data.coord.lon,
      });

      // ✅ Forecast
      getForecast(data.coord.lat, data.coord.lon).then((forecastData) => {
        setForecast(forecastData.daily.slice(0, 7));
      });

      setLoading(false);
    });
  }

  // ✅ Default city
  useEffect(() => {
    handleSearch("Pretoria");
  }, []);

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  function toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={() => handleSearch()}>Search Weather</button>

      {loading && <div className="spinner"></div>}

      {weather && (
        <WeatherCard
          weather={weather}
          toFahrenheit={toFahrenheit}
          formatTime={formatTime}
          getDay={getDay}
        />
      )}

      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
}

export default App;