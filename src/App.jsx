import { useState, useEffect, useRef } from "react";
import "./App.css";
import WeatherCard from "../WeatherCard";
import Forecast from "../Forecast";
import { searchWeather, getForecast } from "../weatherService";
import ForecastChart from "../ForecastChart";
import Footer from "../footer.jsx";
import cloudsVideo from "./Videos/Clouds.mp4";
import rainVideo from "./Videos/Rain.mp4";
import sunnyVideo from "./Videos/Sunny.mp4";
import nightVideo from "./Videos/Night.mp4";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

 useEffect(() => {
   function handleClickOutside(event) {
     if (searchRef.current && !searchRef.current.contains(event.target)) {
       setSuggestions([]);
     }
   }

   document.addEventListener("mousedown", handleClickOutside);

   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, []);



  function getDay(timestamp) {
    const date = new Date(timestamp * 1000);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  async function findCity(cityName) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=efa9d0bfea1a536aaa9c77e4bedcbb45`,
    );

    const data = await response.json();
    console.log("Geocoding results:", data);
    return data[0];
  }

  async function getCitySuggestions(cityName) {
    if (cityName.length < 2) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=efa9d0bfea1a536aaa9c77e4bedcbb45`,
    );

    const data = await response.json();

    setSuggestions(data);
  }

  async function handleSearch(searchCity = city) {
    setLoading(true);

    const location = await findCity(searchCity);

    if (!location) {
      alert("City not found ❌");
      setLoading(false);
      return;
    }

  
    searchWeather(location.name).then((data) => {
      if (data.cod !== 200 && data.cod !== "200") {
        alert("City not found ❌");
        setLoading(false);
        return;
      }

      if (!data.main) {
        alert("Weather failed to load");
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

        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      });

      getForecast(data.coord.lat, data.coord.lon).then((forecastData) => {
        setForecast(
          forecastData.daily.time.map((day, index) => ({
            day: day,
            max: forecastData.daily.temperature_2m_max[index],
            min: forecastData.daily.temperature_2m_min[index],
            code: forecastData.daily.weathercode[index],
          })),
        );
      });

      setLoading(false);
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=efa9d0bfea1a536aaa9c77e4bedcbb45&units=metric`,
        )
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
              icon: data.weather[0].icon,

              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
            });

            return getForecast(lat, lon);
          })

          .then((forecastData) => {
            setForecast(
              forecastData.daily.time.map((day, index) => ({
                day: day,
                max: forecastData.daily.temperature_2m_max[index],
                min: forecastData.daily.temperature_2m_min[index],
                code: forecastData.daily.weathercode[index],
              })),
            );
          });
      },

      () => {
        handleSearch("Pretoria");
      },
    );
  }, []);

  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  function toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  function getBackgroundVideo() {
    if (!weather) return cloudsVideo;

    const condition = weather.condition.toLowerCase();

    if (condition.includes("rain")) {
      return rainVideo;
    }

    if (condition.includes("clear")) {
      return sunnyVideo;
    }

    if (condition.includes("cloud")) {
      return cloudsVideo;
    }

    return nightVideo;
  }

  return (
    <div className="app">
      <video
        src={getBackgroundVideo()}
        className="video-cover"
        autoPlay
        muted
        loop
      ></video>
      <div className="container">
        <div className="content-video">
          <h2>Weather Forecast</h2>

          <div className="search-bar" ref={searchRef}>
            <input
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => {
                setCity(e.target.value);

                if (e.target.value.trim() === "") {
                  setSuggestions([]);
                  return;
                }

                getCitySuggestions(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  setSuggestions([]);
                }
              }}
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((place, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => {
                      setCity(place.name);
                      setSuggestions([]);
                      handleSearch(place.name);
                    }}
                  >
                    {place.name}, {place.country}
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => handleSearch()}>Search Weather</button>
          </div>

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
          {forecast.length > 0 && <ForecastChart data={forecast} />}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
