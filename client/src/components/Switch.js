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
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Artists
import ArtistList from "../pages/artists/ArtistList"
import ArtistDetail from "../pages/artists/ArtistDetail"

// Utils
import scrollToTop from "./utils/scrollToTop"

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
            <Route path="/" element={<Home />} preload={scrollToTop()} />

            {/* Login */}
            <Route path="/login" element={<Login />} preload={scrollToTop()} />
            <Route path="/signup" element={<Signup />} preload={scrollToTop()} />
            <Route
                path="/signup/artist"
                element={<SignUpArtist />}
                preload={scrollToTop()}
            />

            {/* Account */}
            <Route
                path="/my-account"
                element={
                    <ProtectedRoute redirectTo="/login">
                        <MyAccount />
                    </ProtectedRoute>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/my-account/edit"
                element={
                    <ProtectedRoute redirectTo="/login">
                        <EditAccount edited={edited} setEdited={setEdited} />
                    </ProtectedRoute>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/my-account/edit/edit-password"
                element={
                    <ProtectedRoute redirectTo="/login">
                        <EditPassword />
                    </ProtectedRoute>
                }
                preload={scrollToTop()}
            />

            {/* Artists */}
            <Route
                path="/artists"
                element={<ArtistList />}
                preload={scrollToTop()}
            />

            {allUsers.map(artist => (
                <Route
                    path={`/artists/${artist._id}`}
                    element={<ArtistDetail artist={artist} />}
                    artist={artist}
                    key={artist._id}
                    preload={scrollToTop()}
                />
            ))}
        </Routes>
    )
}

export default Switch
