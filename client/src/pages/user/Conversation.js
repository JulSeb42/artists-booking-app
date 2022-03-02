// Packages
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
    PageLoading,
    MessagesContainer,
    EmptyContainer,
    ListMessages,
    Message,
    MessageInput,
    Hr,
    getToday,
    getTimeNow,
    convertDateShort,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import { getConversationId } from "../../api/getUsers"

// Components
import Page from "../../components/layouts/Page"
import TitleAvatar from "../../components/user/TitleAvatar"

const Conversation = () => {
    const { user } = useContext(AuthContext)

    // Get conversation
    const id = window.location.href.split("/")[5]
    const [conversation, setConversation] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getConversationId(id)
            .then(res => {
                setConversation(res)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id, user._id])

    // Set conversation as read
    if (
        !isLoading &&
        conversation.messages[conversation.messages.length - 1].sender._id !==
            user._id
    ) {
        axios.put(`/messaging/read/${id}`)
    }

    // Send message
    const [message, setMessage] = useState("")
    const handleMessage = e => setMessage(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            id: conversation._id,
            sender: user,
            message,
            createdDay: getToday(),
            createdTime: getTimeNow(),
        }

        axios
            .put("/messaging/new-message", requestBody)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page
            title={`Conversation with ${
                user._id === conversation.user._id
                    ? conversation.artist.fullName
                    : conversation.user.fullName
            }`}
        >
            <TitleAvatar user={user} conversation={conversation} />

            <MessagesContainer>
                {conversation.messages.length > 0 ? (
                    <ListMessages>
                        {conversation.messages.map(message => (
                            <Message
                                type={
                                    message.sender._id === user._id
                                        ? "sent"
                                        : "received"
                                }
                                key={message._id}
                                date={
                                    new Date(
                                        message.createdDay
                                    ).toLocaleDateString("en-US") !==
                                        new Date().toLocaleDateString(
                                            "en-US"
                                        ) &&
                                    convertDateShort(message.createdDay)
                                }
                                time={message.createdTime}
                            >
                                {console.log(
                                    new Date(
                                        message.createdDay
                                    ).toLocaleDateString("en-US"),
                                    new Date().toLocaleDateString("en-US")
                                )}
                                {message.message}
                            </Message>
                        ))}
                    </ListMessages>
                ) : (
                    <EmptyContainer>No message yet</EmptyContainer>
                )}

                <Hr />

                <MessageInput
                    placeholder="Type your message"
                    onChange={handleMessage}
                    onSubmit={handleSubmit}
                />
            </MessagesContainer>
        </Page>
    )
}

export default Conversation
