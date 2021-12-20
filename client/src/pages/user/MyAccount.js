// Imports
import React, { useContext, useState, useEffect } from "react"
// import styled from "styled-components"
// import { Navigate } from "react-router-dom"
import axios from "axios"
import { v4 as uuid } from "uuid"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
// import * as Variables from "../components/styles/Variables"
import { Aside, Content } from "../../components/layouts/Container"
import { AuthContext } from "../../context/auth"
import ProfilePicture from "../../components/user/ProfilePicture"
import Button from "../../components/ui/Button"
import TextIcon from "../../components/ui/TextIcon"
import CardSmall, { List } from "../../components/artists/CardSmall"
// import getToday from "../../components/utils/getToday"

const API_URL = "http://localhost:5005"

function MyAccount() {
    const { user } = useContext(AuthContext)

    const [contacted, setContacted] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${API_URL}/users/user/${user._id}`)
            .then(res => {
                setContacted(res.data.contacted)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    return (
        <Page title={user.fullName} description="" keywords="">
            <Aside center>
                <ProfilePicture
                    src={user.imageUrl}
                    alt={user.fullName}
                    to="/my-account/edit/edit-picture"
                />

                <Button to="/my-account/edit" btncolor="primary">
                    Edit your account
                </Button>

                {user.role === "artist" && (
                    <Button to={`/artists/${user._id}`} btncolor="primary">
                        Check your page
                    </Button>
                )}
            </Aside>

            <Content>
                <Font.H1>Welcome {user.fullName}</Font.H1>

                <TextIcon icon="map">
                    <Font.Strong>Location: </Font.Strong>
                    {user.city}
                </TextIcon>

                {user.role === "artist" && (
                    <Font.P>
                        Your profile is{" "}
                        {user.visible === true ? "visible" : "hidden"}!
                    </Font.P>
                )}

                {user.role === "user" &&
                    (loading ? (
                        <Font.P>Loading</Font.P>
                    ) : contacted.length > 0 ? (
                        <>
                            <Font.H4>Artists you contacted</Font.H4>

                            <List>
                                {contacted.map(artist => (
                                    <CardSmall
                                        to={`/artists/${artist._id}`}
                                        name={artist.fullName}
                                        img={artist.imageUrl}
                                        key={uuid()}
                                    />
                                ))}
                            </List>
                        </>
                    ) : (
                        <Font.P>You didn't contact any artist yet!</Font.P>
                    ))}
            </Content>
        </Page>
    )
}

export default MyAccount
