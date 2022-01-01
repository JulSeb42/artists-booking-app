// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

function ForgotPassword(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [allUsers, setAllUsers] = useState([])

    const handleEmail = e => setEmail(e.target.value)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const filteredUser = allUsers.find(user => user.email === email)

        const requestBody = {
            receiver: email,
            id: filteredUser._id,
            verifyToken: filteredUser.verifyToken,
        }

        axios
            .put("/auth/forgot", requestBody)
            .then(res => {
                console.log(res)
                navigate("/login/forgot-password/thank-you")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="I forgot my password">
            <Aside empty />

            <Content>
                <Font.H1>I forgot my password</Font.H1>

                <Font.P>
                    Please type your email address and you will receive a link
                    to reset your password.
                </Font.P>

                <Form btnPrimary="Send" onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleEmail}
                        value={email}
                    />
                </Form>
            </Content>
        </Page>
    )
}

export default ForgotPassword
