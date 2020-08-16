// Public Modules
const async = require('async');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');



class LogService {

    sendEmail(params, fnCallback) {
        const ipAddress = params.ipAddress;

        async.waterfall([

            // get user that was created
            (callback) => {
                const to = config.recipient.email;
                const subject = 'New Visit to Personal Website';
                const text = 'IP address ' + ipAddress + ' just visited your website';

                emailUtility.sendEmail(to, subject, text)
                .then(() => {
                    return callback();
                })
                .catch((error) => {
                    return callback({status : 500, msg : error});
                })
            }
        ], 
        
        // finalize
        (error) => {
            if (error) { 
                return fnCallback(error);
            } else {
                return fnCallback(null, 'Email sent successfully');
            }
        });
    };
};

module.exports = new LogService();
