import React from "react";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

function WeatherIcon({ condition }) {
  const text = condition.toLowerCase();

  if (text.includes("cloud")) return <WiCloud size={50} />;
  if (text.includes("rain")) return <WiRain size={50} />;
  if (text.includes("clear")) return <WiDaySunny size={50} />;

  return <WiDaySunny size={50} />;
}


export default WeatherIcon; 