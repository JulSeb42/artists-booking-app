const getToday = () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yy = today.getFullYear()

    if (dd < 10) {
        dd = "0" + dd
    }

    if (mm < 10) {
        mm = "0" + mm
    }

    return `${yy}-${mm}-${dd}`
}

export default getToday
