module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res
            .status(403)
            .json({ message: "You must be logged in to see this page" })
    }
    req.user = req.session.user
    next()
}
