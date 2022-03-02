// Packages
import React from "react"
import { useLocation } from "react-router-dom"
import { Helmet, Wrapper, Main } from "components-react-julseb"
import styled from "styled-components"

// Components
import Header from "./Header"
import Footer from "./Footer"

// Data
import SiteData from "../data/SiteData"

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
                title={`${props.title} | ${SiteData.Name}`}
                description={props.description}
                keywords={props.keywords}
                siteName={SiteData.Name}
                favicon={SiteData.Favicon}
                author={SiteData.Author}
                type={SiteData.Type}
                cover={props.cover || SiteData.Cover}
                language={SiteData.Language}
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
