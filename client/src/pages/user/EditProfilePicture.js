// Imports
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Aside, Content } from "../../components/layouts/Container"
import Input from "../../components/forms/Input"
import Form from "../../components/forms/Form"
import service from "../../services/cloudinary"
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../../components/user/ProfilePicture"

const API_URL = "http://localhost:5005"

function EditProfilePicture({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState(user.imageUrl)

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${API_URL}/users/user/${user._id}`)
            .then(response => {
                const { imageUrl } = response.data
                setImageUrl(imageUrl)
            })
            .catch(err => console.log(err))
    }, [user._id])

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
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

        const requestBody = { imageUrl }

        if (imageUrl === "") {
            return
        }

        axios
            .put(`${API_URL}/users/edit-picture/${user._id}`, requestBody)
            .then(res => {
                updateUser(res.data)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit profile picture" description="" keywords="">
            <Aside>
                <ProfilePicture src={picture} alt={user.fullName} />
            </Aside>

            <Content>
                <Font.H1>Upload a new profile picture</Font.H1>

                <Form
                    btnPrimary="Send"
                    btnSecondary="Cancel"
                    backLink="/my-account"
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="file"
                        id="imageUrl"
                        onChange={handleFileUpload}
                    />
                </Form>
            </Content>
        </Page>
    )
}

export default EditProfilePicture
