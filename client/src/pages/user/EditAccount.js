// Packages
import React, { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Alert,
    Main,
    Aside,
    Button,
    CheckInput,
    Autocomplete,
    getToday,
} from "components-react-julseb"

// API
import service from "../../api/cloudinary.service"

// Components
import { AuthContext } from "../../context/auth"
import WrapperForm from "../../components/layouts/WrapperForm"
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"
import EditAvatar from "../../components/user/EditAvatar"
import Item from "../../components/layouts/Item"
import DeleteAvailability from "../../components/user/DeleteAvailability"

const EditAccount = ({ edited, setEdited }) => {
    // Consts
    const { user, updateUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Get all cities
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        axios
            .get("/citiesGermany.json")
            .then(res => setAllCities(res.data.map(city => city.name)))
            .catch(err => console.log(err))
    }, [])

    // Texts
    const texts = {
        title: "Edit your account",
        saveBtn: "Save changes",
        linkPassword: "Edit your password.",

        // Delete
        textbtnopen: "Delete your account",
        textalert: "Are you sure you want to delete your account?",
        textbtndelete: "Yes, delete my account",
    }

    // Form items
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [visible, setVisible] = useState(user.visible)
    const [isLoading, setIsLoading] = useState(false)
    const [fullName, setFullName] = useState(user.fullName)
    const [city, setCity] = useState(user.city)
    const [genre, setGenre] = useState(user.genre || "")
    const [price, setPrice] = useState(user.price || 0)
    const [bio, setBio] = useState(user.bio || "")
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

    // Form submit
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

        axios
            .put(`/users/edit/${user._id}`, requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title={texts.title} template="form-both-sides">
            <WrapperForm onSubmit={handleSubmit}>
                <Aside template="both-sides" justify="center">
                    <EditAvatar
                        src={imageUrl}
                        alt={user.fullName}
                        onChange={e => handleFileUpload(e)}
                        id="imageUrl"
                    />

                    {user.role === "artist" && (
                        <CheckInput
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

                    <Button to="/my-account" btnstyle="text">
                        Cancel
                    </Button>
                </Aside>

                <Main template="both-sides">
                    <Font.H1>{texts.title}</Font.H1>

                    <Form as="div">
                        <Input
                            label={
                                user.role === "user"
                                    ? "Your full name"
                                    : "Your displayed name"
                            }
                            id="fullName"
                            onChange={handleFullName}
                            value={fullName}
                        />

                        <Input
                            label="Your email"
                            type="email"
                            id="email"
                            value={user.email}
                            helperBottom="You can not edit your email."
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
                        <Alert color="danger" as={Font.P}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Font.P>
                        <Link to="/my-account/edit-password">
                            {texts.linkPassword}
                        </Link>
                    </Font.P>

                    <DangerZone
                        onClickPrimary={handleDelete}
                        textbtnopen={texts.textbtnopen}
                        text={texts.textalert}
                        textbtndelete={texts.textbtndelete}
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
