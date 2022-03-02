// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

// Models
const User = require("../models/User.model")

// Utils
let transporter = require("../utils/transporter")
const { regex, emailRegex } = require("../utils/regex")

// Middleware
const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")

// Salt
const saltRounds = 10

// Logged in user
router.get("/loggedin", (req, res) => {
    res.json(req.user)
})

// Signup
router.post("/signup", isLoggedOut, (req, res, next) => {
    const { fullName, email, password, role, city, verifyToken, imageUrl } =
        req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ message: "Please provide your full name." })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address.",
        })
    }

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    if (!city) {
        return res.status(400).json({
            message: "Please provide your city.",
        })
    }

    User.findOne({ email }).then(found => {
        if (found) {
            return res.status(400).json({ message: "Email already taken." })
        }

        return bcrypt
            .genSalt(saltRounds)
            .then(salt => bcrypt.hash(password, salt))
            .then(hashedPassword => {
                return User.create({
                    fullName,
                    email,
                    password: hashedPassword,
                    verified: false,
                    verifyToken,
                    role,
                    imageUrl,
                })
            })
            .then(user => {
                let mailDetails = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Verify your account on our app",
                    html: `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${user._id}">Click here to verify your account</a>.`,
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
            .catch(err => {
                if (err instanceof mongoose.Error.ValidationError) {
                    return res.status(400).json({ message: err.message })
                }

                if (err.code === 11000) {
                    return res.status(400).json({
                        message:
                            "Email need to be unique. The email you chose is already in use.",
                    })
                }

                return res.status(500).json({ message: err.message })
            })
    })
})

// Login
router.post("/login", isLoggedOut, (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: "Please provide your email." })
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Your password needs to be at least 6 characters long.",
        })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "This user does not exist." })
            }

            bcrypt.compare(password, user.password).then(isSamePassword => {
                if (!isSamePassword) {
                    return res
                        .status(400)
                        .json({ message: "Wrong credentials." })
                }

                req.session.user = user

                return res.json(user)
            })
        })
        .catch(err => next(err))
})

// Logout
router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.json({ message: "Done" })
    })
})

// Verify account
router.put("/verify", (req, res, next) => {
    const { id, verifyToken, verified } = req.body

    User.findByIdAndUpdate(id, { id, verifyToken, verified }, { new: true })
        .then(updatedUser => {
            res.status(200).json({ user: updatedUser })
        })
        .catch(err => next(err))
})

// Forgot password
router.post("/forgot", (req, res, next) => {
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
                        subject: "Reset your password on our app",
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

// Reset password
router.put("/reset-password/:token/:id", (req, res, next) => {
    const { password } = req.body

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    return bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
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
