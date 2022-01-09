const router = require("express").Router()

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
let transporter = require("../utils/transporter")

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10

// Require the User model in order to interact with the database
const User = require("../models/User.model")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut")
const isLoggedIn = require("../middleware/isLoggedIn")

router.get("/loggedin", (req, res) => {
    res.json(req.user)
})

// Generate random avatar
const randomAvatar = () => {
    const random = Math.floor(Math.random() * 114)
    const randomMf = Math.floor(Math.random() + 0.5)
    const mf = ["male", "female"]

    return `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/${mf[randomMf]}/${random}.png`
}

router.post("/signup", isLoggedOut, (req, res) => {
    const { fullName, email, password, role, city, verified, verifyToken } =
        req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ errorMessage: "Please provide your full name." })
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if (!regex.test(password)) {
        return res.status(400).json({
            errorMessage:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    User.findOne({ email })
        .populate("conversations")
        .then(found => {
            if (found) {
                return res
                    .status(400)
                    .json({ errorMessage: "Email already taken." })
            }

            return bcrypt
                .genSalt(saltRounds)
                .then(salt => bcrypt.hash(password, salt))
                .then(hashedPassword => {
                    return User.create({
                        fullName,
                        email,
                        password: hashedPassword,
                        role,
                        city,
                        imageUrl: randomAvatar(),
                        verified,
                        verifyToken,
                    })
                })
                .then(user => {
                    let mailDetails = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Verify your account on Book a Band",
                        html: `Hello,<br /><br />Thank you for creating your account on Book a Band! <a href="${process.env.HOST}/verify/${verifyToken}/${user._id}">Click here to verify your account</a>.`,
                    }

                    transporter.sendMail(mailDetails, (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Email sent successfully.")
                        }
                    })

                    req.session.user = user
                    res.status(201).json(user)
                })
                .catch(error => {
                    if (error instanceof mongoose.Error.ValidationError) {
                        return res
                            .status(400)
                            .json({ errorMessage: error.message })
                    }
                    if (error.code === 11000) {
                        return res.status(400).json({
                            errorMessage:
                                "Username need to be unique. The username you chose is already in use.",
                        })
                    }
                    return res.status(500).json({ errorMessage: error.message })
                })
        })
})

router.post("/login", isLoggedOut, (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res
            .status(400)
            .json({ errorMessage: "Please provide your email." })
    }

    if (password.length < 6) {
        return res.status(400).json({
            errorMessage:
                "Your password needs to be at least 6 characters long.",
        })
    }

    User.findOne({ email })
        .populate("conversations")
        .then(user => {
            if (!user) {
                return res
                    .status(400)
                    .json({ errorMessage: "Wrong credentials." })
            }

            bcrypt.compare(password, user.password).then(isSamePassword => {
                if (!isSamePassword) {
                    return res
                        .status(400)
                        .json({ errorMessage: "Wrong credentials." })
                }
                req.session.user = user
                return res.json(user)
            })
        })

        .catch(err => {
            next(err)
        })
})

router.put("/logout", isLoggedIn, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message })
        }
        res.json({ message: "Done" })
    })
})

router.put("/verify", (req, res, next) => {
    const { id, verifyToken, verified } = req.body

    User.findByIdAndUpdate(id, { id, verifyToken, verified }, { new: true })
        .then(updatedUser => {
            res.status(200).json({ user: updatedUser })
        })
        .catch(err => next(err))
})

router.put("/forgot", (req, res, next) => {
    const { email, resetToken } = req.body

    User.findOne({ email })
        .then(found => {
            if (!found) {
                res.status(400).json({
                    message: "This user does not exist.",
                })
            } else {
                User.findOneAndUpdate(
                    { email },
                    { resetToken },
                    { new: true }
                ).then(foundUser => {
                    let mailDetails = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: "Reset your password on Book a Band",
                        html: `Hello,<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${resetToken}/${foundUser._id}">click here</a>.`,
                    }

                    transporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Email sent successfully")
                        }
                    })

                    res.status(200).json(res.body)
                })
            }
        })
        .catch(err => next(err))
})

router.put("/reset-password/:token/:id", (req, res, next) => {
    const { password, id } = req.body

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if (!regex.test(password)) {
        return res.status(400).json({
            errorMessage:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    return bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            // Create a user and save it in the database
            return User.findByIdAndUpdate(req.params.id, {
                password: hashedPassword,
            })
                .then(updatedUser => {
                    res.status(200).json({ user: updatedUser })
                })
                .catch(err => next(err))
        })
})

module.exports = router
