// Imports
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../../components/user/ProfilePicture"
import Button from "../../components/ui/Button"
import TextIcon from "../../components/ui/TextIcon"
import CardSmall, { List } from "../../components/artists/CardSmall"

function MyAccount() {
    const { user, isLoggedIn } = useContext(AuthContext)

    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get("/messaging/conversations")
            .then(res => {
                setConversations(
                    res.data.filter(
                        conversation =>
                            user._id === conversation.user._id ||
                            user._id === conversation.artist._id
                    )
                )
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    console.log(conversations)

    return !isLoggedIn ? (
        <Navigate to="/login" />
    ) : (
        <Page title={user.fullName} description="" keywords="">
            <Aside center>
                <ProfilePicture src={user.imageUrl} alt={user.fullName} />

                <Button to="/my-account/edit" btncolor="primary">
                    Edit your account
                </Button>

                {user.role === "artist" && (
                    <Button to={`/artists/${user._id}`} btncolor="primary">
                        Check your page
                    </Button>
                )}
            </Aside>

            <Content>
                <Font.H1>Welcome {user.fullName}</Font.H1>

                <TextIcon icon="map">
                    <Font.Strong>Location: </Font.Strong>
                    {user.city}
                </TextIcon>

                {user.verified === false && (
                    <Font.P>Your account is not verified!</Font.P>
                )}

                {user.role === "artist" && (
                    <Font.P>
                        Your profile is{" "}
                        {user.visible === true ? "visible" : "hidden"}!
                    </Font.P>
                )}

                <Font.H4>Conversations</Font.H4>

                {loading ? (
                    <Font.P>Loading</Font.P>
                ) : conversations.length === 0 && user.role === "user" ? (
                    <Font.P>You did not contact any artist yet!</Font.P>
                ) : conversations.length === 0 && user.role === "artist" ? (
                    <Font.P>No one contacted you yet.</Font.P>
                ) : (
                    <List>
                        {conversations.map(conversation => (
                            <CardSmall
                                to={`/my-account/conversations/${conversation._id}`}
                                name={
                                    user._id === conversation.artist._id
                                        ? conversation.user.fullName
                                        : conversation.artist.fullName
                                }
                                img={
                                    user._id === conversation.artist._id
                                        ? conversation.user.imageUrl
                                        : conversation.artist.imageUrl
                                }
                                unread={conversation.read === true ? false : true}
                                key={conversation._id}
                            />
                        ))}
                    </List>
                )}
            </Content>
        </Page>
    )
}

export default MyAccount
