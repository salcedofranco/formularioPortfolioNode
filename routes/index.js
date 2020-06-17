const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');


require('dotenv').config()



transporter = nodemailer.createTransport({
    host: 'ca9.toservers.com',
    port: process.env.MI_PORT,
    secure: true,
    auth: {
        user: 'contact@francosalcedodev.com.ar',
        pass: process.env.MI_CONTRA,
        
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: '"DESDE PORTFOLIO" <contact@francosalcedodev.com.ar>',
        to: 'fcedo13@gmail.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });

}


module.exports = sendMail;