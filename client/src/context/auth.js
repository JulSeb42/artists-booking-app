// Packages
import axios from "axios"
import React, { useState, useEffect } from "react"
// import axios from "axios"

const AuthContext = React.createContext()

const API_URL = "http://localhost:5005"

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const logInUser = user => {
        localStorage.setItem("isLoggedIn", true)
        setIsLoggedIn(true)
        console.log(user)
        setUser(user)
        verify()
    }

    const logOutUser = () => {
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false)
        setUser(null)
    }

    const verify = () => {
        if (localStorage.getItem("isLoggedIn")) {
            axios.get(`${API_URL}/auth/loggedin`).then(res => {
                // setUser(res.data)
                setIsLoggedIn(true)
                setIsLoading(false)
            }).catch(err => console.log(err))
        } else {
            setIsLoading(false)
        }
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
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
