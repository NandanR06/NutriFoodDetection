const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chatbotRoute = require("./routes/chatboot");


const authRoutes = require("./routes/authRoutes");
const foodLogRoutes = require("./api/track-food");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/track-food", foodLogRoutes);
app.use("/api/chatbot", chatbotRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
