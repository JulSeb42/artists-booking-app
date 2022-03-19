// Packages
import React, { useState } from "react"
import { Modal, ButtonIcon } from "components-react-julseb"

// Components
import SearchContainer from "./SearchContainer"

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonIcon
                icon="search"
                size={32}
                color="primary"
                onClick={() => setIsOpen(true)}
            />

            <Modal open={isOpen} close={() => setIsOpen(false)}>
                <SearchContainer setIsOpen={setIsOpen} isOpen={isOpen} />
            </Modal>
        </>
    )
}

export default GlobalSearch
