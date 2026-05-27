import "./Forecast.css";

function Forecast({ data }) {
  function getDay(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
  }

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";

    if (code <= 2) return "☁️";

    if (code >= 51 && code <= 67) return "🌧️";

    if (code >= 71 && code <= 77) return "❄️";

    if (code >= 95) return "⛈️";

    return "🌤️";
  }

  return (
    <div className="forecast-container">
      {data.map((day, index) => (
        <div className="forecast-card" key={index}>
          <p className="forecast-day">{getDay(day.day)}</p>

          <div className="forecast-icon">{getWeatherIcon(day.code)}</div>

          <p className="forecast-temp">{Math.round(day.max)}°</p>

          <p className="forecast-min">{Math.round(day.min)}°</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
