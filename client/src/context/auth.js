// Packages
import axios from "axios"
import React, { useState, useEffect } from "react"

import localStorageExpires from "../components/utils/localStorageExpires"

const AuthContext = React.createContext()

// const API_URL = "http://localhost:5005"

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const logInUser = user => {
        localStorageExpires("isLoggedIn", true, 864000000)
        localStorage.setItem("user", JSON.stringify(user))
        setUser(JSON.parse(localStorage.getItem("user")))
        setIsLoggedIn(true)
        verify()
    }

    const logOutUser = () => {
        axios.put("/auth/logout").then(() => {
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
            setIsLoggedIn(false)
            setUser(null)
        })
    }

    const verify = () => {
        if (localStorage.getItem("isLoggedIn")) {
            axios
                .get(`/auth/loggedin`)
                .then(res => {
                    setUser(JSON.parse(localStorage.getItem("user")))
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        } else {
            setIsLoading(false)
        }
    }

    const updateUser = updatedUser => {
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(JSON.parse(localStorage.getItem("user")))
    }

    useEffect(() => {
        verify()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                logInUser,
                logOutUser,
                isLoading,
                updateUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
