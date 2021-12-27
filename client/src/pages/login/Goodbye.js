// Imports
import React from "react"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../../components/styles/Variables"
import { Aside, Content } from "../../components/layouts/Container"

function Goodbye() {
    return (
        <Page title="Goodbye!" description="" keywords="">
            <Aside empty />

            <Content>
                <Font.H1>We're sorry to see you go!</Font.H1>

                <Font.P>Your account was deleted successfully.</Font.P>
            </Content>
        </Page>
    )
}

export default Goodbye

