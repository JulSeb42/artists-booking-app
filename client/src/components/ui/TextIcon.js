// Packages
import React from "react"
import styled from "styled-components"
import { Icon, Font, Variables } from "components-react-julseb"

// Styles
const Container = styled.span`
    display: inline-flex;
    align-items: center;

    & > span {
        margin-right: ${Variables.Spacers.XXS};
    }
`

const TextIcon = props => {
    return (
        <Container>
            <Icon name={props.icon} size={16} />

            <Font.P>
                {props.title && <Font.Strong>{props.title}: </Font.Strong>}
                {props.children}
            </Font.P>
        </Container>
    )
}

export default TextIcon
