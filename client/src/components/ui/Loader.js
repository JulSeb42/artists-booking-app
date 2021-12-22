// Packages
import React from "react"
import styled, { keyframes } from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`

const Container = styled.span`
    --border: 4px;
    border: var(--border) solid transparent;
    border-radius: 50%;
    --size: 16px;
    width: var(--size);
    height: var(--size);
    animation: ${spin} 2s linear infinite;
    display: inline-block;
    border-top-color: ${Variables.Colors.White};
`

function Loader() {
    return <Container aria-label="Spinner" />
}

export default Loader
