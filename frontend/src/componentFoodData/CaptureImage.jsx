// frontend/components/CaptureImage.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptureImage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = () => {
    navigate('/foodinfo');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-100 to-red-100 flex items-center justify-center p-8">
      <div className="w-3/4 bg-white p-6 rounded-xl shadow-lg">
        <video ref={videoRef} autoPlay className="w-full rounded shadow mb-4" />
        <div className="flex justify-between">
          <button onClick={startCamera} className="bg-green-500 px-6 py-2 text-white font-medium rounded hover:bg-green-600 transition">Access Camera</button>
          <button onClick={captureImage} className="bg-blue-500 px-6 py-2 text-white font-medium rounded hover:bg-blue-600 transition">Recognize</button>
        </div>
      </div>
    </div>
  );
};

export default CaptureImage;
