// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Label = styled.label`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:before {
        content: "";
        width: 34px;
        height: 14px;
        display: inline-block;
        border-radius: 32px;
        border: 2px solid ${Variables.Colors.Primary};
        margin-right: ${Variables.Margins.XS};
        transition: ${Variables.Transitions.Short};
    }

    &:after {
        content: "";
        position: absolute;
        --size: 10px;
        width: var(--size);
        height: var(--size);
        background-color: ${Variables.Colors.Primary};
        border-radius: 50%;
        left: 4px;
        top: 7px;
        transition: ${Variables.Transitions.Short};
    }
`

const Input = styled.input`
    display: none;

    &:checked {
        & ~ label:before {
            border-color: ${Variables.Colors.Success};
        }

        & ~ label:after {
            left: 24px;
            background-color: ${Variables.Colors.Success};
        }
    }
`

function Toggle(props) {
    return (
        <Container>
            <Input
                type="checkbox"
                id={props.id}
                name={props.name ? props.name : props.id}
                {...props}
            />

            <Label htmlFor={props.id}>{props.label}</Label>
        </Container>
    )
}

export default Toggle
