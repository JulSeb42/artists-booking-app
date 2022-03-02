// Packages
import React from "react"
import { Grid, Variables } from "components-react-julseb"

const Item = (props) => {
    return <Grid gap={Variables.Margins.XS}>{props.children}</Grid>
}

export default Item
