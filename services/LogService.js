// Public Modules
const async = require('async');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');
const ipUtility = require('../utils/IPUtility');



class LogService {

    logVisit(params, fnCallback) {
        const ipAddress = params.ipAddress;

        async.waterfall([
            // get information about the visitor
            (callback) => {
                ipUtility.fetchIpInfo(ipAddress)
                    .then((info) => {
                        return callback(null, info);
                    })
                    .catch((error) => {
                        return callback(error);
                    })
            },
            // send email as notification
            (info, callback) => {
                const to = config.recipient.email;
                const subject = 'New Visit to Personal Website';
                const text = 'New visit to your website: \n\n' +
                            ipUtility.stringify(info);

                emailUtility.sendEmail(to, subject, text)
                    .then(() => {
                        return callback(null, info);
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
                return fnCallback(null, 'Information logged successfully');
            }
        });
    }
};

module.exports = new LogService();
