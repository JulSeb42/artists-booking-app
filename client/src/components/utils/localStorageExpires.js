const localStorageExpires = (key, value, time) => {
    localStorage.setItem(key, value)

    setTimeout(() => {
        localStorage.removeItem(key)
    }, time)
}

export default localStorageExpires
