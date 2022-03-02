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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${Variables.Margins.XXL} 5vw;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
        background-color: ${Variables.Overlays.Plain.Black50};
    }
`

const Img = styled(Image)`
    position: absolute;
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
    height: 100%;
    align-content: center;
    justify-items: center;
`

const Title = styled(Font.H1)`
    font-size: 3.5rem;

    @media ${Variables.Breakpoints.Mobile} {
        font-size: 48px;
    }
`

const HomeCover = () => {
    return (
        <Container>
            <Img src="/images/cover-home.jpg" />

            <Content gap={Variables.Margins.L}>
                <Logo size={120} />

                <Title>Book an artist / a band for your next event!</Title>

                <SearchContainer />

                {/* <LargeButton to="/all-artists/page-1">Browse artists</LargeButton> */}
            </Content>
        </Container>
    )
}

export default HomeCover
