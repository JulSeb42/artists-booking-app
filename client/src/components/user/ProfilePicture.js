// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"
// import * as Font from "../styles/Font"

// Styles
const Container = styled.label``

const Picture = styled.img`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
`

function ProfilePicture(props) {
    return props.edit ? (
        <Container></Container>
    ) : (
        <Picture src={props.src} alt={props.alt} {...props} />
    )
}

export default ProfilePicture
