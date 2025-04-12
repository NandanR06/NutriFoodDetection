// This file configures the Cloudinary service for image uploads and management.
// It initializes the Cloudinary library with the credentials stored in environment variables.
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;
