// Packages
import React, { useState, useEffect } from "react"
import { Font, Main, PageLoading } from "components-react-julseb"

// API
import {getUsers} from "../../api/getUsers"

// Components
import Page from "../../components/layouts/Page"
import ListArtists from "../../components/artists/ListArtists"
import Pagination from "../../components/ui/Pagination"
import Filters from "../../components/artists/Filters"

// Utils
import slugify from "../../components/utils/slugify"
import { dataLimit, pageLimit } from "../../config/paginationConfig"
import { getMinPrice, getMaxPrice } from "../../components/utils/minMaxPrice"

const SearchResults = () => {
    // Pagination
    const arr = window.location.href.split("/")
    const city = arr[4]
    const genre = arr[5]
    const [currentPage, setCurrentPage] = useState()

    // Get filtered artists
    const [allArtists, setAllArtists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Min and max prices
    const [minPrice, setMinPrice] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(undefined)

    useEffect(() => {
        getUsers()
            .then(res => {
                setAllArtists(
                    res
                        .filter(user => user.role === "artist")
                        .map(({ available, ...artist }) => {
                            return {
                                available: available.filter(
                                    date => new Date(date) >= new Date()
                                ),
                                artist,
                            }
                        })
                )
                setCurrentPage(
                    parseInt(window.location.href.split("/")[6].split("-")[1])
                )

                setMinPrice(
                    getMinPrice(
                        res.filter(
                            artist => artist.role === "artist" && artist.visible
                        )
                    )
                )

                setMaxPrice(
                    getMaxPrice(
                        res.filter(
                            artist => artist.role === "artist" && artist.visible
                        )
                    )
                )

                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search & Filters
    const [sortedPrice, setSortedPrice] = useState(false)
    const [sortedDate, setSortedDate] = useState(false)

    const handleMinPrice = e => setMinPrice(e.target.value)
    const handleMaxPrice = e => setMaxPrice(e.target.value)

    let results = allArtists

    if (city !== "all") {
        results = results
            .filter(artist => artist.artist.city !== undefined)
            .filter(artist => slugify(artist.artist.city) === city)
    }

    if (genre !== "all") {
        results = results
            .filter(artist => artist.artist.genre !== undefined)
            .filter(artist => slugify(artist.artist.genre) === genre)
    }

    results = results.filter(
        artist =>
            artist.artist.price >= minPrice && artist.artist.price <= maxPrice
    )

    const sortByPrice = e => {
        setSortedPrice(e.target.checked)
        setSortedDate(false)
    }

    const sortByDate = e => {
        setSortedPrice(false)
        setSortedDate(e.target.checked)
    }

    if (sortedPrice) {
        results = results.sort((a, b) => a.artist.price - b.artist.price)
    }

    if (sortedDate) {
        results = results.sort(
            (a, b) => new Date(a.available[0]) - new Date(b.available[0])
        )
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(results.length / dataLimit)

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Search results" template="aside-left">
            <Filters
                sortByDate={sortByDate}
                sortByPrice={sortByPrice}
                handleMinPrice={handleMinPrice}
                minPrice={minPrice}
                handleMaxPrice={handleMaxPrice}
                maxPrice={maxPrice}
            />

            <Main col={3} template="aside-left">
                <Font.H1 hidden>Search results</Font.H1>

                <ListArtists
                    allArtists={allArtists}
                    data={getPaginatedData()}
                    isLoading={isLoading}
                />

                {numberOfPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        data={results}
                        totalPages={numberOfPages}
                        dataLimit={dataLimit}
                        pageLimit={pageLimit}
                            search
                            city={city}
                            genre={genre}
                    />
                )}
            </Main>
        </Page>
    )
}

export default SearchResults
