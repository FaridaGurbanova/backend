// Public Modules
const async = require('async');
const _ = require('lodash');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');



class ContactService {

    sendEmail(params, fnCallback) {
        const name = params.name;
        const email = params.email;
        const message = params.message;

        async.waterfall([

            // validate input fields
            (callback) => { 
                if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(message)) {
                    return callback({status : 401, msg : "Required fields are empty"});
                } else {
                    return callback();
                }
            },

            // get user that was created
            (callback) => {
                const to = config.recipient.email;
                const subject = 'Email from Personal Website';
                const text = 'From: ' + name + '\n' + 'Email: ' + email + '\n' + message;

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

module.exports = new ContactService();
