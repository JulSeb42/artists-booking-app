const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

const saltRounds = 10

router.get("/user", (req, res, next) => {
    User.find()
        .then(userFromDb => {
            res.status(200).json(userFromDb)
        })
        .catch(err => next(err))
})

router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .populate("contacted")
        .populate("contactedBy")
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => next(err))
})

router.put("/edit", (req, res, next) => {
    const {
        id,
        fullName,
        email,
        city,
        genre,
        price,
        bio,
        available,
        youtube,
        youtubeLink,
        facebookLink,
        instagramLink,
        visible,
    } = req.body

    User.findByIdAndUpdate(
        id,
        {
            fullName,
            email,
            city,
            genre,
            price,
            bio,
            available,
            youtube,
            youtubeLink,
            facebookLink,
            instagramLink,
            visible,
        },
        { new: true }
    )
        .then(updatedUser => {
            res.status(200).json({ user: updatedUser })
        })
        .catch(err => next(err))
})

router.put("/edit-password", (req, res, next) => {
    const { id, password } = req.body

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
            return User.findByIdAndUpdate(id, { password: hashedPassword })
                .then(updatedUser => {
                    res.status(200).json({ user: updatedUser })
                })
                .catch(err => next(err))
        })
})

router.delete("/delete-user/:id", (req, res, next) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
