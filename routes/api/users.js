const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send(req.body);
  }
);

module.exports = router;
