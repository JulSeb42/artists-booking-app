// Packages
import React from "react"
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
} from "react-router-dom"
import {
    Pagination as Container,
    PaginationButton,
} from "components-react-julseb"

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages,
    pageLimit,
    city,
    genre,
    ...props
}) => {
    // Consts
    const navigate = useNavigate()
    const [query] = useSearchParams()
    const cityParam = query.get("city")
    const genreParam = query.get("genre")

    // Pagination
    const nextPage = () => {
        setCurrentPage(currentPage + 1)

        cityParam || genreParam
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      genre: genreParam,
                      city: cityParam,
                      page: currentPage + 1,
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: currentPage + 1,
                  }).toString(),
              })
        window.scrollTo(0, 0)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)

        cityParam || genreParam
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      genre: genreParam,
                      city: cityParam,
                      page: currentPage - 1,
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: currentPage - 1,
                  }).toString(),
              })

        window.scrollTo(0, 0)
    }

    const changePage = e => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
        cityParam || genreParam
            ? navigate({
                  pathname: "",
                  search: createSearchParams({
                      genre: genreParam,
                      city: cityParam,
                      page: pageNumber,
                  }).toString(),
              })
            : navigate({
                  pathname: "",
                  search: createSearchParams({
                      page: pageNumber,
                  }).toString(),
              })
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
                prev
                disabled={parseInt(currentPage) === 1 && true}
            />

            {getPaginationGroup()[0] !== 1 && (
                <>
                    <PaginationButton number={1} onClick={changePage} />
                    <PaginationButton more />
                </>
            )}

            {getPaginationGroup().map(item => (
                <PaginationButton
                    number={item}
                    key={item}
                    onClick={changePage}
                    active={parseInt(currentPage) === item && true}
                />
            ))}

            {getPaginationGroup()[getPaginationGroup().length - 1] !==
                totalPages && (
                <>
                    <PaginationButton more />

                    <PaginationButton
                        number={totalPages}
                        onClick={changePage}
                    />
                </>
            )}

            <PaginationButton
                onClick={nextPage}
                next
                disabled={parseInt(currentPage) === totalPages && true}
            />
        </Container>
    )
}

export default Pagination
