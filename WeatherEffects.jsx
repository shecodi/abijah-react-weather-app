import "./WeatherEffects.css";

function WeatherEffects({ condition }) {
  const text = condition.toLowerCase();

  return (
    <>
      {text.includes("rain") && (
        <div className="rain">
          {Array.from({ length: 80 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
      )}

      {text.includes("cloud") && (
        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>
      )}

      {text.includes("clear") && <div className="sun-glow"></div>}

      {text.includes("snow") && (
        <div className="snow">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
      )}
    </>
  );
}

export default WeatherEffects;