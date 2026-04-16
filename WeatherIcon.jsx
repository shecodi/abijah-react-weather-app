import React from "react";


function WeatherIcon({ condition }) {
  function getWeatherIcon() {
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("thunder")) return "⛈️";

    return "🌤️";
  }

  return <span>{getWeatherIcon()}</span>;
}

export default WeatherIcon; 