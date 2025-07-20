import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Firebase setup file
import { ref, onValue } from "firebase/database";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const App = () => {
  const [sensorData, setSensorData] = useState({ Vibration: 0, Current: 0, Temperature: 0 });
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const sensorRef = ref(db, "/Sensor");

    // Listen for real-time updates
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);

        // Append new data to graphData
        setGraphData((prev) => [
          ...prev.slice(-19), // Keep only the last 20 readings
          { time: new Date().toLocaleTimeString(), ...data },
        ]);
      }
    });
  }, []);

  // Fault Condition Check
  const isFault = sensorData.Vibration > 700 || sensorData.Current > 700 || sensorData.Temperature > 50;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center">🚀 Live Sensor Dashboard</h1>

      {/* Sensor Values */}
      <div className="grid grid-cols-3 gap-4 text-center my-5">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Vibration</h2>
          <p className="text-xl">{sensorData.Vibration}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Current</h2>
          <p className="text-xl">{sensorData.Current}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Temperature</h2>
          <p className="text-xl">{sensorData.Temperature}°C</p>
        </div>
      </div>

      {/* Fault Condition */}
      <div className={`p-4 text-center rounded-lg ${isFault ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
        <h2 className="text-lg font-semibold">{isFault ? "⚠️ Faulty Motor Detected!" : "✅ Motor is Running Normally"}</h2>
      </div>

      {/* Graphs */}
      <h2 className="text-lg font-semibold mt-5">📊 Sensor Data Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Vibration Graph */}
        <Graph title="Vibration" dataKey="Vibration" data={graphData} strokeColor="#FF5733" />
        {/* Current Graph */}
        <Graph title="Current" dataKey="Current" data={graphData} strokeColor="#33FF57" />
        {/* Temperature Graph */}
        <Graph title="Temperature" dataKey="Temperature" data={graphData} strokeColor="#3380FF" />
      </div>
    </div>
  );
};

// Graph Component
const Graph = ({ title, dataKey, data, strokeColor }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-center font-semibold">{title} Over Time</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={strokeColor} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default App;
