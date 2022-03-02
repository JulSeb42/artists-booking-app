// Packages
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
} from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ForgotPassword = () => {
    // Consts
    const navigate = useNavigate()

    // Texts
    const texts = {
        title: "I forgot my password",
        body: "Please enter your email address, we will send you a link to reset your password.",
        btnSend: "Send",
    }

    // Form items
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            email,
            resetToken: getRandomString(20),
        }

        axios
            .post("/auth/forgot", requestBody)
            .then(res => {
                console.log(res)
                navigate("/login/forgot-password/email-sent")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={texts.title} template="form">
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>{texts.body}</Font.P>

            <Form btnprimary={texts.btnSend} onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
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

export default ForgotPassword
