// Imports
import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/auth"
// import styled from "styled-components"
import { Navigate, useNavigate } from "react-router-dom"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content, Aside } from "../../components/layouts/Container"
import NavLogin from "../../components/forms/NavLogin"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Password from "../../components/forms/Password"
// import * as Variables from "../components/styles/Variables"

const API_URL = "http://localhost:5005"

function Login() {
    // Check if logged in
    const { logInUser, isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        axios
            .post(`${API_URL}/auth/login`, requestBody)
            .then(res => {
                logInUser(res.data)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return isLoggedIn ? (
        <Navigate to="/my-account" />
    ) : (
        <Page title="Login" description="" keywords="">
            <Aside />

            <Content>
                <NavLogin />
                <Font.H1 hidden>Login page</Font.H1>

                <Form onSubmit={handleSubmit} btnPrimary="Log in">
                    <Input
                        id="email"
                        label="Email"
                        value={email}
                        onChange={handleEmail}
                    />

                    <Password
                        id="password"
                        label="Password"
                        value={password}
                        onChange={handlePassword}
                    />
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default Login
