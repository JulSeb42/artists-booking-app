// Packages
import React, { useContext, useState } from "react"
import { NavLink as Link, useLocation } from "react-router-dom"
import styled from "styled-components"

// Components
import Logo from "../ui/LogoLink"
import * as Variables from "../styles/Variables"
import { AuthContext } from "../../context/auth"

// Utils
import scrollToTop from "../utils/scrollToTop"

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

    @media ${Variables.Breakpoints.MobileL} {
        position: absolute;
        width: 100%;
        background-color: ${Variables.Colors.Primary};
        left: 0;
        top: -200px;
        padding: 0 5vw ${Variables.Margins.S} 5vw;
        flex-direction: column;
        align-items: flex-start;
        transition: ${Variables.Transitions.Short};

        &.open {
            top: 88px;
        }
    }
`

const LinkStyled = styled(Link)`
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

const Burger = styled.button`
    display: none;

    @media ${Variables.Breakpoints.MobileL} {
        display: inline;
        position: relative;
        background: none;
        border: none;
        padding: 0;
        width: 30px;
        height: 20px;

        span {
            width: 100%;
            background-color: ${Variables.Colors.White};
            height: 2px;
            position: absolute;
            left: 0;
            transition: ${Variables.Transitions.Short};

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: calc(50% - 2px / 2);
            }

            &:last-child {
                bottom: 0;
            }
        }

        &.open span {
            &:first-child {
                transform: rotate(45deg);
                top: 45%;
            }

            &:nth-child(2) {
                width: 0;
            }

            &:last-child {
                transform: rotate(-45deg);
                bottom: 45%;
            }
        }
    }
`

function Header(props) {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)
    const location = useLocation()

    const [navOpen, setNavOpen] = useState(false)
    const [burgerOpen, setBurgerOpen] = useState(false)

    const isOpen = navOpen ? "open" : ""
    const isBurgerOpen = burgerOpen ? "open" : ""

    const handleOpen = e => {
        setNavOpen(!navOpen)
        setBurgerOpen(!burgerOpen)
    }

    return (
        <Container>
            <Logo />

            <Burger
                aria-label="Menu button"
                onClick={handleOpen}
                className={isBurgerOpen}
            >
                <span />
                <span />
                <span />
            </Burger>

            <Nav className={isOpen} onClick={handleOpen}>
                <LinkStyled to="/artists" onClick={scrollToTop}>
                    Artists
                </LinkStyled>

                {isLoggedIn ? (
                    <>
                        <LinkStyled to="/my-account" onClick={scrollToTop}>
                            My account
                        </LinkStyled>
                        <LinkStyled as="button" onClick={logoutUser}>
                            Log out
                        </LinkStyled>
                    </>
                ) : (
                    <LinkStyled
                        to="/login"
                        onClick={scrollToTop}
                        className={
                            location.pathname === "/signup" ||
                            (location.pathname === "/signup/artist" && "active")
                        }
                    >
                        Log in
                    </LinkStyled>
                )}
            </Nav>
        </Container>
    )
}

export default Header
