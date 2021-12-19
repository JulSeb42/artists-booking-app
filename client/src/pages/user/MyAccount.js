// Imports
import React, { useContext } from "react"
// import styled from "styled-components"
// import { Navigate } from "react-router-dom"
// import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../components/styles/Variables"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../../components/user/ProfilePicture"
import Button from "../../components/ui/Button"
import TextIcon from "../../components/ui/TextIcon"

// const API_URL = "http://localhost:5005"

function MyAccount() {
    const { user } = useContext(AuthContext)

    return (
        <Page title={user.fullName} description="" keywords="">
            <Aside center>
                <ProfilePicture src={user.imageUrl} alt={user.fullName} />

                <Button to="/my-account/edit" primary>
                    Edit your account
                </Button>

                {user.role === "artist" && (
                    <Button to={`/artists/${user._id}`} primary>
                        Check your page
                    </Button>
                )}
            </Aside>

            <Content>
                <Font.H1>Welcome {user.fullName}</Font.H1>

                <TextIcon icon="map">
                    <Font.Strong>Location: </Font.Strong>
                    {user.city}
                </TextIcon>

                {user.role === "artist" && (
                    <Font.P>
                        Your profile is{" "}
                        {user.visible === true ? "visible" : "hidden"}!
                    </Font.P>
                )}
            </Content>
        </Page>
    )
}

export default MyAccount
