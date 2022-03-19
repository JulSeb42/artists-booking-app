// Packages
import React, { useContext, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import { Burger, Variables } from "components-react-julseb"

// Components
import Logo from "../ui/Logo"
import GlobalSearch from "../search/GlobalSearch"

// API
import { AuthContext } from "../../context/auth"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Spacers.M} 5vw;
    position: relative;
    background-color: ${Variables.Colors.Primary500};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
`

const MenuButton = styled(Burger)`
    display: none;
    color: ${Variables.Colors.Primary500};

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${Variables.Spacers.M};
    }

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        flex-direction: column;
        align-items: flex-start;
        left: 0;
        width: 100%;
        top: -200px;
        padding: ${Variables.Spacers.XS} 5vw;
        z-index: 999;
        background-color: ${Variables.Colors.White};
        transition: ${Variables.Transitions.Short};

        & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${Variables.Spacers.XS};
        }

        ${props =>
            props.isOpen &&
            css`
                top: 56px;
            `}
    }
`

const MenuLink = styled(NavLink)`
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

    ${props =>
        !props.logo &&
        css`
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
        `}
`

const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    const goFirstPage = () => {
        navigate("/artists")
        window.location.reload(false)
    }

    return (
        <Container>
            <MenuLink as={Link} to="/" logo>
                <Logo size={48} white />
            </MenuLink>

            <MenuButton
                width={28}
                height={20}
                onClick={() => setIsOpen(!isOpen)}
                color="currentColor"
                open={isOpen}
            />

            <Nav isOpen={isOpen}>
                <MenuLink to="/artists" onClick={goFirstPage}>
                    All artists
                </MenuLink>

                {isLoggedIn ? (
                    <>
                        <MenuLink to="/my-account">My account</MenuLink>
                        <MenuLink as="button" onClick={logoutUser}>
                            Log out
                        </MenuLink>
                    </>
                ) : (
                    <>
                        <MenuLink to="/login">Login</MenuLink>
                        <MenuLink to="/signup">Sign up</MenuLink>
                    </>
                )}

                <GlobalSearch />
            </Nav>
        </Container>
    )
}

export default Header
