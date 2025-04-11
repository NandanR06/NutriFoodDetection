const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_API_KEY,
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  const formattedPrompt = `
    Give nutritional information for the food item "${prompt}".
    Include the following:
    - Calories
    - Protein
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

    const message = completion.choices[0]?.message?.content;
    res.status(200).json({ data: message });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
