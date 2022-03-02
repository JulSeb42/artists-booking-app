// Packages
import React from "react"
import styled from "styled-components"
import { Wrapper } from "components-react-julseb"

// Styles
const Container = styled(Wrapper)`
    min-height: 85vh;
    margin-top: 80px;
`

const WrapperForm = ({ children, ...props }) => {
    return (
        <Container as="form" {...props}>
            {children}
        </Container>
    )
}

export default WrapperForm
