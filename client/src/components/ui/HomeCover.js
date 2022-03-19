// Packages
import React from "react"
import styled from "styled-components"
import { Image, Font, Variables, Grid } from "components-react-julseb"

// Components
import Logo from "./Logo"
import SearchContainer from "../search/SearchContainer"

// Styles
const Container = styled.div`
    color: ${Variables.Colors.White};
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: ${Variables.Spacers.XXL} 5vw;
    overflow-y: scroll;

    &:before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
        background-color: ${Variables.Overlays.Plain.Black50};
    }
`

const Img = styled(Image)`
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Content = styled(Grid)`
    position: relative;
    z-index: 1;
    text-align: center;
    width: 100%;
    justify-items: center;
`

const Title = styled(Font.H1)`
    font-size: 3.5rem;

    @media ${Variables.Breakpoints.Mobile} {
        font-size: 32px;
    }
`

const HomeCover = () => {
    return (
        <Container>
            <Img src="/images/cover-home.jpg" fit="cover" />

            <Content gap={Variables.Spacers.L}>
                <Logo size={120} white />

                <Title>Book an artist / a band for your next event!</Title>

                <SearchContainer />
            </Content>
        </Container>
    )
}

export default HomeCover
