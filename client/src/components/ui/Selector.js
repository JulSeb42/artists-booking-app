// Packages
import React from "react"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Container = styled.span``

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.Primary500};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary300};
        }
    }
`

const Label = styled.label`
    background-color: ${Variables.Colors.Gray50};
    border-radius: ${Variables.Radiuses.Round};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    cursor: pointer;
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Black};

    &:hover {
        background-color: ${Variables.Colors.Primary300};
        color: ${Variables.Colors.White};
    }
`

const Selector = props => {
    return (
        <Container>
            <Input
                type={props.type || "radio"}
                id={props.id}
                name={props.name}
                {...props}
            />

            <Label htmlFor={props.id}>{props.label}</Label>
        </Container>
    )
}

const SelectorList = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > span:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

export { Selector, SelectorList }
