// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: ${Variables.Margins.XXS};
    position: relative;

    ${props =>
        props.hidden &&
        css`
            display: none;
        `}

    ${props =>
        props.cities &&
        css`
            position: relative;
            z-index: 10;
        `}
`

function InputContainer(props) {
    return props.label ? (
        <Container cities={props.cities} hidden={props.hidden} style={props.style}>
            {props.label && (
                <Font.Label
                    htmlFor={props.id}
                    color={Variables.Colors.Primary}
                    weight={Variables.FontWeights.Bold}
                    big
                >
                    {props.label}
                </Font.Label>
            )}

            {props.children}
        </Container>
    ) : (
        props.children
    )
}

export default InputContainer
