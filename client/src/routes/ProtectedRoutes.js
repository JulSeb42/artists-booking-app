// Packages
import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "components-react-julseb"

// Components
import { AuthContext } from "../context/auth"

const ProtectedRoutes = ({ children, redirectTo }) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) return <PageLoading />

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo ? redirectTo : "/login"} />
    )
}

export default ProtectedRoutes
