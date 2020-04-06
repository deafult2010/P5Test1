const express = require('express');
const router = express.Router();

const DrawLine = require('../models/DrawLine');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
  const { picID, color, points } = req.body;

  const newLine = new DrawLine({
    picID: picID,
    color: color,
    points: points,
  });

  newLine.save().then((drawLine) => res.json(drawLine));
});

module.exports = router;
