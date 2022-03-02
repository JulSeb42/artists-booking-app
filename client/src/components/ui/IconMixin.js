// Packages
import { css } from "styled-components"

const IconMixin = ({ icon, size, color }) => css`
    content: "";
    mask: url("/icons/${icon}.svg") no-repeat 50% 50%;
    mask-size: cover;
    background-color: ${color || "currentColor"};
    display: inline-block;
    width: ${size}px;
    height: ${size}px;
`

export default IconMixin
