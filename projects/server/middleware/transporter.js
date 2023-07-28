const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "handikaprasetya.wisnu@gmail.com",
        pass: "nkqobaerduwkzlma"
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter