// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ThankYou = () => {
    // Texts
    const texts = {
        title: "Thank you for creating your account!",
        body: "You are now logged in. We just sent you an email to verify your account, please click on the link to access all the functionalities.",
    }
    return (
        <Page title={texts.title}>
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>{texts.body}</Font.P>
        </Page>
    )
}

export default ThankYou
