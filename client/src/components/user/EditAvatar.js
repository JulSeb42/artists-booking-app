// Packages
import React from "react"
import styled from "styled-components"
import { Avatar, Icon, Variables } from "components-react-julseb"

// Styles
const Container = styled.label`
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    &:hover .icon-container {
        opacity: 0.5;
    }
`

const Input = styled.input`
    display: none;
`

const IconContainer = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${Variables.Colors.Gray50};
    z-index: 2;
    width: 100%;
    height: 48px;
    transition: ${Variables.Transitions.Short};
    color: ${Variables.Colors.Primary500};
`

const EditAvatar = props => {
    return (
        <Container htmlFor={props.id}>
            <Avatar src={props.src} alt={props.alt} size={150} />

            <Input id={props.id} type="file" {...props} />

            <IconContainer className="icon-container">
                <Icon name="edit" size={24} />
            </IconContainer>
        </Container>
    )
}

export default EditAvatar
