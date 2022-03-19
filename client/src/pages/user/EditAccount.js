// Packages
import React, { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    Main,
    Aside,
    Button,
    InputCheck,
    Autocomplete,
} from "components-react-julseb"
import { getToday } from "js-utils-julseb"
import axios from "axios"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"
import service from "../../api/cloudinary.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperForm from "../../components/layouts/WrapperForm"
import DangerZone from "../../components/DangerZone"
import EditAvatar from "../../components/user/EditAvatar"
import Item from "../../components/layouts/Item"
import DeleteAvailability from "../../components/user/DeleteAvailability"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const title = "Edit your account"

    // Get all cities
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/JulSeb42/js-utils/master/src/allCities.json"
            )
            .then(res =>
                setAllCities(
                    res.data
                        .filter(city => city.country === "Germany")
                        .map(city => city.name)
                        .sort()
                )
            )
            .catch(err => console.log(err))
    }, [])

    // Form items
    const [fullName, setFullName] = useState(user.fullName)
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [visible, setVisible] = useState(user.visible)
    const [isLoading, setIsLoading] = useState(user.isLoading)
    const [city, setCity] = useState(user.city)
    const [genre, setGenre] = useState(user.genre || "")
    const [price, setPrice] = useState(user.price || "")
    const [bio, setBio] = useState(user.bio || "")
    const [youtubeLink, setYoutubeLink] = useState(user.youtubeLink)
    const [facebookLink, setFacebookLink] = useState(user.facebookLink)
    const [instagramLink, setInstagramLink] = useState(user.instagramLink)
    const [available, setAvailable] = useState(
        user.available
            .filter(date => new Date(date) >= new Date())
            .sort((a, b) => new Date(a) - new Date(b))
    )
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)

    const handleFilterLocation = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = allCities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickAutocomplete = e => {
        setCity(e.target.innerText)
    }

    const handleVisible = e =>
        e.target.checked ? setVisible(true) : setVisible(false)
    const handleGenre = e => setGenre(e.target.value)
    const handlePrice = e => setPrice(e.target.value)
    const handleYoutubeLink = e => setYoutubeLink(e.target.value)
    const handleFacebookLink = e => setFacebookLink(e.target.value)
    const handleInstagramLink = e => setInstagramLink(e.target.value)
    const handleAvailable = e => setAvailable([...available, e.target.value])

    const deleteAvailable = e => {
        setAvailable(available.filter(item => item !== e.target.innerText))
    }

    // Profile picture
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
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setImageUrl(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            city,
            imageUrl,
            genre,
            bio,
            price,
            available,
            youtubeLink,
            facebookLink,
            instagramLink,
            visible,
        }

        userService
            .editAccount(user._id, requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = e => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title={title} template="form-both-sides">
            <WrapperForm onSubmit={handleSubmit}>
                <Aside template="both-sides" justify="center">
                    <EditAvatar
                        src={imageUrl}
                        alt={user.fullName}
                        onChange={e => handleFileUpload(e)}
                        id="imageUrl"
                    />

                    {user.role === "artist" && (
                        <InputCheck
                            label="Visible"
                            id="visible"
                            type="checkbox"
                            name="visible"
                            onChange={handleVisible}
                            value={visible}
                            defaultChecked={visible}
                            disabled={!user.verified && true}
                            toggle
                        />
                    )}

                    <Button
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Save changes
                    </Button>

                    <Button to="/my-account" btnStyle="text">
                        Cancel
                    </Button>
                </Aside>

                <Main template="both-sides">
                    <Font.H1>{title}</Font.H1>

                    <Form as="div">
                        <Input
                            label="Full name"
                            id="fullName"
                            onChange={handleFullName}
                            value={fullName}
                        />

                        <Input
                            label="Email"
                            helperBottom="You can not edit your email"
                            value={user.email}
                            disabled
                        />

                        <Autocomplete
                            label="Your city"
                            id="city"
                            onChange={handleFilterLocation}
                            value={city}
                            items={resultsCities}
                            onMouseDown={handleClickAutocomplete}
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
                                    label="Your price"
                                    id="price"
                                    type="number"
                                    step={100}
                                    onChange={handlePrice}
                                    value={price}
                                />

                                <Input
                                    label="Your bio"
                                    id="bio"
                                    type="markdown"
                                    onChange={setBio}
                                    value={bio}
                                />

                                <Input
                                    label="Link to your YouTube page"
                                    id="youtubeLink"
                                    onChange={handleYoutubeLink}
                                    value={youtubeLink}
                                />

                                <Input
                                    label="Link to your Facebook page"
                                    id="facebookLink"
                                    onChange={handleFacebookLink}
                                    value={facebookLink}
                                />

                                <Input
                                    label="Link to your Instagram page"
                                    id="instagramLink"
                                    onChange={handleInstagramLink}
                                    value={instagramLink}
                                />
                            </>
                        )}
                    </Form>

                    {errorMessage && (
                        <Alert color="danger">{errorMessage}</Alert>
                    )}

                    <Font.P>
                        <Link to="/my-account/edit-password">
                            Edit your password.
                        </Link>
                    </Font.P>

                    <DangerZone
                        textBtnOpen="Delete account"
                        text="Are you sure you want to delete your account?"
                        textBtnPrimary="Yes, delete my account"
                        onClickPrimary={handleDelete}
                    />
                </Main>

                <Aside template="both-sides" last>
                    {user.role === "artist" && (
                        <>
                            <Item>
                                <Font.H4>Your availabilities</Font.H4>

                                {available.length > 0 ? (
                                    <Font.List>
                                        {available.map((date, i) => (
                                            <DeleteAvailability
                                                date={date}
                                                onClick={deleteAvailable}
                                                key={i}
                                            />
                                        ))}
                                    </Font.List>
                                ) : (
                                    <Font.P>
                                        You did not add any availability yet.
                                    </Font.P>
                                )}
                            </Item>

                            <Input
                                label="Add availabilities"
                                type="date"
                                onChange={handleAvailable}
                                min={getToday()}
                            />
                        </>
                    )}
                </Aside>
            </WrapperForm>
        </Page>
    )
}

export default EditAccount
