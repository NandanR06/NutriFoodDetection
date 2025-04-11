import React, { useState } from 'react';

const CaptureImage = ({ onImageCapture }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 border rounded-2xl shadow-md">
      <input type="file" onChange={handleImageChange} className="mb-4" />
      {image && <img src={image} alt="Captured" className="rounded-xl" />}
    </div>
  );
};

export default CaptureImage;