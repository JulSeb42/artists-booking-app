// Packages
import React, { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
    PageLoading,
    Main,
    Aside,
    Avatar,
    Button,
    Font,
    MarkdownContainer,
    Form,
    Input,
    Alert,
    Variables,
} from "components-react-julseb"
import {
    getToday,
    getTimeNow,
    convertPrice,
    convertDateShort,
} from "js-utils-julseb"

// API
import userService from "../../api/user.service"
import messagingService from "../../api/messaging.service"
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import TextIcon from "../../components/ui/TextIcon"
import Item from "../../components/layouts/Item"
import Youtube from "../../components/artists/Youtube"
import SocialContainer from "../../components/ui/SocialContainer"
import ButtonSocial from "../../components/ui/ButtonSocial"

const ArtistDetail = ({ edited, setEdited }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, user, setUser, setToken } = useContext(AuthContext)

    const [artist, setArtist] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService
            .getUser(id)
            .then(res => {
                setArtist(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Check if user has already contacted the artist
    const [hasContacted, setHasContacted] = useState(false)

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            let contacted = user.contacted.find(id => id === artist._id)

            if (contacted !== undefined) {
                setHasContacted(true)
            }
        }
        // eslint-disable-next-line
    }, [isLoggedIn])

    // Messages
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleMessage = e => setMessage(e.target.value)

    // Contact form
    const handleSend = e => {
        e.preventDefault()

        const requestBody = {
            artist: artist._id,
            user: user._id,
            message,
            createdDay: getToday(),
            createdTime: getTimeNow(),
        }

        messagingService
            .newConversation(requestBody)
            .then(res => {
                console.log(res)
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate("/my-account")
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })

        // axios
        //     .post("/messaging/new-conversation", requestBody)
        //     .then(res => {
        //         const { user } = res.data
        //         updateUser(user)
        //         setEdited(!edited)
        //         navigate("/my-account")
        //         window.location.reload(false)
        //     })
        //     .catch(err => {
        //         const errorDescription = err.response.data.message
        //         setErrorMessage(errorDescription)
        //     })
    }

    return (
        <Page
            title={isLoading ? "Artist" : artist.fullName}
            template="both-sides"
        >
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Aside template="both-sides" justify="center">
                        <Avatar
                            src={artist.imageUrl}
                            alt={artist.fullName}
                            size={150}
                        />

                        {isLoggedIn && artist._id === user._id && (
                            <Button to="/my-account">Check your account</Button>
                        )}
                    </Aside>

                    <Main template="both-sides">
                        <Font.H1>{artist.fullName}</Font.H1>

                        <TextIcon icon="map" title="Location">
                            {artist.city}
                        </TextIcon>

                        <TextIcon icon="euro" title="Price">
                            {artist.price ? convertPrice(artist.price) : "-"}
                        </TextIcon>

                        <TextIcon icon="music" title="Genre">
                            {artist.genre ? artist.genre : "-"}
                        </TextIcon>

                        {artist.bio !== "" ? (
                            <MarkdownContainer>{artist.bio}</MarkdownContainer>
                        ) : (
                            <Font.P>
                                {artist.fullName} did not write a bio yet.
                            </Font.P>
                        )}

                        {(artist.youtube || artist.youtube.length > 0) && (
                            <Item>
                                <Font.H3>Videos</Font.H3>

                                {artist.youtube.map((video, i) => (
                                    <Youtube src={video} key={i} />
                                ))}
                            </Item>
                        )}

                        <Item>
                            <Font.H3>Contact {artist.fullName}</Font.H3>

                            {isLoggedIn ? (
                                hasContacted ? (
                                    <Font.P>
                                        You already contacted {artist.fullName}.{" "}
                                        <Link to="/my-account">
                                            Go to your account.
                                        </Link>
                                    </Font.P>
                                ) : isLoggedIn && user._id === artist._id ? (
                                    <Font.P>
                                        You can not contact yourself!
                                    </Font.P>
                                ) : (
                                    <>
                                        <Form
                                            btnPrimary="Send"
                                            onSubmit={handleSend}
                                        >
                                            <Input
                                                label="Your message"
                                                type="textarea"
                                                onChange={handleMessage}
                                                value={message}
                                                style={{ minHeight: 200 }}
                                            />
                                        </Form>

                                        {errorMessage && (
                                            <Alert color="danger" as={Font.P}>
                                                {errorMessage}
                                            </Alert>
                                        )}
                                    </>
                                )
                            ) : (
                                <Font.P>
                                    Please <Link to="/login">log in</Link> to
                                    contact {artist.fullName}
                                </Font.P>
                            )}
                        </Item>
                    </Main>

                    <Aside template="both-sides" last>
                        <Item>
                            <Font.H4>Availabilities</Font.H4>

                            {artist.available.length > 0 ? (
                                <Font.List
                                    style={{ gap: Variables.Spacers.XXS }}
                                >
                                    {artist.available
                                        .sort(
                                            (a, b) => new Date(a) - new Date(b)
                                        )
                                        .filter(
                                            date => new Date(date) >= new Date()
                                        )
                                        .map((date, i) => (
                                            <li key={i}>
                                                {convertDateShort(date)}
                                            </li>
                                        ))}
                                </Font.List>
                            ) : (
                                <Font.P>
                                    {artist.fullName} did not add dates yet, but
                                    you can contact them directly!
                                </Font.P>
                            )}
                        </Item>

                        {(artist.youtubeLink ||
                            artist.facebookLink ||
                            artist.instagramLink) && (
                            <Item>
                                <Font.H4>Follow</Font.H4>

                                <SocialContainer>
                                    {artist.youtubeLink && (
                                        <ButtonSocial
                                            type="youtube"
                                            to={artist.youtubeLink}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        />
                                    )}

                                    {artist.facebookLink && (
                                        <ButtonSocial
                                            type="facebook"
                                            to={artist.facebookLink}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        />
                                    )}

                                    {artist.instagramLink && (
                                        <ButtonSocial
                                            type="instagram"
                                            to={artist.instagramLink}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        />
                                    )}
                                </SocialContainer>
                            </Item>
                        )}
                    </Aside>
                </>
            )}
        </Page>
    )
}

export default ArtistDetail
