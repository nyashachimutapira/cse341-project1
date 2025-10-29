// server.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const DataSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: Array,
    image: String
});

const DataModel = mongoose.model('Data', DataSchema);

// Sample data (for testing if DB is empty)
const sampleData = {
    title: "Sample Title",
    description: "Sample description text",
    links: [
        { name: "Google", url: "https://www.google.com" },
        { name: "OpenAI", url: "https://www.openai.com" }
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
};

// Insert sample data into the database if it's empty
DataModel.find().then(data => {
    if (data.length === 0) {
        DataModel.create(sampleData);
    }
});

// GET endpoint to retrieve data
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});