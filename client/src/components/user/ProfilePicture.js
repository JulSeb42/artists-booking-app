// Packages
import React from "react"
import styled from "styled-components"
import { LinkScroll as Link } from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"
// import * as Font from "../styles/Font"

// Styles
const Container = styled(Link)`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;

    img {
        position: relative;
        z-index: 0;
    }
`

const IconContainer = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${Variables.Margins.S} 0;
    background-color: ${Variables.Colors.LightGray};
`

const Picture = styled.img`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
`

function ProfilePicture(props) {
    return props.to ? (
        <Container to={props.to}>
            <Picture src={props.src} alt={props.alt} {...props} />

            <IconContainer>
                <Icon name="edit" size={24} color={Variables.Colors.Primary} />
            </IconContainer>
        </Container>
    ) : (
        <Picture src={props.src} alt={props.alt} {...props} />
    )
}

export default ProfilePicture
