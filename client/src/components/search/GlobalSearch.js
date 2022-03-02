// Packages
import React, { useState } from "react"
import { Modal, ButtonIcon } from "components-react-julseb"

// Components
import SearchContainer from "./SearchContainer"

const GlobalSearch = props => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonIcon
                icon="search"
                size={32}
                color="primary"
                onClick={() => setIsOpen(true)}
            />

            <Modal
                className={isOpen ? "open" : ""}
                close={() => setIsOpen(false)}
            >
                <SearchContainer />
            </Modal>
        </>
    )
}

export default GlobalSearch
