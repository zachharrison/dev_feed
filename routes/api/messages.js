const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');

router.post('/', auth, async (req, res) => {
  const from = req.user.id;
  const to = req.body.to;

  try {
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
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
