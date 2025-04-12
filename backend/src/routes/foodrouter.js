const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// detect-food route
// This route handles food detection by sending a query to the CalorieNinja API
router.get("/detect-food", async (req, res) => {
  try {
    const { query } = req.query;

    console.log("Query received:", query);

    const response = await axios.get(
      "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      {
        headers: { "X-Api-Key": process.env.API },
      }
    );

    console.log("API Response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching food data:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch food nutrition details" });
  }
});

module.exports = router;
