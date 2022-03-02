// Packages
import React from "react"
import styled from "styled-components"
import { Variables, Icon } from "components-react-julseb"

// Styles
const Container = styled.a`
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${Variables.Radiuses.M};
    background: ${props =>
        props.color === "facebook"
            ? "#3B5998"
            : props.color === "youtube"
            ? "#C4302B"
            : props.color === "instagram"
            ? "linear-gradient(45deg, #F09433 0%,#E6683C 25%,#DC2743 50%,#CC2366 75%,#BC1888 100%)"
            : ""};
`

function ButtonSocial(props) {
    return (
        <Container
            href={props.to}
            target="_blank"
            rel="noreferrer noopener"
            color={props.type}
        >
            <Icon name={props.type} size={32} color={Variables.Colors.White} />
        </Container>
    )
}

export default ButtonSocial
