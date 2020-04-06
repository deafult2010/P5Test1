const mongoose = require('mongoose');

const DrawLineSchema = mongoose.Schema({
  picID: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
    required: true,
  },
  points: [
    {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('drawLine', DrawLineSchema);
