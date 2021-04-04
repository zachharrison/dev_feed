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

/********************************************************
  CURRENT STATUS: New messages are being created
  and messages are not. This is causing the code
  to create a new conversation everytime a message
  is sent, even if we already have an 
  existing chat with the to and from users.

  SOLUTIONS: Maybe look for a different 
  mongoDB method which checks if table
  exists
***********************************************************/

router.post('/', auth, async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  // console.log(req.body);
  // console.log(req.user.id);
  // console.log('from id, ', from);
  // console.log('to id, ', to);
  try {
    const conversation = await Conversation.findOne({
      recipients: {
        $all: [from, to],
      },
    });

    // console.log(conversation);

    if (!conversation) {
      console.log('created new conversation');
      const conversation = await new Conversation({
        recipients: [from, to],
        lastMessage: req.body.text,
      });

      const newMessage = new Message({
        conversation: conversation._id,
        to,
        from,
        text: req.body.text,
      });

      const message = await newMessage.save();

      res.json(message);
    } else {
      console.log('found conversation');
      const conversation = await Conversation.findOneAndUpdate(
        {
          // recipients: {
          //   $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
          // },
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

    // res.json(conversation);
    // const conversation = await Conversation.findOneAndUpdate(
    //   {
    //     recipients: {
    //       $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
    //     },
    //     recipients: {
    //       $all: [from, to],
    //     },
    //   },
    //   {
    //     recipients: [from, to],
    //     lastMessage: req.body.text,
    //     date: Date.now(),
    //   },
    //   { upsert: true, new: true, setDefaultsOnInsert: true }
    //   { upsert: true, setDefaultsOnInsert: true }
    // );

    // res.json(newMessage);
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

    // .project({
    //   'recipientObj.password': 0,
    //   'recipientObj.__v': 0,
    //   'recipientObj.date': 0,
    // });

    res.json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
