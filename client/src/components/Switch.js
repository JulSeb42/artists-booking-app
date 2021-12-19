// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
// import { v4 as uuid } from "uuid"
import axios from "axios"

import ProtectedRoute from "./utils/ProtectedRoute"

// Pages
import Home from "../pages/Home"

// Login
import Login from "../pages/login/Login"
import Signup from "../pages/login/Signup"
import SignUpArtist from "../pages/login/SignUpArtist"

// Account
import MyAccount from "../pages/user/MyAccount"

// Artists
import ArtistList from "../pages/artists/ArtistList"
import ArtistDetail from "../pages/artists/ArtistDetail"

const API_URL = "http://localhost:5005"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [edited, setEdited] = useState(false)

    useEffect(() => {
        axios
            .get(`${API_URL}/users/user`)
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [edited])

    // let artists = allUsers.filter(artist => artist.role === artist)

    // if (artists === []) return <></>

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/artist" element={<SignUpArtist />} />

            {/* Account */}
            <Route
                path="/my-account"
                element={
                    <ProtectedRoute redirectTo="/login">
                        <MyAccount />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/my-account/edit"
                element={<ProtectedRoute redirectTo="/login"></ProtectedRoute>}
            />

            {/* Artists */}
            <Route path="/artists" element={<ArtistList />} />

            {allUsers.map(artist => (
                <Route
                    path={`/artists/${artist._id}`}
                    element={<ArtistDetail artist={artist} />}
                    artist={artist}
                    key={artist._id}
                />
            ))}
        </Routes>
    )
}

export default Switch
