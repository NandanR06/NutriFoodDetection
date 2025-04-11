import React, { useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import useFoodStore from "../../src/foodstore";
import Openrouter from "../components/Openrender";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const Camera = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { foodName, setFoodName } = useFoodStore();
  const [foodDataset, setFoodDataset] = useState([]);
  const navigate = useNavigate();


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Camera access error:", error);
    }
  };

  const detectFood = async () => {
    setLoading(true);
    try {
      const model = await cocoSsd.load();
      const predictions = await model.detect(videoRef.current);

      const foodItems = predictions.filter((p) =>
        [
          "banana",
          "apple",
          "sandwich",
          "orange",
          "broccoli",
          "carrot",
          "pizza",
          "donut",
          "cake",
          "hot dog",
        ].includes(p.class)
      );

      if (foodItems.length > 0) {
        const detectedFood = foodItems[0].class;
        setFoodName(detectedFood);

        const newEntry = {
          name: detectedFood,
          confidence: foodItems[0].score.toFixed(2),
          time: new Date().toLocaleString(),
        };
        setFoodDataset((prev) => [...prev, newEntry]);
        handleFoodLog(foodName);
      } else {
        setFoodName("No food detected");
      }
    } catch (err) {
      console.error("Detection error:", err);
    }
    setLoading(false);
  };

  const handleFoodLog = async (food) => {
    try {
      const res = await Openrouter(food);
      if (res) {
        const foodData = JSON.parse(res);
        console.log("Food Data:", foodData);
      } else {
        console.error("Failed to fetch food data");
      }
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };


  const foodInfo =()=>{
if(!foodName){
      toast.error(' Please detect food first!')
  }
  else{
    navigate("/foodinfo");

  }
   


        
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 to-red-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
          🍔 Food Detector
        </h1>
                <ToastContainer />
        

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full md:w-[480px] h-60 md:h-72 rounded-xl border-4 border-gray-300 shadow-md transition-all duration-300"
          />

          <div className="flex flex-col gap-4">
            <button
              onClick={startCamera}
              className="bg-green-500 hover:bg-green-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md text-base md:text-lg"
            >
              🎥 Start Camera
            </button>
            <button
              onClick={detectFood}
              className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md text-base md:text-lg"
            >
              🔍 Detect Food
            </button>
            <button
              onClick={foodInfo}
              className="bg-blue-400 hover:bg-blue-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md text-base md:text-lg"
            >
              Get Information

            </button>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-600 text-lg animate-pulse mt-4">
            Detecting food, please wait...
          </p>
        )}

        {foodName && !loading && (
          <div className="text-center mt-4">
            <p className="text-base text-gray-700">Detected Food:</p>
            <p className="text-2xl md:text-3xl text-green-700 font-bold mt-1">
              {foodName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
