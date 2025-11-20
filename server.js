const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', require('./routes'));

const start = async () => {
  try {
    console.log("DEBUG: MONGODB_URI =", process.env.MONGODB_URI);
    await connectDB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();
