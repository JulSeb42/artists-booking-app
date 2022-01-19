// Packages
import React, { useContext } from "react"
import styled, { css } from "styled-components"
import axios from "axios"
import ScrollToBottom from "react-scroll-to-bottom"
import Linkify from "react-linkify"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Textarea from "./Textarea"
import { AuthContext } from "../../context/auth"

// Styles
const Wrapper = styled.div`
    height: 60vh;
    width: 100%;
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
`

const List = styled(ScrollToBottom)`
    height: calc(
        100% - ${Variables.Margins.M} - 3 * ${Variables.FontSizes.Body} *
            ${Variables.LineHeight}
    );

    & > div {
        display: grid;
        grid-template-columns: 1fr;
        gap: ${Variables.Margins.S};
        align-content: start;
        overflow-y: scroll;
    }
`

const Bubble = styled.div`
    width: 100%;
    display: flex;

    p {
        width: auto;
        max-width: 70%;
        padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
        border-radius: ${Variables.Radiuses.S};

        a {
            font-weight: ${Variables.FontWeights.Regular};
            text-decoration: underline;
        }
    }

    ${props =>
        props.bubbletype === "sent" &&
        css`
            justify-content: flex-end;

            p {
                background-color: ${Variables.Colors.Primary};
                color: ${Variables.Colors.White};

                a {
                    color: ${Variables.Colors.White};

                    &:hover {
                        color: ${Variables.Colors.LightGray};
                    }
                }
            }
        `}

    ${props =>
        props.bubbletype === "received" &&
        css`
            p {
                background-color: ${Variables.Colors.LighterGray};
            }
        `}
`

function Container(props) {
    const { user } = useContext(AuthContext)

    if (
        props.conversation.messages[props.conversation.messages.length - 1]
            .sender._id !== user._id
    ) {
        const requestBody = { id: props.conversation._id, read: true }
        axios.put("/messaging/read", requestBody)
    }

    return (
        <Wrapper>
            <List>
                {props.conversation.messages.map(message => (
                    <Bubble
                        bubbletype={
                            message.sender._id === user._id
                                ? "sent"
                                : "received"
                        }
                        key={message._id}
                    >
                        <Font.P bio>
                            <Linkify
                                componentDecorator={(
                                    decoratedHref,
                                    decoratedText,
                                    key
                                ) => (
                                    <a
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        href={decoratedHref}
                                        key={key}
                                    >
                                        {decoratedText}
                                    </a>
                                )}
                            >
                                {message.message}
                            </Linkify>{" "}
                        </Font.P>
                    </Bubble>
                ))}
            </List>

            <Textarea conversation={props.conversation} />
        </Wrapper>
    )
}

export default Container
