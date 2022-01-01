// Packages
import React, { useContext } from "react"
import styled from "styled-components"
// import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"
import * as Font from "../../components/styles/Font"
import { AuthContext } from "../../context/auth"
import Container from "../../components/conversation/Container"
import Button from "../../components/ui/Button"
import * as Variables from "../../components/styles/Variables"
import ProfilePicture from "../../components/user/ProfilePicture"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"

// Styles
const TitleContainer = styled.span`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h1 {
        flex-grow: 1;
    }

    img {
        margin-right: ${Variables.Margins.XS};
    }
`

function Conversation(props) {
    const { user } = useContext(AuthContext)

    return (
        <Page
            title={`Conversation with ${
                props.conversation.user._id === user._id
                    ? props.conversation.artist.fullName
                    : props.conversation.user.fullName
            }`}
        >
            <Aside empty />

            <Content>
                <Button
                    back
                    to="/my-account"
                    btncolor="secondary"
                    justify="start"
                >
                    Back to your account
                </Button>

                <TitleContainer>
                    {props.conversation.user._id === user._id ? (
                        <Link to={`/artists/${props.conversation.artist._id}`}>
                            <ProfilePicture
                                src={props.conversation.artist.imageUrl}
                                alt={props.conversation.artist.fullName}
                                size={48}
                            />
                        </Link>
                    ) : (
                        <ProfilePicture
                            src={props.conversation.user.imageUrl}
                            alt={props.conversation.user.fullName}
                            size={48}
                        />
                    )}

                    <Font.H1>
                        {props.conversation.user._id === user._id ? (
                            <Link
                                to={`/artists/${props.conversation.artist._id}`}
                            >
                                {props.conversation.artist.fullName}
                            </Link>
                        ) : (
                            props.conversation.user.fullName
                        )}
                    </Font.H1>
                </TitleContainer>

                <Container conversation={props.conversation} />
            </Content>
        </Page>
    )
}

export default Conversation
