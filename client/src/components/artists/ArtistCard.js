// Packages
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
    Avatar,
    Font,
    Button,
    Variables,
    TitleFlex,
    Grid,
} from "components-react-julseb"
import { getToday, convertDate, convertPrice } from "js-utils-julseb"

// Components
import TextIcon from "../ui/TextIcon"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: ${Variables.Spacers.M};

    @media ${Variables.Breakpoints.Tablet} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`

const Img = styled(Avatar)`
    margin-right: ${Variables.Spacers.S};
`

const Content = styled(Grid)`
    flex-grow: 1;
    width: 100%;
`

const InfoContainer = styled(TitleFlex)`
    align-items: flex-end;
`

const Info = styled(Grid)``

const ArtistCard = ({ artist, ...props }) => {
    const navigate = useNavigate()

    const getNextAvailability = () => {
        const arr = artist.available.sort((a, b) => {
            return new Date(a) - new Date(b)
        })

        const filtered = arr.filter(
            date => new Date(date) > new Date(getToday())
        )

        if (filtered.length > 0) {
            return convertDate(filtered[0])
        } else {
            return "-"
        }
    }

    const openArtist = () => {
        navigate(`/artists/${artist._id}`)
        window.location.reload(false)
    }

    return (
        <Container {...props}>
            <Link to={`/artists/${artist._id}`} onClick={openArtist}>
                <Img
                    size={120}
                    src={artist.imageUrl}
                    alt={artist.fullName}
                />
            </Link>

            <Content gap={Variables.Spacers.M}>
                <TitleFlex>
                    <Font.H3>
                        <Link
                            to={`/artists/${artist._id}`}
                            onClick={openArtist}
                        >
                            {artist.fullName}
                        </Link>
                    </Font.H3>

                    <TextIcon icon="map">{artist.city}</TextIcon>
                </TitleFlex>

                <InfoContainer>
                    <Info gap={Variables.Spacers.XS}>
                        <Font.P>
                            <Font.Strong>Genre: </Font.Strong>
                            {artist.genre}
                        </Font.P>

                        <Font.P>
                            <Font.Strong>Next availability: </Font.Strong>
                            {getNextAvailability()}
                        </Font.P>

                        <Font.P>
                            <Font.Strong>Price: </Font.Strong>
                            {convertPrice(artist.price, "EUR")}
                        </Font.P>
                    </Info>

                    <Button onClick={openArtist}>See their page</Button>
                </InfoContainer>
            </Content>
        </Container>
    )
}

export default ArtistCard
