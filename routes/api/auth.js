const express = require('express');
const router = express.Router();

// @DESC      TEST ROUTE
// @ROUTE     GET /api/auth
// @ACCESS    PUBLIC
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
