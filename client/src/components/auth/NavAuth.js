// Packages
import React from "react"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { Variables, Grid } from "components-react-julseb"

// Components
import ButtonNavAuth from "./ButtonNavAuth"

// Styles
const Container = styled(Grid)``

const NavAuth = () => {
    const location = useLocation().pathname

    return (
        <Container gap={Variables.Margins.S} col={2}>
            <ButtonNavAuth
                to="/login"
                className={location === "/login" && "active"}
            >
                Log in
            </ButtonNavAuth>

            <ButtonNavAuth
                to="/signup/user"
                className={
                    (location === "/signup/user" ||
                        location === "/signup/artist") &&
                    "active"
                }
            >
                Create an account
            </ButtonNavAuth>
        </Container>
    )
}

export default NavAuth
