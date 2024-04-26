const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // configure nodemailer
    let transporter = nodemailer.createTransport({
        // configure your email service here
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New message from your website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error occured while sending email: ', error.message);
            res.status(500).send('Failed to send message');
        } else {
            console.log('Message sent %s: ', info.messageId);
            res.status(200).send('Message sent successfully');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})