import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
        height: "200px",
        minHeight: "200px",
        marginTop: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(235, 213, 213, 0.87)" strokeDasharray="4 4" />

          <XAxis dataKey="day" stroke="#ffffff" />

          <YAxis stroke="#ffffff" />

          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "12px",
              border: "none",
            }}
          />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#594bd4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;