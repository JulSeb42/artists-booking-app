// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Logo from "../ui/Logo"
import AsyncImage from "../utils/AsyncImages"

// Styles
const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    ${props =>
        props.overlay &&
        css`
            color: ${Variables.Colors.White};

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                z-index: 1;
                background-color: rgba(0, 0, 0, 0.7);
            }
        `}
`

const Img = styled(AsyncImage)`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: ${props => (props.fixed ? "fixed" : "absolute")};
    z-index: 0;
`

const Content = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5vw;
    text-align: center;
`

const Title = styled(Font.H1)`
    margin: ${Variables.Margins.XL} 0;
`

const LogoStyled = styled(Logo)`
    --size: 150px;
    width: var(--size);
    height: var(--size);

    @media ${Variables.Breakpoints.MobileL} {
        --size: 100px;
    }
`

function Cover(props) {
    return (
        <Container overlay={props.overlay}>
            <Img src={props.img} alt={props.alt} fixed={props.fixed} />

            <Content>
                <LogoStyled />

                {props.title && <Title display>{props.title}</Title>}

                {props.children}
            </Content>
        </Container>
    )
}

export default Cover
