// Packages
import styled from "styled-components"
import { Grid, Variables, Font } from "components-react-julseb"

// Components
import LoaderContainer from "../ui/LoaderContainer"
import ArtistCard from "./ArtistCard"

// Styles
const Container = styled(Grid)`
    & > div:not(:last-child) {
        position: relative;

        &:after {
            content: "";
            width: 100%;
            height: 1px;
            display: block;
            background-color: ${Variables.Colors.Gray300};
            grid-column: span 2;
            margin: ${Variables.Spacers.M} 0;
        }
    }
`

const ListArtists = props => {
    return props.isLoading ? (
        <LoaderContainer />
    ) : props.data.length === 0 ? (
        <Font.P>Your search did not return any result.</Font.P>
    ) : props.allArtists.length === 0 ? (
        <Font.P>No artist yet.</Font.P>
    ) : (
        <Container>
            {props.data.map(artist => (
                <ArtistCard artist={artist} key={artist._id} />
            ))}
        </Container>
    )
}

export default ListArtists
