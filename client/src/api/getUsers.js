// Packages
import axios from "axios"

// Axios functions
const get = async url => {
    return await axios
        .get(url)
        .then(res => res)
        .catch(err => console.log(err))
}

// Get users
const getUsers = () => {
    return get("/users/user")
        .then(res => res.data)
        .catch(err => console.log(err))
}

// Get conversations
const getConversations = () => {
    return get("/messaging/conversations")
        .then(res => res.data)
        .catch(err => console.log(err))
}

// Get conversation by id
const getConversationId = id => {
    return axios
        .get(`/messaging/conversation/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export { getUsers, getConversations, getConversationId }
