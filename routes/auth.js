// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Model
const User = require("../models/User.model")

// Middleware
const { isAuthenticated } = require("../middleware/jwt.middleware")

// Utils
const { passwordRegex, emailRegex } = require("js-utils-julseb")
const jwtConfig = require("../utils/jwtConfig")
const transporter = require("../utils/transporter")

// Salt password
const saltRounds = 10

// Signup
router.post("/signup", (req, res, next) => {
    const { email, fullName, password, role, city, imageUrl, verifyToken } = req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ message: "Please provide your full name." })
    }

    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: "Please provide a valid email address." })
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    if (!city) {
        return res.status(400).json({ message: "Please provide your city." })
    }

    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                return res
                    .status(400)
                    .json({ message: "This email is already taken." })
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({
                email,
                fullName,
                password: hashedPassword,
                verified: false,
                verifyToken,
                role,
                city,
                imageUrl,
            }).then(createdUser => {
                // Send email to verify the account
                let mailDetails = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Verify your account on our app",
                    html: `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${createdUser._id}">Click here to verify your account</a>.`,
                }

                transporter.sendMail(mailDetails, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email sent successfully.")
                    }
                })

                // Payload
                const payload = { user: createdUser }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    jwtConfig
                )

                res.status(201).json({
                    user: createdUser,
                    authToken: authToken,
                })
            })
        })
        .catch(err => next(err))
})

// Login
router.post("/login", (req, res, next) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        return res
            .status(400)
            .json({ message: "Please provide your email and password." })
    }

    User.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(401)
                    .json({ message: "This user does not exist." })
            }

            const passwordCorrect = bcrypt.compareSync(
                password,
                foundUser.password
            )

            if (passwordCorrect) {
                const payload = { user: foundUser }
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    jwtConfig
                )

                res.status(200).json({ authToken: authToken })
            } else {
                res.status(401).json({
                    message: "Unable to authenticate the user.",
                })
            }
        })
        .catch(err => next(err))
})

// Verify if user is logged in
router.get("/loggedin", isAuthenticated, (req, res, next) => {
    console.log(`req.payload: ${req.payload}`)
    res.status(200).json(req.payload)
})

// Verify account
router.put("/verify", (req, res, next) => {
    const { id } = req.body

    User.findByIdAndUpdate(id, { verified: true }, { new: true })
        .then(updatedUser => {
            const payload = { user: updatedUser }
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                jwtConfig
            )

            res.status(200).json({ authToken: authToken, user: updatedUser })
        })
        .catch(err => next(err))
})

// Forgot password
router.post("/forgot-password", (req, res, next) => {
    const { email, resetToken } = req.body

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email." })
    }

    User.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: "This user does not exist." })
            }

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
        })
        .catch(err => next(err))
})

// Reset password
router.put("/reset-password", (req, res, next) => {
    const { password, resetToken, id } = req.body

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    User.findById(id)
        .then(foundUser => {
            if (foundUser.resetToken !== resetToken) {
                return res.status(400).json({
                    message:
                        "There was a problem trying to reset your password.",
                })
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            User.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            ).then(updatedUser => {
                res.status(200).json({ user: updatedUser })
            })
        })
        .catch(err => next(err))
})

module.exports = router
