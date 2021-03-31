const express = require('express');
const router = express.Router();

// @DESC      TEST ROUTE
// @ROUTE     GET /api/posts
// @ACCESS    PUBLIC
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
