// Packages
import React, { useState } from "react"
import styled from "styled-components"
import {
    Font,
    ButtonsContainer,
    Button,
    Alert
} from "components-react-julseb"

// Styles
const Container = styled(Alert)`
    display: none;

    &.active {
        display: grid
    }
`

const DangerZone = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const visible = isOpen ? "none" : "block"

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: visible }}
                color="danger"
                justify="start"
            >
                {props.textbtnopen}
            </Button>

            <Container
                color="danger"
                className={isOpen ? "active" : ""}
                {...props}
            >
                <Font.P>{props.text}</Font.P>

                <ButtonsContainer>
                    <Button onClick={props.onClickPrimary} color="danger">
                        {props.textbtndelete}
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        btnstyle="text"
                    >
                        {props.textbtncancel || "No, cancel"}
                    </Button>
                </ButtonsContainer>
            </Container>
        </>
    )
}

export default DangerZone
