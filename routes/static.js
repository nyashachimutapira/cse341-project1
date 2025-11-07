// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.json(contact);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Export the router
module.exports = router;