// Packages
import React, { useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"
import { AuthContext } from "../../context/auth"

const Verify = ({ edited, setEdited }) => {
    // Context
    const { user, updateUser } = useContext(AuthContext)

    // Texts
    const texts = {
        title: "Your account is verified!",
        text: "You can now access all the functionalities on our website.",
        link: "Go to your account.",
    }

    // Verify user
    const requestBody = {
        id: user._id,
        verifyToken: user.verifyToken,
        verified: true,
    }

    axios
        .put("/auth/verify", requestBody)
        .then(res => {
            const { user } = res.data
            updateUser(user)
            setEdited(!edited)
        })
        .catch(err => console.log(err))

    return (
        <Page title={texts.title}>
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>
                {texts.text} <Link to="/my-account">{texts.link}</Link>
            </Font.P>
        </Page>
    )
}

export default Verify
