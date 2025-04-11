const express = require('express');
const auth = require('../middleware/auth');
const FoodLog = require('../model/foodLog');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items } = req.body;
  try {
    const newLog = new FoodLog({ userId: req.user.id, items });
    await newLog.save();
    res.status(201).send('Food log saved');
  } catch (err) {
    res.status(500).send('Failed to save log');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).send('Failed to fetch logs');
  }
});

module.exports = router;