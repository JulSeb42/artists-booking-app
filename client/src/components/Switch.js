// Packages
import React from "react"
import { Routes, Route } from "react-router-dom"

// Pages
import Home from "../pages/Home"

// Login
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import MyAccount from "../pages/MyAccount"

function Switch() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-account" element={<MyAccount />} />
        </Routes>
    )
}

export default Switch
