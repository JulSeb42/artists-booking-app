const convertDate = date => {
    if (date) {
        const newDate = date.split("-")
        const day = newDate[2]
        let month = newDate[1]
        const year = newDate[0]

        let convertedMonth =
            month === "01"
                ? "January"
                : month === "02"
                ? "February"
                : month === "03"
                ? "March"
                : month === "04"
                ? "April"
                : month === "05"
                ? "May"
                : month === "06"
                ? "June"
                : month === "07"
                ? "July"
                : month === "08"
                ? "August"
                : month === "09"
                ? "September"
                : month === "10"
                ? "October"
                : month === "11"
                ? "November"
                : month === "12"
                ? "December"
                : "Error in date"

        return `${day} ${convertedMonth} ${year}`
    } else {
        return "12 December 2021"
    }
}

export default convertDate
