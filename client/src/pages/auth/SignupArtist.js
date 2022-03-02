// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
    Autocomplete,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import NavAuth from "../../components/auth/NavAuth"

// Utils
import randomAvatar from "../../components/utils/randomAvatar"

const SignupArtist = () => {
    // Consts
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Get all cities
    const [allCities, setAllCities] = useState([])
    const [filteredCities, setFilteredCities] = useState("")

    useEffect(() => {
        axios
            .get("/citiesGermany.json")
            .then(res => setAllCities(res.data.map(city => city.name)))
            .catch(err => console.log(err))
    }, [])

    // Texts
    const texts = {
        title: "Create an account",
        btnForm: "Create your account",
        textAlready: "You already have an account?",
        textLinkLogin: "Login",
    }

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Password validation
    const [validation, setValidation] = useState("not-passed")
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)

    const handlePassword = e => {
        setPassword(e.target.value)

        if (regex.test(e.target.value)) {
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
            imageUrl: randomAvatar(),
            role: "artist",
        }

        axios
            .post("/auth/signup", requestBody)
            .then(res => {
                navigate("/thank-you")
                loginUser(res.data)
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

            <Font.P>
                If you're a user wanting to book artists,{" "}
                <Link to="/signup">register here instead!</Link>
            </Font.P>

            <Form onSubmit={handleSubmit} btnprimary={texts.btnForm}>
                <Input
                    label="Displayed name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

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
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </Page>
    )
}

export default SignupArtist
