// Imports
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../../components/styles/Variables"
import Password from "../../components/forms/Password"
import Form from "../../components/forms/Form"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"

const API_URL = "http://localhost:5005"

function EditPassword() {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { password, id: user._id }

        axios
            .put(`${API_URL}/users/edit-password`, requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page
            title="Change your password"
            description=""
            keywords=""
            form
            onSubmit={handleSubmit}
        >
            <Aside />

            <Content>
                <Font.H1>Change your password</Font.H1>

                <Form btnPrimary="Save" container>
                    <Password
                        label="New password"
                        onChange={handlePassword}
                        value={password}
                    />
                </Form>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default EditPassword
