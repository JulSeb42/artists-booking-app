// Packages
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.button`
    border: none;
    padding: ${Variables.Margins.XS} ${Variables.Margins.S};
    text-align: center;
    background: ${props =>
        props.primary
            ? Variables.Colors.Primary
            : props.danger
            ? Variables.Colors.Danger
            : "none"};
    color: ${props =>
        props.primary || props.danger
            ? Variables.Colors.White
            : Variables.Colors.Primary};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};
    border-radius: ${Variables.Radiuses.S};
    font-weight: ${Variables.FontWeights.Bold};
    font-size: ${Variables.FontSizes.Body};

    &:hover {
        background-color: ${props =>
            props.primary
                ? Variables.Colors.Primary70
                : props.danger
                ? Variables.Colors.Danger70
                : "none"};
        color: ${props =>
            props.primary
                ? Variables.Colors.White
                : props.danger
                ? Variables.Colors.BackgroundColor
                : Variables.Colors.Primary70};
    }

    ${props =>
        props.justify &&
        css`
            justify-self: ${props => props.justify};
        `}

    ${props =>
        props.large &&
        css`
            font-size: ${Variables.FontSizes.TitleMedium};
        `}
`

function Button(props) {
    return props.to ? (
        <Container to={props.to} as={Link} {...props}>
            {props.children}
        </Container>
    ) : (
        <Container {...props}>{props.children}</Container>
    )
}

export default Button
