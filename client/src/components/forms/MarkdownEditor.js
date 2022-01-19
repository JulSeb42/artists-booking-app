// Packages
import React from "react"
import MDEditor from "@uiw/react-md-editor"

// Components
import InputContainer from "./InputContainer"

function MarkdownEditor(props) {
    return (
        <InputContainer
            label={props.label}
            hidden={props.hidden}
            style={props.style}
            id={props.id}
        >
            <MDEditor
                value={props.value}
                onChange={props.onChange}
                preview="edit"
                {...props}
            />
        </InputContainer>
    )
}

export default MarkdownEditor