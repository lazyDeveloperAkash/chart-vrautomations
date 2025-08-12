import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DynamicChart() {
  const [data, setData] = useState([
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 20 },
    { name: "Apr", value: 27 },
    { name: "May", value: 18 },
  ]);

  // Simulate live data updates every 2 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setData((prev) => {
//         const newValue = Math.floor(Math.random() * 50) + 10;
//         const newMonth = `M${prev.length + 1}`;
//         return [...prev.slice(1), { name: newMonth, value: newValue }];
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Dynamic Line Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb" // Tailwind's blue-600
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
