// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

const EditPassword = ({ edited, setEdited }) => {
    // Consts
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Texts
    const texts = {
        title: "Edit your password",
        btnSave: "Save changes",
    }

    // Form items
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => setPassword(e.target.value)

    // Submit
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { password }

        axios
            .put(`/users/edit-password/${user._id}`, requestBody)
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
        <Page title={texts.title} template="form">
            <Font.H1>{texts.title}</Font.H1>

            <Form
                btnprimary={texts.btnSave}
                btncancel="/my-account"
                onSubmit={handleSubmit}
            >
                <Input
                    label="New password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                    password
                    iconpassword
                />
            </Form>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default EditPassword
