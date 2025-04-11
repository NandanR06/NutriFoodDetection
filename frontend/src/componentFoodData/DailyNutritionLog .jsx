import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DailyNutritionLog = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/track-food', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(res.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    log.item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4">Daily Nutrition Log</h2>
      <input
        type="text"
        placeholder="Search food item..."
        className="w-full px-3 py-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredLogs.length === 0 ? (
        <p className="text-gray-500">No items found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredLogs.map((log, index) => (
            <li key={index} className="border p-2 rounded shadow-sm">
              <div className="font-medium">{log.item}</div>
              <div className="text-sm text-gray-600">
                Calories: {log.calories} kcal<br />
                Protein: {log.protein}g, Carbs: {log.carbs}g, Fat: {log.fat}g
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyNutritionLog;
