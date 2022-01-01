// Packages
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"
import Form from "../../components/forms/Form"
import Password from "../../components/forms/Password"

function ResetPassword() {
    const [password, setPassword] = useState("")
    const handlePassword = e => setPassword(e.target.value)

    const navigate = useNavigate()

    const data = window.location.href.split("/")
    const token = data[4]
    const id = data[5]

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id, password }

        axios
            .put(`/auth/reset-password/${token}/${id}`, requestBody)
            .then(() => {
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Reset your password">
            <Aside empty />

            <Content>
                <Font.H1>Reset your password</Font.H1>

                <Form btnPrimary="Reset your password" onSubmit={handleSubmit}>
                    <Password
                        id="password"
                        name="password"
                        label="Your new password"
                        onChange={handlePassword}
                        value={password}
                    />
                </Form>
            </Content>
        </Page>
    )
}

export default ResetPassword
