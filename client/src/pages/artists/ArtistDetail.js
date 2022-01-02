// Imports
import React, { useContext, useState, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import {
    Aside,
    Content,
    ItemContainer,
} from "../../components/layouts/Container"
import ProfilePicture from "../../components/user/ProfilePicture"
import Button from "../../components/ui/Button"
import { AuthContext } from "../../context/auth"
import TextIcon from "../../components/ui/TextIcon"
import Youtube from "../../components/artists/Youtube"
import Form from "../../components/forms/Form"
import Textarea from "../../components/forms/Textarea"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"
import SocialContainer from "../../components/ui/SocialContainer"
import ButtonSocial from "../../components/ui/ButtonSocial"

// Utils
import getToday from "../../components/utils/getToday"
import convertDate from "../../components/utils/convertDate"
import getTimeNow from "../../components/utils/getTimeNow"

function ArtistDetail(props) {
    const { isLoggedIn, user, updateUser } = useContext(AuthContext)

    const conditionBtn =
        isLoggedIn &&
        props.artist.role === "artist" &&
        props.artist._id === user._id

    const conditionsSocial =
        props.artist.youtubeLink ||
        props.artist.facebookLink ||
        props.artist.instagramLink

    const navigate = useNavigate()

    // Messages
    const [message, setMessage] = useState("")

    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleMessage = e => setMessage(e.target.value)

    // Contacted

    const handleSend = e => {
        e.preventDefault()

        const requestBody = {
            artist: props.artist._id,
            user: user._id,
            message,
            createdDay: getToday(),
            createdTime: getTimeNow(),
        }

        axios
            .put("/messaging/new-conversation", requestBody)
            .then(() => {
                updateUser(user)
                navigate("/my-account")
                window.location.reload(false)
            })
            .catch(err => setErrorMessage(err.response))
    }

    // Hide past dates
    const [available] = useState(props.artist.available)

    let filteredDates = available.filter(date => {
        return new Date(date) > new Date(getToday())
    })

    // Hide contact form
    const [hasContacted, setHasContacted] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            let contacted = user.contacted.find(id => id === props.artist._id)

            if (contacted !== undefined) {
                setHasContacted(true)
            }
        }
    }, [])

    return (
        <Page title={props.artist.fullName} description="" keywords="">
            <Aside center>
                <ProfilePicture
                    src={props.artist.imageUrl}
                    alt={props.artist.fullName}
                />

                {conditionBtn && (
                    <Button to="/my-account" btncolor="primary">
                        Check your account
                    </Button>
                )}
            </Aside>

            <Content>
                <Font.H1>{props.artist.fullName}</Font.H1>

                <TextIcon icon="map">
                    <Font.Strong>Location: </Font.Strong>
                    {props.artist.city}
                </TextIcon>

                <TextIcon icon="euro">
                    <Font.Strong>Price: </Font.Strong>
                    {props.artist.price ? props.artist.price : "-"} €
                </TextIcon>

                <TextIcon icon="music">
                    <Font.Strong>Genre: </Font.Strong>
                    {props.artist.genre ? props.artist.genre : "-"}
                </TextIcon>

                {props.artist.bio !== "" ? (
                    <Font.P bio>{props.artist.bio}</Font.P>
                ) : (
                    <Font.P>
                        {props.artist.fullName} did not write a bio yet!
                    </Font.P>
                )}

                {props.artist.youtube.length > 0 && (
                    <>
                        <Font.H3>Videos</Font.H3>

                        {props.artist.youtube.map(item => (
                            <Youtube src={item} key={uuid()} />
                        ))}
                    </>
                )}

                <ItemContainer>
                    <Font.H3>Contact {props.artist.fullName}</Font.H3>

                    {isLoggedIn ? (
                        hasContacted ? (
                            <Font.P>
                                You already contacted {props.artist.fullName}.{" "}
                                <Link to="/my-account">
                                    Go to your account.
                                </Link>
                            </Font.P>
                        ) : (
                            <Form btnPrimary="Send" onSubmit={handleSend}>
                                <Textarea
                                    label="Your message"
                                    name="message"
                                    id="message"
                                    onChange={handleMessage}
                                />
                            </Form>
                        )
                    ) : (
                        <Font.P>
                            Please <Link to="/login">log in</Link> to contact{" "}
                            {props.artist.fullName}
                        </Font.P>
                    )}
                </ItemContainer>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>

            <Aside>
                <ItemContainer>
                    <Font.H4>Availabilities</Font.H4>

                    {filteredDates.length > 0 ? (
                        <Font.List>
                            {filteredDates.sort().map(item => (
                                <li key={uuid()}>{convertDate(item)}</li>
                            ))}
                        </Font.List>
                    ) : (
                        <Font.P>
                            {props.artist.fullName} did not add dates yet, but
                            you can contact them directly!
                        </Font.P>
                    )}
                </ItemContainer>

                {conditionsSocial && (
                    <ItemContainer>
                        <Font.H4>Follow</Font.H4>

                        <SocialContainer>
                            {props.artist.youtubeLink && (
                                <ButtonSocial
                                    type="youtube"
                                    to={props.artist.youtubeLink}
                                />
                            )}

                            {props.artist.facebookLink && (
                                <ButtonSocial
                                    type="facebook"
                                    to={props.artist.facebookLink}
                                />
                            )}

                            {props.artist.instagramLink && (
                                <ButtonSocial
                                    type="instagram"
                                    to={props.artist.instagramLink}
                                />
                            )}
                        </SocialContainer>
                    </ItemContainer>
                )}
            </Aside>
        </Page>
    )
}

export default ArtistDetail
