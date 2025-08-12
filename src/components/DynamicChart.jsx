import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const navigate = useNavigate();

  const fetchData = async (email) => {
    if (!email) return;
    setLoading(true);
    try {
      const formula = `EMAIL="${email}"`; // Column name must match Airtable exactly
      const url = `https://api.airtable.com/v0/${
        process.env.VITE_AIRTABLE_BASE_ID
      }/${
        process.env.VITE_AIRTABLE_TABLE_NAME
      }?filterByFormula=${encodeURIComponent(formula)}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.VITE_AIRTABLE_TOKEN}`,
        },
      });

      setData(res.data.records);
    } catch (error) {
      console.error("Error fetching Airtable data", error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    const handleMessage = (event) => {

        console.log(event);
      // Only allow messages from your Softr domain
      if (event.origin !== "https://sonny80979.softr.app") return;

      if (event.data?.type === "USER_DATA") {
        console.log("Received user data from Softr:", event.data.payload);
        // You can now store it in state, Redux, context, etc.
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  if (loading)
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-blue-400 text-white">
        Loading...
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      <button
        className="bg-blue-400 rounded-2xl p-4 cursor-pointer"
        onClick={() => navigate("/about")}
      >
        About
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Dynamic Line Chart
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
          <XAxis dataKey="month" />
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
