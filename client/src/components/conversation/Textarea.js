// Packages
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"

// Components
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"
import { AuthContext } from "../../context/auth"

// Utils
import getTimeNow from "../utils/getTimeNow"
import getToday from "../utils/getToday"

// Styles
const Bar = styled.hr`
    width: 100%;
    border: none;
    height: 1px;
    background-color: ${Variables.Colors.LightGray};
`

const Container = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Input = styled.textarea`
    flex-grow: 1;
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Body};
    resize: none;
    height: calc(3 * ${Variables.FontSizes.Body} * ${Variables.LineHeight});
    border: none;
`

const Button = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;

    span path {
        transition: ${Variables.Transitions.Short};
    }

    &:hover {
        span path {
            fill: ${Variables.Colors.Primary70}
        }
    }
`

function Textarea(props) {
    const { user } = useContext(AuthContext)
    const [message, setMessage] = useState("")

    const handleMessage = e => setMessage(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            id: props.conversation._id,
            sender: user,
            message,
            createdDay: getToday(),
            createdTime: getTimeNow(),
        }

        axios
            .put("/messaging/new-message", requestBody)
            .then(() => {
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Bar />

            <Container onSubmit={handleSubmit}>
                <Input
                    placeholder="Type your message here"
                    onChange={handleMessage}
                    id="send-message"
                    name="send-message"
                    value={message}
                    {...props}
                />

                <Button type="submit" aria-label="Send">
                    <Icon
                        name="send"
                        size={24}
                        color={Variables.Colors.Primary}
                    />
                </Button>
            </Container>
        </>
    )
}

export default Textarea
