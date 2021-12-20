import axios from "axios"

const API_URL = "http://localhost:5005"

const service = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: "http://localhost:5005",
    withCredentials: true, // => you might need this option if using cookies and sessions
})

const errorHandler = err => {
    throw err
}

// const getItems = () => {
//     return axios
//         .get(`${API_URL}/users/user`)
//         .then(res => res.data)
//         .catch(errorHandler)
// }

const uploadImage = file => {
    return axios
        .put(`${API_URL}/users/upload-picture`, file)
        .then(res => res.data)
        .catch(errorHandler)
}

// const createItem = newItem => {
//     return axios
//         .post("/api/items", newItem)
//         .then(res => res.data)
//         .catch(errorHandler)
// }

const cloudinaryService = {
    service,
    // getItems,
    uploadImage,
    // createItem,
}

export default cloudinaryService
