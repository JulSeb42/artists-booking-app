// Imports
import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { v4 as uuid } from "uuid"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
import { AuthContext } from "../context/auth"

import SiteData from "../components/data/SiteData"

const API_URL = "http://localhost:5005"

function Signup() {
    const navigate = useNavigate()

    const { logInUser } = useContext(AuthContext)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("Berlin")
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

    return (
        <Page title="Signup" description="" keywords="">
            <Font.H1>Signup page</Font.H1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full name"
                    onChange={handleFullName}
                    value={fullName}
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={email}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={password}
                />

                <select
                    name="city"
                    id="city"
                    onChange={handleCity}
                    value={city}
                >
                    {SiteData.Cities.map(city => (
                        <option value={city} key={uuid()}>
                            {city}
                        </option>
                    ))}
                </select>

                <button type="submit">Sign up</button>
            </form>

            {errorMessage && <Font.P>{errorMessage}</Font.P>}

            <Font.P>
                Already an account? <Link to="/login">Log in</Link>
            </Font.P>
        </Page>
    )
}

export default Signup
