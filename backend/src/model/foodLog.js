const mongoose = require("mongoose");

const foodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoodLog", foodLogSchema);
