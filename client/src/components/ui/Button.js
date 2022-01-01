// Packages
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import Loader from "./Loader"
import Icon from "./Icon"

// Styles
const Container = styled.button`
    border: none;
    padding: ${Variables.Margins.XS} ${Variables.Margins.S};
    text-align: center;
    background: ${props =>
        props.btncolor === "primary"
            ? Variables.Colors.Primary
            : props.btncolor === "danger"
            ? Variables.Colors.Danger
            : "none"};
    color: ${props =>
        props.btncolor === "primary" || props.btncolor === "danger"
            ? Variables.Colors.White
            : Variables.Colors.Primary};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};
    border-radius: ${Variables.Radiuses.S};
    font-weight: ${Variables.FontWeights.Bold};
    font-size: ${Variables.FontSizes.Body};

    &:hover {
        background-color: ${props =>
            props.btncolor === "primary"
                ? Variables.Colors.Primary70
                : props.btncolor === "danger"
                ? Variables.Colors.Danger70
                : "none"};
        color: ${props =>
            props.btncolor === "primary"
                ? Variables.Colors.White
                : props.btncolor === "danger"
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
    
    &:disabled {
        background-color: ${Variables.Colors.LightGray};
        color: ${Variables.Colors.DarkGray};
        cursor: not-allowed;
    }

    ${props =>
        props.loader &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                margin-left: ${Variables.Margins.XXS};
                border-top-color: ${Variables.Colors.DarkGray};
            }
        `}

    ${props =>
        props.back &&
        css`
            display: inline-flex;
            align-items: center;
            padding: 0;

            span {
                margin-right: ${Variables.Margins.XXS};
            }
        `}
`

function Button(props) {
    return (
        <Container to={props.to} as={props.to && Link} {...props}>
            {props.back && (
                <Icon name="chevron-left" color="currentColor" size={16} />
            )}

            {props.children}

            {props.loader && <Loader />}
        </Container>
    )
}

export default Button
