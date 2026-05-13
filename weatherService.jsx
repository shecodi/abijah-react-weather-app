

export function searchWeather(city) {
  const apiKey = "efa9d0bfea1a536aaa9c77e4bedcbb45";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}&units=metric`;

  return fetch(url).then((response) => response.json());
}

export function getForecast(lat, lon) {
  const apiKey = "efa9d0bfea1a536aaa9c77e4bedcbb45";

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return fetch(url).then((response) => response.json());
}