// Public Modules
const async = require('async');
const express = require('express');
const router = express.Router();

// App Modules
const contactService = require('../services/ContactService');


router.post('/contact', (req, res) => {
    const params = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        ipAddress: req.body.ip
    };

    contactService.contactOwner(params, (error, status) => {
        if (error) {
            res.status(error.status).json(error.msg);
        } else {
            res.status(200).json(status);
        }
    })       
});

module.exports = router;
