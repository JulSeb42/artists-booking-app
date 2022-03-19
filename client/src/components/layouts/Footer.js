// Packages
import React from "react"
import { Link, useNavigate, createSearchParams } from "react-router-dom"
import styled from "styled-components"
import { Grid, Font, Variables } from "components-react-julseb"
import { slugify } from "js-utils-julseb"

// Components
import ButtonSocial from "../ui/ButtonSocial"
import SocialContainer from "../ui/SocialContainer"

// Data
import siteData from "../../data/siteData"

// Styles
const Container = styled(Grid)`
    background-color: ${Variables.Colors.Gray300};
    padding: ${Variables.Spacers.L} 5vw;

    @media ${Variables.Breakpoints.Mobile} {
        grid-template-columns: 1fr;
    }
`

const ItemStyled = styled(Grid)`
    align-content: start;
`

const Footer = () => {
    const navigate = useNavigate()

    const Item = props => {
        return (
            <ItemStyled gap={Variables.Spacers.XS} align="start">
                <Font.H4>{props.title}</Font.H4>

                {props.children}
            </ItemStyled>
        )
    }

    const goTo = city => {
        navigate({
            pathname: "/artists",
            search: createSearchParams({
                city: city,
                genre: "all",
                page: 1,
            }).toString(),
        })
        window.location.reload(false)
    }

    return (
        <Container col={3} as="footer" align="start">
            <Item title={siteData.name}>
                <Font.List style={{ gap: Variables.Spacers.XXS }}>
                    {siteData.cities.map((city, i) => (
                        <li key={i}>
                            <Link
                                to={`/results/${slugify(city)}/all/page-1`}
                                onClick={() => goTo(city)}
                            >
                                {siteData.name} in {city}
                            </Link>
                        </li>
                    ))}
                </Font.List>
            </Item>

            <Item title="Find us on social networks!">
                <SocialContainer footer>
                    {siteData.social.map((item, i) => (
                        <ButtonSocial to="#" type={item} key={i} />
                    ))}
                </SocialContainer>
            </Item>

            <Item title="Disclaimer">
                <Font.P>
                    This is a student project, and all data here is fake. If you
                    want to see more of my work, check my{" "}
                    <a
                        href="https://julien-sebag.design/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        portfolio here
                    </a>
                    !
                </Font.P>
            </Item>
        </Container>
    )
}

export default Footer
