// Public Modules
const express = require('express');
const router = express.Router();

// App Modules
const logService = require('../services/LogService');


router.post('/ipAddress', (req, res) => {
    const params = {
        ipAddress: req.body.ip
    };

    logService.logVisit(params, (error, status) => {
        if (error) {
            res.status(error.status).json(error.msg);
        } else {
            res.status(200).json(status);
        }
    });
});

module.exports = router;
