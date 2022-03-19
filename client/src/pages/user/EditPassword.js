// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"
import { passwordRegex } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"

const EditPassword = ({ edited, setEdited }) => {
    const { user, setUser, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const title = "Edit your password"

    // Form items
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => {
        setPassword(e.target.value)

        if (passwordRegex.test(e.target.value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editPassword(user._id, { password })
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form
                onSubmit={handleSubmit}
                btnPrimary="Save changes"
                btnCancel="/my-account"
            >
                <Input
                    label="New password"
                    id="password"
                    password
                    iconPassword
                    onChange={handlePassword}
                    value={password}
                    validationText="Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                    validation={validation}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default EditPassword
