// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Icon from "./Icon"

// Styles
const Container = styled(Font.P)`
    display: flex;
    align-items: center;
    
    & > span, & > strong {
        margin-right: ${Variables.Margins.XXS};
    }
`

function TextIcon(props) {
    return (
        <Container>
            <Icon
                name={props.icon}
                size={16}
                color={Variables.Colors.Primary}
            />

            {props.children}
        </Container>
    )
}

export default TextIcon
