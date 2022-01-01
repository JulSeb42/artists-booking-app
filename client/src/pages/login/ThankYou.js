// Imports
import React, { useContext } from "react"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../../components/styles/Variables"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"
import { LinkScroll as Link } from "../../components/utils/LinkScroll"

function ThankYou() {
    const { user } = useContext(AuthContext)
    return (
        <Page title="Thank You!" description="" keywords="">
            <Aside empty />

            <Content>
                <Font.H1>Thank you for creating your account!</Font.H1>

                {user.role === "artist" ? (
                    <>
                        <Font.P>
                            We just sent you an email with a verification link,
                            please click on it to verify your account.
                        </Font.P>
                        <Font.P>
                            Your profile is hidden. You can edit this{" "}
                            <Link to="/my-account">here</Link>, along with your
                            profile information.
                        </Font.P>
                    </>
                ) : (
                    <>
                        <Font.P>
                            You are now logged in. We just sent you an email
                            with a verification link, please click on it to
                            verify your account.
                        </Font.P>

                        <Font.P>
                            Check your profile{" "}
                            <Link to="/my-account">here</Link>!
                        </Font.P>
                    </>
                )}
            </Content>
        </Page>
    )
}

export default ThankYou
