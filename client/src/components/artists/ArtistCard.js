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
    getToday,
    convertDate,
} from "components-react-julseb"

// Components
import TextIcon from "../ui/TextIcon"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: ${Variables.Margins.M};

    @media ${Variables.Breakpoints.Tablet} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`

const Img = styled(Avatar)`
    margin-right: ${Variables.Margins.S};
`

const Content = styled(Grid)`
    flex-grow: 1;
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
        navigate(`/artists/${artist.artist._id}`)
        window.location.reload(false)
    }

    return (
        <Container {...props}>
            <Link to={`/artists/${artist.artist._id}`} onClick={openArtist}>
                <Img
                    size={120}
                    src={artist.artist.imageUrl}
                    alt={artist.artist.fullName}
                />
            </Link>

            <Content gap={Variables.Margins.M}>
                <TitleFlex>
                    <Font.H3>
                        <Link
                            to={`/artists/${artist.artist._id}`}
                            onClick={openArtist}
                        >
                            {artist.artist.fullName}
                        </Link>
                    </Font.H3>

                    <TextIcon icon="map">{artist.artist.city}</TextIcon>
                </TitleFlex>

                <InfoContainer>
                    <Info gap={Variables.Margins.XS}>
                        <Font.P>
                            <Font.Strong>Genre: </Font.Strong>
                            {artist.artist.genre}
                        </Font.P>

                        <Font.P>
                            <Font.Strong>Next availability: </Font.Strong>
                            {getNextAvailability()}
                        </Font.P>

                        <Font.P>
                            <Font.Strong>Price: </Font.Strong>
                            {artist.artist.price} €
                        </Font.P>
                    </Info>

                    <Button onClick={openArtist}>See their page</Button>
                </InfoContainer>
            </Content>
        </Container>
    )
}

export default ArtistCard
