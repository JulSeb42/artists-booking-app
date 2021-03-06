// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar, Variables, Font, Badge } from "components-react-julseb"

// Styles
const Container = styled(Link)`
    aspect-ratio: 1;
    position: relative;
    width: 100%;
    display: block;
    text-decoration: none;
    transition: ${Variables.Transitions.Short};

    &:before {
        content: "";
        position: absolute;
        border-radius: 50%;
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

const Img = styled(Avatar)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
`

const Dot = styled(Badge)`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
`

const Content = styled(Font.P)`
    position: relative;
    z-index: 2;
    padding: ${Variables.Spacers.XS};
    color: ${Variables.Colors.White};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: ${Variables.FontWeights.Bold};
    text-align: center;
    border-radius: 50%;
`

const CardConversation = props => {
    return (
        <Container to={props.to}>
            <Img src={props.src} alt={props.name} />

            {!props.read && <Dot size={24} color="success" />}

            <Content>{props.name}</Content>
        </Container>
    )
}

export default CardConversation
