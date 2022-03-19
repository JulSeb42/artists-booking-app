// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Model
const User = require("../models/User.model")

// Utils
const { passwordRegex } = require("js-utils-julseb")
const jwtConfig = require("../utils/jwtConfig")

// Salt password
const saltRounds = 10

// Get all users
router.get("/all-users", (req, res, next) => {
    User.find()
        .then(usersFromDb => res.status(200).json(usersFromDb))
        .catch(err => next(err))
})

// Get all artists
router.get("/all-artists", (req, res, next) => {
    User.find({ role: "artist", visible: true })
        .then(artistsFromDb => res.status(200).json(artistsFromDb))
        .catch(err => next(err))
})

// Get user by ID
router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .populate("conversations")
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => next(err))
})

// Edit user
router.put("/edit-account/:id", (req, res, next) => {
    const {
        fullName,
        city,
        imageUrl,
        genre,
        bio,
        price,
        available,
        youtubeLink,
        facebookLink,
        instagramLink,
        visible,
    } = req.body

    if (!fullName) {
        return res.status(400).json({ message: "Your name can not be empty." })
    }

    if (!city) {
        return res.status(400).json({ message: "Your city can not be empty." })
    }

    User.findByIdAndUpdate(
        req.params.id,
        {
            fullName,
            city,
            imageUrl,
            genre,
            bio,
            price,
            available,
            youtubeLink,
            facebookLink,
            instagramLink,
            visible,
        },
        { new: true }
    )
        .then(updatedUser => {
            // Payload
            const payload = { user: updatedUser }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                jwtConfig
            )

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Edit password
router.put("/edit-password/:id", (req, res, next) => {
    const { password } = req.body

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)

    User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
    )
        .then(updatedUser => {
            // Payload
            const payload = { user: updatedUser }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                jwtConfig
            )

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Delete user
router.delete("/delete-account/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
