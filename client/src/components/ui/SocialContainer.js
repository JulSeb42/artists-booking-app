// Packages
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const SocialContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${Variables.Margins.S};

    ${props =>
        props.footer &&
        css`
            display: flex;
            align-items: center;
            justify-content: flex-start;

            a:first-child {
                margin-right: ${Variables.Margins.S};
            }
        `}
`

export default SocialContainer
