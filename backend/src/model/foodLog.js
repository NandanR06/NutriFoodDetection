const mongoose = require("mongoose");

const foodDataSchema = new mongoose.Schema({
  name: { type: String },
  calories: { type: Number },
  carbohydrates_total_g: { type: Number },
  cholesterol_mg: { type: Number },
  fat_total_g: { type: Number },
  fiber_g: { type: Number },
  potassium_mg: { type: Number },
  protein_g: { type: Number },
  sodium_mg: { type: Number },
  sugar_g: { type: Number },
  imageUrl: { type: String }, // Optional: if you're storing image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Foodlog", foodDataSchema);
