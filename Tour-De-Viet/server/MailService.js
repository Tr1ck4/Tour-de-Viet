import nodemailer from 'nodemailer';

export class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rishviet@gmail.com',
                pass: 'rfvjskryezkzgnvn'
            }
        });
    }

    sendMail(to, subject, text) {
        const mailOptions = {
            from: 'rishviet@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        this.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}