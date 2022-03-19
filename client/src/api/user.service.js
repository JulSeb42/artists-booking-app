// Server
import http from "./http-common"

class UserService {
    allUsers() {
        return http.get("/users/all-users")
    }

    allArtists() {
        return http.get("/users/all-artists")
    }

    getUser(id) {
        return http.get(`/users/user/${id}`)
    }

    editAccount(id, data) {
        return http.put(`/users/edit-account/${id}`, data)
    }

    editPassword(id, data) {
        return http.put(`/users/edit-password/${id}`, data)
    }

    deleteAccount(id) {
        return http.delete(`/users/delete-account/${id}`)
    }
}

export default new UserService()
