const express = require('express');
const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
router.get('/home', (req, res) => {
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

// Use the router
app.use('/', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});