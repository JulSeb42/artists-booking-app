// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import { IconMixin } from "../ui/Icon"

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
`

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
        <Container>
            {props.label && (
                <Font.Label
                    color={Variables.Colors.Primary}
                    weight={Variables.FontWeights.Bold}
                    htmlFor={props.id}
                    big
                >
                    {props.label}
                </Font.Label>
            )}

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
        </Container>
    )
}

export default Select
