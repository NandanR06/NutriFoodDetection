const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// ai service
// This service uses OpenRouter API to generate nutritional information for food items based on user input.
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_API_KEY,
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // stucture the prompt for the OpenRouter API
  // This prompt is structured to request detailed nutritional information for a specific food item.
  const formattedPrompt = `
    Give nutritional information for the food item "${prompt}".
    Include the following:
    - name
    - FoodCategory
    - calories
    - protein
    - Carbohydrates
    - Fats
    - Vitamin A
    - Vitamin C
    - Calcium
    - Iron

    Return the result ONLY as a JSON array. Start with [ and end with ].
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-distill-qwen-32b:free",
      messages: [{ role: "user", content: formattedPrompt }],
    });

    // Check if response is valid
    if (
      !completion ||
      !completion.choices ||
      !completion.choices[0] ||
      !completion.choices[0].message ||
      !completion.choices[0].message.content
    ) {
      return res
        .status(500)
        .json({ error: "Invalid response from OpenRouter API" });
    }

    const message = completion.choices[0].message.content;
    res.status(200).json({ data: message });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = router;
