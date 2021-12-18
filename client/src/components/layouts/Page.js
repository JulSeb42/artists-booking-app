// Packages
import React from "react"

// Components
import HelmetMeta from "./Helmet"
import Header from "./Header"

function Page(props) {
    return (
        <>
            <HelmetMeta
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            <Header />
            
            {props.children}
        </>
    )
}

export default Page
