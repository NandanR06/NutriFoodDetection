const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// uplaod middleware for handling image uploads
// This middleware uses multer and Cloudinary to handle image uploads in the application.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "detected_food_images",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
