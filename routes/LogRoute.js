// Public Modules
const express = require('express');
const router = express.Router();

// App Modules
const logService = require('../services/LogService');


router.post('/ipAddress', (req, res) => {
    const params = {
        ipAddress: req.body.ip
    };

    logService.logVisit(params, (error, result) => {
        if (error) {
            res.status(error.status).json(error.msg);
        } else {
            res.status(result.status).json(result.msg);
        }
    });
});

module.exports = router;
