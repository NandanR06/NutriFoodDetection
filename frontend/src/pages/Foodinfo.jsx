import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Foodinfo = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const location = useLocation();
  const { log } = location.state || {};
console.log("log", log);
  const nutritionData = log?.info || {};

  useEffect(() => {
    const storedImage = localStorage.getItem("capturedImage");
    if (storedImage) setCapturedImage(storedImage);
  }, []);

  const fields = [
    { label: "Calories", key: "calories" },
    { label: "Protein", key: "protein_g", unit: "g" },
    { label: "Carbohydrates", key: "carbohydrates_total_g", unit: "g" },
    { label: "Fat", key: "fat_total_g", unit: "g" },
    { label: "Sugar", key: "sugar_g", unit: "g" },
    { label: "Calcium", key: "calcium_mg", unit: "mg" },
    { label: "Iron", key: "iron_mg", unit: "mg" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-6 font-sans">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row p-6 max-w-6xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left Section: Image */}
        <div className="flex-1 flex items-center justify-center mb-6 md:mb-0 md:mr-6">
          <img
            src={capturedImage || log?.imageUrl}
            alt="Food"
            className="rounded-xl shadow-lg max-h-[400px] object-cover w-full md:w-auto"
          />
        </div>

        {/* Right Section: Nutrition Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-pink-600">
            {log?.info?.name || "Food"} - Nutrition Breakdown
          </h2>

          <ul className="space-y-4">
          <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Calories
                </span>
                <span className="text-purple-700">{log.calories}</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Carbohydrates                </span>
                <span className="text-purple-700">{log.carbohydrates_total_g}g</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Protein
                </span>
                <span className="text-purple-700">{log.protein_g}g</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Sugar
                </span>
                <span className="text-purple-700">{log.sugar_g}g</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Cholesterol
                </span>
                <span className="text-purple-700">{log.cholesterol_mg}mg</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Fiber
                </span>
                <span className="text-purple-700">{log.fiber_g}g</span>
                
              </li>
              <li
            
                className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium"
              >
                <span className="text-gray-800">
                Sodium
                </span>
                <span className="text-purple-700">{log.sodium_mg}mg</span>
                
              </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Foodinfo;
