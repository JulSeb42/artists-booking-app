// Imports
import React, { useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"
import axios from "axios"
import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import * as Variables from "../../components/styles/Variables"
import {
    Aside,
    Content,
    ItemContainer,
} from "../../components/layouts/Container"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
// import ProfilePicture from "../../components/user/ProfilePicture"
import EditPicture from "../../components/forms/EditPicture"
import { AuthContext } from "../../context/auth"
import DangerZone from "../../components/forms/DangerZone"
// import Textarea from "../../components/forms/Textarea"
import Button from "../../components/ui/Button"
import { IconMixin } from "../../components/ui/Icon"
import Toggle from "../../components/forms/Toggle"
import service from "../../services/cloudinary"
import MarkdownEditor from "../../components/forms/MarkdownEditor"

// Utils
import getToday from "../../components/utils/getToday"
import allCities from "../../components/data/citiesGermany.json"

// Styles
const Date = styled.li`
    grid-template-columns: auto 1fr auto !important;

    &:after {
        ${IconMixin({
            icon: "close",
            size: 24,
            color: Variables.Colors.Danger,
        })}
        cursor: pointer;
    }
`

const ButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
`

function EditAccount({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [city, setCity] = useState(user.city)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [genre, setGenre] = useState(user.genre || "")
    const [price, setPrice] = useState(user.price || 0)
    const [bio, setBio] = useState(user.bio || "")
    const [available, setAvailable] = useState(user.available || [])

    const [youtube] = useState(user.youtube || "")
    const [youtubeLink, setYoutubeLink] = useState(user.youtubeLink || "")
    const [facebookLink, setFacebookLink] = useState(user.facebookLink || "")
    const [instagramLink, setInstagramLink] = useState(user.instagramLink || "")
    const [visible, setVisible] = useState(user.visible || false)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)

    const handleGenre = e => setGenre(e.target.value)
    const handlePrice = e =>
        setPrice(e.target.value === null ? 0 : e.target.value)
    // const handleBio = e => setBio(e.target.value)
    const handleAvailable = e => setAvailable([...available, e.target.value])
    const handleYoutubeLink = e => setYoutubeLink(e.target.value)
    const handleFacebookLink = e => setFacebookLink(e.target.value)
    const handleInstagramLink = e => setInstagramLink(e.target.value)
    const handleVisible = e => setVisible(e.target.checked ? true : false)

    const deleteAvailable = e => {
        setAvailable(available.filter(item => item !== e.target.innerText))
    }

    // Profile picture
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [picture, setPicture] = useState(user.imageUrl)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setPicture(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

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
            imageUrl,
        }

        axios
            .put(`/users/edit`, requestBody)
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

    const [cities, setCities] = useState([])

    useEffect(() => {
        setCities(allCities.map(city => city.name))
    }, [])

    const [filteredCities, setFilteredCities] = useState(city)

    const handleFilterCities = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = cities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickSuggestion = e => {
        setCity(e.target.innerText)
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
                <EditPicture
                    src={picture}
                    alt={user.fullName}
                    onChange={e => handleFileUpload(e)}
                    id="imageUrl"
                />

                {user.role === "artist" &&
                    (user.verified === true ? (
                        <Toggle
                            id="visible"
                            label={visible ? "Visible" : "Hidden"}
                            onChange={handleVisible}
                            defaultChecked={visible}
                        />
                    ) : (
                        <Font.P>
                            Please verify your account to change the visibility
                        </Font.P>
                    ))}

                <ButtonsContainer>
                    <Button
                        btncolor="primary"
                        type="submit"
                        loader={isLoading && "loading"}
                        disabled={isLoading && "disabled"}
                    >
                        Save
                    </Button>

                    <Button btncolor="secondary" to="/my-account">
                        Cancel
                    </Button>
                </ButtonsContainer>
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

                    <Input
                        label="Your city"
                        id="city"
                        value={city}
                        onChange={handleFilterCities}
                        cities={resultsCities}
                        onMouseDown={handleClickSuggestion}
                    />

                    {user.role === "artist" && (
                        <>
                            <Input
                                label="Genre"
                                id="genre"
                                onChange={handleGenre}
                                value={genre}
                            />

                            <Input
                                type="number"
                                label="Your price"
                                id="price"
                                value={price}
                                onChange={handlePrice}
                                min="0"
                                step="10"
                            />

                            <MarkdownEditor label="Your bio" id="bio" value={bio} onChange={setBio} />

                            {/* <Textarea
                                id="bio"
                                value={bio}
                                label="Your bio"
                                onChange={handleBio}
                            /> */}

                            <Input
                                id="youtubeLink"
                                label="Link to your YouTube page"
                                onChange={handleYoutubeLink}
                                value={youtubeLink}
                            />

                            <Input
                                id="facebookLink"
                                label="Link to your Facebook page"
                                onChange={handleFacebookLink}
                                value={facebookLink}
                            />

                            <Input
                                id="instagramLink"
                                label="Link to your Instagram page"
                                onChange={handleInstagramLink}
                                value={instagramLink}
                            />
                        </>
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
                                    <Date
                                        key={uuid()}
                                        onClick={deleteAvailable}
                                    >
                                        {date}
                                    </Date>
                                ))}
                            </Font.List>
                        )}

                        <Input
                            label="Add availabilities"
                            type="date"
                            onChange={handleAvailable}
                            min={getToday()}
                        />
                    </ItemContainer>
                </Aside>
            )}
        </Page>
    )
}

export default EditAccount
