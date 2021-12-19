// Packages
import React from "react"
import styled from "styled-components"
import { LinkScroll as Link } from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled(Link)`
    aspect-ratio: 1;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    width: 100%;
    display: block;
    text-decoration: none;
    transition: ${Variables.Transitions.Short};

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &:hover {
        transform: scale(1.02);
    }
`

const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`

const Content = styled.p`
    position: relative;
    z-index: 2;
    padding: ${Variables.Margins.XS};
    color: ${Variables.Colors.White};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: ${Variables.FontWeights.Bold};
    text-align: center;
`

function CardSmall(props) {
    return (
        <Container to={props.to}>
            <Img src={props.img} alt={props.name} />
            <Content>{props.name}</Content>
        </Container>
    )
}

export default CardSmall

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: ${Variables.Margins.S};

    @media ${Variables.Breakpoints.MobileL} {
        grid-template-columns: repeat(3, 1fr);
    }
`
