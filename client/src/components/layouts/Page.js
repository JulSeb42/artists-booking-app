// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import HelmetMeta from "./Helmet"
import Header from "./Header"
import { Container } from "./Container"

function Page(props) {
    const location = useLocation().pathname

    return (
        <>
            <HelmetMeta
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            <Header />

            {location !== "/" ? (
                <Container>{props.children}</Container>
            ) : (
                props.children
            )}
        </>
    )
}

export default Page
