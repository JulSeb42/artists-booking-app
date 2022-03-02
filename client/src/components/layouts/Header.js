// Packages
import React, { useContext, useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Variables, Burger } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Logo from "../ui/Logo"
import GlobalSearch from "../search/GlobalSearch"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Margins.M} 5vw;
    background-color: ${Variables.Colors.Primary500};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & > *:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        width: 100%;
        background-color: ${Variables.Colors.Primary500};
        left: 0;
        top: -200px;
        padding: 0 5vw ${Variables.Margins.S} 5vw;
        flex-direction: column;
        align-items: flex-start;
        transition: ${Variables.Transitions.Short};

        & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${Variables.Margins.M};
        }

        &.open {
            top: 72px;
        }
    }
`

const LinkNav = styled(NavLink)`
    color: ${Variables.Colors.White};
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Body};
    text-decoration: none;
    border: none;
    padding: 0;
    background: none;
    position: relative;

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
`

const ButtonMenu = styled(Burger)`
    display: none;

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
    }
`

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation().pathname

    // Burger
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    const openArtists = () => {
        navigate("/all-artists/page-1")
        window.location.reload(false)
    }

    return (
        <Container>
            <Logo to="/" size={48} />

            <ButtonMenu
                className={open}
                color={Variables.Colors.White}
                width={24}
                height={16}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            />

            <Nav className={open}>
                <LinkNav
                    to="/all-artists/page-1"
                    className={
                        location.match(/^\/all-artists.*$/gim) && "active"
                    }
                    onClick={openArtists}
                >
                    All artists
                </LinkNav>

                {isLoggedIn ? (
                    <>
                        <LinkNav to="/my-account">My account</LinkNav>
                        <LinkNav as="button" onClick={logoutUser}>
                            Log out
                        </LinkNav>
                    </>
                ) : (
                    <>
                        <LinkNav
                            to="/login"
                            className={
                                location.match(/^\/signup.*$/gim) && "active"
                            }
                        >
                            Login
                        </LinkNav>
                    </>
                )}

                <GlobalSearch />
            </Nav>
        </Container>
    )
}

export default Header
