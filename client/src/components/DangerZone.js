// Packages
import React, { useState } from "react"
import {
    Button,
    Modal,
    Alert,
    ButtonsContainer,
    Font,
} from "components-react-julseb"

const DangerZone = props => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Button
                color="danger"
                justify="start"
                onClick={() => setIsOpen(true)}
            >
                {props.textBtnOpen}
            </Button>

            <Modal open={isOpen}>
                <Alert color="danger">
                    <Font.P>{props.text}</Font.P>

                    <ButtonsContainer>
                        <Button color="danger" onClick={props.onClickPrimary}>
                            {props.textBtnPrimary}
                        </Button>

                        <Button
                            btnStyle="text"
                            onClick={() => setIsOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

export default DangerZone
