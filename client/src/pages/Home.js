// Packages
import React from "react"

// Components
import Page from "../components/layouts/Page"
import Cover from "../components/layouts/Cover"
import Button from "../components/ui/Button"

const pageTitle = "Book an artist / a band for your next event!"

function Home() {
    return (
        <Page title="Homepage" description="" keywords="" noFooter>
            <Cover
                img="/images/cover-home.jpg"
                alt="Cover Book a Band"
                title={pageTitle}
                fixed
                overlay
            >
                {/* Form */}

                <Button to="/artists" btncolor="primary" large>
                    Browse artists
                </Button>
            </Cover>
        </Page>
    )
}

export default Home
