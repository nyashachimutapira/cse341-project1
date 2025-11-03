const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use routes
app.use('/', require('./routes'));

// Connect to DB and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();
