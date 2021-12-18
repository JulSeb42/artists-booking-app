// Packages
import React, { useState } from "react"
// import axios from "axios"

const AuthContext = React.createContext()

// const API_URL = "http://localhost:5005"

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    const logInUser = user => {
        localStorage.setItem("isLoggedIn", true)
        setIsLoggedIn(true)
    }

    const logOutUser = () => {
        localStorage.setItem("isLoggedIn", false)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                logInUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
