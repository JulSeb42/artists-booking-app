// Packages
import React from "react"
import styled from "styled-components"
import { Font, Avatar, Variables } from "components-react-julseb"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;

    & > div {
        margin-right: ${Variables.Spacers.XS};
    }
`

const TitleAvatar = props => {
    const { user, conversation } = props

    return (
        <Container>
            <Avatar
                src={
                    user._id === conversation.user._id
                        ? conversation.artist.imageUrl
                        : conversation.user.imageUrl
                }
                alt={
                    user._id === conversation.user._id
                        ? conversation.artist.fullName
                        : conversation.user.fullName
                }
                size={64}
            />

            <Font.H1>
                {user._id === conversation.user._id
                    ? conversation.artist.fullName
                    : conversation.user.fullName}
            </Font.H1>
        </Container>
    )
}

export default TitleAvatar
