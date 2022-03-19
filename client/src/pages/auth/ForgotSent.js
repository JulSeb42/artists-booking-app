// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ForgotSent = () => {
    // Texts
    const title = "Email sent successfully!"
    
    return (
        <Page title={title}>
            <Font.H1>{title}</Font.H1>

            <Font.P>
                We just sent you an email with a link to reset your password.
            </Font.P>
        </Page>
    )
}

export default ForgotSent
