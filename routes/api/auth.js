const express = require('express');
// express router
const router = express.Router();

// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('auth route'));

module.exports = router;
