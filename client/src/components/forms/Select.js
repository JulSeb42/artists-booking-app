// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import { IconMixin } from "../ui/Icon"
import InputContainer from "./InputContainer"

// Styles
const SelectContainer = styled.div`
    position: relative;
    width: 100%;

    &:after {
        ${IconMixin({
            icon: "chevron-down",
            size: 24,
            color: Variables.Colors.Primary,
        })}
        position: absolute;
        z-index: 1;
        top: calc(50% - 24px / 2);
        right: ${Variables.Margins.XXS};
    }
`

const SelectInput = styled.select`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Label};
    outline: none;
    position: relative;
    appearance: none;
    cursor: pointer;
    z-index: 0;
    width: 100%;
    font-size: ${Variables.FontSizes.Label};

    &::-ms-expand {
        display: none;
    }

    &:focus {
        border-color: ${Variables.Colors.Primary};
    }

    &:disabled {
        border: 1px solid transparent;
        background-color: ${Variables.Colors.LightGray};
        cursor: not-allowed;
    }
`

function Select(props) {
    return (
        <InputContainer
            label={props.label}
            hidden={props.hidden}
            style={props.style}
            id={props.id}
        >
            <SelectContainer>
                <SelectInput
                    id={props.id}
                    name={props.name ? props.name : props.id}
                    value={props.value}
                    {...props}
                >
                    {props.children}
                </SelectInput>
            </SelectContainer>
        </InputContainer>
    )
}

export default Select
