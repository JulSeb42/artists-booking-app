// Packages
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
    PageLoading,
    MessagesContainer,
    EmptyContainer,
    ListMessages,
    Message,
    MessageInput,
} from "components-react-julseb"
import { getToday, getTimeNow, convertDateShort } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import messagingService from "../../api/messaging.service"

// Components
import Page from "../../components/layouts/Page"
import TitleAvatar from "../../components/user/TitleAvatar"

const Conversation = props => {
    const { user } = useContext(AuthContext)
    const { id } = useParams()

    // Get conversation
    const [conversation, setConversation] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        messagingService
            .conversation(id)
            .then(res => {
                setConversation(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Set read
    if (
        !isLoading &&
        conversation.messages[conversation.messages.length - 1].sender._id !==
            user._id
    ) {
        messagingService.read(id)
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

        messagingService
            .newMessage(requestBody)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <Page
            title={
                isLoading
                    ? "Conversation"
                    : `Conversation with ${
                          user._id === conversation.user._id
                              ? conversation.artist.fullName
                              : conversation.user.fullName
                      }`
            }
        >
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
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
                                        {message.message}
                                    </Message>
                                ))}
                            </ListMessages>
                        ) : (
                            <EmptyContainer>No message yet</EmptyContainer>
                        )}

                        <MessageInput
                            placeholder="Type your message"
                            onChange={handleMessage}
                            onSubmit={handleSubmit}
                        />
                    </MessagesContainer>
                </>
            )}
        </Page>
    )
}

export default Conversation
