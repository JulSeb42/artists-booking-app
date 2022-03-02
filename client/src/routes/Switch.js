// Packages
import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

// Routes
import routes from "./routes"
import redirects from "./redirects"

// Utils
import ProtectedRoutes from "./ProtectedRoutes"
import AnonRoutes from "./AnonRoutes"

const Switch = () => {
    const [edited, setEdited] = useState(false)

    return (
        <Routes>
            {routes.map((route, i) => (
                <Route
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </ProtectedRoutes>
                        ) : route.anon ? (
                            <AnonRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </AnonRoutes>
                        ) : (
                            <route.element
                                edited={route.edit && edited}
                                setEdited={route.edit && setEdited}
                            />
                        )
                    }
                    key={i}
                />
            ))}

            {redirects.map((route, i) => (
                <Route
                    path={route.path}
                    element={<Navigate to={route.to} />}
                    key={i}
                />
            ))}
        </Routes>
    )
}

export default Switch
