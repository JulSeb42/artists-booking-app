// Packages
import React from "react"
import { useNavigate } from "react-router-dom"
import {
    Aside,
    Input,
    Grid,
    Font,
    Variables,
    Button,
    InputCheck,
    Flexbox,
} from "components-react-julseb"

const Filters = props => {
    const navigate = useNavigate()

    const handleReset = () => {
        navigate("/artists")
        window.location.reload(false)
    }

    const {
        sortByDate,
        sortByPrice,
        handleMinPrice,
        minPrice,
        handleMaxPrice,
        maxPrice,
        handleCity,
        handleGenre,
        allCities,
        allGenres,
    } = props

    return (
        <Aside template="aside-left">
            <Grid gap={Variables.Spacers.XS}>
                <Font.H4>Sort by</Font.H4>

                <Flexbox gap={Variables.Spacers.XS} direction="row">
                    <InputCheck
                        label="Price"
                        id="sortPrice"
                        name="sort"
                        type="radio"
                        onChange={sortByPrice}
                        selector
                    />

                    <InputCheck
                        label="Availabilities"
                        id="sortAvailable"
                        name="sort"
                        type="radio"
                        onChange={sortByDate}
                        selector
                    />
                </Flexbox>
            </Grid>

            {minPrice && (
                <Grid gap={Variables.Spacers.XS}>
                    <Font.H4>Filters</Font.H4>

                    <Grid col={2} gap={Variables.Spacers.XS}>
                        <Input
                            label="Min price"
                            type="number"
                            onChange={handleMinPrice}
                            value={minPrice}
                        />

                        <Input
                            label="Max price"
                            type="number"
                            onChange={handleMaxPrice}
                            value={maxPrice}
                        />
                    </Grid>

                    {allCities && (
                        <Input
                            label="Location"
                            type="select"
                            onChange={handleCity}
                        >
                            <option value="all">All</option>

                            {allCities.map((city, i) => (
                                <option value={city} key={i}>
                                    {city}
                                </option>
                            ))}
                        </Input>
                    )}

                    {allGenres && (
                        <Input
                            label="Genre"
                            type="select"
                            onChange={handleGenre}
                        >
                            <option value="all">All</option>

                            {allGenres.map((genre, i) => (
                                <option value={genre} key={i}>
                                    {genre}
                                </option>
                            ))}
                        </Input>
                    )}
                </Grid>
            )}

            <Button justify="start" onClick={handleReset}>
                Reset filters
            </Button>
        </Aside>
    )
}

export default Filters
