// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import {
    Font,
    getFirstName,
    PageLoading,
    Main,
    Aside,
    Avatar,
    Button,
    Grid,
    Variables,
} from "components-react-julseb"

// API
import getPopulatedUser from "../../context/populatedUser"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import TextIcon from "../../components/ui/TextIcon"
import CardConversation from "../../components/user/CardConversation"

const MyAccount = () => {
    // Context
    const { user } = useContext(AuthContext)

    // Texts
    const texts = {
        title: `Hello ${
            user.role === "artist" ? user.fullName : getFirstName(user.fullName)
        }`,
        accountNotVerified: "Your account is not verified.",
        editAccount: "Edit your account.",
    }

    // Get populatedUser
    const [populatedUser, setPopulatedUser] = useState()
    const [conversations, setConversations] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPopulatedUser(user._id)
            .then(res => {
                setPopulatedUser(res)

                axios.get("/messaging/conversations").then(res => {
                    setConversations(
                        res.data.filter(
                            conversation =>
                                user._id === conversation.user._id ||
                                user._id === conversation.artist._id
                        )
                    )
                    setIsLoading(false)
                })
            })
            .catch(err => console.log(err))
    }, [user._id])

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title={populatedUser.fullName} template="aside-left">
            <Aside
                col={2}
                template="aside-left"
                align="center"
                justify="center"
            >
                <Avatar
                    src={populatedUser.imageUrl}
                    alt={populatedUser.fullName}
                    size={150}
                    align="center"
                />

                <Button to="/my-account/edit">Edit your account</Button>

                {populatedUser.role === "artist" && (
                    <Button to={`/artists/${populatedUser._id}`}>
                        Check your page
                    </Button>
                )}
            </Aside>

            <Main col={3} template="aside-left">
                <Font.H1>{texts.title}</Font.H1>

                <TextIcon icon="map" title="Location">
                    {populatedUser.city}
                </TextIcon>

                {!populatedUser.verified && (
                    <Font.P>{texts.accountNotVerified}</Font.P>
                )}

                {populatedUser.role === "artist" && (
                    <Font.P>
                        Your profile is{" "}
                        {populatedUser.visible ? "visible!" : "not visible."}
                    </Font.P>
                )}

                <Font.H2>Conversations</Font.H2>

                {populatedUser.conversations.length > 0 ? (
                    <Grid col={6} gap={Variables.Margins.M}>
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
                    </Grid>
                ) : (
                    <Font.P>You don't have any conversation yet.</Font.P>
                )}
            </Main>
        </Page>
    )
}

export default MyAccount
