const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');

// @DESC      CREATE A NEW MESSAGE
// @ROUTE     POST /api/messages
// @ACCESS    PRIVATE
router.post('/', auth, async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;

  try {
    const conversation = await Conversation.findOne({
      recipients: {
        $all: [from, to],
      },
    });

    if (!conversation) {
      const conversation = await Conversation.findOneAndUpdate(
        {
          recipients: {
            $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
          },
        },
        {
          recipients: [from, to],
          lastMessage: req.body.text,
          date: Date.now(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const newMessage = new Message({
        conversation: conversation._id,
        to,
        from,
        text: req.body.text,
      });

      const message = await newMessage.save();

      res.json(message);
    } else {
      const conversation = await Conversation.findOneAndUpdate(
        {
          recipients: {
            $all: [from, to],
          },
        },
        {
          recipients: [from, to],
          lastMessage: req.body.text,
          date: Date.now(),
        },
        { upsert: true, setDefaultsOnInsert: true }
      );

      const newMessage = new Message({
        conversation: conversation._id,
        to,
        from,
        text: req.body.text,
      });

      const message = await newMessage.save();

      res.json(message);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      GET ALL CONVERSATIONS FOR A USER
// @ROUTE     GET /api/messages
// @ACCESS    PRIVATE
router.get('/', auth, async (req, res) => {
  const from = mongoose.Types.ObjectId(req.user.id);

  try {
    const conversations = await Conversation.aggregate([
      {
        $lookup: {
          from: 'user',
          localField: 'recipients',
          foreignField: '_id',
          as: 'recipientObj',
        },
      },
    ]).match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } });

    res.json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
