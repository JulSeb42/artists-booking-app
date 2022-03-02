// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ForgotSent = () => {
    // Texts
    const texts = {
        title: "Email sent successfully!",
        body: "We just sent you an email with a link to reset your password.",
    }
    return (
        <Page title={texts.title}>
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>{texts.body}</Font.P>
        </Page>
    )
}

export default ForgotSent
