// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const List = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};

    & > div:not(:last-child) {
        position: relative;

        &:after {
            content: "";
            width: 100%;
            height: 1px;
            display: block;
            background-color: ${Variables.Colors.LightGray};
            grid-column: span 2;
            margin: ${Variables.Margins.M} 0;
        }
    }
`

export default List
