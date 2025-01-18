const nodemailer = require("nodemailer");

module.exports = class EmailService {
    static sendMail(mailBody) {
        const createTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            from: "bestdigitalselleronline@gmail.com",
            to: mailBody.recipient,
            subject: "Registration Complete - ReserveMySeat Team",
            text: "You have successfully created an account on myseatreservation.live."
        }
        createTransporter.sendMail(mailOptions, (err) => {
            if (err)
                console.log(err)
        })
    }
}