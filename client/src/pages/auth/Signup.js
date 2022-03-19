// Packages
import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert, Autocomplete } from "components-react-julseb"
import { getRandomString, passwordRegex, getRandomAvatar } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"
import citiesService from "../../api/cities.service"

// Components
import Page from "../../components/layouts/Page"
import NavAuth from "../../components/auth/NavAuth"

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Get all cities
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        citiesService()
            .then(res => setAllCities(res))
            .catch(err => console.log(err))
    }, [])

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => {
        setPassword(e.target.value)

        if (passwordRegex.test(e.target.value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    const handleFilterLocation = e => {
        setLocation(e.target.value)
        setFilteredCities(e.target.value)
    }

    let resultsCities = allCities.filter(city => {
        return city.toLowerCase().includes(filteredCities.toLowerCase())
    })

    const handleClickAutocomplete = e => {
        setLocation(e.target.innerText)
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            verifyToken: getRandomString(20),
            city: location,
            imageUrl: getRandomAvatar(),
            role: "user",
        }

        authService
            .signup(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Signup" template="form">
            <NavAuth />

            <Font.H1>Create an account</Font.H1>

            <Font.P>
                If you are a band or an artist who want to be registered on our
                website, <Link to="/signup/artist">use this form instead!</Link>
            </Font.P>

            <Form btnPrimary="Create your account" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    iconPassword
                    onChange={handlePassword}
                    value={password}
                    validationText="Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                    validation={validation}
                />

                <Autocomplete
                    label="City"
                    id="city"
                    onChange={handleFilterLocation}
                    value={location}
                    items={resultsCities}
                    onMouseDown={handleClickAutocomplete}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default Signup
