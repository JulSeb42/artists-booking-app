const router = require("express").Router()

// Middleware
const { isAuthenticated } = require("../middleware/jwt.middleware")

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const auth = require("./auth")
router.use("/auth", auth)

const users = require("./users")
router.use("/users", users)

const uploader = require("./uploader")
router.use("/uploader", uploader)

const search = require("./search")
router.use("/search", search)

const messaging = require("./messaging")
router.use("/messaging", messaging)

module.exports = router
