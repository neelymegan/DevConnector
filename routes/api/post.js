const express = require('express');
// express router
const router = express.Router();

// @route   Get api/post
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('post route'));

module.exports = router;
