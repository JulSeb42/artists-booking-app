// Packages
import React from "react"
import styled from "styled-components"
import Markdown from "markdown-to-jsx"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import { LinkScroll as Link } from "../utils/LinkScroll"

// Styles
const Container = styled(Markdown)`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XS};
`

// Options markdown
const options = {
    forceBlock: true,

    overrides: {
        h2: {
            component: Font.H2,
        },

        h3: {
            component: Font.H3,
        },

        h4: {
            component: Font.H4,
        },

        h5: {
            component: Font.H5,
        },

        h6: {
            component: Font.H6,
        },

        p: {
            component: Font.P,
        },

        strong: {
            component: Font.Strong,
        },

        em: {
            component: Font.Em,
        },

        ul: {
            component: Font.List,
        },

        small: {
            component: Font.Small,
        },

        Link: {
            component: Link,
        },
    },
}

function MarkdownContainer(props) {
    return (
        <Container options={options}>
            {props.children}
        </Container>
    )
}

export default MarkdownContainer
