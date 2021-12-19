// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Input from "./Input"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${Variables.Margins.M};
`

function Range(props) {
    return (
        <Container>
            <Input
                label={props.labelMin}
                type="number"
                name={props.name}
                id={props.name}
                min={props.min}
                max={props.max}
                defaultValue={props.min}
                onChange={props.changeMin}
                step="100"
            />

            <Input
                label={props.labelMax}
                type="number"
                name={props.name}
                id={props.name}
                min={props.min}
                max={props.max}
                defaultValue={props.max}
                onChange={props.changeMax}
                step="100"
            />
        </Container>
    )
}

export default Range
