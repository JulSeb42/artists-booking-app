// Packages
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const ListConversation = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: ${Variables.Margins.M};

    @media ${Variables.Breakpoints.Tablet} {
        grid-template-columns: repeat(3, 1fr);
    }
`

export default ListConversation
