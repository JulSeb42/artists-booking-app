// Imports
import React, { useContext, useState, useEffect } from "react"
// import styled from "styled-components"
import { Navigate } from "react-router-dom"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../components/styles/Variables"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"

const API_URL = "http://localhost:5005"

function MyAccount() {
    const { user } = useContext(AuthContext)

    return (
        <Page title="MyAccount" description="" keywords="">
            <Aside />
            <Content>
                {/* <Font.H1>Welcome {user.fullName}</Font.H1> */}
                <Font.H1>Welcome full name</Font.H1>
            </Content>
        </Page>
    )
}

export default MyAccount
