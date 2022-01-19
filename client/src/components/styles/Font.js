// Packages
import styled, { css } from "styled-components"

// Components
import { IconMixin } from "../ui/Icon"
import * as Variables from "./Variables"

// Styles
export const H1 = styled.h1`
    font-size: ${props =>
        props.display
            ? Variables.FontSizes.TitleDisplay
            : Variables.FontSizes.TitleLarge};
    font-weight: ${Variables.FontWeights.Bold};

    ${props =>
        props.hidden &&
        css`
            position: fixed;
            top: -999em;
            left: -999em;
        `}

    ${props =>
        props.display &&
        css`
            @media ${Variables.Breakpoints.MobileL} {
                font-size: 48px;
            }
        `}
    
    a {
        color: ${Variables.Colors.Primary};
        font-weight: ${Variables.FontWeights.Bold};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Primary70};
        }
    }
`

export const H2 = styled.h2`
    font-size: ${Variables.FontSizes.TitleMedium};
    font-weight: ${Variables.FontWeights.Bold};
`

export const H3 = styled.h3`
    font-size: ${Variables.FontSizes.TitleMedium};
    font-weight: ${Variables.FontWeights.Semibold};
`

export const H4 = styled.h4`
    font-size: ${Variables.FontSizes.TitleSmall};
    font-weight: ${Variables.FontWeights.Bold};
`

export const H5 = styled.h5`
    font-size: ${Variables.FontSizes.TitleSmall};
    font-weight: ${Variables.FontWeights.Semibold};
`

export const H6 = styled.h6`
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Bold};
`

export const P = styled.p`
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Regular};

    a {
        color: ${Variables.Colors.Primary};
        font-weight: ${Variables.FontWeights.Bold};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Primary70};
        }
    }

    ${props =>
        props.bio &&
        css`
            white-space: pre-line;
        `}
`

export const Strong = styled.strong`
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Bold};
`

export const Em = styled.em`
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Regular};
    font-style: italic;
`

export const Small = styled.small`
    font-size: ${Variables.FontSizes.Label};
`

export const Label = styled.label`
    font-weight: ${props => props.weight || Variables.FontWeights.Regular};
    color: ${props => props.color || Variables.Colors.FontColor};
    font-size: ${props =>
        props.big ? Variables.FontSizes.Body : Variables.FontWeights.Label};
`

export const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: ${Variables.FontSizes.Body};

    li {
        display: grid;
        grid-template-columns: 14px 1fr;
        gap: ${Variables.Margins.XXS};
        padding-left: ${Variables.Margins.S};

        &:before {
            ${IconMixin({
                icon: "chevron-right",
                size: 14,
                color: "currentColor",
            })};
            margin-top: 5px;
        }
    }
`
