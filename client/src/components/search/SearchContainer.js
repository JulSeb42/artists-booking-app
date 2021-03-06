// Packages
import React, { useState, useEffect } from "react"
import { useNavigate, createSearchParams } from "react-router-dom"
import styled from "styled-components"
import { Input, Button, Variables } from "components-react-julseb"

// API
import userService from "../../api/user.service"

// Styles
const Container = styled.form`
    display: flex;
    text-align: left;
    align-items: flex-end;
    justify-content: center;
    background-color: ${Variables.Colors.White};
    padding: ${Variables.Spacers.M};
    border-radius: ${Variables.Radiuses.M};
    width: 80%;

    & > div {
        flex-grow: 1;
    }

    & > *:not(:last-child) {
        margin-right: ${Variables.Spacers.L};
    }

    @media ${Variables.Breakpoints.Mobile} {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        & > *:not(:last-child) {
            width: 100%;
            margin-right: 0;
            margin-bottom: ${Variables.Spacers.L};
        }
    }
`

const SearchContainer = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate()

    const [allCities, setAllCities] = useState([])
    const [allGenres, setAllGenres] = useState([])

    useEffect(() => {
        userService
            .allArtists()
            .then(res => {
                setAllCities(
                    [...new Set(res.data.map(artist => artist.city))]
                        .filter(city => city !== undefined)
                        .sort()
                )
                setAllGenres(
                    [...new Set(res.data.map(artist => artist.genre))]
                        .filter(genre => genre !== undefined)
                        .sort()
                )
            })
            .catch(err => console.log(err))
    }, [])

    const [city, setCity] = useState("all")
    const [genre, setGenre] = useState("all")

    const handleCity = e => setCity(e.target.value)
    const handleGenre = e => setGenre(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        city === "all" && genre === "all"
            ? navigate("/artists")
            : navigate({
                  pathname: "/artists",
                  search: createSearchParams({
                      city: city,
                      genre: genre,
                      page: 1,
                  }).toString(),
            })
        
        setIsOpen(false)
    }

    return (
        <Container onSubmit={handleSubmit}>
            <Input
                label="City"
                type="select"
                id="city"
                onChange={handleCity}
                value={city}
            >
                <option value="all">All</option>

                {allCities.map((city, i) => (
                    <option value={city} key={i}>
                        {city}
                    </option>
                ))}
            </Input>

            <Input
                label="Genre"
                type="select"
                id="genre"
                onChange={handleGenre}
                value={genre}
            >
                <option value="all">All</option>

                {allGenres.map((genre, i) => (
                    <option value={genre} key={i}>
                        {genre}
                    </option>
                ))}
            </Input>

            <Button type="submit">Search</Button>
        </Container>
    )
}

export default SearchContainer
