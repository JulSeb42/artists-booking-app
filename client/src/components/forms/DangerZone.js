// Packages
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Button from "../ui/Button"
import { AuthContext } from "../../context/auth"

// Styles
const OpenButton = styled(Font.P)`
    cursor: pointer;
    font-weight: ${Variables.FontWeights.Bold};
    color: ${Variables.Colors.Danger};
    transition: ${Variables.Transitions.Short};

    display: ${props => (!props.open ? "block" : "none")};

    &:hover {
        color: ${Variables.Colors.Danger70};
    }
`

const Container = styled.div`
    background-color: ${Variables.Colors.Danger5};
    padding: ${Variables.Margins.M};
    border: 1px solid ${Variables.Colors.Danger};
    border-radius: ${Variables.Radiuses.L};
    display: ${props => (props.open ? "grid" : "none")};
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    button:first-child {
        margin-right: ${Variables.Margins.XXS};
    }
`

function DangerZone() {
    const [open, setOpen] = useState(false)
    const { user, logOutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logOutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <OpenButton onClick={() => setOpen(!open)} open={open}>
                Delete your account
            </OpenButton>

            <Container open={open}>
                <Font.P>Are you sure you want to delete your account?</Font.P>

                <ButtonsContainer>
                    <Button btncolor="danger" onClick={handleDelete} to="/goodbye">
                        Yes delete my account
                    </Button>

                    <Button onClick={() => setOpen(!open)} type="button">
                        No, cancel
                    </Button>
                </ButtonsContainer>
            </Container>
        </>
    )
}

export default DangerZone
