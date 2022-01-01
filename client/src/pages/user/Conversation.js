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

// Styles
const TitleContainer = styled.span`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h1 {
        flex-grow: 1;
        margin-right: ${Variables.Margins.XS};
    }
`

function Conversation(props) {
    const { user } = useContext(AuthContext)

    return (
        <Page title="Conversation">
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
                    <Font.H1>
                        {props.conversation.user._id === user._id
                            ? props.conversation.artist.fullName
                            : props.conversation.user.fullName}
                    </Font.H1>

                    <Button
                        btncolor="primary"
                        to={`/artists/${props.conversation.artist._id}`}
                    >
                        Check {user.role === "user" ? "their" : "your"} page
                    </Button>
                </TitleContainer>

                <Container conversation={props.conversation} />
            </Content>
        </Page>
    )
}

export default Conversation
