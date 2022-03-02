import { getToday } from "components-react-julseb"

const getFilteredDates = array => {
    const arr = array.available.sort((a, b) => {
        return new Date(a) - new Date(b)
    })

    const filtered = arr.filter(date => new Date(date) > new Date(getToday()))

    if (filtered.length > 0) {
        return filtered
    } else {
        return "-"
    }
}

export default getFilteredDates