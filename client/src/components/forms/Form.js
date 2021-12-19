// Packages
import React from "react"
import styled from "styled-components"
import { LinkScroll as Link } from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import Button from "../ui/Button"

// Styles
const Container = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
    width: 100%;
    max-width: 60ch;
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    button:first-child {
        margin-right: ${Variables.Margins.M};
    }
`

function Form(props) {
    return (
        <Container as={props.container && "div"} onSubmit={props.onSubmit}>
            {props.children}

            {props.btnPrimary && (
                <ButtonsContainer>
                    <Button type="submit" primary>
                        {props.btnPrimary}
                    </Button>

                    {props.cancel && (
                        <Button type="reset" secondary>
                            {props.btnSecondary}
                        </Button>
                    )}

                    {props.backLink && (
                        <Button as={Link} to={props.backLink} secondary>
                            {props.btnSecondary}
                        </Button>
                    )}
                </ButtonsContainer>
            )}
        </Container>
    )
}

export default Form
