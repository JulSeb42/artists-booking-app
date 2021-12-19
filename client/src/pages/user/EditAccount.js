// Imports
import React, { useContext, useState } from "react"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"
import axios from "axios"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../../components/styles/Variables"
import {
    Aside,
    Content,
    ItemContainer,
} from "../../components/layouts/Container"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Select from "../../components/forms/Select"
import ProfilePicture from "../../components/user/ProfilePicture"
import { AuthContext } from "../../context/auth"
import SiteData from "../../components/data/SiteData"
import DangerZone from "../../components/forms/DangerZone"
import Textarea from "../../components/forms/Textarea"
import Button from "../../components/ui/Button"

// Utils
import convertDate from "../../components/utils/convertDate"
import getToday from "../../components/utils/getToday"
// import convertYoutube from "../../components/utils/convertYoutube"

const API_URL = "http://localhost:5005"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [city, setCity] = useState(user.city)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [genre, setGenre] = useState(user.genre || "")
    const [price, setPrice] = useState(user.price || "")
    const [bio, setBio] = useState(user.bio || "")
    const [available, setAvailable] = useState(user.available || [])

    // , youtube, youtubeLink, facebookLink, instagramLink
    const [youtube] = useState(user.youtube || "")
    const [youtubeLink, setYoutubeLink] = useState(user.youtubeLink || "")
    const [facebookLink, setFacebookLink] = useState(user.facebookLink || "")
    const [instagramLink, setInstagramLink] = useState(user.instagramLink || "")
    const [visible, setVisible] = useState(user.visible || false)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleCity = e => setCity(e.target.value)

    const handleGenre = e => setGenre(e.target.value)
    const handlePrice = e =>
        setPrice(e.target.value === null ? 0 : e.target.value)
    const handleBio = e => setBio(e.target.value)
    const handleAvailable = e => setAvailable([...available, e.target.value])
    // const handleYoutube = e => setYoutube([...youtube, e.target.value])
    const handleYoutubeLink = e => setYoutubeLink(e.target.value)
    const handleFacebookLink = e => setFacebookLink(e.target.value)
    const handleInstagramLink = e => setInstagramLink(e.target.value)
    const handleVisible = e => setVisible(e.target.checked ? true : false)

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {
            id: user._id,
            fullName,
            email,
            city,
            genre,
            price: price === null ? 0 : price,
            bio,
            available,
            youtube,
            youtubeLink,
            facebookLink,
            instagramLink,
            visible,
        }

        axios
            .put(`${API_URL}/users/edit`, requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page
            title="Edit your account"
            description=""
            keywords=""
            form
            onSubmit={handleSubmit}
        >
            <Aside center>
                <ProfilePicture src={user.imageUrl} alt={user.fullName} />
                {user.role === "artist" && (
                    <p>
                        <input
                            type="checkbox"
                            onChange={handleVisible}
                            defaultChecked={visible}
                        />{" "}
                        Visible
                    </p>
                )}

                <Button primary type="submit">
                    Save
                </Button>
            </Aside>

            <Content>
                <Font.H1>Edit your account</Font.H1>

                <Form container>
                    <Input
                        label="Your name"
                        id="fullName"
                        value={fullName}
                        onChange={handleFullName}
                    />

                    <Input
                        label="Your email"
                        id="email"
                        value={email}
                        onChange={handleEmail}
                        disabled
                    />

                    <Select
                        label="Your city"
                        value={city}
                        onChange={handleCity}
                    >
                        {SiteData.Cities.map(city => (
                            <option value={city} key={uuid()}>
                                {city}
                            </option>
                        ))}
                    </Select>

                    {user.role === "artist" && (
                        <Select
                            label="Genre"
                            onChange={handleGenre}
                            value={genre}
                        >
                            {SiteData.Genres.map(genre => (
                                <option value={genre} key={uuid()}>
                                    {genre}
                                </option>
                            ))}
                        </Select>
                    )}

                    {user.role === "artist" && (
                        <Input
                            type="number"
                            label="Your price"
                            defaultValue={price}
                            value={price}
                            onChange={handlePrice}
                            min="0"
                        />
                    )}

                    {user.role === "artist" && (
                        <Textarea
                            value={bio}
                            label="Your bio"
                            onChange={handleBio}
                        />
                    )}

                    {/* {user.role === "artist" && (
                        <Input label="Link to youtube video" onChange={handleYoutube} value={youtube} />
                    )} */}

                    {user.role === "artist" && (
                        <Input
                            label="Link to your YouTube page"
                            onChange={handleYoutubeLink}
                            value={youtubeLink}
                        />
                    )}

                    {user.role === "artist" && (
                        <Input
                            label="Link to your Facebook page"
                            onChange={handleFacebookLink}
                            value={facebookLink}
                        />
                    )}

                    {user.role === "artist" && (
                        <Input
                            label="Link to your Instagram page"
                            onChange={handleInstagramLink}
                            value={instagramLink}
                        />
                    )}

                    <Font.P>
                        <Link to="/my-account/edit/edit-password">
                            Change your password
                        </Link>
                    </Font.P>
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}

                <DangerZone />
            </Content>

            {user.role === "artist" && (
                <Aside>
                    <ItemContainer>
                        <Font.H4>Availabilities</Font.H4>

                        {available.length !== 0 && (
                            <Font.List>
                                {available.map(date => (
                                    <li key={uuid()}>{convertDate(date)}</li>
                                ))}
                            </Font.List>
                        )}

                        <Input
                            label="Add availabilities"
                            type="date"
                            onChange={handleAvailable}
                            min={getToday()}
                            value={available[0]}
                        />
                    </ItemContainer>
                </Aside>
            )}
        </Page>
    )
}

export default EditAccount
