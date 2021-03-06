const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'conversations',
  },
  to: {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  // from: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user',
  // },
  from: {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('messages', MessageSchema);
