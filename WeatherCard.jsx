import React from "react";
import "./WeatherCard.css";
import ReactAnimatedWeather from "react-animated-weather";


function WeatherCard({ weather, toFahrenheit, formatTime , getDay}) {

function getAnimatedIcon(condition) {
  const text = condition.toLowerCase();

  if (text.includes("cloud")) return "CLOUDY";
  if (text.includes("rain")) return "RAIN";
  if (text.includes("clear")) return "CLEAR_DAY";
  if (text.includes("snow")) return "SNOW";
  if (text.includes("thunder")) return "WIND";

  return "PARTLY_CLOUDY_DAY";
}

function getBackground(condition) {
  const text = condition.toLowerCase();

  if (text.includes("clear")) return "#facc15"; // yellow
  if (text.includes("cloud")) return "#94a3b8"; // gray
  if (text.includes("rain")) return "#0ea5e9"; // blue

  return "#1e293b";
}

<div
  style={{
    background: weather ? getBackground(weather.condition) : "#1e293b",
    minHeight: "100vh",
    padding: "20px",
  }}
></div>;

  return (



    <div className="card">
      <p className="day">{getDay(weather.time)}</p>
      <h2>{weather.city}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
        alt="weather icon"
        className="icon"
      />

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