const nodemailer = require("nodemailer")
const router = require("express").Router()
const User = require("../models/User.model")

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
    },
})

router.put("/contact", (req, res, next) => {
    const { sender, receiver, date, message, id, artistId } = req.body

    // User.findByIdAndUpdate(id, { $push: { contacted: artistId } })
    User.findOneAndUpdate({ _id: id }, { $push: { contacted: artistId } }).then(() => {
            User.findOneAndUpdate(
                { _id: artistId },
                { $push: { contactedBy: id } }
            ).then(updatedUser => {
                let mailDetails = {
                    from: process.env.EMAIL,
                    to: receiver,
                    subject: "New enquiry on Book a Band",
                    text: `Hi, you have a new enquiry from ${sender} for the ${date}. This is the message: ${message}`,
                }

                transporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email sent successfully")
                    }
                })

                res.status(200).json({ user: updatedUser })
            })
        }
    )
})

module.exports = router