// Packages
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"
import axios from "axios"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import { Aside } from "../layouts/Container"
import { ItemContainer } from "../layouts/Container"
import Form from "../forms/Form"
import Input from "../forms/Input"
import Radio from "../forms/Radio"
import Range from "../forms/Range"
import Select from "../forms/Select"
import Button from "../ui/Button"

// Data
import SiteData from "../data/SiteData"

const API_URL = "http://localhost:5005"

// Styles
const SortContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > span:first-child {
        margin-right: ${Variables.Margins.XS};
    }
`

function SearchArtists(props) {
    const [cities, setCities] = useState([])

    useEffect(() => {
        axios
            .get(`${API_URL}/users/user`)
            .then(res => {
                setCities(
                    res.data
                        .filter(user => user.role === "artist")
                        .filter(artist => artist.visible === true)
                        .map(artist => artist.city)
                )
            })
            .catch(err => console.log(err))
    }, [])

    // useEffect(() => {
    //     setCities(artists.map(artist => artist.city))
    //     console.log(cities)
    // }, [])

    let uniqCities = [...new Set(cities)].sort()

    return (
        <Aside>
            <Input
                label="Search by artist name"
                name="search"
                id="search"
                type="search"
                onChange={props.handleSearch}
            />

            <ItemContainer>
                <Font.H4>Sort by</Font.H4>

                <SortContainer>
                    <Radio
                        name="sort"
                        id="sortPrice"
                        label="Price"
                        onChange={props.sortByPrice}
                    />
                    <Radio
                        name="sort"
                        id="sortAvailable"
                        label="Availabilities"
                        onChange={props.sortByAvailabilities}
                    />
                </SortContainer>
            </ItemContainer>

            <ItemContainer>
                <Font.H4>Filters</Font.H4>

                <Form container>
                    <Range
                        labelMin="Min price"
                        labelMax="Max price"
                        id="rangePrice"
                        min={props.min}
                        max={props.max}
                        changeMin={props.changeMin}
                        changeMax={props.changeMax}
                    />

                    <Select
                        label="Location"
                        name="location"
                        id="location"
                        onChange={props.handleCity}
                        value={props.valueSelectLocation}
                    >
                        <option value="All">All</option>
                        {uniqCities.map(city => (
                            <option value={city} key={uuid()}>
                                {city}
                            </option>
                        ))}
                    </Select>

                    <Select
                        label="Genre"
                        name="genre"
                        id="genre"
                        onChange={props.handleGenre}
                        value={props.valueSelectGenre}
                    >
                        <option value="All">All</option>
                        {SiteData.Genres.sort((a, b) => a - b).map(genre => (
                            <option value={genre} key={uuid()}>
                                {genre}
                            </option>
                        ))}
                    </Select>
                </Form>
            </ItemContainer>

            <ItemContainer>
                <Button
                    onClick={() => window.location.reload(false)}
                    justify="start"
                    btncolor="primary"
                >
                    Reset filters
                </Button>
            </ItemContainer>
        </Aside>
    )
}

export default SearchArtists
