// Imports
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { Content } from "../../components/layouts/Container"
import List from "../../components/artists/List"
import SearchArtists from "../../components/artists/SearchArtists"
import Pagination from "../../components/artists/Pagination"

// Utils
import { getMinPrice, getMaxPrice } from "../../components/utils/minMaxPrice"

// const API_URL = "http://localhost:5005"

function ArtistList() {
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [minPrice, setMinPrice] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(undefined)

    useEffect(() => {
        axios
            .get(`/users/user`)
            .then(res => {
                setAllUsers(
                    res.data
                        .filter(artist => artist.role === "artist")
                        .filter(artist => artist.visible === true)
                )
                setMinPrice(
                    getMinPrice(
                        res.data
                            .filter(artist => artist.role === "artist")
                            .filter(artist => artist.visible === true)
                    )
                )
                setMaxPrice(
                    getMaxPrice(
                        res.data
                            .filter(artist => artist.role === "artist")
                            .filter(artist => artist.visible === true)
                    )
                )
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const [query, setQuery] = useState("")
    const [sortedPrice, setSortedPrice] = useState(false)
    const [sortedDate, setSortedDate] = useState(false)

    const [city, setCity] = useState("All")
    const [genre, setGenre] = useState("All")

    const handleSearch = e => setQuery(e.target.value)
    const handleMinPrice = e => setMinPrice(e.target.value)
    const handleMaxPrice = e => setMaxPrice(e.target.value)

    let results = allUsers.filter(artist => {
        return (
            artist.fullName.toLowerCase().includes(query) &&
            artist.price >= minPrice &&
            artist.price <= maxPrice
        )
    })

    const sortByPrice = e => {
        setSortedPrice(e.target.checked)
        setSortedDate(false)
    }

    const sortByDate = e => {
        setSortedPrice(false)
        setSortedDate(e.target.checked)
    }

    if (sortedPrice) {
        results = results.sort((a, b) => a.price - b.price)
    }

    if (sortedDate) {
        results = results.sort(
            (a, b) => new Date(a.available[0]) - new Date(b.available[0])
        )
    }

    const handleCityChange = e => setCity(e.target.value)

    if (city !== "All") {
        results = results.filter(artist => city === artist.city)
    }

    const handleGenreChange = e => setGenre(e.target.value)

    if (genre !== "All") {
        results = results.filter(artist => genre === artist.genre)
    }

    const dataLimit = 10
    const maxPages = Math.floor(results.length / dataLimit)

    return (
        <Page title="Artists" description="" keywords="">
            <SearchArtists
                handleSearch={handleSearch}
                sortByPrice={sortByPrice}
                sortByAvailabilities={sortByDate}
                artists={allUsers}
                changeMin={handleMinPrice}
                changeMax={handleMaxPrice}
                handleCity={handleCityChange}
                valueSelectLocation={city}
                handleGenre={handleGenreChange}
                valueSelectGenre={genre}
                min={minPrice}
                max={maxPrice}
            />

            <Content large>
                <Font.H1 hidden>All artists</Font.H1>

                {isLoading ? (
                    <Font.P>Loading</Font.P>
                ) : results.length > 0 ? (
                    <List>
                        <Pagination
                            artists={results}
                            pageLimit={maxPages}
                            dataLimit={dataLimit}
                        />
                    </List>
                ) : (
                    <Font.P>Nothing to show!</Font.P>
                )}
            </Content>
        </Page>
    )
}

export default ArtistList
