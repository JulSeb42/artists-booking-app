// Imports
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import styled from "styled-components"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content, Aside } from "../../components/layouts/Container"
// import * as Variables from "../../components/styles/Variables"

const API_URL = "http://localhost:5005"

function ArtistList() {
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${API_URL}/users/user`)
            .then(res => {
                console.log(res.data)
                setAllUsers(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    let allArtists = allUsers.filter(artist => artist.role === "artist")

    return (
        <Page title="ArtistList" description="" keywords="">
            <Aside>
                <Font.H4>Search & filters</Font.H4>
            </Aside>

            <Content>
                <Font.H1 hidden>All artists</Font.H1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    allArtists.map(artist => (
                        <Link to={`/artists/${artist._id}`}>
                            {artist.fullName}
                        </Link>
                    ))
                )}
            </Content>
        </Page>
    )
}

export default ArtistList
