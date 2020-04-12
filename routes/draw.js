const express = require('express');
const router = express.Router();

const Draw = require('../models/Draw');

// @route   POST api/draw
// @desc    Save a drawing
// @access  Public
router.post('/', (req, res) => {
  const { name, desc, user, lines, thumbnail } = req.body;

  const newDraw = new Draw({
    name: name,
    desc: desc,
    user: user,
    lines: lines,
    thumbnail: thumbnail,
  });

  newDraw.save().then((draw) => res.json(draw));
});

// @route GET api/draw
// @description Get All drawings
// @access Public
router.get('/', (req, res) => {
  Draw.find()
    .sort({ date: -1 })
    .then((draw) => res.json(draw));
});

// @route GET api/draw
// @description Get drawing by id
// @access Public
router.get('/:id', (req, res) => {
  Draw.findById(req.params.id).then((draw) => res.json(draw));
});

// @route DELETE api/draw/:id
// @description Delete an draw
// @access Public
router.delete('/:id', (req, res) => {
  Draw.findById(req.params.id)
    .then((draw) =>
      draw.remove().then(() => res.json({ id: req.params.id, success: true }))
    )
    .catch((err) =>
      // res.status(404).json({ id: req.params.id, success: false })
      // Allow user to delete already deleted id.
      res.json({ id: req.params.id, success: false })
    );
});
module.exports = router;
