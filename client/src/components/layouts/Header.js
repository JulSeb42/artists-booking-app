// Packages
import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

// Components
// import * as Variables from "../styles/Variables"
// import * as Font from "../styles/Font"
import LogoLink from "../ui/LogoLink"
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled.header``

const Nav = styled.nav``

function Header(props) {
    const { isLoggedIn, logOutUser } = useContext(AuthContext)
    return (
        <Container>
            <LogoLink />

            <Nav>
                {/* <Link to="/artists">Artists</Link> */}

                {isLoggedIn ? (
                    <>
                        <Link to="/my-account">My account</Link>
                        <button onClick={logOutUser}>Log out</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Nav>
        </Container>
    )
}

export default Header
