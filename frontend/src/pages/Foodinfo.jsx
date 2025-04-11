import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Foodinfo = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [nutritionData, setNutritionData] = useState({
    Calories: '250 kcal',
    Protein: '12g',
    Carbohydrates: '30g',
    Fat: '8g',
  });

  useEffect(() => {
    const storedImage = localStorage.getItem('capturedImage');
    if (storedImage) setCapturedImage(storedImage);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-4 font-sans">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row p-6 max-w-5xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left: Captured Image */}
        <div className="flex-1 flex items-center justify-center mb-6 md:mb-0 md:mr-6">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured food"
              className="rounded-xl shadow-lg max-h-[400px] object-cover"
            />
          ) : (
            <div className="text-gray-400 italic">No image captured</div>
          )}
        </div>

        {/* Right: Nutrition Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-pink-600">Nutrition Breakdown</h2>
          <ul className="space-y-4">
            {Object.entries(nutritionData).map(([key, value]) => (
              <li key={key} className="bg-gradient-to-r from-pink-100 to-yellow-100 p-4 rounded-lg shadow-md flex justify-between text-lg font-medium">
                <span className="text-purple-700">{key}</span>
                <span className="text-gray-800">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Foodinfo;