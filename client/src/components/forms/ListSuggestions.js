// Packages
import React from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.ul`
    position: absolute;
    left: 0;
    top: 12px;
    width: 100%;
    background-color: ${Variables.Colors.White};
    list-style: none;
    padding: 0;
    border-radius: ${Variables.Radiuses.S};
    border: 1px solid ${Variables.Colors.LightGray};
    z-index: 0;
    padding-top: 27px;
    max-height: 200px;
    overflow-y: scroll;
    transition: ${Variables.Transitions.Short};

    &.closed {
        max-height: 0;
        padding-top: 0;
        opacity: 0;
    }
`

const Item = styled.li`
    padding: ${Variables.Margins.XS};
    cursor: pointer;
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.White};
        background-color: ${Variables.Colors.Primary};
    }
`

function ListSuggestions(props) {
    return (
        <Container className={props.className}>
            {props.items.map(item => (
                <Item key={uuid()} onMouseDown={props.onMouseDown}>{item}</Item>
            ))}
        </Container>
    )
}

export default ListSuggestions
