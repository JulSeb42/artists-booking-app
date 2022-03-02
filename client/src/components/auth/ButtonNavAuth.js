// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Container = styled(Link)`
    position: relative;
    color: ${Variables.Colors.Black};
    text-decoration: none;
    font-weight: ${Variables.FontWeights.Bold};
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.Primary300};
    }

    &.active {
        &:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: ${Variables.Colors.Primary500};
        }

        &:hover:after {
            background-color: ${Variables.Colors.Primary300};
        }
    }
`

const ButtonNavAuth = props => {
    return (
        <Container to={props.to} {...props}>
            {props.children}
        </Container>
    )
}

export default ButtonNavAuth
