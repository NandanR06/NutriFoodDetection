import React from 'react';

const DailyNutritionLog = ({ logs }) => {
  return (
    <div className="p-4 mt-4">
      <h2 className="text-xl font-bold mb-2">Daily Log</h2>
      {logs.map((log, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-xl mb-2">
          <p><strong>Date:</strong> {log.date}</p>
          <p><strong>Total Calories:</strong> {log.totalCalories}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyNutritionLog;