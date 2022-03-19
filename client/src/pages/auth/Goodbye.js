// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const Goodbye = () => {
    return (
        <Page title="Goodbye!">
            <Font.H1>We're sorry to see you go!</Font.H1>

            <Font.P>Your account was deleted successfully.</Font.P>
        </Page>
    )
}

export default Goodbye
