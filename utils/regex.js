// Regex
const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

module.exports = { regex, emailRegex }
