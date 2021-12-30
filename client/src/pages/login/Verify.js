// Packages
import React, { useContext, useState } from "react"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"
import * as Font from "../../components/styles/Font"
import { AuthContext } from "../../context/auth"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"

function Verify({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const requestBody = {
        id: user._id,
        verifyToken: user.verifyToken,
        verified: true,
    }

    axios
        .put(`/auth/verify`, requestBody)
        .then(res => {
            const { user } = res.data
            updateUser(user)
            setEdited(!edited)
        })
        .catch(err => {
            const errorDescription = err.response.data.errorMessage
            setErrorMessage(errorDescription)
        })

    return (
        <Page title="Verify">
            <Aside empty />

            <Content>
                <Font.H1>Verify your account</Font.H1>

                <Font.P>
                    Thank you for registering your account on Book a Band! Your
                    account is now verified.{" "}
                    <Link to="/my-account">Go to your account.</Link>
                </Font.P>

                {errorMessage && <Font.P>{errorMessage}</Font.P>}
            </Content>
        </Page>
    )
}

export default Verify
