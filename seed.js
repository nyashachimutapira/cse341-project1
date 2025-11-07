// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    return Contact.deleteMany(); // Clear existing contacts
}).then(() => {
    const sampleContacts = [
        { firstName: 'Tafara', lastName: 'Dzungu', email: 'tafaradzungu@gmail.com', favoriteColor: 'Blue', birthday: new Date('1990-01-01') },
        { firstName: 'Kudzai', lastName: 'Mweya', email: 'kudzaimweya@gmail.com', favoriteColor: 'Red', birthday: new Date('1992-02-02') },
        { firstName: 'Farai', lastName: 'Miti', email: 'faraimiti@gmail.com', favoriteColor: 'Green', birthday: new Date('1995-03-03') },
    ];

    return Contact.insertMany(sampleContacts);
}).then(() => {
    console.log('Sample contacts added to the database');
    mongoose.connection.close();
}).catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
});