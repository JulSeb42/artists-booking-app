// Packages
import React, { useState } from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Icon from "../ui/Icon"

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

const InputContainer = styled.div`
    position: relative;
`

const Input = styled.input`
    width: 100%;
    position: relative;
    z-index: 0;
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
`

const Button = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    position: absolute;
    right: ${Variables.Margins.XS};
    z-index: 1;
    top: calc(50% - 16px / 2);
`

const Validation = styled(Font.Label)`
    display: flex;
    align-items: center;

    & > span {
        margin-right: ${Variables.Margins.XXS};
    } 
`

function Password(props) {
    const [isVisible, setIsVisible] = useState(false)
    const isText = isVisible ? "text" : "password"
    const isIcon = isVisible ? "show" : "show-slash"

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

            <InputContainer>
                <Input
                    type={isText}
                    id={props.id}
                    name={props.name ? props.name : props.id}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                />

                <Button type="button" aria-label="Show / hide password">
                    <Icon
                        name={isIcon}
                        size={16}
                        color={Variables.Colors.Primary}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                </Button>
            </InputContainer>

            {props.value.length > 0 && (
                <Validation>
                    <Icon
                        name={props.value.length < 6 ? "close" : "check"}
                        color={
                            props.value.length < 6
                                ? Variables.Colors.Danger
                                : Variables.Colors.Success
                        }
                        size={14}
                    />
                    Your password must be at least 6 characters long
                </Validation>
            )}
        </Container>
    )
}

export default Password
