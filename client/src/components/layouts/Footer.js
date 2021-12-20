// Packages
import React from "react"
import styled from "styled-components"
import {LinkScroll as Link} from "../utils/LinkScroll"
import { v4 as uuid } from "uuid"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import ButtonSocial from "../ui/ButtonSocial"
import SocialContainer from "../ui/SocialContainer"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled.footer`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Variables.Margins.L};
    background-color: ${Variables.Colors.LightGray};
    padding: ${Variables.Margins.L} 5vw;

    @media ${Variables.Breakpoints.MobileL} {
        grid-template-columns: repeat(1, 1fr);
    }
`

const Col = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
    align-items: start;
    align-content: start;
`

function Footer(props) {
    return (
        <Container>
            {/* Grid 3 cols */}
            <Col>
                {/* Links to cities */}
                <Font.H4>Book a band</Font.H4>

                <Font.List>
                    {SiteData.Cities.map(item => (
                        <li key={uuid()}>
                            <Font.P>
                                <Link to="#">Book a band in {item}</Link>
                            </Font.P>
                        </li>
                    ))}
                </Font.List>
            </Col>

            <Col>
                {/* Links to social media */}
                <Font.H4>Find us on social networks!</Font.H4>

                <SocialContainer footer>
                    {SiteData.Social.map(item => (
                        <ButtonSocial to="#" type={item} key={uuid()} />
                    ))}
                </SocialContainer>
            </Col>

            <Col>
                <Font.P>
                    <Font.Strong>Disclaimer:</Font.Strong> this is a student
                    project, and all data here is fake. If you want to see more
                    of my work, check my{" "}
                    <a
                        href="https://julien-sebag.design/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        portfolio here
                    </a>
                    !
                </Font.P>
            </Col>
        </Container>
    )
}

export default Footer
