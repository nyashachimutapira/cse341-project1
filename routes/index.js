const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Hello World, This is the home router');
});

router.get('/profile', (req, res) => {
  res.send('Hello World, This is the profile router');
});

router.get('/login', (req, res) => {
  res.send('Hello World, This is the login router');
});

router.get('/logout', (req, res) => {
  res.send('Hello World, This is the logout router');
});

module.exports = router;
