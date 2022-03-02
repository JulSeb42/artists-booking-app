// Packages
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Grid, Font, Variables, slugify } from "components-react-julseb"

// Components
import ButtonSocial from "../ui/ButtonSocial"
import SocialContainer from "../ui/SocialContainer"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled(Grid)`
    background-color: ${Variables.Colors.Gray300};
    padding: ${Variables.Margins.L} 5vw;
`

const ItemStyled = styled(Grid)`
    align-content: start;
`

const Footer = () => {
    const navigate = useNavigate()

    const Item = props => {
        return (
            <ItemStyled gap={Variables.Margins.XS} align="start">
                <Font.H4>{props.title}</Font.H4>

                {props.children}
            </ItemStyled>
        )
    }

    const goTo = city => {
        navigate(`/results/${slugify(city)}/all/page-1`)
        window.location.reload(false)
    }

    return (
        <Container col={3} align="start">
            <Item title={SiteData.Name}>
                <Font.List style={{ gap: Variables.Margins.XXS }}>
                    {SiteData.Cities.map((city, i) => (
                        <li key={i}>
                            <Link
                                to={`/results/${slugify(city)}/all/page-1`}
                                onClick={() => goTo(city)}
                            >
                                {SiteData.Name} in {city}
                            </Link>
                        </li>
                    ))}
                </Font.List>
            </Item>

            <Item title="Find us on social networks!">
                <SocialContainer footer>
                    {SiteData.Social.map((item, i) => (
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
