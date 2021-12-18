// Packages
import React from "react"
import styled, { css } from "styled-components"
import { ReactSVG } from "react-svg"

const IconStyled = styled(ReactSVG)`
    display: flex;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    align-items: center;
    justify-content: center;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    svg {
        fill: black;
        width: 100%;
        height: 100%;
    }

    path {
        fill: ${props => props.color};
    }
`

export default function Icon(props) {
    return (
        <IconStyled
            src={`/icons/${props.name}.svg`}
            color={props.color}
            size={props.size}
            wrapper="span"
            {...props}
        />
    )
}

// How to use
// Import in the file you want to use this component
// import Icon from "/path/to/Icon.js"
// Use the component
// <Icon name="name-of-icon" size={32} color="color" />

export const IconMixin = ({ icon, size, color }) => css`
    content: "";
    mask: url("/icons/${icon}.svg") no-repeat 50% 50%;
    mask-size: cover;
    background-color: ${color};
    display: inline-block;
    width: ${size}px;
    height: ${size}px;
`

// How to use the mixin
// Import in the file you want to use this component
// import { IconMixin } from "/path/to/Icon.js"
// div:before {
//     ${IconMixin({
//         icon: "name-of-icon",
//         size: "12px",
//         color: "black",
//     })}
// }
