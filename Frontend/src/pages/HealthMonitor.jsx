// src/pages/HealthMonitor.jsx
import React, { useEffect, useState, useRef } from "react";
import Api from "../utils/Api"; // ✅ Using Api utility

const ZERO_DATA = {
  heartRate: 0,
  temperature: 0,
  oxygenLevel: 0,
  timestamp: new Date().toISOString(),
};

const HealthMonitor = () => {
  const [data, setData] = useState(ZERO_DATA);
  const [monitoring, setMonitoring] = useState(false);
  const intervalRef = useRef(null);

  const fetchHealthData = async () => {
    try {
      const res = await Api.get("/health/monitor"); // ✅ Using your Api
      if (res && res.data) setData(res.data);
    } catch (err) {
      console.error("Error fetching health data:", err);
    }
  };

  const startMonitoring = () => {
    if (monitoring) return;
    setMonitoring(true);
    fetchHealthData();
    intervalRef.current = setInterval(fetchHealthData, 5000);
  };

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMonitoring(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl w-[800px] p-8 text-center border border-green-200">
        {/* 🩺 Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Health Monitoring Dashboard
        </h2>

        {/* 📊 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-green-50 border border-green-300 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-gray-700">💓 Heart Rate</p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {data?.heartRate ?? 0} bpm
            </p>
          </div>

          <div className="p-6 bg-green-50 border border-green-300 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-gray-700">🌡 Temperature</p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {data?.temperature ?? 0} °C
            </p>
          </div>

          <div className="p-6 bg-green-50 border border-green-300 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-gray-700">🫁 Oxygen Level</p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {data?.oxygenLevel ?? 0} %
            </p>
          </div>

          <div className="p-6 bg-green-50 border border-green-300 rounded-xl shadow-sm">
            <p className="text-lg font-semibold text-gray-700">⏰ Last Update</p>
            <p className="text-2xl font-bold text-green-700 mt-2">
              {new Date(data?.timestamp ?? new Date()).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* 🟢 Button */}
        {!monitoring ? (
          <button
            onClick={startMonitoring}
            className="bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-all"
          >
            Start Monitoring
          </button>
        ) : (
          <button
            onClick={stopMonitoring}
            className="bg-red-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-red-700 transition-all"
          >
            Stop Monitoring
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthMonitor;
