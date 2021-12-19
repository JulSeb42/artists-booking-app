// Imports
import React, { useContext, useState } from "react"
import { Navigate, Link, useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import axios from "axios"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { AuthContext } from "../../context/auth"
import { Content, Aside } from "../../components/layouts/Container"
import NavLogin from "../../components/forms/NavLogin"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Password from "../../components/forms/Password"
import Select from "../../components/forms/Select"
// import * as Variables from "../../components/styles/Variables"

import SiteData from "../../components/data/SiteData"

const API_URL = "http://localhost:5005"

function SignUpArtist() {
    const { isLoggedIn, logInUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState(SiteData.Cities[0])
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleCity = e => setCity(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = {
            fullName,
            email,
            password,
            city,
            role: "artist",
            bio: "",
            price: 0,
            genre: "",
            available: [],
            youtube: [],
            youtubeLink: "",
            facebookLink: "",
            instagramLink: "",
        }

        axios
            .post(`${API_URL}/auth/signup`, requestBody)
            .then(res => {
                logInUser(res.data)
                navigate("/login")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return isLoggedIn ? (
        <Navigate to="/my-account" />
    ) : (
        <Page title="SignUpArtist" description="" keywords="">
            <Aside />

            <Content>
                <NavLogin />

                <Font.H1 hidden>Sign up as an artist</Font.H1>

                <Font.P>
                    If you're a user wanting to book artists,{" "}
                    <Link to="/signup">register here instead!</Link>
                </Font.P>

                <Form btnPrimary="Create your account" onSubmit={handleSubmit}>
                    <Input
                        label="Your display name"
                        id="fullName"
                        value={fullName}
                        onChange={handleFullName}
                    />

                    <Input
                        label="Your email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />

                    <Password
                        label="Your password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />

                    <Select
                        label="Select your city"
                        value={city}
                        onChange={handleCity}
                    >
                        {SiteData.Cities.map(city => (
                            <option value={city} key={uuid()}>
                                {city}
                            </option>
                        ))}
                    </Select>
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default SignUpArtist
