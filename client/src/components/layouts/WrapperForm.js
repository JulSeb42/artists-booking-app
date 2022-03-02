// Packages
import React from "react"
import styled from "styled-components"
import { Wrapper, Variables } from "components-react-julseb"

// Styles
const Container = styled(Wrapper)`
    display: grid;
    grid-template-columns: var(--container-form-both-sides);
    min-height: 85vh;
    gap: ${Variables.Margins.L};
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
