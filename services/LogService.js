// Public Modules
const async = require('async');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');
const ipUtility = require('../utils/IPUtility');
const logDao = require('../repositories/LogDAO');



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
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to fetch IP address'});
                    })
            },
            // create log entry in visitor table
            (info, callback) => {
                const log = {
                    ipAddress: info.ip,
                    city: info.city,
                    country: info.country_name,
                    latitude: info.latitude,
                    longitude: info.longitude
                };

                logDao.insertLog(log)
                    .then(() => {
                        return callback(null, info);
                    })
                    .catch((error) => {
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to save log'});
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
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to send email'});
                    })
            }
        ], 
        
        // finalize
        (error) => {
            return fnCallback(error, {status: 200, msg: 'Information logged successfully'});
        });
    }
};

module.exports = new LogService();
