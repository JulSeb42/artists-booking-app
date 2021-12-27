// Imports
import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content, Aside } from "../../components/layouts/Container"
import NavLogin from "../../components/forms/NavLogin"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Password from "../../components/forms/Password"

// Data
import allCities from "../../components/data/citiesGermany.json"

// const API_URL = "http://localhost:5005"

function Signup() {
    const { logInUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName, email, password, role: "user", city }

        axios
            .post(`/auth/signup`, requestBody)
            .then(res => {
                logInUser(res.data)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    const [cities, setCities] = useState([])

    useEffect(() => {
        setCities(allCities.map(city => city.name))
    }, [])

    const [filteredCities, setFilteredCities] = useState("")

    const handleFilterCities = e => {
        setCity(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = cities.filter(city => {
        return city.toLowerCase().includes(filteredCities)
    })

    const handleClickSuggestion = e => {
        setCity(e.target.innerText)
    }

    return (
        <Page title="Signup" description="" keywords="">
            <Aside empty />

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

                    <Input
                        label="Your city"
                        id="city"
                        value={city}
                        onChange={handleFilterCities}
                        cities={resultsCities}
                        onMouseDown={handleClickSuggestion}
                    />
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default Signup
