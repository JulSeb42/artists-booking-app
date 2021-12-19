// Packages
import React, { useContext } from "react"
import styled from "styled-components"
import { NavLink, useLocation } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
// import * as Font from "../styles/Font"
import LogoLink from "../ui/LogoLink"
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Margins.M} 5vw;
    background-color: ${Variables.Colors.Primary};
    z-index: 999;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Link = styled(NavLink)`
    color: ${Variables.Colors.White};
    font-weight: ${Variables.FontWeights.Regular};
    text-decoration: none;
    position: relative;
    border: none;
    background: none;
    padding: 0;
    font-size: ${Variables.FontSizes.Body};

    &.active {
        font-weight: ${Variables.FontWeights.Bold};
    }

    &:after {
        content: "";
        position: absolute;
        bottom: -2px;
        width: 0;
        background-color: currentColor;
        height: 2px;
        left: 50%;
        transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    &:hover:after {
        width: 100%;
        left: 0;
    }

    &:not(:last-child) {
        margin-right: ${Variables.Margins.M};

        @media ${Variables.Breakpoints.MobileL} {
            margin-right: 0;
            margin-bottom: ${Variables.Margins.M};
        }
    }
`

function Header() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext)
    const location = useLocation().pathname
    const conditionClass =
        location === "/signup" || location === "/signup/artist"

    return (
        <Container>
            <LogoLink />

            <Nav>
                <Link to="/artists">Artists</Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/my-account">My account</Link>
                        <Link as="button" onClick={logOutUser}>
                            Log out
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className={conditionClass && "active"}>
                        Login
                    </Link>
                )}
            </Nav>
        </Container>
    )
}

export default Header
