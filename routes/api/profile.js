const express = require('express');
const router = express.Router();

// @DESC      TEST ROUTE
// @ROUTE     GET /api/profile
// @ACCESS    PUBLIC
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
