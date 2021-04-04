const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');

router.post('/', auth, async (req, res) => {
  const from = req.user.id;
  const to = req.body.to;

  await Conversation.findOneAndUpdate(
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
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function (err, conversation) {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
      } else {
        let message = new Message({
          conversation: conversation._id,
          to,
          from,
          text: req.body.text,
        });

        // req.io.sockets.emit('messages', req.body.body);

        message.save((err) => {
          if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(message);
            res.end(
              JSON.stringify({
                message: 'Success',
                conversationId: conversation._id,
              })
            );
          }
        });
      }
    }
  );
});

module.exports = router;
