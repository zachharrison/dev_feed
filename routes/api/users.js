const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @DESC      REGISTER USER
// @ROUTE     POST /api/users
// @ACCESS    PUBLIC
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with atleast 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // CHECK IF USER ALREADY EXISTS
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // GET USERS GRAVATAR
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // ENCRYPT PASSWORD
      const salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // RETURN JSONWEBTOKEN

      res.send('User registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
