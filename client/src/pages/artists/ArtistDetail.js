// Imports
import React from "react"
// import styled from "styled-components"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../../components/styles/Variables"

function ArtistDetail(props) {
    return (
        <Page title={props.artist.fullName} description="" keywords="">
            <Font.H1>{props.artist.fullName}</Font.H1>
        </Page>
    )
}

export default ArtistDetail

