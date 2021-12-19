// Imports
import React, { useState, useContext } from "react"
import { useNavigate, Link, Navigate } from "react-router-dom"
import axios from "axios"
import { v4 as uuid } from "uuid"
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content, Aside } from "../../components/layouts/Container"
import NavLogin from "../../components/forms/NavLogin"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Password from "../../components/forms/Password"
import Select from "../../components/forms/Select"

// Data
import SiteData from "../../components/data/SiteData"

const API_URL = "http://localhost:5005"

function Signup() {
    const navigate = useNavigate()

    const { logInUser, isLoggedIn } = useContext(AuthContext)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState(SiteData.Cities[0])
    // const [imageUrl, setImageUrl] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleCity = e => setCity(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName, email, password, role: "user", city }

        axios
            .post(`${API_URL}/auth/signup`, requestBody)
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
        <Page title="Signup" description="" keywords="">
            <Aside />

            <Content>
                <NavLogin />

                <Font.H1 hidden>Signup page</Font.H1>

                <Font.P>
                    If you are a band or an artist who want to be registered on
                    our website,{" "}
                    <Link to="/signup/artist">use this form instead!</Link>
                </Font.P>

                <Form onSubmit={handleSubmit} btnPrimary="Create your account">
                    <Input
                        id="fullName"
                        label="Your full name"
                        onChange={handleFullName}
                        value={fullName}
                    />

                    <Input
                        type="email"
                        id="email"
                        label="Your email"
                        onChange={handleEmail}
                        value={email}
                    />

                    <Password
                        id="password"
                        label="Your password"
                        onChange={handlePassword}
                        value={password}
                    />

                    <Select
                        name="city"
                        id="city"
                        label="Your city"
                        onChange={handleCity}
                        value={city}
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

export default Signup
