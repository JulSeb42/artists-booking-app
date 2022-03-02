// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import NavAuth from "../../components/auth/NavAuth"

const Login = () => {
    // Consts
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Texts
    const texts = {
        title: "Login",
        textForgot: "I forgot my password.",
    }

    // Form items
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        axios
            .post("/auth/login", requestBody)
            .then(res => {
                loginUser(res.data)
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={texts.title} template="form">
            <NavAuth />

            <Font.H1>{texts.title}</Font.H1>

            <Form onSubmit={handleSubmit} btnprimary="Log in">
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                    password
                    iconpassword
                />
            </Form>

            <Font.P>
                <Link to="/login/forgot-password">{texts.textForgot}</Link>
            </Font.P>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default Login
