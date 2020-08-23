// Public Modules
const async = require('async');
const _ = require('lodash');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');
const ipUtility = require('../utils/IPUtility');



class ContactService {

    contactOwner(params, fnCallback) {
        const name = params.name;
        const email = params.email;
        const message = params.message;
        const ipAddress = params.ipAddress;

        async.waterfall([

            // validate input fields
            (callback) => { 
                if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(message) || _.isEmpty(ipAddress)) {
                    return callback({status : 401, msg : "Required fields are empty"});
                } else {
                    return callback();
                }
            },
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
            // get user that was created
            (info, callback) => {
                const to = config.recipient.email;
                const subject = 'Email from Personal Website';
                let text = 'From: ' + name + '\n';
                text += 'Email: ' + email + '\n';
                text += 'Message: ' + message + '\n\n';

                text += 'Sent from:\n';
                text += ipUtility.stringify(info);

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
                return fnCallback(null, 'Message sent successfully');
            }
        });
    };
};

module.exports = new ContactService();
