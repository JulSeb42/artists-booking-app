// Packages
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Input, slugify, Button, Variables } from "components-react-julseb"

// API
import {getUsers} from "../../api/getUsers"

// Styles
const Container = styled.form`
    display: flex;
    text-align: left;
    align-items: flex-end;
    justify-content: center;
    background-color: ${Variables.Colors.White};
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
    width: 80%;

    & > div {
        flex-grow: 1;
    }

    & > *:not(:last-child) {
        margin-right: ${Variables.Margins.L};
    }
`

const SearchContainer = () => {
    const navigate = useNavigate()

    const [allCities, setAllCities] = useState([])
    const [allGenres, setAllGenres] = useState([])

    useEffect(() => {
        getUsers().then(res => {
            setAllCities(
                [...new Set(res.map(artist => artist.city))]
                    .filter(city => city !== undefined)
                    .sort()
            )
            setAllGenres(
                [...new Set(res.map(artist => artist.genre))]
                    .filter(genre => genre !== undefined)
                    .sort()
            )
        })
    }, [])

    const [city, setCity] = useState("all")
    const [genre, setGenre] = useState("all")

    const handleCity = e => setCity(e.target.value)
    const handleGenre = e => setGenre(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        navigate(`/results/${city}/${genre}/page-1`)
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
                    <option value={slugify(city)} key={i}>
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
                    <option value={slugify(genre)} key={i}>
                        {genre}
                    </option>
                ))}
            </Input>

            <Button type="submit">Search</Button>
        </Container>
    )
}

export default SearchContainer
