// frontend/components/DailyNutritionLog.js
import React from "react";
import { motion } from "framer-motion";

const DailyNutritionLog = ({ logs = [] }) => {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-100 to-red-100 p-6 overflow-y-auto  pt-20">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Daily Nutrition Log</h2>
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:border-red-500 transition-all duration-300 mb-4"
          >
            <h3 className="text-lg font-semibold text-blue-800">{log.name}</h3>
            <p className="text-sm text-gray-700">Calories: {log.calories || 'N/A'}</p>
            <p className="text-sm text-gray-600">Date: {new Date(log.date || Date.now()).toLocaleDateString()}</p>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No logs available.</p>
      )}
    </div>
  );
};

export default DailyNutritionLog;