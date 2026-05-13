 import React from "react";
import "./Forecast.css";

 function Forecast({ data }) {
   function getDay(timestamp) {
     return new Date(timestamp * 1000).toLocaleDateString("en-US", {
       weekday: "short",
     });
   }

   return (
     <div style={{ display: "flex", justifyContent: "space-around" }}>
       {data.map((day, index) => (
         <div key={index}>
           <p>{getDay(day.dt)}</p>
           <img
             src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
             alt=""
           />
           <p>{Math.round(day.temp.day)}°C</p>
         </div>
       ))}
     </div>
   );
 }

 export default Forecast;
