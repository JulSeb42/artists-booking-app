const router = require("express").Router()
const User = require("../models/User.model")

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

module.exports = router
