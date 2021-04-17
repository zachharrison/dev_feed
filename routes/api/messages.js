const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @DESC      CREATE A NEW MESSAGE
// @ROUTE     POST /api/messages
// @ACCESS    PRIVATE
router.post('/', auth, async (req, res) => {
  const from = await User.findOne({ _id: req.body.from }).select('name');
  const to = await User.findOne({ _id: req.body.to }).select('name');
  // console.log('FROM TEST', from);
  // console.log('TO TEST', to);
  try {
    const conversation = await Conversation.findOne({
      recipients: {
        $all: [from, to],
      },
    });

    if (!conversation) {
      // const conversation = await Conversation.findOneAndUpdate(
      //   {
      //     recipients: {
      //       $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
      //     },
      //   },
      //   {
      //     recipients: [from, to], // REMOVE ID AND JUST LEAVE THE OBJECT
      //     lastMessage: req.body.text,
      //     date: Date.now(),
      //   },
      //   { upsert: true, new: true, setDefaultsOnInsert: true }
      // );

      const recipients = [to, from];

      const newConversation = new Conversation({
        recipients,
        lastMessage: req.body.text,
        date: Date.now(),
      });

      console.log(newConversation);

      const conversation = await newConversation.save();

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
// @ROUTE     GET /api/messages/conversations
// @ACCESS    PRIVATE
router.get('/conversations', auth, async (req, res) => {
  const from = mongoose.Types.ObjectId(req.user.id);
  console.log('test', from);
  try {
    // const conversations = await Conversation.aggregate([
    //   {
    //     $lookup: {
    //       from: 'user',
    //       localField: '_id',
    //       foreignField: 'recipients[1]._id',
    //       as: 'recipientObj',
    //     },
    //   },
    // ]).match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } });

    const conversations = await Conversation.find({
      recipients: {
        $elemMatch: {
          _id: from,
        },
      },
    });

    console.log('THE CONVERSATIONS ARE', conversations);
    res.json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DESC      GET ALL MESSAGES FROM A CONVERSATION WITH ITS ID
// @ROUTE     GET /api/messages/conversations/:id
// @ACCESS    PRIVATE
router.get(
  '/conversations/:id',
  auth,
  checkObjectId('id'),
  async (req, res) => {
    try {
      const messages = await Message.find({
        conversation: req.params.id,
      });
      if (!messages) {
        return res.status(404).json({ msg: 'Conversation not found' });
      }
      res.json(messages);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
