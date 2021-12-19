// Imports
import React, { useContext, useState, useEffect } from "react"
// import styled from "styled-components"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import * as Variables from "../../components/styles/Variables"
import { Aside, Content, ItemContainer } from "../../components/layouts/Container"
import ProfilePicture from "../../components/user/ProfilePicture"
import Button from "../../components/ui/Button"
import { AuthContext } from "../../context/auth"
import TextIcon from "../../components/ui/TextIcon"
import Youtube from "../../components/artists/Youtube"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Textarea from "../../components/forms/Textarea"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"
import SocialContainer from "../../components/ui/SocialContainer"
import ButtonSocial from "../../components/ui/ButtonSocial"

// Utils
import getToday from "../../components/utils/getToday"
import convertDate from "../../components/utils/convertDate"

const API_URL = "http://localhost:5005"

function ArtistDetail(props) {
    const { isLoggedIn, user } = useContext(AuthContext)
    
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
    const [date, setDate] = useState(getToday())

    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleMessage = e => setMessage(e.target.value)
    const handleDate = e => setDate(e.target.value.toLocaleString())

    // Contacted
    const [contacted, setContacted] = useState(false)

    useEffect(() => {
        axios
            .get(
                `${API_URL}/users/user/${
                    isLoggedIn ? user._id : props.artist._id
                }`
            )
            .then(res => {
                res.data.contacted.find(artist => {
                    return artist._id === props.artist._id
                        ? setContacted(true)
                        : ""
                })
            })
            .catch(err => console.log(err))
    }, [])

    const handleSend = e => {
        const requestBody = {
            sender: user.email,
            receiver: props.artist.email,
            date,
            message,
            id: user._id,
            artistId: props.artist._id,
        }
        axios
            .put(`${API_URL}/messages/contact`, requestBody)
            .then(() => navigate("/my-account"))
            .catch(err => setErrorMessage(err.response))
    }

    return (
        <Page title={props.artist.fullName} description="" keywords="">
            <Aside center>
                <ProfilePicture
                    src={props.artist.imageUrl}
                    alt={props.artist.fullName}
                />

                {conditionBtn && (
                    <Button to="/my-account" primary>
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

                {!isLoggedIn ? (
                    <Font.P>
                        Please <Link to="/login">log in</Link> to contact{" "}
                        {props.artist.fullName}
                    </Font.P>
                ) : isLoggedIn && contacted ? (
                    <Font.H5 style={{ color: Variables.Colors.Success }}>
                        You already contacted {props.artist.fullName}!
                    </Font.H5>
                ) : isLoggedIn && props.artist._id !== user._id ? (
                    <Form btnPrimary="Send" onSubmit={handleSend}>
                        <Input
                            label="Enquiry for"
                            type="date"
                            name="date"
                            id="date"
                            min={getToday()}
                            value={date}
                            onChange={handleDate}
                        />

                        <Textarea
                            label="Your message"
                            name="message"
                            id="message"
                            onChange={handleMessage}
                        />
                    </Form>
                ) : (
                    ""
                )}

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>

            <Aside>
                <ItemContainer>
                    <Font.H4>Availabilities</Font.H4>

                    {props.artist.available.length > 0 ? (
                        <Font.List>
                            {props.artist.available.sort().map(item => (
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
