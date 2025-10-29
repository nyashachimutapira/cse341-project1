const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongoose.connection.db.collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongoose.connection.db.collection('users').findOne({ _id: userId });
    
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getSingle,
};