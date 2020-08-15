const nodemailer = require('nodemailer');
const config = require('../config.js');


class EmailUtility {

    sendEmail(to, subject, text) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: config.email.service,
                auth: {
                    user: config.email.username,
                    pass: config.email.password
                }
            });
            
            const mailOptions = {
                from: config.email.address,
                to: to,
                subject: subject,
                text: text
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('Email sent: ' + info.response);
                }
            });
        })
    }
};

module.exports = new EmailUtility();