// Packages
import React, { useState, useEffect } from "react"
import {
    Font,
    Main,
} from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"
import ListArtists from "../../components/artists/ListArtists"
import Pagination from "../../components/ui/Pagination"
import Filters from "../../components/artists/Filters"

// Utils
import { getMinPrice, getMaxPrice } from "../../components/utils/minMaxPrice"
import { dataLimit, pageLimit } from "../../config/paginationConfig"

// Data
import {getUsers} from "../../api/getUsers"

const AllArtists = () => {
    const [allArtists, setAllArtists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Pagination
    const [currentPage, setCurrentPage] = useState()

    // Min and max prices
    const [minPrice, setMinPrice] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(undefined)

    useEffect(() => {
        getUsers()
            .then(res => {
                setAllArtists(
                    res
                        .filter(user => user.role === "artist" && user.visible)
                        .map(({ available, ...artist }) => {
                            return {
                                available: available.filter(
                                    date => new Date(date) >= new Date()
                                ),
                                artist,
                            }
                        })
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

        setCurrentPage(
            parseInt(window.location.href.split("/")[4].split("-")[1])
        )
    }, [])

    // Search & Filters
    const [sortedPrice, setSortedPrice] = useState(false)
    const [sortedDate, setSortedDate] = useState(false)
    const [city, setCity] = useState("all")
    const [genre, setGenre] = useState("all")
    
    const handleMinPrice = e => setMinPrice(e.target.value)
    const handleMaxPrice = e => setMaxPrice(e.target.value)
    const handleCity = e => setCity(e.target.value)
    const handleGenre = e => setGenre(e.target.value)

    let results = allArtists.filter(artist => {
        return (
            artist.artist.price >= minPrice &&
            artist.artist.price <= maxPrice
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
        results = results.sort((a, b) => a.artist.price - b.artist.price)
    }

    if (sortedDate) {
        results = results.sort(
            (a, b) => new Date(a.available[0]) - new Date(b.available[0])
        )
    }

    if (city !== "all") {
        results = results.filter(artist => city === artist.artist.city)
    }

    if (genre !== "all") {
        results = results.filter(artist => genre === artist.artist.genre)
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(results.length / dataLimit)

    // Get all cities and genres
    const allCities = [
        ...new Set(allArtists.map(artist => artist.artist.city)),
    ].sort()
    const allGenres = [
        ...new Set(allArtists.map(artist => artist.artist.genre)),
    ].sort()

    return (
        <Page title="Artists" template="aside-left">
            <Filters
                sortByDate={sortByDate}
                sortByPrice={sortByPrice}
                handleMinPrice={handleMinPrice}
                minPrice={minPrice}
                handleMaxPrice={handleMaxPrice}
                maxPrice={maxPrice}
                handleCity={handleCity}
                handleGenre={handleGenre}
                allCities={allCities}
                allGenres={allGenres}
            />

            <Main template="aside-left">
                <Font.H1 hidden>All artists</Font.H1>

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
                    />
                )}
            </Main>
        </Page>
    )
}

export default AllArtists
