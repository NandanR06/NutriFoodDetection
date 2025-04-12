// frontend/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import Navbar from '../componentFoodData/Navbar';
import CaptureImage from '../componentFoodData/CaptureImage';
import axios from 'axios';
import DailyNutritionLog from '../components/DailyNutritionLog';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchFoodInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/track-food`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const items = response.data[0]?.items || [];
        setData(items);
      } catch (error) {
        console.error('Error fetching food info:', error);
      }
    };
    fetchFoodInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100  overflow-hidden ">
      <Navbar />
      <div className="flex">
        <aside className="w-1/4 p-4 h-screen bg-gradient-to-b from-blue-100 to-red-100 overflow-hidden">
          <DailyNutritionLog  />
        </aside>
        <main className="w-3/4 pl-1 h-screen overflow-hidden pt-10">
          <CaptureImage />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;