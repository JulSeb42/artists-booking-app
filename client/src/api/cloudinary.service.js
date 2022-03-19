// Server
import http from "./http-common"

const errorHandler = err => {
    throw err
}

const uploadImage = file => {
    return http
        .put("/uploader/upload-picture", file)
        .then(res => res.data)
        .catch(errorHandler)
}

const createImage = newImage => {
    return http
        .post("/uploader/edit-picture", newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

const cloudinaryService = {
    uploadImage,
    createImage,
}

export default cloudinaryService
