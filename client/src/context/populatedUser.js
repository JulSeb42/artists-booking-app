// Packages
import axios from "axios"

const getPopulatedUser = id => {
    return axios
        .get(`/users/user/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export default getPopulatedUser
