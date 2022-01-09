// Packages
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Navigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

// Utils
import getRandomString from "../../components/utils/getRandomString"

function ForgotPassword() {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = e => setEmail(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            email,
            resetToken: getRandomString(20),
        }

        axios
            .put("/auth/forgot", requestBody)
            .then(res => {
                navigate("/login/forgot-password/email-sent")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return isLoggedIn ? (
        <Navigate to="/" />
    ) : (
        <Page title="I forgot my password">
            <Aside empty />

            <Content>
                <Font.H1>I forgot my password</Font.H1>

                <Font.P>
                    Please type your email address and you will receive a link
                    to reset your password.
                </Font.P>

                <Form btnPrimary="Send" onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleEmail}
                        value={email}
                    />
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default ForgotPassword
