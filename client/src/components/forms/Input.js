// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: ${Variables.Margins.XXS};

    ${props =>
        props.hidden &&
        css`
            display: none;
        `}
`

const InputStyled = styled.input`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Label};
    color: ${Variables.Colors.FontColor};
    background-color: ${Variables.Colors.BackgroundColor};
    outline: none;

    &:focus {
        border-color: ${Variables.Colors.Primary};
    }

    &:disabled {
        border: 1px solid transparent;
        background-color: ${Variables.Colors.LightGray};
        cursor: not-allowed;
    }

    ${props =>
        props.large &&
        css`
            font-size: ${Variables.FontSizes.TitleLarge};
            font-weight: ${Variables.FontWeights.Bold};
        `}
`

function Input(props) {
    return (
        <Container hidden={props.hidden} style={props.style}>
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

            <InputStyled
                id={props.id}
                name={props.name ? props.name : props.id}
                {...props}
            />
        </Container>
    )
}

export default Input
