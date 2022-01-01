// Packages
import React, { useState } from "react"
import styled from "styled-components"

// Components
import Card from "./Card"
import ButtonPagination from "../ui/ButtonPagination"
import * as Variables from "../styles/Variables"

// Styles
const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button:not(:last-child) {
        margin-right: ${Variables.Margins.S};
    }
`

function Pagination({ artists, dataLimit, pageLimit }) {
    const [pages] = useState(Math.round(artists.length / dataLimit))
    const [currentPage, setCurrentPage] = useState(1)

    const goToNextPage = () => {
        setCurrentPage(page => page + 1)
    }

    const goToPreviousPage = () => {
        setCurrentPage(page => page - 1)
    }

    const changePage = e => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return artists.slice(startIndex, endIndex)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        return new Array(pageLimit).fill().map((_, i) => start + i + 1)
    }

    return (
        <>
            {getPaginatedData().map((d, i) => (
                <Card artist={d} key={i} />
            ))}

            {getPaginationGroup().length > 0 && (
                <ButtonsContainer>
                    <ButtonPagination
                        previous
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1 && "disabled"}
                    />

                    {getPaginationGroup().map((item, i) => (
                        <ButtonPagination
                            onClick={changePage}
                            className={currentPage === item && "active"}
                            key={i}
                        >
                            {item}
                        </ButtonPagination>
                    ))}

                    <ButtonPagination
                        next
                        onClick={goToNextPage}
                        disabled={currentPage === pages && "disabled"}
                    />
                </ButtonsContainer>
            )}
        </>
    )
}

export default Pagination
