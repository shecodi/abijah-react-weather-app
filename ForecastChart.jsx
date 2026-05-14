import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function ForecastChart({ data }) {
  const chartData = data.map((day) => ({
    day: new Date(day.day).toLocaleDateString("en-US", { weekday: "short" }),

    temp: Math.round(day.max),
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 250,
        marginTop: "30px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#ffffff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;