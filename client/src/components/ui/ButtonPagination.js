// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Icon from "./Icon"

// Styles
const Container = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    border: none;
    border-radius: 50%;
    font-weight: ${Variables.FontWeights.Bold};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${Variables.Colors.LighterGray};
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Black};

    &:hover {
        background-color: ${Variables.Colors.Primary70};
        color: ${Variables.Colors.White};
    }

    &.active {
        background-color: ${Variables.Colors.Primary};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary70};
        }
    }

    &:disabled {
        background-color: ${Variables.Colors.LightGray};
        cursor: not-allowed;

        &:hover {
            color: ${Variables.Colors.Black};
        }
    }
`

function ButtonPagination(props) {
    return (
        <Container onClick={props.onClick} {...props}>
            {props.next || props.previous ? (
                <Icon
                    name={props.next ? "chevron-right" : "chevron-left"}
                    color="currentColor"
                    size={24}
                />
            ) : (
                props.children
            )}
        </Container>
    )
}

export default ButtonPagination
