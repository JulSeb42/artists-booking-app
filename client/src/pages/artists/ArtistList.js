// Imports
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content, Aside } from "../../components/layouts/Container"

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

    let allArtists = allUsers
        .filter(artist => artist.role === "artist")
        .filter(artist => artist.visible === true)

    return (
        <Page title="ArtistList" description="" keywords="">
            <Aside>
                <Font.H4>Search & filters</Font.H4>
            </Aside>

            <Content>
                <Font.H1 hidden>All artists</Font.H1>

                {isLoading ? (
                    <Font.P>Loading</Font.P>
                ) : allArtists.length > 0 ? (
                    allArtists.map(artist => (
                        <Link to={`/artists/${artist._id}`}>
                            {artist.fullName}
                        </Link>
                    ))
                ) : (
                    <Font.P>Nothing to show!</Font.P>
                )}
            </Content>
        </Page>
    )
}

export default ArtistList
