// Package
const jwt = require("express-jwt")

// Middleware
const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: getTokenFromHeaders,
})

function getTokenFromHeaders(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        // Get the encoded token string and return it
        const token = req.headers.authorization.split(" ")[1]
        return token
    }

    return null
}

module.exports = {
    isAuthenticated,
}
