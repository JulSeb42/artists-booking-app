// Packages
import React from "react"
import {
    Aside,
    Input,
    Grid,
    Font,
    Variables,
    Button,
} from "components-react-julseb"

// Components
import { SelectorList, Selector } from "../ui/Selector"

const Filters = props => {
    const handleReset = () => window.location.reload(false)

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
            <Grid gap={Variables.Margins.XS}>
                <Font.H4>Sort by</Font.H4>

                <SelectorList>
                    <Selector
                        label="Price"
                        name="sort"
                        id="sortPrice"
                        onChange={sortByPrice}
                    />

                    <Selector
                        label="Availabilities"
                        name="sort"
                        id="sortAvailable"
                        onChange={sortByDate}
                    />
                </SelectorList>
            </Grid>

            {minPrice && (
                <Grid gap={Variables.Margins.XS}>
                    <Font.H4>Filters</Font.H4>

                    <Grid col={2} gap={Variables.Margins.XS}>
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
