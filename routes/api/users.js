const express = require('express');
const router = express.Router();

// @DESC      TEST ROUTE
// @ROUTE     GET /api/users
// @ACCESS    PUBLIC
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
