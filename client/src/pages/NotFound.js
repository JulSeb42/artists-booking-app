// Packages
import React from "react"
import { Link } from "react-router-dom"
import { Font } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

const NotFound = () => {
    // Texts
    const texts = {
        title: "Page not found!",
        link: "Back to homepage.",
    }

    return (
        <Page title={texts.title}>
            <Font.H1>{texts.title}</Font.H1>

            <Font.P>
                <Link to="/">{texts.link}</Link>
            </Font.P>
        </Page>
    )
}

export default NotFound
