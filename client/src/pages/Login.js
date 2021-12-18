// Imports
import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth"
// import styled from "styled-components"
import { Navigate, Link, useNavigate } from "react-router-dom"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
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
                console.log(res.data)
                logInUser(res.data)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })

        // axios
        //     .post(`${API_URL}/auth/login`, requestBody)
        //     .then(res => {
        //         logInUser(res.data)
        //         navigate("/my-account")
        //     })
        //     .catch(err => {
        //         const errorDescription = err.response.data.errorMessage
        //         setErrorMessage(errorDescription)
        //     })
        // axios
        //     .post(`${API_URL}/auth/login`, requestBody, {
        //         withCredentials: true,
        //     })
        //     .then(res => {
        //         logInUser(res.data)
        //         navigate("/my-account")
        //     })
        //     .catch(err => {
        //         const errorDescription = err.response.data.errorMessage
        //         setErrorMessage(errorDescription)
        //     })
    }

    return isLoggedIn ? (
        <Navigate to="/my-account" />
    ) : (
        <Page title="Login" description="" keywords="">
            <Font.H1>Login page</Font.H1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value={email}
                    onChange={handleEmail}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Log in</button>
            </form>

            {errorMessage && <Font.P>{errorMessage}</Font.P>}

            <Font.P>
                No account? <Link to="/signup">Sign up</Link>
            </Font.P>
        </Page>
    )
}

export default Login
