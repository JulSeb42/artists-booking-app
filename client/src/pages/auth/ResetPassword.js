// Packages
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ResetPassword = () => {
    // Consts
    const navigate = useNavigate()

    // Texts
    const texts = {
        title: "Reset your password",
        btnForm: "Send",
    }

    // Get token and user id
    const data = window.location.href.split("/")
    const token = data[4]
    const id = data[5]

    // Form items
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id, password }

        axios
            .put(`/auth/reset-password/${token}/${id}`, requestBody)
            .then(() => {
                navigate("/login")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={texts.title} template="form">
            <Font.H1>{texts.title}</Font.H1>

            <Form btnprimary={texts.btnForm} onSubmit={handleSubmit}>
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

export default ResetPassword
