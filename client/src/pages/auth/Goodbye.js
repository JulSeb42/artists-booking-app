// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const Goodbye = () => {
    // Texts
    const texts = {
        pageTitle: "Goodbye!",
        title: "We're sorry to see you go!",
        body: "Your account was deleted successfully.",
    }

    return (
        <Page title={texts.pageTitle}>
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>{texts.body}</Font.P>
        </Page>
    )
}

export default Goodbye
