// Imports
import React, { useContext } from "react"
// import styled from "styled-components"
import { Navigate } from "react-router-dom"

// Components
import Page from "../components/layouts/Page"
import * as Font from "../components/styles/Font"
// import * as Variables from "../components/styles/Variables"
import { AuthContext } from "../context/auth"

function MyAccount() {
    const { isLoggedIn } = useContext(AuthContext)

    return isLoggedIn ? (
        <Page title="MyAccount" description="" keywords="">
            <Font.H1>My account</Font.H1>            
        </Page>
    ) : (
        <Navigate to="/login" />
    )
}

export default MyAccount
