const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// UPLOAD THE IMAGE TO CLOUDINARY TO GET THE URL

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// SAVE FOOD DATA TO DATABASE
router.post("/foodData", async (req, res) => {
  try {
    const foodItem = req.body;

    const foodLog = new FoodLog({
      items: [foodItem], // wrap single item in array
      // userId: optional if you're not using auth yet
    });

    await foodLog.save();
    res.status(201).json({ message: "Food data saved successfully!" });
  } catch (error) {
    console.error("Error saving food data:", error);
    res.status(500).json({ message: "Server error saving food data" });
  }
});

module.exports = router;
