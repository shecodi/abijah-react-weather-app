import React from "react";
import "./WeatherCard.css";
import WeatherEffects from "./WeatherEffects";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function WeatherCard({ weather, toFahrenheit, formatTime, getDay }) {
  function getWeatherIcon(condition) {
    const text = condition.toLowerCase();

    if (text.includes("cloud")) {
      return <WiCloud size={100} />;
    }

    if (text.includes("rain")) {
      return <WiRain size={100} />;
    }

    if (text.includes("clear")) {
      return <WiDaySunny size={100} />;
    }

    if (text.includes("snow")) {
      return <WiSnow size={100} />;
    }

    if (text.includes("thunder")) {
      return <WiThunderstorm size={100} />;
    }

    return <WiDaySunny size={100} />;
  }

  function getBackground(condition) {
    const text = condition.toLowerCase();

    if (text.includes("clear")) {
      return "linear-gradient(to right, #fbbf24, #f59e0b)";
    }

    if (text.includes("cloud")) {
      return "linear-gradient(to right, #94a3b8, #64748b)";
    }

    if (text.includes("rain")) {
      return "linear-gradient(to right, #0ea5e9, #0369a1)";
    }

    if (text.includes("snow")) {
      return "linear-gradient(to right, #cbd5e1, #94a3b8)";
    }

    return "linear-gradient(to right, #3b82f6, #1d4ed8)";
  }

  return (
    <div
      className="card"
      style={{
        background: getBackground(weather.condition),
      }}
    >
      <div className="weather-effect">{getWeatherIcon(weather.condition)}</div>
      <p className="day">{getDay(weather.time)}</p>

      <h2>{weather.city}</h2>

      <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>

      <p className="temp">
        {Math.round(weather.temperature)}°C /{toFahrenheit(weather.temperature)}
        °F
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