const express = require("express");
const auth = require("../middleware/auth");
const FoodLog = require("../model/foodLog");
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    serving_size_g,
    calories,
    carbohydrates_total_g,
    cholesterol_mg,
    fat_total_g,
    fat_saturated_g,
    fiber_g,
    potassium_mg,
    protein_g,
    sodium_mg,
    sugar_g,
    imageUrl,
  } = req.body;

  try {
    const newLog = new FoodLog({
      name,
      serving_size_g,
      calories,
      carbohydrates_total_g,
      cholesterol_mg,
      fat_total_g,
      fat_saturated_g,
      fiber_g,
      potassium_mg,
      protein_g,
      sodium_mg,
      sugar_g,
      imageUrl,
    });

    await newLog.save();
    res.status(201).send("✅ Food log saved");
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).send("❌ Failed to save log");
  }
});

router.get("/", async (req, res) => {
  try {
    const logs = await FoodLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).send("Failed to fetch logs");
  }
});

module.exports = router;
