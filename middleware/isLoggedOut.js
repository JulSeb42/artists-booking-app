module.exports = (req, res, next) => {
    if (req.session.user) {
        return res.status(401).json({
            message: "You should not be logged in to make this request",
        })
    }
    next()
}
