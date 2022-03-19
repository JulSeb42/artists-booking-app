// Packages
import React, { useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Font, PageLoading } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/layouts/Page"

const Verify = ({ edited, setEdited }) => {
    // Context
    const { user, isLoggedIn, setUser, setToken } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    
    const { token, id } = useParams()

    setTimeout(() => {
        if (
            isLoggedIn &&
            user._id === id &&
            user.verifyToken === token
        ) {
            authService
                .verify({ id: id })
                .then(res => {
                    setUser(res.data.user)
                    setToken(res.data.authToken)
                    setVerified(true)
                    setEdited(!edited)
                })
                .catch(err => console.log(err))
        }

        setIsLoading(false)
    }, 1000)

    return (
        <Page title="Verify your account">
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    {!isLoggedIn ? (
                        <>
                            <Font.H1>You are not logged in</Font.H1>

                            <Font.P>
                                Please log in to verify your account.
                            </Font.P>
                        </>
                    ) : verified ? (
                        <>
                            <Font.H1>Your account is verified!</Font.H1>

                            <Font.P>
                                You can now access all the functionalities on
                                our website.{" "}
                                <Link to="/my-account">
                                    Go to your account.
                                </Link>
                            </Font.P>
                        </>
                    ) : (
                        <>
                            <Font.H1>Verification failed</Font.H1>

                            <Font.P>
                                Your account could not be verified, please try
                                again later.
                            </Font.P>
                        </>
                    )}
                </>
            )}
        </Page>
    )
}

export default Verify
