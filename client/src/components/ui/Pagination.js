// Packages
import React from "react"
import { useNavigate } from "react-router-dom"
import {
    Pagination as Container,
    PaginationButton,
} from "components-react-julseb"

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages,
    pageLimit,
    ...props
}) => {
    // Consts
    const navigate = useNavigate()

    // Pagination
    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        navigate(
            props.search
                ? `/results/${props.city}/${props.genre}/page-${
                      currentPage + 1
                  }`
                : `/all-artists/page${currentPage + 1}`
        )
        window.scrollTo(0, 0)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        navigate(
            props.search
                ? `/results/${props.city}/${props.genre}/page-${
                      currentPage - 1
                  }`
                : `/all-artists/page${currentPage - 1}`
        )
        window.scrollTo(0, 0)
    }

    const changePage = e => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
        navigate(
            props.search
                ? `/results/${props.city}/${props.genre}/page-${pageNumber}`
                : `/all-artists/page${pageNumber}`
        )
        window.scrollTo(0, 0)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        return new Array(pageLimit)
            .fill()
            .map((_, i) => start + i + 1)
            .filter(item => item <= totalPages)
    }

    return (
        <Container>
            <PaginationButton
                onClick={prevPage}
                icon="previous"
                disabled={currentPage === 1 && true}
            />

            {getPaginationGroup()[0] !== 1 && (
                <>
                    <PaginationButton number={1} onClick={changePage} />
                    <PaginationButton icon="more" />
                </>
            )}

            {getPaginationGroup().map(item => (
                <PaginationButton
                    number={item}
                    key={item}
                    onClick={changePage}
                    className={currentPage === item && "active"}
                />
            ))}

            {getPaginationGroup()[getPaginationGroup().length - 1] !==
                totalPages && (
                <>
                    <PaginationButton icon="more" />

                    <PaginationButton
                        number={totalPages}
                        onClick={changePage}
                    />
                </>
            )}

            <PaginationButton
                onClick={nextPage}
                icon="next"
                disabled={currentPage === totalPages && true}
            />
        </Container>
    )
}

export default Pagination
