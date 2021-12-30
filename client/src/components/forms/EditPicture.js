// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"
import ProfilePicture from "../user/ProfilePicture"

// Styles
const Container = styled.label`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    cursor: pointer;

    img {
        position: relative;
        z-index: 0;
    }
`

const Input = styled.input`
    display: none;
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

function EditPicture(props) {
    return (
        <Container htmlFor={props.id}>
            <ProfilePicture src={props.src} alt={props.alt} />

            <Input
                type="file"
                id={props.id}
                name={props.name ? props.name : props.id}
                onChange={props.onChange}
            />

            <IconContainer>
                <Icon name="edit" size={24} color={Variables.Colors.Primary} />
            </IconContainer>
        </Container>
    )
}

export default EditPicture
