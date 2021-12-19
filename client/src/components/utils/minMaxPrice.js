export const getMinPrice = data => {
    let arr = []

    data.forEach(item => {
        if (item.price === undefined || item.price === null) {
            arr.push(0)
        } else {
            arr.push(parseInt(item.price))
        }
    })

    return Math.min(...arr)
}

export const getMaxPrice = data => {
    let arr = []

    data.forEach(item => {
        if (item.price === undefined || item.price === null) {
            arr.push(0)
        } else {
            arr.push(parseInt(item.price))
        }
    })

    return parseInt(Math.max.apply(Math, arr))
}
