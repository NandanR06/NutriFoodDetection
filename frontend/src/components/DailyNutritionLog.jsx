import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// daily nutrition log component
// This component fetches and displays the user's daily nutrition logs from the server
// and allows users to click on a log to view more details.
const DailyNutritionLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/track-food");
      setLogs(response.data);
      console.log("📦 Fetched logs:", logs);
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setError("Failed to load nutrition logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleData = async (log) => {
    return navigate("/foodinfo", { state: { log } });
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-100 to-red-100 p-6 overflow-y-auto pt-20">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 ">
        Daily Nutrition Log
      </h2>

      {loading && <p className="text-blue-700 text-center">Loading logs...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && logs.length > 0
        ? logs.map((log, index) => (
            <motion.div
              key={index}
              onClick={() => {
                handleData(log);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:border-red-500 transition-all duration-300 mb-4"
            >
              <h3 className="text-lg font-semibold text-blue-800">
                {log.name}
              </h3>

              <p className="text-sm text-gray-600">
                Logged on:
                {new Date(log.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </motion.div>
          ))
        : !loading &&
          !error && (
            <p className="text-gray-600 text-center">No logs available.</p>
          )}
    </div>
  );
};

export default DailyNutritionLog;
