// Imports
import React, { useState, useContext } from "react"
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

function EditProfilePicture({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const [imageUrl, setImageUrl] = useState("")
    const [picture, setPicture] = useState(user.imageUrl)

    const navigate = useNavigate()

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

        if (imageUrl === "") {
            return
        }

        service
            .createImage({ imageUrl, id: user._id })
            .then(res => {
                setEdited(!edited)
                updateUser(res)

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
                        onChange={e => handleFileUpload(e)}
                    />
                </Form>
            </Content>
        </Page>
    )
}

export default EditProfilePicture
