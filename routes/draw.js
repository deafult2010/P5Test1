const express = require('express');
const router = express.Router();

const Draw = require('../models/Draw');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
  const { name, desc, user, thumbnail } = req.body;

  const newDraw = new Draw({
    name: name,
    desc: desc,
    user: user,
    thumbnail: thumbnail,
  });

  newDraw.save().then((draw) => res.json(draw));
});

module.exports = router;
