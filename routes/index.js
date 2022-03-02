const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
// Auth
const auth = require("./auth")
router.use("/auth", auth)

// Picture uploader
const uploader = require("./uploader")
router.use("/uploader", uploader)

// Users
const users = require("./users")
router.use("/users", users)

// Conversations
const messaging = require("./messaging")
router.use("/messaging", messaging)

module.exports = router
