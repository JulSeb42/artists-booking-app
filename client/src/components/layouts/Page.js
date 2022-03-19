// Packages
import React from "react"
import { useLocation } from "react-router-dom"
import { Helmet, Wrapper, Main } from "components-react-julseb"
import styled from "styled-components"

// Components
import Header from "./Header"
import Footer from "./Footer"

// Data
import siteData from "../../data/siteData"

// Styles
const WrapperStyled = styled(Wrapper)`
    min-height: 85vh;
    margin-top: 80px;
`

const Page = props => {
    const location = useLocation().pathname

    return (
        <>
            <Helmet
                title={`${props.title} | ${siteData.name}`}
                description={props.description}
                keywords={props.keywords}
                siteName={siteData.name}
                favicon={siteData.favicon}
                author={siteData.author}
                type={siteData.type}
                cover={props.cover || siteData.cover}
                language={siteData.language}
            />

            {location !== "/" && <Header />}

            {location === "/" ? (
                props.children
            ) : props.template === "aside-left" ||
              props.template === "both-sides" ? (
                <WrapperStyled template={props.template}>
                    {props.children}
                </WrapperStyled>
            ) : props.template === "form-both-sides" ? (
                props.children
            ) : (
                <WrapperStyled template={props.template}>
                    <Main>{props.children}</Main>
                </WrapperStyled>
            )}

            {location !== "/" && <Footer />}
        </>
    )
}

export default Page
