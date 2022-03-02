// Packages
import React from "react"

// Components
import Page from "../components/layouts/Page"
import HomeCover from "../components/ui/HomeCover"

const Home = () => {
    // Texts
    const texts = {
        title: "Homepage",
    }

    return (
        <Page title={texts.title}>
            <HomeCover />
        </Page>
    )
}

export default Home
