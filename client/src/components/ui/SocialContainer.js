// Packages
import styled, { css } from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const SocialContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${Variables.Spacers.S};

    ${props =>
        props.footer &&
        css`
            display: flex;
            align-items: center;
            justify-content: flex-start;

            a:first-child {
                margin-right: ${Variables.Spacers.S};
            }
        `}

    @media ${Variables.Breakpoints.Tablet} {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        a:not(:last-child) {
            margin-right: ${Variables.Spacers.S};
        }
    }
`

export default SocialContainer
