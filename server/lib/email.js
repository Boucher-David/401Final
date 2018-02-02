'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = (email, code) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secureConnection: false, // true for 465, false for other ports
        auth: {
            user: `${process.env.EMAIL_USERNAME}`, // generated ethereal user
            pass: `${process.env.EMAIL_PASSWORD}`  // generated ethereal password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${process.env.EMAIL_PASSWORD}`, // sender address
        to: `${email}`, // list of receivers
        subject: 'Verification email from Vault', // Subject line
        html: `<b>Hello! This is a verification email from vault.</b><br /><p>Please take the following code and paste it into the extension where prompted: </p> <br /> <h4>${code}</h4>`
    };    

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) reject(error);
            resolve({
                sent: true,
                info: info
            });
        });
    });
}