import React, { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import useFoodStore from "../../src/foodstore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Camera = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const { foodName, setFoodName } = useFoodStore();
  const [foodDataset, setFoodDataset] = useState([]);
  const [log, setLog] = useState([]);
  const navigate = useNavigate();

  const allowedFoods = [
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
  ];

  // Preload model
  useEffect(() => {
    cocoSsd.load().then(setModel).catch((err) => {
      console.error("Model load error:", err);
      toast.error("Failed to load model.");
    });
  }, []);

  // Clean up video stream
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Camera access error:", error);
      toast.error("Cannot access camera.");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const uploadImage = async () => {
    const dataUrl = captureImage();
    const file = dataURLtoFile(dataUrl, "detected-food.jpg");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/food/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        toast.success("📤 Image uploaded!");
        return result.url;
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload error");
    }
    return null;
  };

  const detectFood = async () => {
    if (!model) {
      toast.error("Model not ready. Please wait.");
      return;
    }

    setLoading(true);
    try {
      const predictions = await model.detect(videoRef.current);
      const foodItems = predictions.filter((p) => allowedFoods.includes(p.class));

      if (foodItems.length > 0) {
        const detected = foodItems[0];
        const detectedFood = detected.class;
        setFoodName(detectedFood);

        const newEntry = {
          name: detectedFood,
          confidence: detected.score.toFixed(2),
          time: new Date().toLocaleString(),
        };
        setFoodDataset((prev) => [...prev, newEntry]);

        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          await logFoodData(detectedFood, uploadedImageUrl);
        }
      } else {
        setFoodName("No food detected");
        toast.warn("🍽 No food detected. Try again!");
      }
    } catch (err) {
      console.error("Detection error:", err);
      toast.error("Error during detection.");
    }
    setLoading(false);
  };

  const logFoodData = async (food, imageUrl) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/foods/detect-food", {
        params: { query: food },
      });

      const item = data.items[0];
      const foodInfo = {
        name: item.name,
        calories: item.calories,
        protein_g: item.protein_g,
        carbohydrates_total_g: item.carbohydrates_total_g,
        fat_total_g: item.fat_total_g,
        cholesterol_mg: item.cholesterol_mg,
        fiber_g: item.fiber_g,
        sugar_g: item.sugar_g,
        potassium_mg: item.potassium_mg,
        sodium_mg: item.sodium_mg,
        imageUrl,
      };

      setLog(foodInfo);
      console.log("Food info:", log);

      await axios.post("http://localhost:5000/api/track-food", foodInfo, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("✅ Food data saved!");
    } catch (err) {
      console.error("Log error:", err);
      toast.error("Failed to fetch/save food data.");
    }
  };

  const foodInfo = () => {
    if (!foodName || foodName === "No food detected") {
      toast.error("❌ Please detect food first!");
    } else {
      navigate("/foodinfo", { state: { log } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 to-red-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
          🍔 NutriAI
        </h1>
        <ToastContainer />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full md:w-[480px] h-60 md:h-72 rounded-xl border-4 border-gray-300 shadow-md"
          />

          <div className="flex flex-col gap-4">
            <button
              onClick={startCamera}
              className="bg-green-500 hover:bg-green-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md"
            >
              🎥 Start Camera
            </button>
            <button
              onClick={detectFood}
              className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md"
              disabled={loading}
            >
              {loading ? "🔄 Detecting..." : "🔍 Detect Food"}
            </button>
            <button
              onClick={foodInfo}
              className="bg-purple-500 hover:bg-purple-600 transition text-white font-semibold px-6 py-3 rounded-xl shadow-md"
            >
              📊 Get Info
            </button>
          </div>
        </div>

        {foodName && !loading && (
          <div className="text-center mt-4">
            <p className="text-base text-gray-700">Detected:</p>
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
