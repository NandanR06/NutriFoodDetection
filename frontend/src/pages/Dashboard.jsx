import React, { useState, useEffect } from 'react';
import CaptureImage from '../components/CaptureImage';
import FoodAnalysisResult from '../components/FoodAnalysisResult';
import DailyNutritionLog from '../components/DailyNutritionLog';
import axios from 'axios';

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [logs, setLogs] = useState([]);

  const handleImageCapture = (imgData) => {
    setImage(imgData);
    // Simulate food analysis for now
    setFoodItems([
      { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 }
    ]);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/track-food', { items: foodItems }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchLogs();
  };

  const fetchLogs = async () => {
    // Dummy logs for now
    setLogs([
      { date: new Date().toLocaleDateString(), totalCalories: 95 }
    ]);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nutrition Dashboard</h1>
      <CaptureImage onImageCapture={handleImageCapture} />
      {foodItems.length > 0 && <FoodAnalysisResult foodItems={foodItems} onConfirm={handleConfirm} />}
      <DailyNutritionLog logs={logs} />
    </div>
  );
};

export default Dashboard;