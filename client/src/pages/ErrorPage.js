// Packages
import React from "react"

// Components
import * as Font from "../components/styles/Font"
import { LinkScroll as Link } from "../components/utils/LinkScroll"
import Page from "../components/layouts/Page"
import { Aside, Content } from "../components/layouts/Container"

function ErrorPage() {
    return (
        <Page title="Not found!">
            <Aside empty />

            <Content>
                <Font.H1>Not found!</Font.H1>

                <Font.P>
                    This page does not exist.{" "}
                    <Link to="/">Back to homepage.</Link>
                </Font.P>
            </Content>
        </Page>
    )
}

export default ErrorPage
