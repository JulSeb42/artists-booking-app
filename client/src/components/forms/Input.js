// Packages
import React, { useState } from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import InputContainer from "./InputContainer"
import ListSuggestions from "./ListSuggestions"

// Styles
const InputStyled = styled.input`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Label};
    color: ${Variables.Colors.FontColor};
    background-color: ${Variables.Colors.BackgroundColor};
    outline: none;
    position: relative;
    z-index: 1;

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
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "" : "closed"

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setTimeout(setIsOpen(false), 500)

    return (
        <InputContainer
            hidden={props.hidden}
            style={props.style}
            cities={props.cities}
            label={props.label}
            id={props.id}
        >
            <InputStyled
                id={props.id}
                name={props.name ? props.name : props.id}
                onFocus={props.cities && handleOpen}
                onBlur={props.cities && handleClose}
                {...props}
            />

            {props.cities && (
                <ListSuggestions
                    items={props.cities}
                    className={open}
                    onMouseDown={props.onMouseDown}
                />
            )}
        </InputContainer>
    )
}

export default Input
