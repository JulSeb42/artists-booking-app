// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Icon from "./Icon"

// Styles
const Container = styled.a`
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${Variables.Radiuses.M};
    background: ${props =>
        props.color === "facebook"
            ? Variables.Colors.Facebook
            : props.color === "youtube"
            ? Variables.Colors.Youtube
            : props.color === "instagram"
            ? Variables.Colors.Instagram
            : ""};
`

function ButtonSocial(props) {
    return (
        <Container
            href={props.to}
            target="_blank"
            rel="noreferrer noopener"
            color={props.type}
        >
            <Icon
                name={props.type}
                size={32}
                color={Variables.Colors.White}
            />
        </Container>
    )
}

export default ButtonSocial
