const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is requred!')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // see if user exists, send error (no multiple emails)
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get users gravatar (based on email) to be part of user and create user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({ name, email, avatar, password });

      // Encrypt password using bcrypt, save user
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
      res.send('user registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

    //res.send('User route');
  }
);

module.exports = router;
