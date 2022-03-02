// Packages
import React from "react"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Components
import IconMixin from "../ui/IconMixin"

// Styles
const Container = styled.li`
    grid-template-columns: auto 1fr auto !important;
    position: relative;

    &:after {
        ${IconMixin({
            icon: "close",
            size: 24,
            color: Variables.Colors.Danger500,
        })}
        cursor: pointer;
        position: absolute;
        right: 0;
        top: -2px;
    }
`

const DeleteAvailability = props => {
    return (
        <Container onClick={props.onClick} {...props}>
            {props.date}
        </Container>
    )
}

export default DeleteAvailability
