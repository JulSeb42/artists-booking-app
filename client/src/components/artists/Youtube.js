// Packages
import React from "react"
import styled from "styled-components"

// Styles
const Container = styled.iframe`
    width: 100%;
    height: 30vw;
`

function Youtube(props) {
    return (
        <Container
            src={props.src}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        />
    )
}

export default Youtube
