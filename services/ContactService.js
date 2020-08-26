// Public Modules
const async = require('async');
const _ = require('lodash');

// App Modules
const emailUtility = require('../utils/EmailUtility');
const config = require('../config');
const ipUtility = require('../utils/IPUtility');
const contactDao = require('../repositories/ContactDAO');



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
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to fetch IP address'});
                    })
            },
            // log the received message to database
            (info, callback) => {
                const messageInfo = {
                    name: name,
                    email: email,
                    message: message,
                    ipAddress: info.ip,
                    city: info.city,
                    country: info.country_name,
                    latitude: info.latitude,
                    longitude: info.longitude
                };

                contactDao.insertMessage(messageInfo)
                    .then(() => {
                        return callback(null, info);
                    })
                    .catch((error) => {
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to save message'});
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
                        console.log(error);
                        return callback({status : 500, msg : 'Not able to send message'});
                    })
            }
        ], 
        // finalize
        (error) => {
            return fnCallback(error, {status: 200, msg: 'Message sent successfully'});
        });
    };
};

module.exports = new ContactService();
