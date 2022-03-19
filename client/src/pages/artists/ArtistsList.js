// Packages
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Font, Main } from "components-react-julseb"

// API
import userService from "../../api/user.service"
import searchService from "../../api/search.service"

// Components
import Page from "../../components/layouts/Page"
import ListArtists from "../../components/artists/ListArtists"
import Pagination from "../../components/ui/Pagination"
import Filters from "../../components/artists/Filters"

// Utils
import { getMinPrice, getMaxPrice } from "../../components/utils/minMaxPrice"
import { pageLimit, dataLimit } from "../../config/paginationConfig"

const ArtistsList = () => {
    // const { pageNumber } = useParams()
    const [query] = useSearchParams()
    const pageNumber = query.get("page")
    const cityParam = query.get("city")
    const genreParam = query.get("genre")

    // Artists
    const [allArtists, setAllArtists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Min and max prices
    const [minPrice, setMinPrice] = useState(undefined)
    const [maxPrice, setMaxPrice] = useState(undefined)

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : parseInt(pageNumber)
    )

    useEffect(() => {
        cityParam || genreParam
            ? searchService
                  .search(cityParam, genreParam)
                  .then(res => {
                      setAllArtists(res.data)
                      setMinPrice(getMinPrice(res.data))
                      setMaxPrice(getMaxPrice(res.data))
                      setIsLoading(false)
                  })
                  .catch(err => console.log(err))
            : userService
                  .allArtists()
                  .then(res => {
                      setAllArtists(res.data)
                      setMinPrice(getMinPrice(res.data))
                      setMaxPrice(getMaxPrice(res.data))
                      setIsLoading(false)
                  })
                  .catch(err => console.log(err))
    }, [cityParam, genreParam])

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
        return artist.price >= minPrice && artist.price <= maxPrice
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

    if (city !== "all") {
        results = results.filter(artist => city === artist.city)
    }

    if (genre !== "all") {
        results = results.filter(artist => genre === artist.genre)
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(results.length / dataLimit)

    // Get all cities and genres
    const allCities = [...new Set(allArtists.map(artist => artist.city))].sort()
    const allGenres = [
        ...new Set(allArtists.map(artist => artist.genre)),
    ].sort()

    return (
        <Page title="All artists" template="aside-left">
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

export default ArtistsList
