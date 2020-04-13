const mongoose = require('mongoose');

var DrawSchema = mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  user: {
    type: String,
  },
  lines: [
    {
      c: { type: String },
      s: { type: String },
      points: [
        {
          x: {
            type: Number,
          },
          y: {
            type: Number,
          },
        },
      ],
    },
  ],
  thumbnail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('draw', DrawSchema);
