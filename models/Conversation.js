const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  recipients: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
        ref: 'user',
      },
    },

    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
        ref: 'user',
      },
    },
  ],
  lastMessage: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('conversations', ConversationSchema);
