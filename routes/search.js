// Packages
const router = require("express").Router()

// Model
const User = require("../models/User.model")

// Search
router.get("/:city/:genre", (req, res, next) => {
    const city = req.params.city
    const genre = req.params.genre

    if (city !== "all" && genre !== "all") {
        User.find({
            city: { $regex: city, $options: "-i" },
            genre: { $regex: genre, $options: "-i" },
            visible: true,
        })
            .then(found => res.status(200).json(found))
            .catch(err => next(err))
    } else if (city === "all" && genre !== "all") {
        User.find({ genre: { $regex: genre, $options: "-i" }, visible: true })
            .then(found => res.status(200).json(found))
            .catch(err => next(err))
    } else if (city !== "all" && genre === "all") {
        User.find({ city: { $regex: city, $options: "-i" }, visible: true })
            .then(found => res.status(200).json(found))
            .catch(err => next(err))
    }
})

module.exports = router
