// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import HelmetMeta from "./Helmet"
import Header from "./Header"
import { Container } from "./Container"
import Footer from "./Footer"

function Page(props) {
    const location = useLocation().pathname

    return (
        <>
            <HelmetMeta
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            {location !== "/" && <Header />}

            {location !== "/" ? (
                <Container as={props.form && "form"} {...props}>{props.children}</Container>
            ) : (
                props.children
            )}

            {location !== "/" && <Footer />}
        </>
    )
}

export default Page
