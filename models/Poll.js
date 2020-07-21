const { model, Schema } = require('mongoose');

const pollSchema = new Schema({
  choice: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model('Poll', pollSchema);
