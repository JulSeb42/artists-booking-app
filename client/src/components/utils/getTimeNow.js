// Get time
const getTimeNow = () => {
    const today = new Date()

    if (today.getHours() < 10) {
        return `0${today.getHours()}:${today.getMinutes()}`
    } else {
        return `${today.getHours()}:${today.getMinutes()}`
    }
}

export default getTimeNow
