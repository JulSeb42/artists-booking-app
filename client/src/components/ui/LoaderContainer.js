// Packages
import React from "react"
import styled from "styled-components"
import { Loader } from "components-react-julseb"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
`

const LoaderContainer = () => {
    return (
        <Container>
            <Loader border={4} />
        </Container>
    )
}

export default LoaderContainer
