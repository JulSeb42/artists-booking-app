// Packages
import React, { useContext, useState, useEffect } from "react"
import { Font, Main, Aside, Avatar, Button } from "components-react-julseb"
import { getFirstName } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import messagingService from "../../api/messaging.service"

// Components
import Page from "../../components/layouts/Page"
import TextIcon from "../../components/ui/TextIcon"
import ListConversation from "../../components/user/ListConversation"
import CardConversation from "../../components/user/CardConversation"

const MyAccount = () => {
    const { user } = useContext(AuthContext)

    const [conversations, setConversations] = useState([])

    useEffect(() => {
        messagingService
            .userConversations(user._id, user.role)
            .then(res => setConversations(res.data))
            .catch(err => console.log(err))
    }, [user._id, user.role])

    console.log(conversations)

    return (
        <Page title={user.fullName} template="aside-left">
            <Aside template="aside-left" align="center" justify="center">
                <Avatar
                    src={user.imageUrl}
                    alt={user.fullName}
                    size={150}
                    align="center"
                />

                <Button to="/my-account/edit">Edit your account</Button>

                {user.role === "artist" && (
                    <Button to={`/artists/${user._id}`}>Check your page</Button>
                )}
            </Aside>

            <Main template="aside-left">
                <Font.H1>
                    Hello{" "}
                    {user.role === "user"
                        ? getFirstName(user.fullName)
                        : user.fullName}
                </Font.H1>

                {!user.verified && (
                    <Font.P>Your account is not verified.</Font.P>
                )}

                <TextIcon icon="map" title="Location">
                    {user.city}
                </TextIcon>

                {user.role === "artist" && (
                    <Font.P>
                        Your profile is{" "}
                        {user.visible ? "visible!" : "not visible."}
                    </Font.P>
                )}

                <Font.H2>Conversations</Font.H2>

                {conversations.length > 0 ? (
                    <ListConversation>
                        {conversations.map(conversation => (
                            <CardConversation
                                to={`/my-account/conversation/${conversation._id}`}
                                src={
                                    user._id === conversation.artist._id
                                        ? conversation.user.imageUrl
                                        : conversation.artist.imageUrl
                                }
                                name={
                                    user._id === conversation.artist._id
                                        ? conversation.user.fullName
                                        : conversation.artist.fullName
                                }
                                read={conversation.read}
                                key={conversation._id}
                            />
                        ))}
                    </ListConversation>
                ) : (
                    <Font.P>You don't have any conversation yet.</Font.P>
                )}
            </Main>
        </Page>
    )
}

export default MyAccount
