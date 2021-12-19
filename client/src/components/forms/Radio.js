// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.span``

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.Primary};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary70};
        }
    }
`

const Label = styled(Font.Label)`
    background-color: ${Variables.Colors.LighterGray};
    border-radius: ${Variables.Radiuses.Round};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    cursor: pointer;
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Black};

    &:hover {
        background-color: ${Variables.Colors.LightGray};
    }
`

function Radio(props) {
    return (
        <Container>
            <Input
                type="radio"
                name={props.name}
                id={props.id}
                onChange={props.onChange}
            />
            <Label
                weight={Variables.FontWeights.Bold}
                htmlFor={props.id}
                color={Variables.Colors.FontColor}
            >
                {props.label}
            </Label>
        </Container>
    )
}

export default Radio
