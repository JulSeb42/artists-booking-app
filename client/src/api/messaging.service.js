// Server
import http from "./http-common"

class MessagingService {
    // conversations, get
    conversations() {
        return http.get("/messaging/conversations")
    }
    // conversation/:id, get
    conversation(id) {
        return http.get(`/messaging/conversation/${id}`)
    }
    // /user-conversation/:id, get
    userConversations(id, role) {
        return http.get(`/messaging/user-conversation/${id}/${role}`)
    }
    // new-conversation, post
    newConversation(requestBody) {
        return http.post("/messaging/new-conversation", requestBody)
    }
    // new-message, put
    newMessage(requestBody) {
        return http.put("/messaging/new-message", requestBody)
    }
    // read/:id, put
    read(id) {
        return http.put(`/messaging/read/${id}`)
    }
}

export default new MessagingService()
