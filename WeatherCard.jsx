import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherCard.css";

function WeatherCard({ weather, toFahrenheit, formatTime }) {
  return (
    <div className="card">
      <h2>{weather.city}</h2>

      <WeatherIcon condition={weather.condition} />

      <p className="temp">
        {Math.round(weather.temperature)}°C /{" "}
        {toFahrenheit(weather.temperature)}°F
      </p>

      <p className="condition">{weather.condition}</p>

      <div className="details">
        <p>Feels: {Math.round(weather.feelsLike)}°C</p>
        <p>💧 {weather.humidity}%</p>
        <p>🌬️ {weather.wind} m/s</p>
      </div>

      <p className="time">🕒 {formatTime(weather.time)}</p>
    </div>
  );
}



export default WeatherCard;