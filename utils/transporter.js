// Nodemailer config
// Packages
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
    },
})

module.exports = transporter
