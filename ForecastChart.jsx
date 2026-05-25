import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function ForecastChart({ data }) {
  const chartData = data.map((day) => ({
    day: new Date(day.day).toLocaleDateString("en-US", {
      weekday: "short",
    }),

    temp: Math.round(day.max),
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        marginTop: "30px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="day" stroke="#3a2cbd" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#594bd4"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;
