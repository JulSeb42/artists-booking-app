// Packages
import React from "react"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import { Aside, Content } from "../../components/layouts/Container"

function ThanksForgot() {
    return (
        <Page title="Please check your emails">
            <Aside empty />

            <Content>
                <Font.H1>Please check your emails</Font.H1>

                <Font.P>
                    We just sent you an email with a link to reset your
                    password.
                </Font.P>
            </Content>
        </Page>
    )
}

export default ThanksForgot
